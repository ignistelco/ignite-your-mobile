
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useAdminProfile() {
  return useQuery({
    queryKey: ['admin-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: role, error } = await supabase.rpc('get_my_role');
      if (error) throw error;
      if (!role) throw new Error('No admin role found');

      return {
        user,
        role,
      };
    },
    retry: false,
  });
}
