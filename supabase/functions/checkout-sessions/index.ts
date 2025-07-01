
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 405,
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const { userId, lineItems, voucherCode } = await req.json();

    // Get or create user
    const { data: user, error: userError } = await supabaseClient
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      throw new Error('User not found');
    }

    // Get or create Stripe customer
    let customerId = user.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.full_name,
      });
      customerId = customer.id;
      
      // Update user with Stripe customer ID
      await supabaseClient
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId);
    }

    // Process line items
    const stripeLineItems = [];
    for (const item of lineItems) {
      if (item.type === 'plan') {
        const { data: plan } = await supabaseClient
          .from('product_plans')
          .select('stripe_price_id')
          .eq('id', item.id)
          .single();
        
        if (plan?.stripe_price_id) {
          stripeLineItems.push({
            price: plan.stripe_price_id,
            quantity: item.quantity || 1,
          });
        }
      } else if (item.type === 'variant') {
        const { data: variant } = await supabaseClient
          .from('product_variants')
          .select('stripe_product_id, price_amount')
          .eq('id', item.id)
          .single();
        
        if (variant) {
          stripeLineItems.push({
            price_data: {
              currency: 'usd',
              product: variant.stripe_product_id,
              unit_amount: variant.price_amount,
            },
            quantity: item.quantity || 1,
          });
        }
      }
    }

    // Handle voucher if provided
    let discounts = [];
    if (voucherCode) {
      const { data: voucher } = await supabaseClient
        .from('vouchers')
        .select('stripe_coupon_id')
        .eq('code', voucherCode)
        .eq('is_active', true)
        .single();
      
      if (voucher?.stripe_coupon_id) {
        discounts = [{ coupon: voucher.stripe_coupon_id }];
      }
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      client_reference_id: userId,
      line_items: stripeLineItems,
      mode: 'payment',
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/cancel`,
      discounts: discounts,
    });

    return new Response(JSON.stringify({ sessionId: session.id, url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
