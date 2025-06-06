
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { ProductPlan } from '@/types/database';

export function useProductPlans() {
  return useQuery({
    queryKey: ['product-plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_plans')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ProductPlan[];
    },
  });
}

export function useProductPlan(id: string) {
  return useQuery({
    queryKey: ['product-plan', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_plans')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as ProductPlan;
    },
    enabled: !!id,
  });
}

export function useCreateProductPlan() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (plan: Omit<ProductPlan, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('product_plans')
        .insert(plan)
        .select()
        .single();
      
      if (error) throw error;
      return data as ProductPlan;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-plans'] });
    },
  });
}

export function useUpdateProductPlan() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ProductPlan> & { id: string }) => {
      const { data, error } = await supabase
        .from('product_plans')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as ProductPlan;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['product-plans'] });
      queryClient.invalidateQueries({ queryKey: ['product-plan', data.id] });
    },
  });
}
