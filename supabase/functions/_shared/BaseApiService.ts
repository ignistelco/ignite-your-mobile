
import { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

export interface ApiServiceConfig {
  baseURL: string;
  timeout?: number;
  maxRetries?: number;
  retryDelay?: number;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  retryCondition?: (error: any) => boolean;
}

export abstract class BaseApiService {
  protected config: ApiServiceConfig;
  protected supabase: SupabaseClient;
  
  constructor(config: ApiServiceConfig, supabase: SupabaseClient) {
    this.config = {
      timeout: 30000,
      maxRetries: 3,
      retryDelay: 1000,
      ...config
    };
    this.supabase = supabase;
  }

  protected async makeRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    options: {
      data?: any;
      headers?: Record<string, string>;
      params?: Record<string, string>;
      idempotencyKey?: string;
      timeout?: number;
    } = {}
  ): Promise<ApiResponse<T>> {
    const url = new URL(endpoint, this.config.baseURL);
    
    // Add query parameters
    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    // Add idempotency key if provided
    if (options.idempotencyKey) {
      headers['Idempotency-Key'] = options.idempotencyKey;
    }

    const requestOptions: RequestInit = {
      method,
      headers,
      signal: AbortSignal.timeout(options.timeout || this.config.timeout!),
    };

    if (options.data && ['POST', 'PUT', 'PATCH'].includes(method)) {
      requestOptions.body = JSON.stringify(options.data);
    }

    return this.executeWithRetry(() => this.performRequest<T>(url.toString(), requestOptions));
  }

  private async performRequest<T>(url: string, options: RequestInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, options);
      
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      let data: T;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text() as T;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders
      };
    } catch (error) {
      console.error(`Request failed for ${url}:`, error);
      throw error;
    }
  }

  private async executeWithRetry<T>(
    operation: () => Promise<T>,
    retryConfig?: Partial<RetryConfig>
  ): Promise<T> {
    const config: RetryConfig = {
      maxRetries: this.config.maxRetries!,
      retryDelay: this.config.retryDelay!,
      retryCondition: (error) => this.shouldRetry(error),
      ...retryConfig
    };

    let lastError: any;
    
    for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        
        if (attempt === config.maxRetries || !config.retryCondition!(error)) {
          break;
        }
        
        console.warn(`Request attempt ${attempt + 1} failed, retrying in ${config.retryDelay}ms...`);
        await this.delay(config.retryDelay * Math.pow(2, attempt)); // Exponential backoff
      }
    }
    
    throw lastError;
  }

  private shouldRetry(error: any): boolean {
    // Retry on network errors, timeouts, and 5xx server errors
    if (error.name === 'AbortError' || error.name === 'TimeoutError') return true;
    if (error.message?.includes('fetch')) return true;
    if (error.message?.includes('HTTP 5')) return true;
    if (error.message?.includes('HTTP 429')) return true; // Rate limit
    return false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  protected async generateIdempotencyKey(operation: string, data?: any): Promise<string> {
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 15);
    const dataHash = data ? await this.hashData(JSON.stringify(data)) : '';
    return `${operation}-${timestamp}-${dataHash}-${randomSuffix}`;
  }

  private async hashData(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 8);
  }

  protected async storeIdempotencyKey(key: string, response: any): Promise<void> {
    try {
      await this.supabase.from('idempotency_keys').upsert({
        key,
        response_body: response,
        response_status_code: 200,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        request_method: 'POST',
        request_path: '/'
      });
    } catch (error) {
      console.warn('Failed to store idempotency key:', error);
    }
  }

  protected async getStoredResponse(key: string): Promise<any | null> {
    try {
      const { data } = await this.supabase
        .from('idempotency_keys')
        .select('response_body')
        .eq('key', key)
        .gt('expires_at', new Date().toISOString())
        .single();
      
      return data?.response_body || null;
    } catch {
      return null;
    }
  }
}
