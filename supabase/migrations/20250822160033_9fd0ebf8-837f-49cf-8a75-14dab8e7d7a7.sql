-- Add get_my_role function for admin access
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS admin_role AS $$
BEGIN
  RETURN (
    SELECT role 
    FROM admin_users 
    WHERE admin_user_id = auth.uid()
    AND is_active = true
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Seed devices without ON CONFLICT since we don't know the unique constraints
INSERT INTO public.device_product_models (name, specs, is_active, gigs_device_model_id) 
SELECT 'Apple iPhone 15', '{"storage_gb": 128, "color": "Blue", "camera_mp": 48, "eSIM_compatible": true, "brand": "Apple", "category": "Essential & Affordable", "price": 799.00}', true, 'apple_iphone_15'
WHERE NOT EXISTS (SELECT 1 FROM public.device_product_models WHERE name = 'Apple iPhone 15');

INSERT INTO public.device_product_models (name, specs, is_active, gigs_device_model_id) 
SELECT 'Apple iPhone 15 Pro', '{"storage_gb": 256, "color": "Natural Titanium", "camera_mp": 48, "eSIM_compatible": true, "brand": "Apple", "category": "Photography & Film", "price": 999.00}', true, 'apple_iphone_15_pro'
WHERE NOT EXISTS (SELECT 1 FROM public.device_product_models WHERE name = 'Apple iPhone 15 Pro');

INSERT INTO public.device_product_models (name, specs, is_active, gigs_device_model_id) 
SELECT 'Samsung Galaxy S24 Ultra', '{"storage_gb": 512, "color": "Titanium Gray", "camera_mp": 200, "eSIM_compatible": true, "brand": "Samsung", "category": "Entrepreneur PowerUser", "price": 1299.00}', true, 'samsung_s24_ultra'
WHERE NOT EXISTS (SELECT 1 FROM public.device_product_models WHERE name = 'Samsung Galaxy S24 Ultra');

INSERT INTO public.device_product_models (name, specs, is_active, gigs_device_model_id) 
SELECT 'Google Pixel 8', '{"storage_gb": 128, "color": "Obsidian", "camera_mp": 50, "eSIM_compatible": true, "brand": "Google", "category": "Photography & Film", "price": 699.00}', true, 'google_pixel_8'
WHERE NOT EXISTS (SELECT 1 FROM public.device_product_models WHERE name = 'Google Pixel 8');

-- Seed plans
INSERT INTO public.plan_product_models (name, gigs_plan_id) 
SELECT 'Global eSIM 5GB', 'pln_gigs_esim_global_5gb'
WHERE NOT EXISTS (SELECT 1 FROM public.plan_product_models WHERE name = 'Global eSIM 5GB');

INSERT INTO public.plan_product_models (name, gigs_plan_id) 
SELECT 'USA Unlimited pSIM', 'pln_gigs_psim_us_unlimited'
WHERE NOT EXISTS (SELECT 1 FROM public.plan_product_models WHERE name = 'USA Unlimited pSIM');

-- Create sample admin user for testing
INSERT INTO public.admin_users (admin_user_id, role, email, full_name, is_active) 
SELECT '00000000-0000-0000-0000-000000000001', 'SUPER_ADMIN', 'admin@ignismobile.com', 'Super Admin', true
WHERE NOT EXISTS (SELECT 1 FROM public.admin_users WHERE admin_user_id = '00000000-0000-0000-0000-000000000001');