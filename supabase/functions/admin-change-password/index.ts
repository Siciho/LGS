import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.0";

serve(async (req) => {
  const origin = req.headers.get("Origin") || "";
  
  // CORS başlıkları: capacitor, local dev (5173 vb.) ve vercel için uyumlu hale getirildi
  const headers = {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
    'Access-Control-Allow-Credentials': 'true',
  };

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error("Yetkilendirme başlığı bulunamadı.");
    }

    const userSupabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );
    
    const { data: { user }, error: authError } = await userSupabaseClient.auth.getUser();
    if (authError || !user) throw new Error("Oturum doğrulanamadı veya kullanıcı bulunamadı.");
    
    // RLS kısıtlamalarından etkilenmemek için rol kontrolünü adminClient (service role) ile yapıyoruz
    const adminClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: adminProfile, error: adminError } = await adminClient
      .from('kullanicilar')
      .select('rol')
      .eq('id', user.id)
      .single();

    if (adminError || !adminProfile || (adminProfile.rol !== 'admin' && adminProfile.rol !== 'koç')) {
      throw new Error("Bu işlemi yapmaya yetkiniz yok.");
    }

    const { user_id, new_password } = await req.json();
    if (!user_id || !new_password) {
      throw new Error("Kullanıcı ID ve yeni şifre gereklidir.");
    }

    const { error: updateError } = await adminClient.auth.admin.updateUserById(
      user_id,
      { password: new_password }
    );

    if (updateError) throw updateError;

    return new Response(JSON.stringify({ message: "Şifre başarıyla güncellendi." }), {
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