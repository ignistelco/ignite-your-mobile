
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";
import { GigsService } from "../_shared/GigsService.ts";

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Simple router function
function createRouter() {
  const routes: { [key: string]: (request: Request, url: URL) => Promise<Response> } = {};
  
  return {
    get: (path: string, handler: (request: Request, url: URL) => Promise<Response>) => {
      routes[`GET:${path}`] = handler;
    },
    post: (path: string, handler: (request: Request, url: URL) => Promise<Response>) => {
      routes[`POST:${path}`] = handler;
    },
    put: (path: string, handler: (request: Request, url: URL) => Promise<Response>) => {
      routes[`PUT:${path}`] = handler;
    },
    delete: (path: string, handler: (request: Request, url: URL) => Promise<Response>) => {
      routes[`DELETE:${path}`] = handler;
    },
    handle: async (request: Request): Promise<Response> => {
      const url = new URL(request.url);
      const key = `${request.method}:${url.pathname}`;
      const handler = routes[key];
      
      if (handler) {
        return await handler(request, url);
      }
      
      return new Response('Not Found', { status: 404, headers: corsHeaders });
    }
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const router = createRouter();
    const gigsService = new GigsService(supabase);

    // Sync Gigs data endpoint
    router.post('/admin/sync-gigs-data', async (request: Request) => {
      try {
        console.log('Starting Gigs data sync...');
        
        // Fetch data from Gigs API
        const [plansData, addonsData, deviceModelsData] = await Promise.all([
          gigsService.getPlans(),
          // gigsService.getAddons(), // Uncomment when available
          gigsService.getDeviceModels()
        ]);

        // Sync plans
        if (plansData?.data) {
          const { error: plansError } = await supabase
            .from('gigs_plans')
            .upsert(
              plansData.data.map((plan: any) => ({
                gigs_plan_id: plan.id,
                name: plan.name,
                description: plan.description,
                price_amount_cents: plan.price?.amount || 0,
                price_currency: plan.price?.currency || 'USD',
                provider: plan.provider || 'unknown',
                sim_types: plan.simTypes || [],
                status: plan.status || 'active',
                data_allowance_bytes: plan.dataAllowance?.bytes,
                voice_allowance_seconds: plan.voiceAllowance?.seconds,
                sms_allowance_messages: plan.smsAllowance?.messages,
                coverage_countries: plan.coverageCountries,
                validity_type: plan.validity?.type,
                validity_value: plan.validity?.value,
                requirements: plan.requirements || {},
                metadata: plan.metadata || {}
              })),
              { onConflict: 'gigs_plan_id' }
            );

          if (plansError) {
            console.error('Error syncing plans:', plansError);
          } else {
            console.log(`Synced ${plansData.data.length} plans`);
          }
        }

        // Sync device models
        if (deviceModelsData?.data) {
          const { error: deviceModelsError } = await supabase
            .from('gigs_device_models')
            .upsert(
              deviceModelsData.data.map((device: any) => ({
                gigs_device_model_id: device.id,
                brand: device.brand,
                name: device.name,
                sim_types: device.simTypes || [],
                type: device.type || 'smartphone',
                metadata: device.metadata || {}
              })),
              { onConflict: 'gigs_device_model_id' }
            );

          if (deviceModelsError) {
            console.error('Error syncing device models:', deviceModelsError);
          } else {
            console.log(`Synced ${deviceModelsData.data.length} device models`);
          }
        }

        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Gigs data synced successfully',
          synced: {
            plans: plansData?.data?.length || 0,
            deviceModels: deviceModelsData?.data?.length || 0
          }
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      } catch (error) {
        console.error('Sync error:', error);
        return new Response(JSON.stringify({ 
          success: false, 
          error: error.message 
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    });

    // Create product plan endpoint
    router.post('/admin/product-plans', async (request: Request) => {
      try {
        const body = await request.json();
        console.log('Creating product plan:', body);

        const { data, error } = await supabase
          .from('plan_product_models')
          .insert({
            name: body.name,
            tagline: body.tagline,
            features: body.features || [],
            gigs_plan_id: body.gigs_plan_id,
            is_active: body.is_active ?? true
          })
          .select()
          .single();

        if (error) {
          throw error;
        }

        // Create plan terms if provided
        if (body.terms && body.terms.length > 0) {
          const termsData = body.terms.map((term: any) => ({
            product_id: data.product_id,
            term_length_months: term.term_length_months,
            monthly_price_cents: term.monthly_price_cents,
            total_cost_cents: term.total_cost_cents
          }));

          const { error: termsError } = await supabase
            .from('plan_product_terms')
            .insert(termsData);

          if (termsError) {
            console.error('Error creating plan terms:', termsError);
          }
        }

        return new Response(JSON.stringify({ 
          success: true, 
          data 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      } catch (error) {
        console.error('Create plan error:', error);
        return new Response(JSON.stringify({ 
          success: false, 
          error: error.message 
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    });

    // Create device product model endpoint
    router.post('/admin/product-device-models', async (request: Request) => {
      try {
        const body = await request.json();
        console.log('Creating device product model:', body);

        const { data, error } = await supabase
          .from('device_product_models')
          .insert({
            name: body.name,
            manufacturer: body.manufacturer,
            model_name: body.model_name,
            lifestyle: body.lifestyle,
            os: body.os,
            base_price_cents: body.base_price_cents,
            network_technologies: body.network_technologies || [],
            sim_card_types: body.sim_card_types || [],
            sim_card_ports: body.sim_card_ports || 1,
            images: body.images || [],
            storage_options_gb: body.storage_options_gb || [],
            gigs_device_model_id: body.gigs_device_model_id,
            is_active: body.is_active ?? true
          })
          .select()
          .single();

        if (error) {
          throw error;
        }

        // Create variants if provided
        if (body.variants && body.variants.length > 0) {
          const variantsData = body.variants.map((variant: any) => ({
            product_id: data.product_id,
            color: variant.color,
            price_modifier_cents: variant.price_modifier_cents || 0
          }));

          const { error: variantsError } = await supabase
            .from('device_product_model_variants')
            .insert(variantsData);

          if (variantsError) {
            console.error('Error creating device variants:', variantsError);
          }
        }

        return new Response(JSON.stringify({ 
          success: true, 
          data 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      } catch (error) {
        console.error('Create device error:', error);
        return new Response(JSON.stringify({ 
          success: false, 
          error: error.message 
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    });

    // Get all product plans
    router.get('/admin/product-plans', async () => {
      try {
        const { data, error } = await supabase
          .from('plan_product_models')
          .select(`
            *,
            plan_product_terms (*)
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;

        return new Response(JSON.stringify({ 
          success: true, 
          data 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: error.message 
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    });

    // Get all gigs plans
    router.get('/admin/gigs-plans', async () => {
      try {
        const { data, error } = await supabase
          .from('gigs_plans')
          .select('*')
          .order('name');

        if (error) throw error;

        return new Response(JSON.stringify({ 
          success: true, 
          data 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: error.message 
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    });

    return await router.handle(req);

  } catch (error) {
    console.error('Admin API error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
