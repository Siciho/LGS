// İçerik, daha önce CORS hatasını çözdüğümüz son haliyle aynı...
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  try {
    const userSupabaseClient = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_ANON_KEY') ?? '', { global: { headers: { Authorization: req.headers.get('Authorization')! } } });
    const { data: { user } } = await userSupabaseClient.auth.getUser();
    if (!user) throw new Error("Kullanıcı bulunamadı.");
    const { data: adminProfile, error: adminError } = await userSupabaseClient.from('kullanicilar').select('rol').eq('id', user.id).single();
    if (adminError || (adminProfile?.rol !== 'admin' && adminProfile?.rol !== 'koç')) {
      throw new Error("Bu işlemi yapmaya yetkiniz yok.");
    }
    const { user_id, new_password } = await req.json();
    if (!user_id || !new_password) {
      throw new Error("Kullanıcı ID ve yeni şifre gereklidir.");
    }
    const adminClient = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    const { error: updateError } = await adminClient.auth.admin.updateUserById(user_id, { password: new_password });
    if (updateError) throw updateError;
    return new Response(JSON.stringify({ message: "Şifre başarıyla güncellendi." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});