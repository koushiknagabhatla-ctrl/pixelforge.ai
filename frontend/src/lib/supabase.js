import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase environment variables are missing. \n' +
    'Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file (local) or Vercel Environment Variables (production).'
  )
}

// Fallback to your ACTUAL URL to ensure Google Login works even if .env fails to load
export const supabase = createClient(
  supabaseUrl || 'https://iljyupclxvjwqzltufru.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlsanl1cGNseHZqd3F6bHR1ZnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0OTI5NDMsImV4cCI6MjA5MTA2ODk0M30.dvNnFXVh5J0HLsx_29F0fF14K0fglErx1nmAwspEMK0'
)
