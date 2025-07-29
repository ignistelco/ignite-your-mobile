import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useShopPlans() {
  return useQuery({
    queryKey: ['shop-plans'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('public-api', {
        body: { 
          endpoint: 'plans'
        }
      });

      if (error) throw error;
      return data;
    },
  });
}