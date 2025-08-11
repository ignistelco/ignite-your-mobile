-- =============================================================================
-- Gigs-Leveraged Backend for Ignis Mobile - Version 2.1 (Fixed)
--
-- This version removes the seeding section that caused foreign key violations
-- The schema and structure are identical, but we'll populate data separately
-- =============================================================================

BEGIN;

-- =============================================================================
-- 0. SCHEMA RESET (for idempotency)
-- =============================================================================
DROP SCHEMA IF EXISTS ignis_mobile CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- =============================================================================
-- 1. SCHEMA, EXTENSIONS, AND TYPES
-- =============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA extensions;

CREATE SCHEMA ignis_mobile;
GRANT USAGE ON SCHEMA ignis_mobile TO postgres, anon, authenticated, service_role;

-- Refined ENUM types for clarity and consistency.
CREATE TYPE ignis_mobile.plan_sim_type AS ENUM ('eSIM', 'pSIM');
CREATE TYPE ignis_mobile.subscription_status_cache AS ENUM ('initiated', 'pending', 'active', 'ended');
CREATE TYPE ignis_mobile.order_status AS ENUM ('draft', 'pending_payment', 'awaiting_provisioning', 'awaiting_shipment', 'shipped', 'completed', 'cancelled');
CREATE TYPE ignis_mobile.order_payment_method AS ENUM ('square_checkout', 'dealer_balance');
CREATE TYPE ignis_mobile.device_category AS ENUM ('Gaming & Streaming', 'Entrepreneur PowerUser', 'Photography & Film', 'Rugged & Outdoor', 'Privacy & Security', 'Travel & Excursion', 'Essential & Affordable', 'Crypto');
CREATE TYPE ignis_mobile.legal_policy_type AS ENUM ('privacy_policy', 'terms_of_service', 'return_policy');
CREATE TYPE ignis_mobile.org_user_role AS ENUM ('super_admin', 'dealer_manager', 'dealer_user', 'content_manager', 'support_agent');
CREATE TYPE ignis_mobile.audit_action AS ENUM ('INSERT', 'UPDATE', 'DELETE', 'LOGIN', 'API_CALL', 'SECURITY');
CREATE TYPE ignis_mobile.pricing_type AS ENUM ('retail', 'wholesale', 'dealer_specific');
CREATE TYPE ignis_mobile.provisioning_job_status AS ENUM ('queued', 'processing', 'completed', 'failed');
CREATE TYPE ignis_mobile.balance_transaction_type AS ENUM ('credit', 'debit');

-- =============================================================================
-- 2. CORE TABLE DEFINITIONS
-- =============================================================================

-- Organizations for dealers, enterprises, and internal Ignis Mobile teams.
CREATE TABLE ignis_mobile.organizations (
    org_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    is_dealer BOOLEAN NOT NULL DEFAULT TRUE,
    billing_details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE ignis_mobile.organizations IS 'Stores B2B dealer/enterprise data. A special org exists for Ignis Mobile internal staff.';

-- User profiles, linking Supabase Auth, our app data, and Gigs.
CREATE TABLE ignis_mobile.app_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    gigs_user_id TEXT UNIQUE,
    full_name TEXT,
    email TEXT,
    profile_data JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE ignis_mobile.app_users IS 'Local user profiles linking Supabase Auth and Gigs users. Can be a customer or an org member.';

-- Consolidated role management for all users within organizations.
CREATE TABLE ignis_mobile.org_users (
    org_user_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES ignis_mobile.app_users(user_id) ON DELETE CASCADE,
    org_id UUID NOT NULL REFERENCES ignis_mobile.organizations(org_id) ON DELETE CASCADE,
    role ignis_mobile.org_user_role NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, org_id)
);
COMMENT ON TABLE ignis_mobile.org_users IS 'Assigns roles to users within organizations (e.g., dealer_manager, super_admin for Ignis HQ).';

