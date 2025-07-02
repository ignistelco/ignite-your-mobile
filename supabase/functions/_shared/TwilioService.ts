
import { BaseApiService, ApiServiceConfig } from './BaseApiService.ts';
import { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

export interface SMSMessage {
  to: string;
  from: string;
  body: string;
  mediaUrl?: string[];
  statusCallback?: string;
  maxPrice?: string;
  validityPeriod?: number;
}

export class TwilioService extends BaseApiService {
  private accountSid: string;
  private authToken: string;

  constructor(supabase: SupabaseClient) {
    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    
    if (!accountSid || !authToken) {
      throw new Error('TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN environment variables must be set');
    }

    const config: ApiServiceConfig = {
      baseURL: `https://api.twilio.com/2010-04-01/Accounts/${accountSid}`,
      timeout: 30000,
      maxRetries: 3,
      retryDelay: 1000
    };
    
    super(config, supabase);
    this.accountSid = accountSid;
    this.authToken = authToken;
  }

  private getAuthHeaders(): Record<string, string> {
    const credentials = btoa(`${this.accountSid}:${this.authToken}`);
    return {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
  }

  private formatFormData(data: Record<string, any>): string {
    const formData = new URLSearchParams();
    
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        value.forEach(item => formData.append(key, item));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    }
    
    return formData.toString();
  }

  async sendSMS(messageData: SMSMessage, idempotencyKey?: string): Promise<any> {
    const key = idempotencyKey || await this.generateIdempotencyKey('send-sms', messageData);
    
    // Check for existing response
    const existingResponse = await this.getStoredResponse(key);
    if (existingResponse) {
      return existingResponse;
    }

    const requestData = {
      To: messageData.to,
      From: messageData.from,
      Body: messageData.body,
      MediaUrl: messageData.mediaUrl,
      StatusCallback: messageData.statusCallback,
      MaxPrice: messageData.maxPrice,
      ValidityPeriod: messageData.validityPeriod
    };

    try {
      const response = await this.makeRequest('POST', '/Messages.json', {
        data: this.formatFormData(requestData),
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        idempotencyKey: key
      });

      await this.storeIdempotencyKey(key, response.data);
      
      // Store in our database for tracking
      await this.storeSMSRecord(messageData, response.data);
      
      return response.data;
    } catch (error) {
      // Store failed SMS attempt
      await this.storeSMSRecord(messageData, null, error.message);
      throw error;
    }
  }

  private async storeSMSRecord(messageData: SMSMessage, response: any, errorMessage?: string): Promise<void> {
    try {
      await this.supabase.from('twilio_sent_messages').insert({
        to_number: messageData.to,
        from_number: messageData.from,
        body: messageData.body,
        status: response ? 'sent' : 'failed',
        twilio_sid: response?.sid || null,
        error_message: errorMessage || null
      });
    } catch (error) {
      console.warn('Failed to store SMS record:', error);
    }
  }

  async getMessageStatus(messageSid: string): Promise<any> {
    const response = await this.makeRequest('GET', `/Messages/${messageSid}.json`, {
      headers: this.getAuthHeaders()
    });

    return response.data;
  }

  async getMessages(options: {
    to?: string;
    from?: string;
    dateSent?: string;
    pageSize?: number;
  } = {}): Promise<any> {
    const params: Record<string, string> = {};
    
    if (options.to) params.To = options.to;
    if (options.from) params.From = options.from;
    if (options.dateSent) params.DateSent = options.dateSent;
    if (options.pageSize) params.PageSize = options.pageSize.toString();

    const response = await this.makeRequest('GET', '/Messages.json', {
      headers: this.getAuthHeaders(),
      params
    });

    return response.data;
  }

  async validatePhoneNumber(phoneNumber: string): Promise<any> {
    const response = await this.makeRequest('GET', `/PhoneNumbers/${encodeURIComponent(phoneNumber)}.json`, {
      headers: this.getAuthHeaders()
    });

    return response.data;
  }
}
