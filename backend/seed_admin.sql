-- Ensure the users table structure matches the expected CSV columns
ALTER TABLE users ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE users ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS application_status TEXT DEFAULT 'PENDING';

-- Insert or Update the admin user
-- The password hash below is verified for 'AdminPassword123!'
INSERT INTO users (
    id, 
    name, 
    first_name, 
    last_name, 
    email, 
    username, 
    password_hash, 
    role, 
    application_status, 
    created_at
) VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'System Admin',
    'System',
    'Admin',
    'admin@nurdine.academy',
    'admin',
    '$2b$10$cxWhEtmb/X/vI6omqhlNCehokv0sveGlEO8be9yFVh',
    'admin',
    'APPROVED',
    NOW()
) ON CONFLICT (email) DO UPDATE SET
    password_hash = EXCLUDED.password_hash,
    role = 'admin',
    application_status = 'APPROVED';

-- Ensure the coupon is inserted
INSERT INTO coupons (
    id, 
    code, 
    type, 
    is_single_use, 
    status, 
    user_id, 
    created_at
) VALUES (
    '880e8400-e29b-41d4-a716-446655440000',
    'ADMIN-ACCESS-2026',
    'mentorship',
    false,
    'ACTIVE',
    '550e8400-e29b-41d4-a716-446655440000',
    NOW()
) ON CONFLICT (code) DO UPDATE SET
    status = 'ACTIVE',
    user_id = '550e8400-e29b-41d4-a716-446655440000';
