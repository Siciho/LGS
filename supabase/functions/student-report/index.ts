import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.0";

// Gelen isteklere doğru yanıt vermek için CORS başlıkları
const corsHeaders = {
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Gelen isteğin Origin'ini kontrol et ve izin verilenler listesine ekle
  const origin = req.headers.get("Origin") || "";
  const allowedOrigins = [
    'http://localhost:8080',      // Yerel geliştirme ortamı (Vite)
    'capacitor://localhost',      // Capacitor iOS/Android için standart Origin
    'http://localhost',           // Capacitor Android için ek Origin
    // Buraya Vercel'deki canlı site adreslerini de ekleyebilirsin
    // 'https://siciho2026.vercel.app' 
  ];

  // --- DÜZELTME BURADA: 'headers' değişkenine esnek bir tip atıyoruz ---
  const headers: { [key: string]: string } = { ...corsHeaders };
  
  // Eğer istek, izin verilen bir adresten geliyorsa VEYA bir Vercel deploy'u ise, ona izin ver
  if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  // Tarayıcının gönderdiği OPTIONS (ön kontrol) isteğini doğru başlıklarla yanıtla
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers });
  }

  try {
    // 1. İstek yapan kullanıcının kimliğini doğrula
    const userSupabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );
    const { data: { user } } = await userSupabaseClient.auth.getUser();
    if (!user) throw new Error("Authentication error: User not found.");

    // 2. İstek yapan kullanıcının rolünü kontrol et (koç veya admin mi?)
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

    // 5. Öğrencinin bilgilerini ve soru kayıtlarını güvenli bir şekilde çek
    const studentPromise = adminSupabaseClient.from('kullanicilar').select('ad_soyad, koc_kodu').eq('id', student_id).single();
    const recordsPromise = adminSupabaseClient.from('cozulen_sorular').select('*').eq('kullanici_id', student_id);
    
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
    // Hata durumunda yanıt gönder
    return new Response(JSON.stringify({ error: (error as Error).message }), { // 'error' tipini 'Error' olarak belirttik
      headers: { ...headers, "Content-Type": "application/json" },
      status: 400,
    });
  }
});