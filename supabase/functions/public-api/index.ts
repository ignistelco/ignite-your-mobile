import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

// Helper function to create slug from name
function createSlug(name: string): string {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to format price from cents
function formatPrice(cents: number): number {
  return Math.round(cents / 100);
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const { endpoint, ...params } = await req.json();

    switch (endpoint) {
      case 'filters':
        // Get dynamic filters from database
        const { data: devices } = await supabaseClient
          .from('device_product_models')
          .select(`
            *, 
            device_product_model_variants(*)
          `)
          .eq('is_active', true)
          .is('deleted_at', null);

        const { data: gigs_devices } = await supabaseClient
          .from('gigs_device_models')
          .select('*');

        // Extract unique values for filters
        const categories = [...new Set((devices || []).map(d => d.specs?.category || 'Smartphone'))];
        const manufacturers = [...new Set((gigs_devices || []).map(g => g.brand))];
        const storage = [...new Set((devices || []).flatMap(d => 
          (d.device_product_model_variants || []).map(v => `${v.storage_gb}GB`)
        ))].sort((a, b) => parseInt(a) - parseInt(b));
        const colors = [...new Set((devices || []).flatMap(d => 
          (d.device_product_model_variants || []).map(v => v.color)
        ))];
        
        // Calculate price range
        const allPrices = (devices || []).flatMap(d => 
          (d.device_product_model_variants || []).map(v => formatPrice(v.base_price_cents))
        );
        const minPrice = Math.min(...allPrices, 0);
        const maxPrice = Math.max(...allPrices, 2000);

        const filters = {
          categories: categories.length > 0 ? categories : ['Smartphone', 'Tablet', 'Smartwatch'],
          manufacturers: manufacturers.length > 0 ? manufacturers : ['Apple', 'Samsung', 'Google'],
          priceRange: [minPrice, maxPrice],
          storage: storage.length > 0 ? storage : ['64GB', '128GB', '256GB', '512GB', '1TB'],
          colors: colors.length > 0 ? colors : ['Black', 'White', 'Blue', 'Red', 'Purple']
        };

        return new Response(
          JSON.stringify(filters),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      case 'devices':
        const { filters: deviceFilters = {}, page = 1, limit = 12 } = params;

        // Query devices with variants
        let query = supabaseClient
          .from('device_product_models')
          .select(`
            *,
            device_product_model_variants(*)
          `)
          .eq('is_active', true)
          .is('deleted_at', null);

        const { data: deviceData, error: deviceError } = await query;
        
        if (deviceError) {
          console.error('Device query error:', deviceError);
          throw deviceError;
        }

        // Get GIGS device data for additional info
        const { data: gigsData } = await supabaseClient
          .from('gigs_device_models')
          .select('*');

        // Transform database data to frontend format
        let transformedDevices = (deviceData || []).map(device => {
          const gigsDevice = gigsData?.find(g => g.gigs_device_model_id === device.gigs_device_model_id);
          const variants = (device.device_product_model_variants || [])
            .filter(v => v.is_active)
            .map(v => ({
              id: v.id,
              color: v.color,
              storage: `${v.storage_gb}GB`,
              price: formatPrice(v.base_price_cents),
              stock_status: 'in_stock' // Default status, can be made dynamic later
            }));

          const basePrice = variants.length > 0 ? Math.min(...variants.map(v => v.price)) : 0;
          
          return {
            id: device.id,
            slug: createSlug(device.name),
            name: device.name,
            manufacturer: gigsDevice?.brand || 'Unknown',
            category: device.specs?.category || 'Smartphone',
            base_price: basePrice,
            images: device.specs?.images || [
              'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
            ],
            badge: device.specs?.badge || undefined,
            description: device.specs?.description || `Experience the latest technology with the ${device.name}.`,
            variants,
            specifications: device.specs?.specifications || [],
            features: device.specs?.features || []
          };
        });

        // Apply filters
        if (deviceFilters.categories?.length > 0) {
          transformedDevices = transformedDevices.filter(device => 
            deviceFilters.categories.includes(device.category)
          );
        }

        if (deviceFilters.manufacturers?.length > 0) {
          transformedDevices = transformedDevices.filter(device => 
            deviceFilters.manufacturers.includes(device.manufacturer)
          );
        }

        if (deviceFilters.priceRange) {
          const [minPrice, maxPrice] = deviceFilters.priceRange;
          transformedDevices = transformedDevices.filter(device => 
            device.base_price >= minPrice && device.base_price <= maxPrice
          );
        }

        if (deviceFilters.search) {
          const searchTerm = deviceFilters.search.toLowerCase();
          transformedDevices = transformedDevices.filter(device => 
            device.name.toLowerCase().includes(searchTerm) ||
            device.manufacturer.toLowerCase().includes(searchTerm)
          );
        }

        if (deviceFilters.storage?.length > 0) {
          transformedDevices = transformedDevices.filter(device => 
            device.variants.some(v => deviceFilters.storage.includes(v.storage))
          );
        }

        if (deviceFilters.colors?.length > 0) {
          transformedDevices = transformedDevices.filter(device => 
            device.variants.some(v => deviceFilters.colors.includes(v.color))
          );
        }

        // Apply sorting
        if (deviceFilters.sortBy) {
          switch (deviceFilters.sortBy) {
            case 'price-low':
              transformedDevices.sort((a, b) => a.base_price - b.base_price);
              break;
            case 'price-high':
              transformedDevices.sort((a, b) => b.base_price - a.base_price);
              break;
            case 'name':
              transformedDevices.sort((a, b) => a.name.localeCompare(b.name));
              break;
            case 'newest':
              // Keep current order (newest first)
              break;
            default: // featured
              // Keep current order
              break;
          }
        }

        // Pagination
        const startIndex = (page - 1) * limit;
        const paginatedDevices = transformedDevices.slice(startIndex, startIndex + limit);

        return new Response(
          JSON.stringify({
            devices: paginatedDevices,
            total: transformedDevices.length,
            page,
            totalPages: Math.ceil(transformedDevices.length / limit)
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      case 'device':
        const { slug } = params;
        
        // Get all devices and find by slug
        const { data: allDevices } = await supabaseClient
          .from('device_product_models')
          .select(`
            *,
            device_product_model_variants(*)
          `)
          .eq('is_active', true)
          .is('deleted_at', null);

        const { data: allGigsData } = await supabaseClient
          .from('gigs_device_models')
          .select('*');

        const deviceMatch = (allDevices || []).find(d => createSlug(d.name) === slug);
        
        if (!deviceMatch) {
          return new Response(
            JSON.stringify({ error: 'Device not found' }),
            { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const gigsDeviceMatch = allGigsData?.find(g => g.gigs_device_model_id === deviceMatch.gigs_device_model_id);
        const deviceVariants = (deviceMatch.device_product_model_variants || [])
          .filter(v => v.is_active)
          .map(v => ({
            id: v.id,
            color: v.color,
            storage: `${v.storage_gb}GB`,
            price: formatPrice(v.base_price_cents),
            stock_status: 'in_stock'
          }));

        const basePrice = deviceVariants.length > 0 ? Math.min(...deviceVariants.map(v => v.price)) : 0;

        const deviceDetail = {
          id: deviceMatch.id,
          slug: createSlug(deviceMatch.name),
          name: deviceMatch.name,
          manufacturer: gigsDeviceMatch?.brand || 'Unknown',
          category: deviceMatch.specs?.category || 'Smartphone',
          base_price: basePrice,
          images: deviceMatch.specs?.images || [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
          ],
          badge: deviceMatch.specs?.badge || undefined,
          description: deviceMatch.specs?.description || `Experience the latest technology with the ${deviceMatch.name}.`,
          variants: deviceVariants,
          specifications: deviceMatch.specs?.specifications || [
            {
              category: 'General',
              specs: [
                { name: 'Brand', value: gigsDeviceMatch?.brand || 'Unknown' },
                { name: 'Model', value: deviceMatch.name }
              ]
            }
          ],
          features: deviceMatch.specs?.features || [
            { name: 'Premium Quality', description: 'High-quality device with premium features', icon: '⭐' }
          ]
        };

        return new Response(
          JSON.stringify(deviceDetail),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      case 'plans':
        // Query plans with terms
        const { data: planData } = await supabaseClient
          .from('plan_product_models')
          .select(`
            *,
            plan_product_terms(*)
          `)
          .eq('is_active', true)
          .is('deleted_at', null);

        const transformedPlans = (planData || []).map(plan => {
          const terms = (plan.plan_product_terms || []).filter(t => t.is_active);
          const monthlyTerm = terms.find(t => t.term_length_months === 1);
          const yearlyTerm = terms.find(t => t.term_length_months === 12);
          
          return {
            id: plan.id,
            name: plan.name,
            description: `Perfect plan for your needs`,
            data_amount: 'Custom', // This should come from plan specs
            price_monthly: monthlyTerm ? formatPrice(monthlyTerm.monthly_price_cents) : 0,
            price_yearly: yearlyTerm ? formatPrice(yearlyTerm.monthly_price_cents * 12) : 0,
            features: ['5G Network', 'Mobile Hotspot', 'Unlimited Talk & Text'], // Default features
            is_unlimited: false // This should come from plan specs
          };
        });

        // If no plans in database, return empty array instead of mock data
        return new Response(
          JSON.stringify(transformedPlans),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid endpoint' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
