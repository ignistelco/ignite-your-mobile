
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

// Use the correct table name and Supabase-generated types
type PlanProductModel = Database['public']['Tables']['plan_product_models']['Row'];
type PlanProductModelInsert = Database['public']['Tables']['plan_product_models']['Insert'];

export function useProductPlans() {
  return useQuery({
    queryKey: ['product-plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plan_product_models')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
}

export function useProductPlan(id: string) {
  return useQuery({
    queryKey: ['product-plan', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plan_product_models')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

export function useCreateProductPlan() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (plan: PlanProductModelInsert) => {
      const { data, error } = await supabase
        .from('plan_product_models')
        .insert(plan)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-plans'] });
    },
  });
}

export function useUpdateProductPlan() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<PlanProductModel> & { id: string }) => {
      const { data, error } = await supabase
        .from('plan_product_models')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['product-plans'] });
      queryClient.invalidateQueries({ queryKey: ['product-plan', data.id] });
    },
  });
}
