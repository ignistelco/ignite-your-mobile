
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface CheckoutData {
  userId: string;
  lineItems: Array<{
    type: 'plan' | 'variant';
    id: string;
    quantity?: number;
  }>;
  voucherCode?: string;
}

export function useCheckout() {
  return useMutation({
    mutationFn: async (checkoutData: CheckoutData) => {
      const { data, error } = await supabase.functions.invoke('checkout-sessions', {
        body: checkoutData,
      });
      
      if (error) throw error;
      return data;
    },
  });
}
