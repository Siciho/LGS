import { createClient } from '@supabase/supabase-js'

const fallbackUrl = "https://wvxuysrijpronuldpsyp.supabase.co";
const fallbackAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2eHV5c3JpanByb251bGRwc3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNjIwODksImV4cCI6MjA3MjgzODA4OX0.5E7muuJ7Jv7g0p6pgeweGRSirSZWbWjZmY3UuYBIsBc";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || fallbackUrl
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || fallbackAnonKey  // ✅ DÜZELTİLDİ

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL veya ANON KEY bulunamıyor. Lütfen .env dosyanızı kontrol edin.')
}

// Debug log (burada göster)
console.log('✅ Supabase URL:', supabaseUrl)
console.log('✅ Supabase ANON KEY:', supabaseAnonKey?.slice(0, 10) + '...')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
