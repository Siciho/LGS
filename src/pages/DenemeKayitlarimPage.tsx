import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronDown, CheckCircle, XCircle, Trash2 } from 'lucide-react'; // Trash2 ikonu eklendi
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"; // AlertDialog eklendi
import { toast } from 'sonner';
import { subjects as allSubjectsData } from '@/data/subjects';
import { cn } from '@/lib/utils';

interface DenemeSonucuDetay {
  ders_id: string;
  dogru_sayisi: number;
  yanlis_sayisi: number;
  net_sayisi: number;
}

interface DenemeKaydi {
  id: number;
  deneme_adi: string;
  olusturulma_zamani: string;
  sonuclar: DenemeSonucuDetay[];
}

const getSubjectName = (subjectId: string) => {
    return allSubjectsData.find(s => s.id === subjectId)?.name || 'Bilinmeyen Ders';
};

export default function DenemeKayitlarimPage() {
  const navigate = useNavigate();
  const [denemeler, setDenemeler] = useState<DenemeKaydi[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDenemeId, setOpenDenemeId] = useState<number | null>(null);

  useEffect(() => {
    const fetchDenemeler = async () => {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_my_denemeler');

      if (error) {
        toast.error("Deneme kayıtları yüklenirken bir hata oluştu.");
        console.error(error);
      } else {
        setDenemeler(data || []);
      }
      setLoading(false);
    };
    fetchDenemeler();
  }, []);

  // --- YENİ EKLENEN SİLME FONKSİYONU ---
  const handleDeleteDeneme = async (denemeId: number) => {
    try {
      const { error } = await supabase.rpc('delete_deneme_sinavi', { p_deneme_id: denemeId });
      if (error) throw error;
      
      // Arayüzden anında kaldır
      setDenemeler(prev => prev.filter(d => d.id !== denemeId));
      toast.success("Deneme kaydı başarıyla silindi.");

    } catch (error: any) {
      console.error("Deneme silinirken hata:", error);
      toast.error("Deneme silinirken bir hata oluştu.", { description: error.message });
    }
  };
  // --- YENİ FONKSİYON SONU ---

  return (
    <div className="space-y-6 animate-slide-up">
      <Button variant="outline" onClick={() => navigate(-1)} className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Geri
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Deneme Sınavı Kayıtlarım</CardTitle>
          <CardDescription>Girdiğin tüm deneme sınavlarının sonuçlarını buradan takip edebilirsin.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <p className="text-center text-muted-foreground p-4">Yükleniyor...</p>
          ) : denemeler.length === 0 ? (
            <p className="text-center text-muted-foreground p-4">Henüz hiç deneme sınavı kaydı eklememişsin.</p>
          ) : (
            denemeler.map(deneme => {
              const isOpen = openDenemeId === deneme.id;
              const toplamNet = deneme.sonuclar?.reduce((sum, s) => sum + s.net_sayisi, 0) || 0;

              return (
                <div key={deneme.id} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 cursor-pointer" onClick={() => setOpenDenemeId(isOpen ? null : deneme.id)}>
                      <h4 className="font-semibold">{deneme.deneme_adi}</h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(deneme.olusturulma_zamani).toLocaleDateString('tr-TR')} - Toplam Net: {toplamNet.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <ChevronDown className={cn('h-5 w-5 transition-transform duration-300 cursor-pointer', isOpen ? 'rotate-180' : '')} onClick={() => setOpenDenemeId(isOpen ? null : deneme.id)} />
                      
                      {/* --- YENİ EKLENEN SİL BUTONU VE ONAY PENCERESİ --- */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Emin misin?</AlertDialogTitle>
                            <AlertDialogDescription>
                              "{deneme.deneme_adi}" adlı deneme kaydını kalıcı olarak silmek üzeresin. Bu işlem geri alınamaz.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>İptal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteDeneme(deneme.id)}>Sil</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      {/* --- SİL BUTONU SONU --- */}
                    </div>
                  </div>
                  {isOpen && (
                    <div className="mt-4 pt-4 border-t space-y-2">
                      <div className="grid grid-cols-4 gap-2 text-xs font-bold text-center text-muted-foreground">
                        <span>Ders</span><span>Doğru</span><span>Yanlış</span><span>Net</span>
                      </div>
                      {deneme.sonuclar?.sort((a,b) => a.ders_id.localeCompare(b.ders_id)).map(sonuc => (
                        <div key={sonuc.ders_id} className="grid grid-cols-4 gap-2 text-sm text-center items-center p-2 bg-background/50 rounded">
                          <span className="font-medium text-left">{getSubjectName(sonuc.ders_id)}</span>
                          <span className="flex items-center justify-center gap-1 text-green-500"><CheckCircle className="h-4 w-4" />{sonuc.dogru_sayisi}</span>
                          <span className="flex items-center justify-center gap-1 text-red-500"><XCircle className="h-4 w-4" />{sonuc.yanlis_sayisi}</span>
                          <span className="font-bold">{sonuc.net_sayisi.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}