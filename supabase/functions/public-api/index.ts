import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

// Mock data for development
const mockFilters = {
  categories: ['Smartphone', 'Tablet', 'Smartwatch', 'Earbuds', 'Accessories'],
  manufacturers: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi'],
  priceRange: [0, 2000],
  storage: ['64GB', '128GB', '256GB', '512GB', '1TB'],
  colors: ['Black', 'White', 'Blue', 'Red', 'Purple', 'Green', 'Gold']
};

const mockDevices = [
  {
    id: '1',
    slug: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    manufacturer: 'Apple',
    category: 'Smartphone',
    base_price: 999,
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
    ],
    badge: 'New',
    description: 'The most Pro iPhone ever, featuring titanium design and the powerful A17 Pro chip.',
    variants: [
      { id: '1-1', color: 'Black', storage: '128GB', price: 999, stock_status: 'in_stock' },
      { id: '1-2', color: 'Black', storage: '256GB', price: 1099, stock_status: 'in_stock' },
      { id: '1-3', color: 'White', storage: '128GB', price: 999, stock_status: 'low_stock' },
      { id: '1-4', color: 'Blue', storage: '512GB', price: 1299, stock_status: 'in_stock' }
    ],
    specifications: [
      {
        category: 'Display',
        specs: [
          { name: 'Screen Size', value: '6.1 inches' },
          { name: 'Resolution', value: '2556 x 1179 pixels' },
          { name: 'Technology', value: 'Super Retina XDR OLED' }
        ]
      },
      {
        category: 'Performance',
        specs: [
          { name: 'Chip', value: 'A17 Pro' },
          { name: 'RAM', value: '8GB' },
          { name: 'CPU', value: '6-core CPU with 2 performance and 4 efficiency cores' }
        ]
      }
    ],
    features: [
      { name: 'Pro Camera System', description: '48MP Main | 12MP Ultra Wide | 12MP Telephoto', icon: '📸' },
      { name: 'Action Button', description: 'Customizable button for quick actions', icon: '🔘' },
      { name: 'USB-C', description: 'Universal connectivity with USB-C', icon: '🔌' },
      { name: 'Titanium Design', description: 'Strong and lightweight titanium build', icon: '✨' }
    ]
  },
  {
    id: '2',
    slug: 'galaxy-s24-ultra',
    name: 'Galaxy S24 Ultra',
    manufacturer: 'Samsung',
    category: 'Smartphone',
    base_price: 1199,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500'
    ],
    badge: 'Popular',
    description: 'The ultimate Galaxy experience with S Pen, incredible cameras, and AI features.',
    variants: [
      { id: '2-1', color: 'Black', storage: '256GB', price: 1199, stock_status: 'in_stock' },
      { id: '2-2', color: 'Purple', storage: '512GB', price: 1399, stock_status: 'in_stock' }
    ],
    specifications: [
      {
        category: 'Display',
        specs: [
          { name: 'Screen Size', value: '6.8 inches' },
          { name: 'Resolution', value: '3120 x 1440 pixels' },
          { name: 'Technology', value: 'Dynamic AMOLED 2X' }
        ]
      }
    ],
    features: [
      { name: 'S Pen Included', description: 'Built-in S Pen for productivity and creativity', icon: '✏️' },
      { name: '200MP Camera', description: 'Industry-leading camera system', icon: '📷' }
    ]
  },
  {
    id: '3',
    slug: 'pixel-8-pro',
    name: 'Pixel 8 Pro',
    manufacturer: 'Google',
    category: 'Smartphone',
    base_price: 899,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
    ],
    description: 'Google AI, Pixel camera magic, and helpful features in every photo.',
    variants: [
      { id: '3-1', color: 'Blue', storage: '128GB', price: 899, stock_status: 'in_stock' },
      { id: '3-2', color: 'White', storage: '256GB', price: 999, stock_status: 'out_of_stock' }
    ],
    specifications: [],
    features: [
      { name: 'Magic Eraser', description: 'Remove unwanted objects from photos', icon: '🪄' },
      { name: 'Call Screen', description: 'Google Assistant answers spam calls', icon: '📞' }
    ]
  }
];

const mockPlans = [
  {
    id: '1',
    name: 'Essential',
    description: 'Perfect for light users',
    data_amount: '10GB',
    price_monthly: 25,
    price_yearly: 250,
    features: ['5G Network', 'Mobile Hotspot', 'Unlimited Talk & Text'],
    is_unlimited: false
  },
  {
    id: '2',
    name: 'Unlimited Pro',
    description: 'Most popular plan',
    data_amount: 'Unlimited',
    price_monthly: 55,
    price_yearly: 550,
    features: ['5G Ultra Wideband', 'Premium Mobile Hotspot', 'International Roaming'],
    is_unlimited: true,
    is_popular: true
  },
  {
    id: '3',
    name: 'Unlimited Max',
    description: 'For power users',
    data_amount: 'Unlimited',
    price_monthly: 75,
    price_yearly: 750,
    features: ['Priority 5G', '100GB Premium Hotspot', 'Global Roaming', 'Premium Streaming'],
    is_unlimited: true
  }
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { endpoint, ...params } = await req.json();

    switch (endpoint) {
      case 'filters':
        return new Response(
          JSON.stringify(mockFilters),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      case 'devices':
        const { filters = {}, page = 1, limit = 12 } = params;
        let filteredDevices = [...mockDevices];

        // Apply filters
        if (filters.categories?.length > 0) {
          filteredDevices = filteredDevices.filter(device => 
            filters.categories.includes(device.category)
          );
        }

        if (filters.manufacturers?.length > 0) {
          filteredDevices = filteredDevices.filter(device => 
            filters.manufacturers.includes(device.manufacturer)
          );
        }

        if (filters.priceRange) {
          const [minPrice, maxPrice] = filters.priceRange;
          filteredDevices = filteredDevices.filter(device => 
            device.base_price >= minPrice && device.base_price <= maxPrice
          );
        }

        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          filteredDevices = filteredDevices.filter(device => 
            device.name.toLowerCase().includes(searchTerm) ||
            device.manufacturer.toLowerCase().includes(searchTerm)
          );
        }

        // Apply sorting
        if (filters.sortBy) {
          switch (filters.sortBy) {
            case 'price-low':
              filteredDevices.sort((a, b) => a.base_price - b.base_price);
              break;
            case 'price-high':
              filteredDevices.sort((a, b) => b.base_price - a.base_price);
              break;
            case 'name':
              filteredDevices.sort((a, b) => a.name.localeCompare(b.name));
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
        const paginatedDevices = filteredDevices.slice(startIndex, startIndex + limit);

        return new Response(
          JSON.stringify({
            devices: paginatedDevices,
            total: filteredDevices.length,
            page,
            totalPages: Math.ceil(filteredDevices.length / limit)
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      case 'device':
        const { slug } = params;
        const device = mockDevices.find(d => d.slug === slug);
        
        if (!device) {
          return new Response(
            JSON.stringify({ error: 'Device not found' }),
            { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify(device),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      case 'plans':
        return new Response(
          JSON.stringify(mockPlans),
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
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
