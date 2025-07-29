import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useShopFilters() {
  return useQuery({
    queryKey: ['shop-filters'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('public-api', {
        body: { 
          endpoint: 'filters'
        }
      });

      if (error) throw error;
      return data;
    },
  });
}