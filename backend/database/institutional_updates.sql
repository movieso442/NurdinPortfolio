-- Phase 3: Institutional Data Partitioning

-- 1. Link users to institutions
ALTER TABLE users ADD COLUMN IF NOT EXISTS institution_id UUID REFERENCES institutions(id) ON DELETE SET NULL;

-- 2. Link courses to institutions (Optional - empty means public)
ALTER TABLE courses ADD COLUMN IF NOT EXISTS institution_id UUID REFERENCES institutions(id) ON DELETE SET NULL;

-- 3. Add announcement support for institutions
CREATE TABLE IF NOT EXISTS institutional_announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID REFERENCES institutions(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
