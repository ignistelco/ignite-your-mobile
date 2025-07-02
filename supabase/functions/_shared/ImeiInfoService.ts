
import { BaseApiService, ApiServiceConfig } from './BaseApiService.ts';
import { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

export interface IMEICheckResult {
  imei: string;
  isValid: boolean;
  deviceInfo?: {
    brand: string;
    model: string;
    device: string;
    marketName?: string;
  };
  status?: {
    isBlacklisted: boolean;
    isStolen: boolean;
    carrierInfo?: string[];
  };
  technicalInfo?: {
    tac: string;
    country: string;
    manufacturer: string;
    bands?: string[];
    networkTechnology?: string[];
  };
  error?: string;
}

export class ImeiInfoService extends BaseApiService {
  constructor(supabase: SupabaseClient) {
    const config: ApiServiceConfig = {
      baseURL: 'https://imei-api.com/api',
      timeout: 15000,
      maxRetries: 2,
      retryDelay: 1000
    };
    super(config, supabase);
  }

  private getAuthHeaders(): Record<string, string> {
    const apiKey = Deno.env.get('IMEI_INFO_API_KEY');
    if (!apiKey) {
      throw new Error('IMEI_INFO_API_KEY environment variable is not set');
    }
    
    return {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  async checkIMEI(imei: string, idempotencyKey?: string): Promise<IMEICheckResult> {
    // Basic IMEI validation
    if (!this.isValidIMEIFormat(imei)) {
      return {
        imei,
        isValid: false,
        error: 'Invalid IMEI format'
      };
    }

    const key = idempotencyKey || await this.generateIdempotencyKey('check-imei', { imei });
    
    // Check for existing response
    const existingResponse = await this.getStoredResponse(key);
    if (existingResponse) {
      return existingResponse;
    }

    try {
      const response = await this.makeRequest('GET', '/check', {
        params: {
          imei: imei,
          format: 'json'
        },
        headers: this.getAuthHeaders()
      });

      const result: IMEICheckResult = {
        imei,
        isValid: true,
        deviceInfo: {
          brand: response.data.brand || 'Unknown',
          model: response.data.model || 'Unknown',
          device: response.data.device || 'Unknown',
          marketName: response.data.marketName
        },
        status: {
          isBlacklisted: response.data.blacklisted === 'Yes',
          isStolen: response.data.stolen === 'Yes',
          carrierInfo: response.data.carriers || []
        },
        technicalInfo: {
          tac: response.data.tac,
          country: response.data.country || 'Unknown',
          manufacturer: response.data.manufacturer || 'Unknown',
          bands: response.data.bands || [],
          networkTechnology: response.data.technology || []
        }
      };

      await this.storeIdempotencyKey(key, result);
      await this.storeIMEICheck(result);
      
      return result;
    } catch (error) {
      console.error('IMEI check failed:', error);
      
      const fallbackResult: IMEICheckResult = {
        imei,
        isValid: this.validateIMEIChecksum(imei),
        error: `API check failed: ${error.message}`,
        deviceInfo: {
          brand: 'Unknown',
          model: 'Unknown',
          device: 'Unknown'
        }
      };

      await this.storeIMEICheck(fallbackResult);
      return fallbackResult;
    }
  }

  private isValidIMEIFormat(imei: string): boolean {
    // IMEI should be 15 digits
    const cleanImei = imei.replace(/\D/g, '');
    return cleanImei.length === 15 && /^\d{15}$/.test(cleanImei);
  }

  private validateIMEIChecksum(imei: string): boolean {
    const cleanImei = imei.replace(/\D/g, '');
    if (cleanImei.length !== 15) return false;

    // Luhn algorithm for IMEI validation
    let sum = 0;
    let alternate = false;
    
    for (let i = cleanImei.length - 2; i >= 0; i--) {
      let digit = parseInt(cleanImei.charAt(i));
      
      if (alternate) {
        digit *= 2;
        if (digit > 9) {
          digit = Math.floor(digit / 10) + (digit % 10);
        }
      }
      
      sum += digit;
      alternate = !alternate;
    }
    
    const checkDigit = (10 - (sum % 10)) % 10;
    return checkDigit === parseInt(cleanImei.charAt(14));
  }

  private async storeIMEICheck(result: IMEICheckResult): Promise<void> {
    try {
      // Store in user_devices or a dedicated imei_checks table if it exists
      const deviceData = {
        imei: result.imei,
        imei_check_snapshot: {
          checked_at: new Date().toISOString(),
          is_valid: result.isValid,
          device_info: result.deviceInfo,
          status: result.status,
          technical_info: result.technicalInfo,
          error: result.error
        }
      };

      // Try to update existing device record first
      const { error: updateError } = await this.supabase
        .from('user_devices')
        .update({ imei_check_snapshot: deviceData.imei_check_snapshot })
        .eq('imei', result.imei);

      if (updateError) {
        console.warn('Could not update existing device IMEI check:', updateError);
      }
    } catch (error) {
      console.warn('Failed to store IMEI check result:', error);
    }
  }

  async getBulkIMEIInfo(imeis: string[]): Promise<IMEICheckResult[]> {
    const results: IMEICheckResult[] = [];
    
    // Process in batches to avoid rate limiting
    const batchSize = 5;
    for (let i = 0; i < imeis.length; i += batchSize) {
      const batch = imeis.slice(i, i + batchSize);
      const batchPromises = batch.map(imei => this.checkIMEI(imei));
      
      try {
        const batchResults = await Promise.allSettled(batchPromises);
        batchResults.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            results.push(result.value);
          } else {
            results.push({
              imei: batch[index],
              isValid: false,
              error: `Batch check failed: ${result.reason}`
            });
          }
        });
        
        // Rate limiting delay between batches
        if (i + batchSize < imeis.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`Batch IMEI check failed for batch starting at index ${i}:`, error);
        // Add error results for failed batch
        batch.forEach(imei => {
          results.push({
            imei,
            isValid: false,
            error: `Batch processing failed: ${error.message}`
          });
        });
      }
    }
    
    return results;
  }
}