-- Ignis Mobile's curated device e-commerce catalog.
CREATE TABLE ignis_mobile.devices (
    device_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    model TEXT NOT NULL,
    brand TEXT NOT NULL,
    category ignis_mobile.device_category NOT NULL,
    base_price NUMERIC(10, 2) NOT NULL CHECK (base_price >= 0),
    currency CHAR(3) NOT NULL DEFAULT 'USD',
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    specifications JSONB NOT NULL,
    image_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(brand, model)
);
COMMENT ON TABLE ignis_mobile.devices IS 'Serves as our E-commerce product catalog, which Gigs does not provide. Includes stock and marketing info.';

-- Tiered pricing for devices and plans.
CREATE TABLE ignis_mobile.pricing_tiers (
    pricing_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    entity_type TEXT NOT NULL CHECK (entity_type IN ('device', 'plan')),
    entity_id UUID NOT NULL,
    org_id UUID REFERENCES ignis_mobile.organizations(org_id) ON DELETE CASCADE,
    pricing_type ignis_mobile.pricing_type NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(entity_type, entity_id, org_id, pricing_type)
);
COMMENT ON TABLE ignis_mobile.pricing_tiers IS 'Our core business logic for B2B pricing. Gigs API only knows about a single price per plan.';

-- Local cache of Gigs Plans.
CREATE TABLE ignis_mobile.plans (
    plan_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    gigs_plan_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    short_description TEXT,
    base_price NUMERIC(10, 2) NOT NULL,
    currency CHAR(3) NOT NULL,
    sim_type ignis_mobile.plan_sim_type NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    gigs_data JSONB,
    last_synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE ignis_mobile.plans IS 'A performant local cache of Gigs plans. Gigs is the source of truth. Updated via webhooks or a scheduled job.';

-- E-commerce orders, enhanced to link with Gigs Billing objects.
CREATE TABLE ignis_mobile.orders (
    order_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    customer_user_id UUID NOT NULL REFERENCES ignis_mobile.app_users(user_id) ON DELETE RESTRICT,
    placed_by_user_id UUID NOT NULL REFERENCES ignis_mobile.app_users(user_id) ON DELETE RESTRICT,
    org_id UUID REFERENCES ignis_mobile.organizations(org_id) ON DELETE SET NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'USD',
    status ignis_mobile.order_status NOT NULL DEFAULT 'draft',
    payment_method ignis_mobile.order_payment_method,
    gigs_quote_id TEXT UNIQUE,
    gigs_invoice_id TEXT UNIQUE,
    gigs_payment_link_id TEXT UNIQUE,
    square_checkout_session_id TEXT UNIQUE,
    shipping_address JSONB,
    line_items JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE ignis_mobile.orders IS 'Tracks e-commerce purchases. Links our business transaction to Gigs billing objects. Status is updated via Gigs webhooks.';

-- Gigs Subscriptions, linked to our local entities.
CREATE TABLE ignis_mobile.subscriptions (
    subscription_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    gigs_subscription_id TEXT NOT NULL UNIQUE,
    customer_user_id UUID NOT NULL REFERENCES ignis_mobile.app_users(user_id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES ignis_mobile.plans(plan_id) ON DELETE RESTRICT,
    order_id UUID REFERENCES ignis_mobile.orders(order_id) ON DELETE SET NULL,
    gigs_sim_iccid TEXT,
    status_cache ignis_mobile.subscription_status_cache NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE ignis_mobile.subscriptions IS 'Our local reference to a Gigs subscription. Status is a cache updated via webhooks from Gigs Events.';

-- Dealer balance ledger for cash/credit transactions.
CREATE TABLE ignis_mobile.dealer_balances (
    balance_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES ignis_mobile.organizations(org_id) ON DELETE CASCADE,
    transaction_type ignis_mobile.balance_transaction_type NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'USD',
    order_id UUID REFERENCES ignis_mobile.orders(order_id),
    description TEXT,
    created_by_user_id UUID REFERENCES ignis_mobile.app_users(user_id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE ignis_mobile.dealer_balances IS 'Internal ledger for dealer credit/debit, essential for pre-paid and cash sales models.';

-- Asynchronous provisioning queue.
CREATE TABLE ignis_mobile.gigs_provisioning_queue (
    job_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    job_type TEXT NOT NULL,
    payload JSONB NOT NULL,
    status ignis_mobile.provisioning_job_status NOT NULL DEFAULT 'queued',
    attempts INT NOT NULL DEFAULT 0,
    last_attempt_at TIMESTAMPTZ,
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE ignis_mobile.gigs_provisioning_queue IS 'Queue for asynchronous, resilient Gigs API calls. A Supabase Edge Function will process these jobs.';

-- Other essential tables for a complete application.
CREATE TABLE ignis_mobile.legal_policies ( 
    policy_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(), 
    type ignis_mobile.legal_policy_type NOT NULL, 
    version TEXT NOT NULL, 
    content TEXT NOT NULL, 
    is_active BOOLEAN NOT NULL DEFAULT FALSE, 
    effective_date DATE NOT NULL, 
    UNIQUE (type, version) 
);

CREATE TABLE ignis_mobile.cms_content ( 
    content_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(), 
    slug TEXT UNIQUE NOT NULL, 
    content_data JSONB NOT NULL, 
    is_published BOOLEAN NOT NULL DEFAULT FALSE, 
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW() 
);

CREATE TABLE ignis_mobile.audit_logs ( 
    log_id BIGSERIAL PRIMARY KEY, 
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    user_id UUID REFERENCES ignis_mobile.app_users(user_id), 
    org_id UUID REFERENCES ignis_mobile.organizations(org_id), 
    ip_address INET, 
    action ignis_mobile.audit_action NOT NULL, 
    entity_type TEXT, 
    entity_id TEXT, 
    details JSONB 
);

-- =============================================================================
-- 3. INDEXES AND PERFORMANCE
-- =============================================================================
CREATE INDEX ON ignis_mobile.app_users (gigs_user_id);
CREATE INDEX ON ignis_mobile.subscriptions (customer_user_id);
CREATE INDEX ON ignis_mobile.subscriptions (order_id);
CREATE INDEX ON ignis_mobile.orders (customer_user_id);
CREATE INDEX ON ignis_mobile.orders (placed_by_user_id);
CREATE INDEX ON ignis_mobile.orders (org_id);
CREATE INDEX ON ignis_mobile.orders (gigs_invoice_id);
CREATE INDEX ON ignis_mobile.dealer_balances (org_id);
CREATE INDEX ON ignis_mobile.gigs_provisioning_queue (status, created_at);
CREATE INDEX ON ignis_mobile.audit_logs (user_id, timestamp DESC);
CREATE INDEX ON ignis_mobile.audit_logs (entity_type, entity_id);
CREATE INDEX ON ignis_mobile.devices (category);
CREATE INDEX ON ignis_mobile.devices USING GIN (specifications);
CREATE INDEX ON ignis_mobile.pricing_tiers (entity_type, entity_id, org_id);

-- =============================================================================
-- 4. FUNCTIONS AND BUSINESS LOGIC
-- =============================================================================
CREATE OR REPLACE FUNCTION ignis_mobile.user_has_role(p_user_id UUID, p_role ignis_mobile.org_user_role)
RETURNS BOOLEAN AS $$ 
SELECT EXISTS (
    SELECT 1 FROM ignis_mobile.org_users ou 
    WHERE ou.user_id = p_user_id AND ou.role = p_role
); 
$$ LANGUAGE sql STABLE SECURITY INVOKER;

CREATE OR REPLACE FUNCTION ignis_mobile.get_applicable_price(p_org_id UUID, p_entity_type TEXT, p_entity_id UUID)
RETURNS JSONB AS $$
DECLARE result RECORD;
BEGIN
  -- Try dealer-specific pricing first
  SELECT price, 'USD' as currency, pricing_type INTO result 
  FROM ignis_mobile.pricing_tiers 
  WHERE entity_type = p_entity_type AND entity_id = p_entity_id AND org_id = p_org_id AND pricing_type = 'dealer_specific' 
  LIMIT 1;
  
  IF FOUND THEN RETURN to_jsonb(result); END IF;
  
  -- Try wholesale pricing
  SELECT price, 'USD' as currency, pricing_type INTO result 
  FROM ignis_mobile.pricing_tiers 
  WHERE entity_type = p_entity_type AND entity_id = p_entity_id AND org_id IS NULL AND pricing_type = 'wholesale' 
  LIMIT 1;
  
  IF FOUND THEN RETURN to_jsonb(result); END IF;
  
  -- Fall back to retail pricing
  IF p_entity_type = 'device' THEN 
    SELECT base_price AS price, currency, 'retail'::ignis_mobile.pricing_type INTO result 
    FROM ignis_mobile.devices WHERE device_id = p_entity_id;
  ELSE 
    SELECT base_price AS price, currency, 'retail'::ignis_mobile.pricing_type INTO result 
    FROM ignis_mobile.plans WHERE plan_id = p_entity_id;
  END IF;
  
  RETURN to_jsonb(result);
END;
$$ LANGUAGE plpgsql STABLE SECURITY INVOKER;

CREATE OR REPLACE FUNCTION ignis_mobile.get_device_model_from_imei(p_imei TEXT)
RETURNS JSONB AS $$
BEGIN
  -- STUB: In production this will be an Edge Function that calls Gigs API
  RETURN '{ "object": "deviceModel", "id": "dmd_mock_esim_compatible", "brand": "Google", "name": "Pixel Mock", "simTypes": ["eSIM", "pSIM"], "type": "smartphone" }';
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION ignis_mobile.get_device_model_from_imei IS 'STUB: To be replaced by Edge Function calling Gigs /deviceModels/search API';

-- =============================================================================
-- 5. TRIGGERS
-- =============================================================================
CREATE OR REPLACE FUNCTION public.queue_gigs_user_creation()
RETURNS TRIGGER AS $$
BEGIN
  -- Create local user profile immediately
  INSERT INTO ignis_mobile.app_users (user_id, email, full_name) 
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  
  -- Queue Gigs user creation job
  INSERT INTO ignis_mobile.gigs_provisioning_queue (job_type, payload)
  VALUES ('CREATE_GIGS_USER', jsonb_build_object(
    'user_id', NEW.id, 
    'email', NEW.email, 
    'full_name', NEW.raw_user_meta_data->>'full_name'
  ));
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created 
AFTER INSERT ON auth.users 
FOR EACH ROW EXECUTE FUNCTION public.queue_gigs_user_creation();

CREATE OR REPLACE FUNCTION ignis_mobile.trigger_set_timestamp()
RETURNS TRIGGER AS $$ 
BEGIN 
  NEW.updated_at = NOW(); 
  RETURN NEW; 
END; 
$$ LANGUAGE plpgsql;

-- Add timestamp triggers to relevant tables
CREATE TRIGGER set_updated_at BEFORE UPDATE ON ignis_mobile.organizations FOR EACH ROW EXECUTE FUNCTION ignis_mobile.trigger_set_timestamp();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON ignis_mobile.app_users FOR EACH ROW EXECUTE FUNCTION ignis_mobile.trigger_set_timestamp();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON ignis_mobile.devices FOR EACH ROW EXECUTE FUNCTION ignis_mobile.trigger_set_timestamp();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON ignis_mobile.orders FOR EACH ROW EXECUTE FUNCTION ignis_mobile.trigger_set_timestamp();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON ignis_mobile.subscriptions FOR EACH ROW EXECUTE FUNCTION ignis_mobile.trigger_set_timestamp();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON ignis_mobile.cms_content FOR EACH ROW EXECUTE FUNCTION ignis_mobile.trigger_set_timestamp();

-- =============================================================================
-- 6. ROW-LEVEL SECURITY (RLS) POLICIES
-- =============================================================================
ALTER TABLE ignis_mobile.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ignis_mobile.app_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE ignis_mobile.org_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE ignis_mobile.devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE ignis_mobile.pricing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ignis_mobile.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE ignis_mobile.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ignis_mobile.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE ignis_mobile.legal_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE ignis_mobile.cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE ignis_mobile.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ignis_mobile.dealer_balances ENABLE ROW LEVEL SECURITY;

-- Public read-only access for catalogs and legal info
CREATE POLICY "Public can view active catalogs and policies" ON ignis_mobile.devices FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Public can view active catalogs and policies" ON ignis_mobile.plans FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Public can view active catalogs and policies" ON ignis_mobile.legal_policies FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Public can view published CMS content" ON ignis_mobile.cms_content FOR SELECT TO anon, authenticated USING (is_published = true);

-- Authenticated User (B2C Customer) access
CREATE POLICY "Users can manage their own profile and view their data" ON ignis_mobile.app_users FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can manage their own profile and view their data" ON ignis_mobile.subscriptions FOR SELECT USING (auth.uid() = customer_user_id);
CREATE POLICY "Users can manage their own profile and view their data" ON ignis_mobile.orders FOR SELECT USING (auth.uid() = customer_user_id);
CREATE POLICY "Users can view their own org membership" ON ignis_mobile.org_users FOR SELECT USING (auth.uid() = user_id);

-- Dealer (B2B Org User) access
CREATE POLICY "Dealers can view their own org info" ON ignis_mobile.organizations FOR SELECT USING (org_id IN (SELECT org_id FROM ignis_mobile.org_users WHERE user_id = auth.uid()));
CREATE POLICY "Dealers can view their own org and staff" ON ignis_mobile.org_users FOR SELECT USING (org_id IN (SELECT org_id FROM ignis_mobile.org_users WHERE user_id = auth.uid()));
CREATE POLICY "Dealers can manage their orgs orders" ON ignis_mobile.orders FOR ALL USING (org_id IN (SELECT org_id FROM ignis_mobile.org_users WHERE user_id = auth.uid()));
CREATE POLICY "Dealers can view their orgs pricing" ON ignis_mobile.pricing_tiers FOR SELECT USING (org_id IN (SELECT org_id FROM ignis_mobile.org_users WHERE user_id = auth.uid()) OR org_id IS NULL);
CREATE POLICY "Dealers can manage their balance" ON ignis_mobile.dealer_balances FOR ALL USING (org_id IN (SELECT org_id FROM ignis_mobile.org_users WHERE user_id = auth.uid()));

-- Super Admin access (God Mode)
CREATE POLICY "Super Admins have full access" ON ignis_mobile.organizations FOR ALL USING (ignis_mobile.user_has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super Admins have full access" ON ignis_mobile.app_users FOR ALL USING (ignis_mobile.user_has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super Admins have full access" ON ignis_mobile.org_users FOR ALL USING (ignis_mobile.user_has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super Admins have full access" ON ignis_mobile.devices FOR ALL USING (ignis_mobile.user_has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super Admins have full access" ON ignis_mobile.pricing_tiers FOR ALL USING (ignis_mobile.user_has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super Admins have full access" ON ignis_mobile.plans FOR ALL USING (ignis_mobile.user_has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super Admins have full access" ON ignis_mobile.subscriptions FOR ALL USING (ignis_mobile.user_has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super Admins have full access" ON ignis_mobile.orders FOR ALL USING (ignis_mobile.user_has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super Admins have full access" ON ignis_mobile.legal_policies FOR ALL USING (ignis_mobile.user_has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super Admins have full access" ON ignis_mobile.cms_content FOR ALL USING (ignis_mobile.user_has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super Admins have full access" ON ignis_mobile.audit_logs FOR ALL USING (ignis_mobile.user_has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super Admins have full access" ON ignis_mobile.dealer_balances FOR ALL USING (ignis_mobile.user_has_role(auth.uid(), 'super_admin'));

COMMIT;