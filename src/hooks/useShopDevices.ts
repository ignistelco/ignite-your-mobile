import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface DeviceFilters {
  categories?: string[];
  manufacturers?: string[];
  colors?: string[];
  storage?: string[];
  priceRange?: [number, number];
  search?: string;
  page?: number;
  limit?: number;
}

export function useShopDevices(filters: DeviceFilters = {}) {
  return useQuery({
    queryKey: ['shop-devices', filters],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('public-api', {
        body: { 
          endpoint: 'devices',
          filters
        }
      });

      if (error) throw error;
      return data;
    },
  });
}