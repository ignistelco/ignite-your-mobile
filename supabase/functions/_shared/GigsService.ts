
import { BaseApiService, ApiServiceConfig } from './BaseApiService.ts';
import { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

export interface GigsUser {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
}

export interface GigsAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface GigsSubscriptionRequest {
  userId: string;
  planId: string;
  deviceId?: string;
  simId?: string;
  addressId?: string;
}

export interface GigsDevice {
  imei: string;
  modelId: string;
  name?: string;
}

export class GigsService extends BaseApiService {
  constructor(supabase: SupabaseClient) {
    const config: ApiServiceConfig = {
      baseURL: 'https://api.gigs.com/v1',
      timeout: 30000,
      maxRetries: 3,
      retryDelay: 1000
    };
    super(config, supabase);
  }

  private getAuthHeaders(): Record<string, string> {
    const apiKey = Deno.env.get('GIGS_API_KEY');
    if (!apiKey) {
      throw new Error('GIGS_API_KEY environment variable is not set');
    }
    
    return {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  async createUser(userData: GigsUser, idempotencyKey?: string): Promise<any> {
    const key = idempotencyKey || await this.generateIdempotencyKey('create-user', userData);
    
    // Check for existing response
    const existingResponse = await this.getStoredResponse(key);
    if (existingResponse) {
      return existingResponse;
    }

    const response = await this.makeRequest('POST', '/users', {
      data: {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        dateOfBirth: userData.dateOfBirth
      },
      headers: this.getAuthHeaders(),
      idempotencyKey: key
    });

    await this.storeIdempotencyKey(key, response.data);
    return response.data;
  }

  async createAddress(userId: string, addressData: GigsAddress, idempotencyKey?: string): Promise<any> {
    const key = idempotencyKey || await this.generateIdempotencyKey('create-address', { userId, ...addressData });
    
    const existingResponse = await this.getStoredResponse(key);
    if (existingResponse) {
      return existingResponse;
    }

    const response = await this.makeRequest('POST', `/users/${userId}/addresses`, {
      data: addressData,
      headers: this.getAuthHeaders(),
      idempotencyKey: key
    });

    await this.storeIdempotencyKey(key, response.data);
    return response.data;
  }

  async createDevice(deviceData: GigsDevice, idempotencyKey?: string): Promise<any> {
    const key = idempotencyKey || await this.generateIdempotencyKey('create-device', deviceData);
    
    const existingResponse = await this.getStoredResponse(key);
    if (existingResponse) {
      return existingResponse;
    }

    const response = await this.makeRequest('POST', '/devices', {
      data: {
        imei: deviceData.imei,
        deviceModelId: deviceData.modelId,
        name: deviceData.name
      },
      headers: this.getAuthHeaders(),
      idempotencyKey: key
    });

    await this.storeIdempotencyKey(key, response.data);
    return response.data;
  }

  async createSubscription(subscriptionData: GigsSubscriptionRequest, idempotencyKey?: string): Promise<any> {
    const key = idempotencyKey || await this.generateIdempotencyKey('create-subscription', subscriptionData);
    
    const existingResponse = await this.getStoredResponse(key);
    if (existingResponse) {
      return existingResponse;
    }

    const response = await this.makeRequest('POST', '/subscriptions', {
      data: {
        userId: subscriptionData.userId,
        planId: subscriptionData.planId,
        deviceId: subscriptionData.deviceId,
        simId: subscriptionData.simId,
        addressId: subscriptionData.addressId
      },
      headers: this.getAuthHeaders(),
      idempotencyKey: key
    });

    await this.storeIdempotencyKey(key, response.data);
    return response.data;
  }

  async getSubscription(subscriptionId: string): Promise<any> {
    const response = await this.makeRequest('GET', `/subscriptions/${subscriptionId}`, {
      headers: this.getAuthHeaders()
    });

    return response.data;
  }

  async updateSubscription(subscriptionId: string, updateData: any, idempotencyKey?: string): Promise<any> {
    const key = idempotencyKey || await this.generateIdempotencyKey('update-subscription', { subscriptionId, ...updateData });
    
    const response = await this.makeRequest('PATCH', `/subscriptions/${subscriptionId}`, {
      data: updateData,
      headers: this.getAuthHeaders(),
      idempotencyKey: key
    });

    return response.data;
  }

  async getPlans(): Promise<any> {
    const response = await this.makeRequest('GET', '/plans', {
      headers: this.getAuthHeaders()
    });

    return response.data;
  }

  async getDeviceModels(): Promise<any> {
    const response = await this.makeRequest('GET', '/device-models', {
      headers: this.getAuthHeaders()
    });

    return response.data;
  }

  async portNumber(subscriptionId: string, portingData: any, idempotencyKey?: string): Promise<any> {
    const key = idempotencyKey || await this.generateIdempotencyKey('port-number', { subscriptionId, ...portingData });
    
    const response = await this.makeRequest('POST', `/subscriptions/${subscriptionId}/port`, {
      data: portingData,
      headers: this.getAuthHeaders(),
      idempotencyKey: key
    });

    return response.data;
  }
}
