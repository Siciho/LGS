import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.0";

const corsHeaders = {
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  const origin = req.headers.get("Origin") || "";
  const allowedOrigins = [
    'http://localhost:8080',
    'capacitor://localhost',
    'http://localhost',
    'https://siciho2026.vercel.app' // Vercel adresini de ekleyebiliriz
  ];

  const headers: { [key: string]: string } = { ...corsHeaders };
  if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers });
  }

  try {
    // 1. İstek yapan kullanıcının kimliğini ve yetkisini doğrula
    const userSupabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );
    const { data: { user } } = await userSupabaseClient.auth.getUser();
    if (!user) throw new Error("Authentication error: User not found.");

    const { data: userProfile, error: profileError } = await userSupabaseClient
      .from('kullanicilar')
      .select('rol, koc_kodu')
      .eq('id', user.id)
      .single();

    if (profileError) throw profileError;
    if (userProfile.rol !== 'admin' && userProfile.rol !== 'koç') {
      throw new Error("Authorization error: Not an admin or a coach.");
    }
    
    // 3. İstekten öğrenci ID'sini al
    const { student_id } = await req.json();
    if (!student_id) throw new Error("Request error: 'student_id' is required.");

    // 4. Admin yetkileriyle yeni bir Supabase istemcisi oluştur
    const adminSupabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 5. Öğrencinin bilgilerini ve FİLTRELENMİŞ soru kayıtlarını çek
    const studentPromise = adminSupabaseClient.from('kullanicilar').select('ad_soyad, koc_kodu').eq('id', student_id).single();
    
    // --- DEĞİŞİKLİK BURADA: 'konu' sütunu 'Günlük Test' OLMAYAN kayıtları getir (.neq()) ---
    const recordsPromise = adminSupabaseClient
      .from('cozulen_sorular')
      .select('*')
      .eq('kullanici_id', student_id)
      .neq('konu', 'Günlük Test'); 
      
    const [{ data: studentData, error: studentError }, { data: records, error: recordsError }] = await Promise.all([studentPromise, recordsPromise]);
    
    if (studentError) throw studentError;
    if (recordsError) throw recordsError;

    // 6. Koçun, sadece kendi öğrencisini görebildiğini doğrula
    if (userProfile.rol === 'koç' && userProfile.koc_kodu !== studentData.koc_kodu) {
        throw new Error("Authorization error: Coach can only view their own students.");
    }

    // 7. Başarılı yanıtı gönder
    return new Response(JSON.stringify({ records: records, student_name: studentData.ad_soyad }), {
      headers: { ...headers, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { ...headers, "Content-Type": "application/json" },
      status: 400,
    });
  }
});