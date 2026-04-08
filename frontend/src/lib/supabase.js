import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase environment variables are missing. \n' +
    'Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file (local) or Vercel Environment Variables (production).'
  )
}

// Fallback to valid-looking URL to avoid DNS errors, but will still fail authentication gracefully
export const supabase = createClient(
  supabaseUrl || 'https://lib-empty.supabase.co',
  supabaseAnonKey || 'empty'
)
