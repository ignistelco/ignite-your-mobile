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

-- Seed devices from the ignis_mobile schema into public device tables for compatibility
INSERT INTO public.device_product_models (name, specs, is_active, gigs_device_model_id) VALUES
('Apple iPhone 15', '{"storage_gb": 128, "color": "Blue", "camera_mp": 48, "eSIM_compatible": true, "brand": "Apple", "category": "Essential & Affordable", "price": 799.00}', true, 'apple_iphone_15'),
('Apple iPhone 15 Pro', '{"storage_gb": 256, "color": "Natural Titanium", "camera_mp": 48, "eSIM_compatible": true, "brand": "Apple", "category": "Photography & Film", "price": 999.00}', true, 'apple_iphone_15_pro'),
('Apple iPhone SE', '{"storage_gb": 64, "color": "Midnight", "camera_mp": 12, "eSIM_compatible": true, "brand": "Apple", "category": "Essential & Affordable", "price": 429.00}', true, 'apple_iphone_se'),
('Samsung Galaxy S24 Ultra', '{"storage_gb": 512, "color": "Titanium Gray", "camera_mp": 200, "eSIM_compatible": true, "brand": "Samsung", "category": "Entrepreneur PowerUser", "price": 1299.00}', true, 'samsung_s24_ultra'),
('Samsung Galaxy Z Fold 5', '{"storage_gb": 512, "color": "Icy Blue", "camera_mp": 50, "eSIM_compatible": true, "brand": "Samsung", "category": "Entrepreneur PowerUser", "price": 1799.00}', true, 'samsung_z_fold_5'),
('Google Pixel 8', '{"storage_gb": 128, "color": "Obsidian", "camera_mp": 50, "eSIM_compatible": true, "brand": "Google", "category": "Photography & Film", "price": 699.00}', true, 'google_pixel_8'),
('Google Pixel 8 Pro', '{"storage_gb": 256, "color": "Porcelain", "camera_mp": 50, "eSIM_compatible": true, "brand": "Google", "category": "Photography & Film", "price": 999.00}', true, 'google_pixel_8_pro'),
('CAT S62 Pro', '{"storage_gb": 128, "color": "Black", "camera_mp": 12, "eSIM_compatible": false, "thermal_camera": true, "brand": "CAT", "category": "Rugged & Outdoor", "price": 649.00}', true, 'cat_s62_pro')
ON CONFLICT (name) DO UPDATE SET 
  specs = EXCLUDED.specs,
  is_active = EXCLUDED.is_active,
  gigs_device_model_id = EXCLUDED.gigs_device_model_id;

-- Seed plans for compatibility  
INSERT INTO public.plan_product_models (name, gigs_plan_id) VALUES
('Global eSIM 5GB', 'pln_gigs_esim_global_5gb'),
('USA Unlimited pSIM', 'pln_gigs_psim_us_unlimited'), 
('Europe eSIM 20GB', 'pln_gigs_esim_europe_20gb')
ON CONFLICT (name) DO UPDATE SET gigs_plan_id = EXCLUDED.gigs_plan_id;

-- Create sample admin user for testing (replace with real user ID after auth)
INSERT INTO public.admin_users (admin_user_id, role, email, full_name, is_active) VALUES
('00000000-0000-0000-0000-000000000001', 'SUPER_ADMIN', 'admin@ignismobile.com', 'Super Admin', true)
ON CONFLICT (admin_user_id) DO UPDATE SET 
  role = EXCLUDED.role,
  email = EXCLUDED.email, 
  full_name = EXCLUDED.full_name,
  is_active = EXCLUDED.is_active;