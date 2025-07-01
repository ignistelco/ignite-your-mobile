
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useNewProducts() {
  return useQuery({
    queryKey: ['new-products'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('products');
      
      if (error) throw error;
      return data.products;
    },
  });
}
