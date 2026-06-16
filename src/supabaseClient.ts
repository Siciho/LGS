import { createClient } from '@supabase/supabase-js'

const fallbackUrl = "https://bzrglrqxjhciaofmgozy.supabase.co";
const fallbackAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6cmdscnF4amhjaWFvZm1nb3p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MTUxNzgsImV4cCI6MjA3NDI5MTE3OH0.mahbqSSzBvgdwij91Qy9qaEOTNgTkKGVLZAHWF2jmOg";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || fallbackUrl
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || fallbackAnonKey  // ✅ DÜZELTİLDİ

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL veya ANON KEY bulunamıyor. Lütfen .env dosyanızı kontrol edin.')
}

// Debug log (burada göster)
console.log('✅ Supabase URL:', supabaseUrl)
console.log('✅ Supabase ANON KEY:', supabaseAnonKey?.slice(0, 10) + '...')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
