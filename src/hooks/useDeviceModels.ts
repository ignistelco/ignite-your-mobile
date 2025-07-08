import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useDeviceModels() {
  return useQuery({
    queryKey: ['device-models'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('device_product_models')
        .select('*')
        .eq('is_active', true)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}