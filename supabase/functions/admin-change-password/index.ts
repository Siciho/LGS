import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Tüm kaynaklara izin vererek localhost ve Vercel'i kapsar
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // CORS preflight isteğini yanıtla
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. İstek yapan kullanıcının kimliğini ve admin/koç yetkisini doğrula
    const userSupabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );
    
    const { data: { user } } = await userSupabaseClient.auth.getUser();
    if (!user) throw new Error("Kullanıcı bulunamadı.");
    
    const { data: adminProfile, error: adminError } = await userSupabaseClient
      .from('kullanicilar')
      .select('rol')
      .eq('id', user.id)
      .single();

    if (adminError || (adminProfile?.rol !== 'admin' && adminProfile?.rol !== 'koç')) {
      throw new Error("Bu işlemi yapmaya yetkiniz yok.");
    }

    // 2. İstekten gerekli bilgileri al
    const { user_id, new_password } = await req.json();
    if (!user_id || !new_password) {
      throw new Error("Kullanıcı ID ve yeni şifre gereklidir.");
    }
    
    // 3. Admin yetkileriyle (service_role_key) yeni bir istemci oluştur
    const adminClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 4. Öğrencinin şifresini güncelle
    const { error: updateError } = await adminClient.auth.admin.updateUserById(
      user_id,
      { password: new_password }
    );

    if (updateError) throw updateError;

    // 5. Başarılı yanıtı gönder
    return new Response(JSON.stringify({ message: "Şifre başarıyla güncellendi." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    // Hata durumunda yanıt gönder
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});