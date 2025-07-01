
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useNewProductPlans() {
  return useQuery({
    queryKey: ['new-product-plans'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('plans');
      
      if (error) throw error;
      return data.plans;
    },
  });
}
