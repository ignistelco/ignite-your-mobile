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
      addon_product_models: {
        Row: {
          created_at: string | null
          description: string | null
          gigs_addon_id: string | null
          is_active: boolean
          name: string
          price_cents: number
          product_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          gigs_addon_id?: string | null
          is_active?: boolean
          name: string
          price_cents: number
          product_id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          gigs_addon_id?: string | null
          is_active?: boolean
          name?: string
          price_cents?: number
          product_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addon_product_models_gigs_addon_id_fkey"
            columns: ["gigs_addon_id"]
            isOneToOne: false
            referencedRelation: "gigs_addons"
            referencedColumns: ["gigs_addon_id"]
          },
        ]
      }
      addresses: {
        Row: {
          address_id: string
          city: string
          country: string
          created_at: string | null
          gigs_address_id: string | null
          is_primary: boolean | null
          line1: string
          line2: string | null
          metadata: Json | null
          postal_code: string | null
          state: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address_id?: string
          city: string
          country: string
          created_at?: string | null
          gigs_address_id?: string | null
          is_primary?: boolean | null
          line1: string
          line2?: string | null
          metadata?: Json | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address_id?: string
          city?: string
          country?: string
          created_at?: string | null
          gigs_address_id?: string | null
          is_primary?: boolean | null
          line1?: string
          line2?: string | null
          metadata?: Json | null
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
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      admin_users: {
        Row: {
          admin_user_id: string
          created_at: string | null
          department_id: string | null
          email: string
          full_name: string
          is_active: boolean
          role: string
          updated_at: string | null
        }
        Insert: {
          admin_user_id: string
          created_at?: string | null
          department_id?: string | null
          email: string
          full_name: string
          is_active?: boolean
          role: string
          updated_at?: string | null
        }
        Update: {
          admin_user_id?: string
          created_at?: string | null
          department_id?: string | null
          email?: string
          full_name?: string
          is_active?: boolean
          role?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_users_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["department_id"]
          },
        ]
      }
      available_numbers: {
        Row: {
          area_code: string
          created_at: string | null
          gigs_number_id: string | null
          phone_number: string
          status: string
          updated_at: string | null
        }
        Insert: {
          area_code: string
          created_at?: string | null
          gigs_number_id?: string | null
          phone_number: string
          status: string
          updated_at?: string | null
        }
        Update: {
          area_code?: string
          created_at?: string | null
          gigs_number_id?: string | null
          phone_number?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      cart: {
        Row: {
          cart_id: string
          created_at: string | null
          items: Json
          overall_total_cents: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          cart_id?: string
          created_at?: string | null
          items?: Json
          overall_total_cents: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          cart_id?: string
          created_at?: string | null
          items?: Json
          overall_total_cents?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      chatbot_training_data: {
        Row: {
          created_at: string | null
          created_by: string | null
          data_id: string
          external_link: string | null
          intent: string
          is_active: boolean
          question_phrases: string[]
          response_text: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          data_id?: string
          external_link?: string | null
          intent: string
          is_active?: boolean
          question_phrases: string[]
          response_text: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          data_id?: string
          external_link?: string | null
          intent?: string
          is_active?: boolean
          question_phrases?: string[]
          response_text?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_training_data_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["admin_user_id"]
          },
        ]
      }
      commissions: {
        Row: {
          admin_user_id: string | null
          amount_cents: number
          commission_id: string
          created_at: string | null
          currency: string
          marketing_program_id: string | null
          notes: string | null
          order_id: string | null
          status: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          admin_user_id?: string | null
          amount_cents: number
          commission_id?: string
          created_at?: string | null
          currency?: string
          marketing_program_id?: string | null
          notes?: string | null
          order_id?: string | null
          status: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          admin_user_id?: string | null
          amount_cents?: number
          commission_id?: string
          created_at?: string | null
          currency?: string
          marketing_program_id?: string | null
          notes?: string | null
          order_id?: string | null
          status?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "commissions_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["admin_user_id"]
          },
          {
            foreignKeyName: "commissions_marketing_program_id_fkey"
            columns: ["marketing_program_id"]
            isOneToOne: false
            referencedRelation: "marketing_programs"
            referencedColumns: ["program_id"]
          },
          {
            foreignKeyName: "commissions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["order_id"]
          },
          {
            foreignKeyName: "commissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      departments: {
        Row: {
          created_at: string | null
          department_id: string
          description: string | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department_id?: string
          description?: string | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department_id?: string
          description?: string | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      device_product_model_variants: {
        Row: {
          color: string
          created_at: string | null
          price_modifier_cents: number
          product_id: string
          updated_at: string | null
          variant_id: string
        }
        Insert: {
          color: string
          created_at?: string | null
          price_modifier_cents?: number
          product_id: string
          updated_at?: string | null
          variant_id?: string
        }
        Update: {
          color?: string
          created_at?: string | null
          price_modifier_cents?: number
          product_id?: string
          updated_at?: string | null
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "device_product_model_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "device_product_models"
            referencedColumns: ["product_id"]
          },
        ]
      }
      device_product_models: {
        Row: {
          additional_spec_details: string | null
          base_price_cents: number
          battery_description: string | null
          bluetooth_version: string | null
          created_at: string | null
          display_resolution: string | null
          display_size_inches: number | null
          frequency_bands: string | null
          front_camera_mp: number | null
          gigs_device_model_id: string | null
          hearing_aid_compatibility: boolean | null
          height_mm: number | null
          images: string[]
          is_active: boolean
          length_mm: number | null
          lifestyle: string
          manufacturer: string
          mobile_hotspot_capable: boolean | null
          model_name: string
          name: string
          network_technologies: string[]
          nfc_supported: boolean | null
          os: string
          other_features_text: string | null
          processor: string | null
          product_id: string
          ram_gb: number | null
          rear_camera_mp: number | null
          satellite_capable: boolean | null
          sensors: string[] | null
          sim_card_ports: number
          sim_card_types: string[]
          standby_time_hours: number | null
          storage_options_gb: number[]
          supported_email_platforms: string | null
          updated_at: string | null
          usb_type: string | null
          video_url: string | null
          volte_supported: boolean | null
          wea_capable: boolean | null
          weight_grams: number | null
          width_mm: number | null
          wifi_standard: string | null
        }
        Insert: {
          additional_spec_details?: string | null
          base_price_cents: number
          battery_description?: string | null
          bluetooth_version?: string | null
          created_at?: string | null
          display_resolution?: string | null
          display_size_inches?: number | null
          frequency_bands?: string | null
          front_camera_mp?: number | null
          gigs_device_model_id?: string | null
          hearing_aid_compatibility?: boolean | null
          height_mm?: number | null
          images: string[]
          is_active?: boolean
          length_mm?: number | null
          lifestyle: string
          manufacturer: string
          mobile_hotspot_capable?: boolean | null
          model_name: string
          name: string
          network_technologies: string[]
          nfc_supported?: boolean | null
          os: string
          other_features_text?: string | null
          processor?: string | null
          product_id?: string
          ram_gb?: number | null
          rear_camera_mp?: number | null
          satellite_capable?: boolean | null
          sensors?: string[] | null
          sim_card_ports: number
          sim_card_types: string[]
          standby_time_hours?: number | null
          storage_options_gb?: number[]
          supported_email_platforms?: string | null
          updated_at?: string | null
          usb_type?: string | null
          video_url?: string | null
          volte_supported?: boolean | null
          wea_capable?: boolean | null
          weight_grams?: number | null
          width_mm?: number | null
          wifi_standard?: string | null
        }
        Update: {
          additional_spec_details?: string | null
          base_price_cents?: number
          battery_description?: string | null
          bluetooth_version?: string | null
          created_at?: string | null
          display_resolution?: string | null
          display_size_inches?: number | null
          frequency_bands?: string | null
          front_camera_mp?: number | null
          gigs_device_model_id?: string | null
          hearing_aid_compatibility?: boolean | null
          height_mm?: number | null
          images?: string[]
          is_active?: boolean
          length_mm?: number | null
          lifestyle?: string
          manufacturer?: string
          mobile_hotspot_capable?: boolean | null
          model_name?: string
          name?: string
          network_technologies?: string[]
          nfc_supported?: boolean | null
          os?: string
          other_features_text?: string | null
          processor?: string | null
          product_id?: string
          ram_gb?: number | null
          rear_camera_mp?: number | null
          satellite_capable?: boolean | null
          sensors?: string[] | null
          sim_card_ports?: number
          sim_card_types?: string[]
          standby_time_hours?: number | null
          storage_options_gb?: number[]
          supported_email_platforms?: string | null
          updated_at?: string | null
          usb_type?: string | null
          video_url?: string | null
          volte_supported?: boolean | null
          wea_capable?: boolean | null
          weight_grams?: number | null
          width_mm?: number | null
          wifi_standard?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "device_product_models_gigs_device_model_id_fkey"
            columns: ["gigs_device_model_id"]
            isOneToOne: false
            referencedRelation: "gigs_device_models"
            referencedColumns: ["gigs_device_model_id"]
          },
        ]
      }
      gigs_addons: {
        Row: {
          created_at: string | null
          description: string | null
          gigs_addon_id: string
          metadata: Json | null
          name: string
          price_amount_cents: number
          price_currency: string
          recurrence_type: string
          status: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          gigs_addon_id: string
          metadata?: Json | null
          name: string
          price_amount_cents: number
          price_currency: string
          recurrence_type: string
          status: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          gigs_addon_id?: string
          metadata?: Json | null
          name?: string
          price_amount_cents?: number
          price_currency?: string
          recurrence_type?: string
          status?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      gigs_device_models: {
        Row: {
          brand: string
          created_at: string | null
          gigs_device_model_id: string
          metadata: Json | null
          name: string
          sim_types: string[]
          type: string
          updated_at: string | null
        }
        Insert: {
          brand: string
          created_at?: string | null
          gigs_device_model_id: string
          metadata?: Json | null
          name: string
          sim_types: string[]
          type: string
          updated_at?: string | null
        }
        Update: {
          brand?: string
          created_at?: string | null
          gigs_device_model_id?: string
          metadata?: Json | null
          name?: string
          sim_types?: string[]
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      gigs_invoices: {
        Row: {
          created_at: string | null
          currency: string
          finalized_at: string | null
          gigs_invoice_id: string
          metadata: Json | null
          paid_at: string | null
          reason: string
          status: string
          subscription_id: string | null
          total_amount_cents: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          currency: string
          finalized_at?: string | null
          gigs_invoice_id: string
          metadata?: Json | null
          paid_at?: string | null
          reason: string
          status: string
          subscription_id?: string | null
          total_amount_cents: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          currency?: string
          finalized_at?: string | null
          gigs_invoice_id?: string
          metadata?: Json | null
          paid_at?: string | null
          reason?: string
          status?: string
          subscription_id?: string | null
          total_amount_cents?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gigs_invoices_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["subscription_id"]
          },
          {
            foreignKeyName: "gigs_invoices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      gigs_plans: {
        Row: {
          coverage_countries: string[] | null
          created_at: string | null
          data_allowance_bytes: number | null
          description: string | null
          gigs_plan_id: string
          image_url: string | null
          metadata: Json | null
          name: string
          price_amount_cents: number
          price_currency: string
          provider: string
          requirements: Json | null
          sim_types: string[]
          sms_allowance_messages: number | null
          status: string
          updated_at: string | null
          validity_type: string | null
          validity_value: number | null
          voice_allowance_seconds: number | null
        }
        Insert: {
          coverage_countries?: string[] | null
          created_at?: string | null
          data_allowance_bytes?: number | null
          description?: string | null
          gigs_plan_id: string
          image_url?: string | null
          metadata?: Json | null
          name: string
          price_amount_cents: number
          price_currency: string
          provider: string
          requirements?: Json | null
          sim_types: string[]
          sms_allowance_messages?: number | null
          status: string
          updated_at?: string | null
          validity_type?: string | null
          validity_value?: number | null
          voice_allowance_seconds?: number | null
        }
        Update: {
          coverage_countries?: string[] | null
          created_at?: string | null
          data_allowance_bytes?: number | null
          description?: string | null
          gigs_plan_id?: string
          image_url?: string | null
          metadata?: Json | null
          name?: string
          price_amount_cents?: number
          price_currency?: string
          provider?: string
          requirements?: Json | null
          sim_types?: string[]
          sms_allowance_messages?: number | null
          status?: string
          updated_at?: string | null
          validity_type?: string | null
          validity_value?: number | null
          voice_allowance_seconds?: number | null
        }
        Relationships: []
      }
      gigs_quotes: {
        Row: {
          created_at: string | null
          currency: string
          expired_at: string
          gigs_quote_id: string
          payload: Json
          total_amount_cents: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          currency: string
          expired_at: string
          gigs_quote_id: string
          payload: Json
          total_amount_cents: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          currency?: string
          expired_at?: string
          gigs_quote_id?: string
          payload?: Json
          total_amount_cents?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gigs_quotes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      gigs_sims: {
        Row: {
          created_at: string | null
          gigs_sim_id: string
          iccid: string
          metadata: Json | null
          status: string
          type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          gigs_sim_id: string
          iccid: string
          metadata?: Json | null
          status: string
          type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          gigs_sim_id?: string
          iccid?: string
          metadata?: Json | null
          status?: string
          type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gigs_sims_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      help_guides: {
        Row: {
          category: string
          content_html: string
          created_at: string | null
          created_by: string | null
          display_order: number
          guide_id: string
          is_published: boolean
          keywords: string[] | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          content_html: string
          created_at?: string | null
          created_by?: string | null
          display_order?: number
          guide_id?: string
          is_published?: boolean
          keywords?: string[] | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          content_html?: string
          created_at?: string | null
          created_by?: string | null
          display_order?: number
          guide_id?: string
          is_published?: boolean
          keywords?: string[] | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "help_guides_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["admin_user_id"]
          },
        ]
      }
      idempotency_keys: {
        Row: {
          created_at: string | null
          expires_at: string
          key: string
          request_body_hash: string | null
          request_method: string
          request_path: string
          response_body: Json | null
          response_status_code: number | null
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          key: string
          request_body_hash?: string | null
          request_method: string
          request_path: string
          response_body?: Json | null
          response_status_code?: number | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          key?: string
          request_body_hash?: string | null
          request_method?: string
          request_path?: string
          response_body?: Json | null
          response_status_code?: number | null
        }
        Relationships: []
      }
      live_chat_sessions: {
        Row: {
          created_at: string | null
          end_time: string | null
          escalated_to_ticket_id: string | null
          metadata: Json | null
          session_id: string
          start_time: string | null
          status: string
          support_agent_id: string | null
          transcript: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          end_time?: string | null
          escalated_to_ticket_id?: string | null
          metadata?: Json | null
          session_id?: string
          start_time?: string | null
          status: string
          support_agent_id?: string | null
          transcript?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          end_time?: string | null
          escalated_to_ticket_id?: string | null
          metadata?: Json | null
          session_id?: string
          start_time?: string | null
          status?: string
          support_agent_id?: string | null
          transcript?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_chat_sessions_support_agent_id_fkey"
            columns: ["support_agent_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["admin_user_id"]
          },
          {
            foreignKeyName: "live_chat_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      marketing_programs: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          is_active: boolean
          name: string
          program_id: string
          signup_url: string | null
          terms_html: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          is_active?: boolean
          name: string
          program_id?: string
          signup_url?: string | null
          terms_html?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          is_active?: boolean
          name?: string
          program_id?: string
          signup_url?: string | null
          terms_html?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketing_programs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["admin_user_id"]
          },
        ]
      }
      orders: {
        Row: {
          cart_id: string | null
          contact_info_snapshot: Json
          created_at: string | null
          currency: string
          gigs_device_id_snapshot: string | null
          gigs_porting_id: string | null
          gigs_subscription_id: string | null
          imei_snapshot: string | null
          metadata: Json | null
          new_number_snapshot: string | null
          order_id: string
          port_number_snapshot: string | null
          purchased_addon_product_ids: string[] | null
          purchased_device_product_id: string | null
          purchased_device_variant_id: string | null
          purchased_plan_product_id: string
          purchased_plan_term_months: number | null
          shipping_address_snapshot: Json
          status: string
          stripe_charge_id: string | null
          stripe_payment_intent_id: string | null
          total_amount_cents: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cart_id?: string | null
          contact_info_snapshot: Json
          created_at?: string | null
          currency?: string
          gigs_device_id_snapshot?: string | null
          gigs_porting_id?: string | null
          gigs_subscription_id?: string | null
          imei_snapshot?: string | null
          metadata?: Json | null
          new_number_snapshot?: string | null
          order_id?: string
          port_number_snapshot?: string | null
          purchased_addon_product_ids?: string[] | null
          purchased_device_product_id?: string | null
          purchased_device_variant_id?: string | null
          purchased_plan_product_id: string
          purchased_plan_term_months?: number | null
          shipping_address_snapshot: Json
          status: string
          stripe_charge_id?: string | null
          stripe_payment_intent_id?: string | null
          total_amount_cents: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cart_id?: string | null
          contact_info_snapshot?: Json
          created_at?: string | null
          currency?: string
          gigs_device_id_snapshot?: string | null
          gigs_porting_id?: string | null
          gigs_subscription_id?: string | null
          imei_snapshot?: string | null
          metadata?: Json | null
          new_number_snapshot?: string | null
          order_id?: string
          port_number_snapshot?: string | null
          purchased_addon_product_ids?: string[] | null
          purchased_device_product_id?: string | null
          purchased_device_variant_id?: string | null
          purchased_plan_product_id?: string
          purchased_plan_term_months?: number | null
          shipping_address_snapshot?: Json
          status?: string
          stripe_charge_id?: string | null
          stripe_payment_intent_id?: string | null
          total_amount_cents?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "cart"
            referencedColumns: ["cart_id"]
          },
          {
            foreignKeyName: "orders_gigs_device_id_snapshot_fkey"
            columns: ["gigs_device_id_snapshot"]
            isOneToOne: false
            referencedRelation: "user_devices"
            referencedColumns: ["gigs_device_id"]
          },
          {
            foreignKeyName: "orders_purchased_device_product_id_fkey"
            columns: ["purchased_device_product_id"]
            isOneToOne: false
            referencedRelation: "device_product_models"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "orders_purchased_device_variant_id_fkey"
            columns: ["purchased_device_variant_id"]
            isOneToOne: false
            referencedRelation: "device_product_model_variants"
            referencedColumns: ["variant_id"]
          },
          {
            foreignKeyName: "orders_purchased_plan_product_id_fkey"
            columns: ["purchased_plan_product_id"]
            isOneToOne: false
            referencedRelation: "plan_product_models"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      payments: {
        Row: {
          amount_cents: number
          card_brand: string | null
          card_last4: string | null
          created_at: string | null
          currency: string
          metadata: Json | null
          order_id: string
          payment_id: string
          payment_method_type: string
          status: string
          stripe_charge_id: string | null
          stripe_payment_intent_id: string
          updated_at: string | null
        }
        Insert: {
          amount_cents: number
          card_brand?: string | null
          card_last4?: string | null
          created_at?: string | null
          currency?: string
          metadata?: Json | null
          order_id: string
          payment_id?: string
          payment_method_type: string
          status: string
          stripe_charge_id?: string | null
          stripe_payment_intent_id: string
          updated_at?: string | null
        }
        Update: {
          amount_cents?: number
          card_brand?: string | null
          card_last4?: string | null
          created_at?: string | null
          currency?: string
          metadata?: Json | null
          order_id?: string
          payment_id?: string
          payment_method_type?: string
          status?: string
          stripe_charge_id?: string | null
          stripe_payment_intent_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["order_id"]
          },
        ]
      }
      plan_product_models: {
        Row: {
          created_at: string | null
          features: string[]
          gigs_plan_id: string
          is_active: boolean
          name: string
          product_id: string
          tagline: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          features: string[]
          gigs_plan_id: string
          is_active?: boolean
          name: string
          product_id?: string
          tagline?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          features?: string[]
          gigs_plan_id?: string
          is_active?: boolean
          name?: string
          product_id?: string
          tagline?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plan_product_models_gigs_plan_id_fkey"
            columns: ["gigs_plan_id"]
            isOneToOne: false
            referencedRelation: "gigs_plans"
            referencedColumns: ["gigs_plan_id"]
          },
        ]
      }
      plan_product_terms: {
        Row: {
          created_at: string | null
          monthly_price_cents: number
          product_id: string
          term_id: string
          term_length_months: number
          total_cost_cents: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          monthly_price_cents: number
          product_id: string
          term_id?: string
          term_length_months: number
          total_cost_cents: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          monthly_price_cents?: number
          product_id?: string
          term_id?: string
          term_length_months?: number
          total_cost_cents?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plan_product_terms_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "plan_product_models"
            referencedColumns: ["product_id"]
          },
        ]
      }
      product_filter_options: {
        Row: {
          category: string
          created_at: string | null
          filter_id: string
          is_active: boolean
          sort_order: number
          updated_at: string | null
          value: string
        }
        Insert: {
          category: string
          created_at?: string | null
          filter_id?: string
          is_active?: boolean
          sort_order?: number
          updated_at?: string | null
          value: string
        }
        Update: {
          category?: string
          created_at?: string | null
          filter_id?: string
          is_active?: boolean
          sort_order?: number
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          first_name: string
          gigs_user_id: string | null
          id_expiration_date: string | null
          id_number: string | null
          id_type: string | null
          last_name: string
          metadata: Json | null
          middle_name: string | null
          phone: string | null
          preferred_locale: string | null
          primary_address_id: string | null
          stripe_customer_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name: string
          gigs_user_id?: string | null
          id_expiration_date?: string | null
          id_number?: string | null
          id_type?: string | null
          last_name: string
          metadata?: Json | null
          middle_name?: string | null
          phone?: string | null
          preferred_locale?: string | null
          primary_address_id?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string
          gigs_user_id?: string | null
          id_expiration_date?: string | null
          id_number?: string | null
          id_type?: string | null
          last_name?: string
          metadata?: Json | null
          middle_name?: string | null
          phone?: string | null
          preferred_locale?: string | null
          primary_address_id?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_primary_address"
            columns: ["primary_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["address_id"]
          },
        ]
      }
      retailer_locations: {
        Row: {
          address_line1: string
          address_line2: string | null
          city: string
          country: string
          created_at: string | null
          created_by: string | null
          email: string | null
          is_active: boolean
          latitude: number | null
          location_id: string
          longitude: number | null
          name: string
          phone: string | null
          postal_code: string | null
          state: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address_line1: string
          address_line2?: string | null
          city: string
          country: string
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          is_active?: boolean
          latitude?: number | null
          location_id?: string
          longitude?: number | null
          name: string
          phone?: string | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address_line1?: string
          address_line2?: string | null
          city?: string
          country?: string
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          is_active?: boolean
          latitude?: number | null
          location_id?: string
          longitude?: number | null
          name?: string
          phone?: string | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "retailer_locations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["admin_user_id"]
          },
        ]
      }
      returns: {
        Row: {
          created_at: string | null
          created_by: string | null
          notes: string | null
          order_id: string
          reason: string
          refund_amount_cents: number
          return_id: string
          returned_at: string | null
          status: string
          stripe_refund_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          notes?: string | null
          order_id: string
          reason: string
          refund_amount_cents: number
          return_id?: string
          returned_at?: string | null
          status: string
          stripe_refund_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          notes?: string | null
          order_id?: string
          reason?: string
          refund_amount_cents?: number
          return_id?: string
          returned_at?: string | null
          status?: string
          stripe_refund_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "returns_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["admin_user_id"]
          },
          {
            foreignKeyName: "returns_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["order_id"]
          },
          {
            foreignKeyName: "returns_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      static_content_pages: {
        Row: {
          content_html: string
          created_at: string | null
          created_by: string | null
          is_active: boolean
          last_published_at: string | null
          page_id: string
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content_html: string
          created_at?: string | null
          created_by?: string | null
          is_active?: boolean
          last_published_at?: string | null
          page_id?: string
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content_html?: string
          created_at?: string | null
          created_by?: string | null
          is_active?: boolean
          last_published_at?: string | null
          page_id?: string
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "static_content_pages_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["admin_user_id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string | null
          e_sim_activation_code: string | null
          e_sim_qr_code_url: string | null
          gigs_device_id: string | null
          gigs_invoice_id: string | null
          gigs_plan_id: string
          gigs_sim_id: string | null
          metadata: Json | null
          order_id: string
          phone_number: string | null
          product_plan_id: string
          purchased_addon_product_ids: string[] | null
          status: string
          subscription_id: string
          term_length_months: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          e_sim_activation_code?: string | null
          e_sim_qr_code_url?: string | null
          gigs_device_id?: string | null
          gigs_invoice_id?: string | null
          gigs_plan_id: string
          gigs_sim_id?: string | null
          metadata?: Json | null
          order_id: string
          phone_number?: string | null
          product_plan_id: string
          purchased_addon_product_ids?: string[] | null
          status: string
          subscription_id: string
          term_length_months: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          e_sim_activation_code?: string | null
          e_sim_qr_code_url?: string | null
          gigs_device_id?: string | null
          gigs_invoice_id?: string | null
          gigs_plan_id?: string
          gigs_sim_id?: string | null
          metadata?: Json | null
          order_id?: string
          phone_number?: string | null
          product_plan_id?: string
          purchased_addon_product_ids?: string[] | null
          status?: string
          subscription_id?: string
          term_length_months?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_gigs_device_id_fkey"
            columns: ["gigs_device_id"]
            isOneToOne: false
            referencedRelation: "user_devices"
            referencedColumns: ["gigs_device_id"]
          },
          {
            foreignKeyName: "subscriptions_gigs_plan_id_fkey"
            columns: ["gigs_plan_id"]
            isOneToOne: false
            referencedRelation: "gigs_plans"
            referencedColumns: ["gigs_plan_id"]
          },
          {
            foreignKeyName: "subscriptions_gigs_sim_id_fkey"
            columns: ["gigs_sim_id"]
            isOneToOne: true
            referencedRelation: "gigs_sims"
            referencedColumns: ["gigs_sim_id"]
          },
          {
            foreignKeyName: "subscriptions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["order_id"]
          },
          {
            foreignKeyName: "subscriptions_product_plan_id_fkey"
            columns: ["product_plan_id"]
            isOneToOne: false
            referencedRelation: "plan_product_models"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_to_agent_id: string | null
          category: string
          closed_at: string | null
          created_at: string | null
          description: string
          priority: string
          resolution_notes: string | null
          status: string
          subject: string
          ticket_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          assigned_to_agent_id?: string | null
          category: string
          closed_at?: string | null
          created_at?: string | null
          description: string
          priority: string
          resolution_notes?: string | null
          status: string
          subject: string
          ticket_id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          assigned_to_agent_id?: string | null
          category?: string
          closed_at?: string | null
          created_at?: string | null
          description?: string
          priority?: string
          resolution_notes?: string | null
          status?: string
          subject?: string
          ticket_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_assigned_to_agent_id_fkey"
            columns: ["assigned_to_agent_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["admin_user_id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      twilio_sent_messages: {
        Row: {
          body: string
          created_at: string | null
          error_message: string | null
          from_number: string
          message_id: string
          order_id: string | null
          status: string
          subscription_id: string | null
          to_number: string
          twilio_sid: string | null
          updated_at: string | null
        }
        Insert: {
          body: string
          created_at?: string | null
          error_message?: string | null
          from_number: string
          message_id?: string
          order_id?: string | null
          status: string
          subscription_id?: string | null
          to_number: string
          twilio_sid?: string | null
          updated_at?: string | null
        }
        Update: {
          body?: string
          created_at?: string | null
          error_message?: string | null
          from_number?: string
          message_id?: string
          order_id?: string | null
          status?: string
          subscription_id?: string | null
          to_number?: string
          twilio_sid?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "twilio_sent_messages_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["order_id"]
          },
          {
            foreignKeyName: "twilio_sent_messages_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["subscription_id"]
          },
        ]
      }
      user_devices: {
        Row: {
          created_at: string | null
          gigs_device_id: string
          imei: string
          imei_check_snapshot: Json | null
          is_assigned_to_user: boolean
          name: string | null
          product_id: string | null
          updated_at: string | null
          user_id: string | null
          variant_id: string | null
        }
        Insert: {
          created_at?: string | null
          gigs_device_id: string
          imei: string
          imei_check_snapshot?: Json | null
          is_assigned_to_user?: boolean
          name?: string | null
          product_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          variant_id?: string | null
        }
        Update: {
          created_at?: string | null
          gigs_device_id?: string
          imei?: string
          imei_check_snapshot?: Json | null
          is_assigned_to_user?: boolean
          name?: string | null
          product_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_devices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "device_product_models"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "user_devices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_devices_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "device_product_model_variants"
            referencedColumns: ["variant_id"]
          },
        ]
      }
      voucher_product_applicability: {
        Row: {
          product_id: string
          product_type: string
          voucher_id: string
        }
        Insert: {
          product_id: string
          product_type: string
          voucher_id: string
        }
        Update: {
          product_id?: string
          product_type?: string
          voucher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voucher_product_applicability_voucher_id_fkey"
            columns: ["voucher_id"]
            isOneToOne: false
            referencedRelation: "vouchers"
            referencedColumns: ["voucher_id"]
          },
        ]
      }
      vouchers: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          discount_type: string
          discount_value: number
          expires_at: string | null
          gigs_voucher_id: string | null
          is_active: boolean
          max_redemptions: number | null
          metadata: Json | null
          name: string
          recurrence_duration_months: number | null
          recurrence_type: string
          stripe_coupon_id: string | null
          times_redeemed: number | null
          updated_at: string | null
          voucher_id: string
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          discount_type: string
          discount_value: number
          expires_at?: string | null
          gigs_voucher_id?: string | null
          is_active?: boolean
          max_redemptions?: number | null
          metadata?: Json | null
          name: string
          recurrence_duration_months?: number | null
          recurrence_type: string
          stripe_coupon_id?: string | null
          times_redeemed?: number | null
          updated_at?: string | null
          voucher_id?: string
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          discount_type?: string
          discount_value?: number
          expires_at?: string | null
          gigs_voucher_id?: string | null
          is_active?: boolean
          max_redemptions?: number | null
          metadata?: Json | null
          name?: string
          recurrence_duration_months?: number | null
          recurrence_type?: string
          stripe_coupon_id?: string | null
          times_redeemed?: number | null
          updated_at?: string | null
          voucher_id?: string
        }
        Relationships: []
      }
      waitlist_users: {
        Row: {
          created_at: string | null
          email: string
          first_name: string | null
          interest: string | null
          last_name: string | null
          source: string | null
          status: string
          waitlist_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name?: string | null
          interest?: string | null
          last_name?: string | null
          source?: string | null
          status?: string
          waitlist_id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string | null
          interest?: string | null
          last_name?: string | null
          source?: string | null
          status?: string
          waitlist_id?: string
        }
        Relationships: []
      }
      webhooks_events: {
        Row: {
          created_at: string | null
          error_message: string | null
          event_id: string
          payload: Json
          processed_at: string | null
          retry_count: number | null
          source: string
          status: string
          type: string
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          event_id: string
          payload: Json
          processed_at?: string | null
          retry_count?: number | null
          source: string
          status?: string
          type: string
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          event_id?: string
          payload?: Json
          processed_at?: string | null
          retry_count?: number | null
          source?: string
          status?: string
          type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
      unaccent: {
        Args: { "": string }
        Returns: string
      }
      unaccent_init: {
        Args: { "": unknown }
        Returns: unknown
      }
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
