
import { BaseApiService, ApiServiceConfig } from './BaseApiService.ts';
import { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

export interface StripeCustomer {
  email: string;
  name?: string;
  phone?: string;
  metadata?: Record<string, string>;
}

export interface StripePaymentIntent {
  amount: number;
  currency: string;
  customerId?: string;
  metadata?: Record<string, string>;
  automaticPaymentMethods?: {
    enabled: boolean;
  };
}

export interface StripeCheckoutSession {
  customerId?: string;
  customerEmail?: string;
  lineItems: Array<{
    price?: string;
    priceData?: {
      currency: string;
      productData: {
        name: string;
        description?: string;
      };
      unitAmount: number;
      recurring?: {
        interval: 'month' | 'year';
      };
    };
    quantity: number;
  }>;
  mode: 'payment' | 'subscription' | 'setup';
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export class StripeService extends BaseApiService {
  constructor(supabase: SupabaseClient) {
    const config: ApiServiceConfig = {
      baseURL: 'https://api.stripe.com/v1',
      timeout: 30000,
      maxRetries: 3,
      retryDelay: 1000
    };
    super(config, supabase);
  }

  private getAuthHeaders(): Record<string, string> {
    const secretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY environment variable is not set');
    }
    
    return {
      'Authorization': `Bearer ${secretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
  }

  private formatFormData(data: Record<string, any>): string {
    const formData = new URLSearchParams();
    
    const addToFormData = (obj: any, prefix = '') => {
      for (const [key, value] of Object.entries(obj)) {
        const formKey = prefix ? `${prefix}[${key}]` : key;
        
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          addToFormData(value, formKey);
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (typeof item === 'object') {
              addToFormData(item, `${formKey}[${index}]`);
            } else {
              formData.append(`${formKey}[${index}]`, item);
            }
          });
        } else if (value !== undefined && value !== null) {
          formData.append(formKey, value.toString());
        }
      }
    };
    
    addToFormData(data);
    return formData.toString();
  }

  async createCustomer(customerData: StripeCustomer, idempotencyKey?: string): Promise<any> {
    const key = idempotencyKey || await this.generateIdempotencyKey('create-customer', customerData);
    
    const existingResponse = await this.getStoredResponse(key);
    if (existingResponse) {
      return existingResponse;
    }

    const response = await this.makeRequest('POST', '/customers', {
      data: this.formatFormData(customerData),
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      idempotencyKey: key
    });

    await this.storeIdempotencyKey(key, response.data);
    return response.data;
  }

  async createPaymentIntent(paymentData: StripePaymentIntent, idempotencyKey?: string): Promise<any> {
    const key = idempotencyKey || await this.generateIdempotencyKey('create-payment-intent', paymentData);
    
    const existingResponse = await this.getStoredResponse(key);
    if (existingResponse) {
      return existingResponse;
    }

    const requestData = {
      amount: paymentData.amount,
      currency: paymentData.currency,
      customer: paymentData.customerId,
      metadata: paymentData.metadata,
      automatic_payment_methods: paymentData.automaticPaymentMethods
    };

    const response = await this.makeRequest('POST', '/payment_intents', {
      data: this.formatFormData(requestData),
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      idempotencyKey: key
    });

    await this.storeIdempotencyKey(key, response.data);
    return response.data;
  }

  async createCheckoutSession(sessionData: StripeCheckoutSession, idempotencyKey?: string): Promise<any> {
    const key = idempotencyKey || await this.generateIdempotencyKey('create-checkout-session', sessionData);
    
    const existingResponse = await this.getStoredResponse(key);
    if (existingResponse) {
      return existingResponse;
    }

    const requestData = {
      customer: sessionData.customerId,
      customer_email: sessionData.customerEmail,
      line_items: sessionData.lineItems.map(item => ({
        price: item.price,
        price_data: item.priceData ? {
          currency: item.priceData.currency,
          product_data: item.priceData.productData,
          unit_amount: item.priceData.unitAmount,
          recurring: item.priceData.recurring
        } : undefined,
        quantity: item.quantity
      })),
      mode: sessionData.mode,
      success_url: sessionData.successUrl,
      cancel_url: sessionData.cancelUrl,
      metadata: sessionData.metadata
    };

    const response = await this.makeRequest('POST', '/checkout/sessions', {
      data: this.formatFormData(requestData),
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      idempotencyKey: key
    });

    await this.storeIdempotencyKey(key, response.data);
    return response.data;
  }

  async retrieveCustomer(customerId: string): Promise<any> {
    const response = await this.makeRequest('GET', `/customers/${customerId}`, {
      headers: this.getAuthHeaders()
    });

    return response.data;
  }

  async retrievePaymentIntent(paymentIntentId: string): Promise<any> {
    const response = await this.makeRequest('GET', `/payment_intents/${paymentIntentId}`, {
      headers: this.getAuthHeaders()
    });

    return response.data;
  }

  async retrieveCheckoutSession(sessionId: string): Promise<any> {
    const response = await this.makeRequest('GET', `/checkout/sessions/${sessionId}`, {
      headers: this.getAuthHeaders()
    });

    return response.data;
  }

  async createRefund(paymentIntentId: string, amount?: number, idempotencyKey?: string): Promise<any> {
    const key = idempotencyKey || await this.generateIdempotencyKey('create-refund', { paymentIntentId, amount });
    
    const requestData: any = {
      payment_intent: paymentIntentId
    };
    
    if (amount) {
      requestData.amount = amount;
    }

    const response = await this.makeRequest('POST', '/refunds', {
      data: this.formatFormData(requestData),
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      idempotencyKey: key
    });

    return response.data;
  }

  async createPrice(priceData: {
    currency: string;
    unitAmount: number;
    productId: string;
    recurring?: {
      interval: 'month' | 'year';
    };
  }, idempotencyKey?: string): Promise<any> {
    const key = idempotencyKey || await this.generateIdempotencyKey('create-price', priceData);
    
    const requestData = {
      currency: priceData.currency,
      unit_amount: priceData.unitAmount,
      product: priceData.productId,
      recurring: priceData.recurring
    };

    const response = await this.makeRequest('POST', '/prices', {
      data: this.formatFormData(requestData),
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      idempotencyKey: key
    });

    return response.data;
  }
}
