
export interface User {
  id: string;
  gigs_user_id?: string;
  email: string;
  full_name?: string;
  birthday?: string;
  preferred_locale?: string;
  square_customer_id?: string;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface AdminUser {
  id: string;
  user_id: string;
  role: string;
  permissions?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface Address {
  id: string;
  user_id: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postal_code?: string;
  country: string;
  created_at?: string;
  updated_at?: string;
}

export interface GigsDeviceModel {
  id: string;
  brand: string;
  name: string;
  sim_types: string[];
  type: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductDeviceModel {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  price_amount?: number;
  price_currency?: string;
  display_size_inches?: number;
  display_resolution?: string;
  network_technology?: string[];
  bluetooth_version?: string;
  nfc_supported?: boolean;
  usb_type?: string;
  sensors?: string[];
  processor?: string;
  battery_description?: string;
  front_camera_mp?: number;
  rear_camera_mp?: number;
  sim_card_ports?: number;
  sim_card_type?: string[];
  android_version?: string;
  storage_gb?: number;
  ram_gb?: number;
  color?: string;
  standby_time_hours?: number;
  gigs_device_model_id?: string;
  is_e_sim_compatible: boolean;
  is_p_sim_compatible: boolean;
  is_active: boolean;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface UserDevice {
  id: string;
  user_id?: string;
  product_device_model_id: string;
  imei?: string;
  name?: string;
  is_assigned?: boolean;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface GigsSim {
  id: string;
  iccid?: string;
  type: string;
  provider: string;
  status: string;
  e_sim_activation_code?: string;
  e_sim_qr_code_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GigsPlan {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  price_amount: number;
  price_currency: string;
  provider: string;
  sim_types: string[];
  status: string;
  data_allowance_bytes?: number;
  voice_allowance_seconds?: number;
  sms_allowance_messages?: number;
  coverage_countries?: string[];
  validity_type?: string;
  validity_unit?: string;
  validity_value?: number;
  requirements_address: string;
  requirements_device: string;
  requirements_user_birthday: string;
  requirements_user_full_name: string;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

// Updated to match actual database schema - using 'id' not 'product_id'
export interface ProductPlan {
  id: string;
  name: string;
  tagline?: string;
  features?: string[];
  is_active: boolean;
  gigs_plan_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GigsAddon {
  id: string;
  name: string;
  description?: string;
  price_amount: number;
  price_currency: string;
  provider: string;
  status: string;
  addon_type: string;
  data_allowance_bytes?: number;
  voice_allowance_seconds?: number;
  sms_allowance_messages?: number;
  validity_type?: string;
  validity_unit?: string;
  validity_value?: number;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface ProductAddon {
  id: string;
  name: string;
  description?: string;
  custom_price_amount?: number;
  custom_price_currency?: string;
  is_active: boolean;
  gigs_addon_id?: string;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface Voucher {
  id: string;
  code: string;
  description?: string;
  discount_type: string;
  discount_value: number;
  min_purchase_amount?: number;
  max_discount_amount?: number;
  usage_limit?: number;
  usage_count?: number;
  is_active: boolean;
  valid_from?: string;
  valid_until?: string;
  applicable_plans?: string[];
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface Quote {
  id: string;
  user_id: string;
  product_plan_id?: string;
  product_addon_ids?: string[];
  voucher_id?: string;
  subtotal_amount: number;
  discount_amount?: number;
  tax_amount?: number;
  total_amount: number;
  currency: string;
  expires_at: string;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

// Updated to match actual database schema - using 'id' not 'order_id'
export interface Order {
  id: string;
  user_id: string;
  cart_id?: string;
  purchased_plan_product_id: string;
  purchased_device_product_id?: string;
  purchased_device_variant_id?: string;
  purchased_plan_term_months?: number;
  purchased_addon_product_ids?: string[];
  voucher_id?: string;
  gigs_subscription_id?: string;
  stripe_payment_intent_id?: string;
  stripe_charge_id?: string;
  status: string;
  total_amount_cents: number;
  currency: string;
  shipping_address_snapshot: Record<string, any>;
  contact_info_snapshot: Record<string, any>;
  imei_snapshot?: string;
  gigs_device_id_snapshot?: string;
  port_number_snapshot?: string;
  new_number_snapshot?: string;
  gigs_porting_id?: string;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface Subscription {
  id: string;
  gigs_subscription_id: string;
  user_id: string;
  order_id?: string;
  product_plan_id?: string;
  gigs_plan_id?: string;
  gigs_sim_id?: string;
  user_device_id?: string;
  status: string;
  activated_at?: string;
  expires_at?: string;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface Invoice {
  id: string;
  gigs_invoice_id: string;
  subscription_id?: string;
  user_id: string;
  amount: number;
  currency: string;
  status: string;
  due_date?: string;
  paid_at?: string;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface Payment {
  id: string;
  order_id?: string;
  invoice_id?: string;
  square_payment_id?: string;
  amount: number;
  currency: string;
  status: string;
  payment_method?: string;
  processed_at?: string;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface WebhookEvent {
  id: string;
  event_type: string;
  source: string;
  payload: Record<string, any>;
  status: string;
  processed_at?: string;
  retry_count?: number;
  error_message?: string;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface IdempotencyKey {
  id: string;
  key: string;
  source: string;
  response?: Record<string, any>;
  status: string;
  expires_at: string;
  created_at?: string;
  updated_at?: string;
}
