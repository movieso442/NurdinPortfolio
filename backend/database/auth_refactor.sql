-- Refactor for 2-Stage Onboarding (Phase 1)

-- 1. Modify users table to handle application state
ALTER TABLE users ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE users ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS application_status TEXT CHECK (application_status IN ('PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED')) DEFAULT 'PENDING';

-- 2. Application Details table for multi-step data
CREATE TABLE IF NOT EXISTS application_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Academic Information
    highest_education TEXT,
    field_of_study TEXT,
    occupation TEXT,
    experience_level TEXT,
    github_link TEXT,
    device_type TEXT,
    internet_reliability TEXT,
    
    -- Motivation & Commitment
    motivation TEXT,
    goals TEXT,
    commitment_hours INTEGER,
    previous_training TEXT,
    referral_source TEXT,
    
    -- Admin Notes
    admin_notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Ensure coupons table is ready for per-user assignment
ALTER TABLE coupons ADD COLUMN IF NOT EXISTS status TEXT CHECK (status IN ('ACTIVE', 'USED', 'EXPIRED')) DEFAULT 'ACTIVE';
ALTER TABLE coupons ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id) ON DELETE CASCADE;
