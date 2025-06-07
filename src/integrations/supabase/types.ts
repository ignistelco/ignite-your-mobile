export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          country: string
          created_at: string | null
          id: string
          line1: string
          line2: string | null
          postal_code: string | null
          state: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          city: string
          country: string
          created_at?: string | null
          id: string
          line1: string
          line2?: string | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          city?: string
          country?: string
          created_at?: string | null
          id?: string
          line1?: string
          line2?: string | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          created_at: string | null
          id: string
          permissions: Json | null
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          permissions?: Json | null
          role?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          permissions?: Json | null
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      gigs_addons: {
        Row: {
          addon_type: string
          created_at: string | null
          data_allowance_bytes: number | null
          description: string | null
          id: string
          metadata: Json | null
          name: string
          price_amount: number
          price_currency: string
          provider: string
          sms_allowance_messages: number | null
          status: string
          updated_at: string | null
          validity_type: string | null
          validity_unit: string | null
          validity_value: number | null
          voice_allowance_seconds: number | null
        }
        Insert: {
          addon_type: string
          created_at?: string | null
          data_allowance_bytes?: number | null
          description?: string | null
          id: string
          metadata?: Json | null
          name: string
          price_amount: number
          price_currency: string
          provider: string
          sms_allowance_messages?: number | null
          status: string
          updated_at?: string | null
          validity_type?: string | null
          validity_unit?: string | null
          validity_value?: number | null
          voice_allowance_seconds?: number | null
        }
        Update: {
          addon_type?: string
          created_at?: string | null
          data_allowance_bytes?: number | null
          description?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          price_amount?: number
          price_currency?: string
          provider?: string
          sms_allowance_messages?: number | null
          status?: string
          updated_at?: string | null
          validity_type?: string | null
          validity_unit?: string | null
          validity_value?: number | null
          voice_allowance_seconds?: number | null
        }
        Relationships: []
      }
      gigs_device_models: {
        Row: {
          brand: string
          created_at: string | null
          id: string
          name: string
          sim_types: string[]
          type: string
          updated_at: string | null
        }
        Insert: {
          brand: string
          created_at?: string | null
          id: string
          name: string
          sim_types: string[]
          type: string
          updated_at?: string | null
        }
        Update: {
          brand?: string
          created_at?: string | null
          id?: string
          name?: string
          sim_types?: string[]
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      gigs_plans: {
        Row: {
          coverage_countries: string[] | null
          created_at: string | null
          data_allowance_bytes: number | null
          description: string | null
          id: string
          image_url: string | null
          metadata: Json | null
          name: string
          price_amount: number
          price_currency: string
          provider: string
          requirements_address: string
          requirements_device: string
          requirements_user_birthday: string
          requirements_user_full_name: string
          sim_types: string[]
          sms_allowance_messages: number | null
          status: string
          updated_at: string | null
          validity_type: string | null
          validity_unit: string | null
          validity_value: number | null
          voice_allowance_seconds: number | null
        }
        Insert: {
          coverage_countries?: string[] | null
          created_at?: string | null
          data_allowance_bytes?: number | null
          description?: string | null
          id: string
          image_url?: string | null
          metadata?: Json | null
          name: string
          price_amount: number
          price_currency: string
          provider: string
          requirements_address: string
          requirements_device: string
          requirements_user_birthday: string
          requirements_user_full_name: string
          sim_types: string[]
          sms_allowance_messages?: number | null
          status: string
          updated_at?: string | null
          validity_type?: string | null
          validity_unit?: string | null
          validity_value?: number | null
          voice_allowance_seconds?: number | null
        }
        Update: {
          coverage_countries?: string[] | null
          created_at?: string | null
          data_allowance_bytes?: number | null
          description?: string | null
          id?: string
          image_url?: string | null
          metadata?: Json | null
          name?: string
          price_amount?: number
          price_currency?: string
          provider?: string
          requirements_address?: string
          requirements_device?: string
          requirements_user_birthday?: string
          requirements_user_full_name?: string
          sim_types?: string[]
          sms_allowance_messages?: number | null
          status?: string
          updated_at?: string | null
          validity_type?: string | null
          validity_unit?: string | null
          validity_value?: number | null
          voice_allowance_seconds?: number | null
        }
        Relationships: []
      }
      gigs_sims: {
        Row: {
          created_at: string | null
          e_sim_activation_code: string | null
          e_sim_qr_code_url: string | null
          iccid: string | null
          id: string
          provider: string
          status: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          e_sim_activation_code?: string | null
          e_sim_qr_code_url?: string | null
          iccid?: string | null
          id: string
          provider: string
          status: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          e_sim_activation_code?: string | null
          e_sim_qr_code_url?: string | null
          iccid?: string | null
          id?: string
          provider?: string
          status?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      idempotency_keys: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          key: string
          response: Json | null
          source: string
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          key: string
          response?: Json | null
          source: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          key?: string
          response?: Json | null
          source?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          created_at: string | null
          currency: string
          due_date: string | null
          gigs_invoice_id: string
          id: string
          metadata: Json | null
          paid_at: string | null
          status: string
          subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency: string
          due_date?: string | null
          gigs_invoice_id: string
          id?: string
          metadata?: Json | null
          paid_at?: string | null
          status?: string
          subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string
          due_date?: string | null
          gigs_invoice_id?: string
          id?: string
          metadata?: Json | null
          paid_at?: string | null
          status?: string
          subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          currency: string
          gigs_subscription_id: string | null
          id: string
          metadata: Json | null
          product_addon_ids: string[] | null
          product_plan_id: string | null
          quote_id: string | null
          square_order_id: string | null
          status: string
          total_amount: number
          updated_at: string | null
          user_id: string
          voucher_id: string | null
        }
        Insert: {
          created_at?: string | null
          currency: string
          gigs_subscription_id?: string | null
          id?: string
          metadata?: Json | null
          product_addon_ids?: string[] | null
          product_plan_id?: string | null
          quote_id?: string | null
          square_order_id?: string | null
          status?: string
          total_amount: number
          updated_at?: string | null
          user_id: string
          voucher_id?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string
          gigs_subscription_id?: string | null
          id?: string
          metadata?: Json | null
          product_addon_ids?: string[] | null
          product_plan_id?: string | null
          quote_id?: string | null
          square_order_id?: string | null
          status?: string
          total_amount?: number
          updated_at?: string | null
          user_id?: string
          voucher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_plan_id_fkey"
            columns: ["product_plan_id"]
            isOneToOne: false
            referencedRelation: "product_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_voucher_id_fkey"
            columns: ["voucher_id"]
            isOneToOne: false
            referencedRelation: "vouchers"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string
          id: string
          invoice_id: string | null
          metadata: Json | null
          order_id: string | null
          payment_method: string | null
          processed_at: string | null
          square_payment_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency: string
          id?: string
          invoice_id?: string | null
          metadata?: Json | null
          order_id?: string | null
          payment_method?: string | null
          processed_at?: string | null
          square_payment_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string
          id?: string
          invoice_id?: string | null
          metadata?: Json | null
          order_id?: string | null
          payment_method?: string | null
          processed_at?: string | null
          square_payment_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      product_addons: {
        Row: {
          created_at: string | null
          custom_price_amount: number | null
          custom_price_currency: string | null
          description: string | null
          gigs_addon_id: string | null
          id: string
          is_active: boolean
          metadata: Json | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          custom_price_amount?: number | null
          custom_price_currency?: string | null
          description?: string | null
          gigs_addon_id?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          custom_price_amount?: number | null
          custom_price_currency?: string | null
          description?: string | null
          gigs_addon_id?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_addons_gigs_addon_id_fkey"
            columns: ["gigs_addon_id"]
            isOneToOne: false
            referencedRelation: "gigs_addons"
            referencedColumns: ["id"]
          },
        ]
      }
      product_device_models: {
        Row: {
          android_version: string | null
          battery_description: string | null
          bluetooth_version: string | null
          color: string | null
          created_at: string | null
          description: string | null
          display_resolution: string | null
          display_size_inches: number | null
          front_camera_mp: number | null
          gigs_device_model_id: string | null
          id: string
          image_url: string | null
          is_active: boolean
          is_e_sim_compatible: boolean
          is_p_sim_compatible: boolean
          metadata: Json | null
          name: string
          network_technology: string[] | null
          nfc_supported: boolean | null
          price_amount: number | null
          price_currency: string | null
          processor: string | null
          ram_gb: number | null
          rear_camera_mp: number | null
          sensors: string[] | null
          sim_card_ports: number | null
          sim_card_type: string[] | null
          standby_time_hours: number | null
          storage_gb: number | null
          updated_at: string | null
          usb_type: string | null
        }
        Insert: {
          android_version?: string | null
          battery_description?: string | null
          bluetooth_version?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          display_resolution?: string | null
          display_size_inches?: number | null
          front_camera_mp?: number | null
          gigs_device_model_id?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_e_sim_compatible?: boolean
          is_p_sim_compatible?: boolean
          metadata?: Json | null
          name: string
          network_technology?: string[] | null
          nfc_supported?: boolean | null
          price_amount?: number | null
          price_currency?: string | null
          processor?: string | null
          ram_gb?: number | null
          rear_camera_mp?: number | null
          sensors?: string[] | null
          sim_card_ports?: number | null
          sim_card_type?: string[] | null
          standby_time_hours?: number | null
          storage_gb?: number | null
          updated_at?: string | null
          usb_type?: string | null
        }
        Update: {
          android_version?: string | null
          battery_description?: string | null
          bluetooth_version?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          display_resolution?: string | null
          display_size_inches?: number | null
          front_camera_mp?: number | null
          gigs_device_model_id?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_e_sim_compatible?: boolean
          is_p_sim_compatible?: boolean
          metadata?: Json | null
          name?: string
          network_technology?: string[] | null
          nfc_supported?: boolean | null
          price_amount?: number | null
          price_currency?: string | null
          processor?: string | null
          ram_gb?: number | null
          rear_camera_mp?: number | null
          sensors?: string[] | null
          sim_card_ports?: number | null
          sim_card_type?: string[] | null
          standby_time_hours?: number | null
          storage_gb?: number | null
          updated_at?: string | null
          usb_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_device_models_gigs_device_model_id_fkey"
            columns: ["gigs_device_model_id"]
            isOneToOne: false
            referencedRelation: "gigs_device_models"
            referencedColumns: ["id"]
          },
        ]
      }
      product_plans: {
        Row: {
          created_at: string | null
          custom_price_amount: number | null
          custom_price_currency: string | null
          features: string[] | null
          gigs_plan_id: string | null
          id: string
          is_active: boolean
          metadata: Json | null
          name: string
          tagline: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          custom_price_amount?: number | null
          custom_price_currency?: string | null
          features?: string[] | null
          gigs_plan_id?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name: string
          tagline?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          custom_price_amount?: number | null
          custom_price_currency?: string | null
          features?: string[] | null
          gigs_plan_id?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name?: string
          tagline?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_plans_gigs_plan_id_fkey"
            columns: ["gigs_plan_id"]
            isOneToOne: false
            referencedRelation: "gigs_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          created_at: string | null
          currency: string
          discount_amount: number | null
          expires_at: string
          id: string
          metadata: Json | null
          product_addon_ids: string[] | null
          product_plan_id: string | null
          subtotal_amount: number
          tax_amount: number | null
          total_amount: number
          updated_at: string | null
          user_id: string
          voucher_id: string | null
        }
        Insert: {
          created_at?: string | null
          currency: string
          discount_amount?: number | null
          expires_at: string
          id: string
          metadata?: Json | null
          product_addon_ids?: string[] | null
          product_plan_id?: string | null
          subtotal_amount: number
          tax_amount?: number | null
          total_amount: number
          updated_at?: string | null
          user_id: string
          voucher_id?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string
          discount_amount?: number | null
          expires_at?: string
          id?: string
          metadata?: Json | null
          product_addon_ids?: string[] | null
          product_plan_id?: string | null
          subtotal_amount?: number
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string | null
          user_id?: string
          voucher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_product_plan_id_fkey"
            columns: ["product_plan_id"]
            isOneToOne: false
            referencedRelation: "product_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_voucher_id_fkey"
            columns: ["voucher_id"]
            isOneToOne: false
            referencedRelation: "vouchers"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          activated_at: string | null
          created_at: string | null
          expires_at: string | null
          gigs_plan_id: string | null
          gigs_sim_id: string | null
          gigs_subscription_id: string
          id: string
          metadata: Json | null
          order_id: string | null
          product_plan_id: string | null
          status: string
          updated_at: string | null
          user_device_id: string | null
          user_id: string
        }
        Insert: {
          activated_at?: string | null
          created_at?: string | null
          expires_at?: string | null
          gigs_plan_id?: string | null
          gigs_sim_id?: string | null
          gigs_subscription_id: string
          id?: string
          metadata?: Json | null
          order_id?: string | null
          product_plan_id?: string | null
          status?: string
          updated_at?: string | null
          user_device_id?: string | null
          user_id: string
        }
        Update: {
          activated_at?: string | null
          created_at?: string | null
          expires_at?: string | null
          gigs_plan_id?: string | null
          gigs_sim_id?: string | null
          gigs_subscription_id?: string
          id?: string
          metadata?: Json | null
          order_id?: string | null
          product_plan_id?: string | null
          status?: string
          updated_at?: string | null
          user_device_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_gigs_plan_id_fkey"
            columns: ["gigs_plan_id"]
            isOneToOne: false
            referencedRelation: "gigs_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_gigs_sim_id_fkey"
            columns: ["gigs_sim_id"]
            isOneToOne: false
            referencedRelation: "gigs_sims"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_product_plan_id_fkey"
            columns: ["product_plan_id"]
            isOneToOne: false
            referencedRelation: "product_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_device_id_fkey"
            columns: ["user_device_id"]
            isOneToOne: false
            referencedRelation: "user_devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_devices: {
        Row: {
          created_at: string | null
          id: string
          imei: string | null
          is_assigned: boolean | null
          metadata: Json | null
          name: string | null
          product_device_model_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          imei?: string | null
          is_assigned?: boolean | null
          metadata?: Json | null
          name?: string | null
          product_device_model_id: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          imei?: string | null
          is_assigned?: boolean | null
          metadata?: Json | null
          name?: string | null
          product_device_model_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_devices_product_device_model_id_fkey"
            columns: ["product_device_model_id"]
            isOneToOne: false
            referencedRelation: "product_device_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_devices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          birthday: string | null
          created_at: string | null
          email: string
          full_name: string | null
          gigs_user_id: string | null
          id: string
          metadata: Json | null
          preferred_locale: string | null
          square_customer_id: string | null
          updated_at: string | null
        }
        Insert: {
          birthday?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          gigs_user_id?: string | null
          id?: string
          metadata?: Json | null
          preferred_locale?: string | null
          square_customer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          birthday?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          gigs_user_id?: string | null
          id?: string
          metadata?: Json | null
          preferred_locale?: string | null
          square_customer_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      vouchers: {
        Row: {
          applicable_plans: string[] | null
          code: string
          created_at: string | null
          description: string | null
          discount_type: string
          discount_value: number
          id: string
          is_active: boolean
          max_discount_amount: number | null
          metadata: Json | null
          min_purchase_amount: number | null
          updated_at: string | null
          usage_count: number | null
          usage_limit: number | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          applicable_plans?: string[] | null
          code: string
          created_at?: string | null
          description?: string | null
          discount_type: string
          discount_value: number
          id: string
          is_active?: boolean
          max_discount_amount?: number | null
          metadata?: Json | null
          min_purchase_amount?: number | null
          updated_at?: string | null
          usage_count?: number | null
          usage_limit?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          applicable_plans?: string[] | null
          code?: string
          created_at?: string | null
          description?: string | null
          discount_type?: string
          discount_value?: number
          id?: string
          is_active?: boolean
          max_discount_amount?: number | null
          metadata?: Json | null
          min_purchase_amount?: number | null
          updated_at?: string | null
          usage_count?: number | null
          usage_limit?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      webhooks_events: {
        Row: {
          created_at: string | null
          error_message: string | null
          event_type: string
          id: string
          metadata: Json | null
          payload: Json
          processed_at: string | null
          retry_count: number | null
          source: string
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          payload: Json
          processed_at?: string | null
          retry_count?: number | null
          source: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          payload?: Json
          processed_at?: string | null
          retry_count?: number | null
          source?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
