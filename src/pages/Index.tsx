// src/pages/Index.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/pages/AppLayout';
import SubjectCard from '@/components/SubjectCard';
import DailyQuote from '@/components/ui/DailyQuote';
import LgsCountdown from '@/components/ui/LgsCountdown';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Briefcase, BookCopy, BarChart, Loader2 } from 'lucide-react';
import { DenemeSinaviDialog, DenemeSonucu } from '@/components/DenemeSinaviDialog';
import { supabase } from '@/supabaseClient'; // supabase import edildi
import { toast } from 'sonner'; // toast import edildi

const Index = () => {
  const { subjects, handleAddQuestions, tomorrowSubjects, isEvening, userId } = useAppContext();
  const navigate = useNavigate();
  const [isDenemeDialogOpen, setIsDenemeDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // Kaydetme durumu için state eklendi

  // --- YENİ EKLENEN KOD BAŞLANGICI: Veritabanına kaydetme mantığı ---
  const handleSaveDeneme = async (sonuclar: DenemeSonucu, denemeAdi: string) => {
    if (!userId) {
      toast.error("Kullanıcı oturumu bulunamadı. Lütfen tekrar giriş yapın.");
      return;
    }

    setIsSaving(true);
    try {
      // 1. Ana deneme kaydını 'deneme_sinavlari' tablosuna ekle
      const { data: denemeData, error: denemeError } = await supabase
        .from('deneme_sinavlari')
        .insert({
          kullanici_id: userId,
          deneme_adi: denemeAdi
        })
        .select()
        .single();

      if (denemeError) throw denemeError;

      // 2. Her bir dersin sonucunu 'deneme_sonuclari' tablosuna ekle
      const sonuclarToInsert = Object.keys(sonuclar).map(dersId => ({
        deneme_id: denemeData.id,
        ders_id: dersId,
        dogru_sayisi: sonuclar[dersId].correct || 0,
        yanlis_sayisi: sonuclar[dersId].incorrect || 0,
      }));

      const { error: sonuclarError } = await supabase
        .from('deneme_sonuclari')
        .insert(sonuclarToInsert);

      if (sonuclarError) throw sonuclarError;

      toast.success(`"${denemeAdi}" deneme sınavı başarıyla kaydedildi!`);
      setIsDenemeDialogOpen(false);

    } catch (error: any) {
      console.error("Deneme kaydedilirken hata:", error);
      toast.error("Deneme kaydedilirken bir hata oluştu:", { description: error.message });
    } finally {
      setIsSaving(false);
    }
  };
  // --- YENİ EKLENEN KOD SONU ---

  return (
    <div className="space-y-6">
      <LgsCountdown />
      
      {isEvening && tomorrowSubjects && tomorrowSubjects.length > 0 && (
        <div className="animate-pulse">
          <Card className="card-canli gradient-turuncu shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium metin-beyaz">Yarınki Derslerin</CardTitle>
              <Briefcase className="h-4 w-4 metin-acik-gri" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold metin-beyaz">{tomorrowSubjects.join(', ')}</p>
              <p className="text-xs metin-acik-gri">Çantan hazır mı?</p>
            </CardContent>
          </Card>
        </div>
      )}
      
      <DailyQuote />

      <div className="grid grid-cols-2 gap-4">
        <Button onClick={() => setIsDenemeDialogOpen(true)} variant="outline" className="w-full py-6 flex-col h-auto">
            <BookCopy className="h-6 w-6 mb-2" />
            LGS Denemesi Ekle
        </Button>
        <Button onClick={() => navigate('/deneme-kayitlarim')} variant="outline" className="w-full py-6 flex-col h-auto">
            <BarChart className="h-6 w-6 mb-2" />
            Deneme Kayıtları
        </Button>
      </div>
      
      {subjects && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((subject) => (
            <SubjectCard 
              key={subject.id} 
              subject={subject} 
              onAddQuestions={handleAddQuestions} 
            />
          ))}
        </div>
      )}

      <DenemeSinaviDialog 
        open={isDenemeDialogOpen}
        onOpenChange={setIsDenemeDialogOpen}
        onSave={handleSaveDeneme}
        isSaving={isSaving} // isSaving prop'u eklendi
      />
    </div>
  );
};

export default Index;