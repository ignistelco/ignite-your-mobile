import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useShopDevice(slug: string) {
  return useQuery({
    queryKey: ['shop-device', slug],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('public-api', {
        body: { 
          endpoint: 'device',
          slug
        }
      });

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
}