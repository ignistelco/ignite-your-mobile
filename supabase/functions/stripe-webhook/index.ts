import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", { apiVersion: "2023-10-16" });

serve(async (req) => {
  const signature = req.headers.get("Stripe-Signature");
  const body = await req.text();

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature!, Deno.env.get("STRIPE_WEBHOOK_SECRET")!);
  } catch (err) {
    return new Response(err.message, { status: 400 });
  }

  const supabaseAdmin = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const userId = session.metadata?.userId;
      const cart = JSON.parse(session.metadata?.cart ?? '[]');
      if (!userId || cart.length === 0) throw new Error('Webhook Error: Missing metadata.');
      
      const { data: order, error: orderError } = await supabaseAdmin.from('orders').insert({
        user_id: userId,
        stripe_payment_intent_id: session.payment_intent as string,
        total_amount: session.amount_total!,
        currency: session.currency!,
        status: 'succeeded',
      }).select().single();
      if (orderError) throw orderError;
        
      const orderItemsToInsert = cart.map(item => ({
        order_id: order.id,
        product_plan_id: item.type === 'plan' ? item.id : null,
        product_variant_id: item.type === 'variant' ? item.id : null,
        quantity: item.quantity || 1,
        description: `ID: ${item.id}`,
        unit_price: 0,
      }));
      
      const { error: itemsError } = await supabaseAdmin.from('order_items').insert(orderItemsToInsert);
      if (itemsError) throw itemsError;

      if (session.mode === 'subscription' && session.subscription) {
        const planItem = cart.find(i => i.type === 'plan');
        if (planItem) {
          await supabaseAdmin.from('subscriptions').insert({
            user_id: userId,
            order_id: order.id,
            stripe_subscription_id: session.subscription as string,
            product_plan_id: planItem.id,
            status: 'active',
          });
        }
      }
    }
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch(error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});