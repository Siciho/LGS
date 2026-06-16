import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Calendar, Loader2 } from "lucide-react";

export default function AdminSystemSettings() {
  const [lgsDate, setLgsDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("sistem_ayarlari")
          .select("deger")
          .eq("anahtar", "lgs_tarihi")
          .maybeSingle();

        if (error) throw error;

        if (data?.deger) {
          // Format standard datetime-local input format (YYYY-MM-DDTHH:MM)
          const dateVal = data.deger.substring(0, 16);
          setLgsDate(dateVal);
        }
      } catch (err) {
        console.error("LGS tarihi yüklenirken hata:", err);
        toast.error("LGS tarihi veritabanından alınamadı.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    if (!lgsDate) {
      toast.error("Lütfen geçerli bir tarih ve saat seçin.");
      return;
    }

    setSaving(true);
    try {
      // Input formats as YYYY-MM-DDTHH:MM, we can append :00 for standard format
      const formattedDate = lgsDate.includes("T") && lgsDate.split(":").length === 2 
        ? `${lgsDate}:00` 
        : lgsDate;

      const { error } = await supabase
        .from("sistem_ayarlari")
        .update({ deger: formattedDate })
        .eq("anahtar", "lgs_tarihi");

      if (error) throw error;

      // Also update local storage so it reflects immediately for the admin
      localStorage.setItem("lgs_app_target_lgs_date", formattedDate);

      toast.success("LGS Sınav Tarihi başarıyla güncellendi! 🚀");
    } catch (err) {
      console.error("Tarih güncellenirken hata:", err);
      const errorMsg = err instanceof Error ? err.message : String(err);
      toast.error("Tarih kaydedilirken hata oluştu: " + errorMsg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Sınav Tarihi Ayarı
        </CardTitle>
        <CardDescription>
          Öğrencilerin ana sayfasındaki geri sayım sayacının hedef tarihini güncelleyin.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2 text-sm text-muted-foreground">Tarih yükleniyor...</span>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lgs-date-input">LGS Sınav Tarihi ve Saati</Label>
              <Input
                id="lgs-date-input"
                type="datetime-local"
                value={lgsDate}
                onChange={(e) => setLgsDate(e.target.value)}
                className="w-full"
              />
            </div>
            <Button onClick={handleSave} className="w-full" disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Tarihi Güncelle ve Yayınla
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
