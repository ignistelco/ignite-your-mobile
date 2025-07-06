
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useGigsDeviceModels() {
  return useQuery({
    queryKey: ['gigs-device-models'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gigs_device_models')
        .select('*')
        .order('brand', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });
}
