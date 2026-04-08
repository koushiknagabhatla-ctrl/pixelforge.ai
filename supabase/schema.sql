-- PixelForge AI — Supabase Database Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- ============================================
-- USERS TABLE (extends Supabase auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    credits INTEGER DEFAULT 5 NOT NULL,
    plan TEXT DEFAULT 'free' NOT NULL CHECK (plan IN ('free', 'pro', 'business')),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ============================================
-- ENHANCEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.enhancements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    original_url TEXT NOT NULL,
    enhanced_url TEXT NOT NULL,
    mode TEXT NOT NULL CHECK (mode IN ('auto', 'portrait', 'landscape', 'old_photo', 'low_light', 'remove_bg', 'denoise')),
    scale INTEGER DEFAULT 2 NOT NULL CHECK (scale IN (2, 4, 8)),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_enhancements_user_id ON public.enhancements(user_id);
CREATE INDEX IF NOT EXISTS idx_enhancements_created_at ON public.enhancements(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enhancements_mode ON public.enhancements(mode);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on both tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enhancements ENABLE ROW LEVEL SECURITY;

-- Users: can read their own data
CREATE POLICY "Users can view own data"
    ON public.users
    FOR SELECT
    USING (auth.uid() = id);

-- Users: can update their own data
CREATE POLICY "Users can update own data"
    ON public.users
    FOR UPDATE
    USING (auth.uid() = id);

-- Users: allow insert for new signups (triggered by auth hook or service key)
CREATE POLICY "Allow insert for authenticated users"
    ON public.users
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Enhancements: users can view their own
CREATE POLICY "Users can view own enhancements"
    ON public.enhancements
    FOR SELECT
    USING (auth.uid() = user_id);

-- Enhancements: users can insert their own
CREATE POLICY "Users can insert own enhancements"
    ON public.enhancements
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- ============================================
-- SERVICE ROLE BYPASS (for backend operations)
-- ============================================
-- The backend uses SUPABASE_SERVICE_KEY which bypasses RLS automatically.
-- No additional policies needed for service role.

-- ============================================
-- FUNCTION: Auto-create user on signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, credits, plan)
    VALUES (NEW.id, NEW.email, 5, 'free')
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: run on every new auth signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
