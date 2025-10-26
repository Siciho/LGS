import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.0";

const corsHeaders = {
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Haftanın başlangıcını (Pazartesi) bulan yardımcı fonksiyon
const getMonday = (d: Date) => {
  d = new Date(d);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
};

serve(async (req) => {
  const origin = req.headers.get("Origin") || "";
  const allowedOrigins = [
    'http://localhost:8080', 'capacitor://localhost', 'http://localhost',
    'https://siciho2026.vercel.app' // Vercel adresinizi de ekleyebilirsiniz
  ];
  const headers: { [key: string]: string } = { ...corsHeaders };
  if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers });
  }

  try {
    // 1. Kullanıcıyı ve rolünü doğrula (Aynı kaldı)
    const userSupabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );
    const { data: { user } } = await userSupabaseClient.auth.getUser();
    if (!user) throw new Error("Authentication error: User not found.");
    const { data: userProfile, error: profileError } = await userSupabaseClient
      .from('kullanicilar').select('rol, koc_kodu').eq('id', user.id).single();
    if (profileError) throw profileError;
    if (userProfile.rol !== 'admin' && userProfile.rol !== 'koç') {
      throw new Error("Authorization error: Not an admin or a coach.");
    }
    
    // 2. İstekten öğrenci ID'sini ve zaman filtresini al
    const { student_id, time_frame } = await req.json(); // time_frame: 'all', 'week', 'month-9', 'month-10' vb.
    if (!student_id) throw new Error("Request error: 'student_id' is required.");

    // 3. Admin istemcisini oluştur (Aynı kaldı)
    const adminSupabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 4. Veritabanı sorgusunu hazırla
    const studentPromise = adminSupabaseClient.from('kullanicilar').select('ad_soyad, koc_kodu').eq('id', student_id).single();
    
    // --- DEĞİŞİKLİK BURADA: Sorguya dinamik zaman filtresi ekleniyor ---
    let recordsQuery = adminSupabaseClient
      .from('cozulen_sorular')
      .select('*')
      .eq('kullanici_id', student_id)
      .neq('konu', 'Günlük Test');

    const now = new Date();
    const currentYear = now.getFullYear();

    if (time_frame === 'week') {
      // Filtre: Bu Hafta (Pazartesi'den itibaren)
      const startOfWeek = getMonday(now);
      recordsQuery = recordsQuery.gte('eklenme_zamani', startOfWeek.toISOString());
    } else if (time_frame && time_frame.startsWith('month-')) {
      // Filtre: Belirli bir ay (Örn: 'month-9' = Eylül)
      // JavaScript'te aylar 0'dan başlar (Ocak=0, Eylül=8)
      const monthIndex = parseInt(time_frame.split('-')[1]) - 1;
      
      // O ayın ilk gününü bul
      const startDate = new Date(currentYear, monthIndex, 1);
      // Bir sonraki ayın ilk gününü bul (bu, bitiş sınırımız olacak)
      const endDate = new Date(currentYear, monthIndex + 1, 1);

      recordsQuery = recordsQuery
        .gte('eklenme_zamani', startDate.toISOString()) // Ayın 1'inden büyük veya eşit
        .lt('eklenme_zamani', endDate.toISOString());   // Bir sonraki ayın 1'inden küçük
    }
    // Eğer time_frame 'all' ise, ekstra filtre eklenmez.

    const recordsPromise = recordsQuery;
    // --- DEĞİŞİKLİK SONU ---
      
    const [{ data: studentData, error: studentError }, { data: records, error: recordsError }] = await Promise.all([studentPromise, recordsPromise]);
    
    if (studentError) throw studentError;
    if (recordsError) throw recordsError;

    // 5. Yetki kontrolü ve yanıt (Aynı kaldı)
    if (userProfile.rol === 'koç' && userProfile.koc_kodu !== studentData.koc_kodu) {
        throw new Error("Authorization error: Coach can only view their own students.");
    }
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