import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", { apiVersion: "2023-10-16" });

    const { lineItems, userId } = await req.json();
    if (!lineItems || !userId) throw new Error("Request must include lineItems and userId.");

    const { data: user } = await supabaseAdmin.from('users').select('stripe_customer_id, email').eq('id', userId).single();
    if (!user) throw new Error("User not found.");

    let customerId = user.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({ email: user.email, metadata: { userId } });
      customerId = customer.id;
      await supabaseAdmin.from('users').update({ stripe_customer_id: customerId }).eq('id', userId);
    }

    const hasSubscription = lineItems.some(item => item.type === 'plan');
    const mode = hasSubscription ? 'subscription' : 'payment';

    const stripeLineItems = [];
    for (const item of lineItems) {
      if (item.type === 'plan') {
        const { data: plan } = await supabaseAdmin.from('product_plans').select('stripe_price_id').eq('id', item.id).single();
        if (!plan?.stripe_price_id) throw new Error(`Plan ID ${item.id} has no valid Stripe Price ID.`);
        stripeLineItems.push({ price: plan.stripe_price_id, quantity: 1 });
      } else if (item.type === 'variant') {
        const { data: variant } = await supabaseAdmin.from('product_variants').select('name, price_amount').eq('id', item.id).single();
        if (!variant) throw new Error(`Variant ID ${item.id} not found.`);
        stripeLineItems.push({
          price_data: { currency: 'usd', product_data: { name: variant.name }, unit_amount: variant.price_amount },
          quantity: item.quantity || 1,
        });
      }
    }
    
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: stripeLineItems,
      mode,
      success_url: `${Deno.env.get("SITE_URL")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${Deno.env.get("SITE_URL")}/`,
      metadata: { userId, cart: JSON.stringify(lineItems) },
    });

    return new Response(JSON.stringify({ sessionId: session.id }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 });
  }
});