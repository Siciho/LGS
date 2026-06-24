// src/pages/Index.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/pages/AppLayout';
import SubjectCard from '@/components/SubjectCard';
import DailyQuote from '@/components/ui/DailyQuote';
import LgsCountdown from '@/components/ui/LgsCountdown';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Briefcase, BookCopy, BarChart } from 'lucide-react';
import { DenemeSinaviDialog, DenemeSonucu } from '@/components/DenemeSinaviDialog';
import { supabase } from '@/supabaseClient';
import { toast } from 'sonner';
import StreakBoosterCard from '@/components/StreakBoosterCard';
import StreakFreezeShield from '@/components/StreakFreezeShield';


const Index = () => {
  const { 
    subjects, 
    handleAddQuestions, 
    tomorrowSubjects, 
    isEvening, 
    userId,
    streak,
    streakFreezes,
    totalQuestions
  } = useAppContext();
  const navigate = useNavigate();
  const [isDenemeDialogOpen, setIsDenemeDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveDeneme = async (sonuclar: DenemeSonucu, denemeAdi: string, denemeTarihi: Date) => {
    if (!userId) {
      toast.error("Kullanıcı oturumu bulunamadı.");
      return;
    }
    setIsSaving(true);
    try {
      const { data: denemeData, error: denemeError } = await supabase
        .from('deneme_sinavlari')
        .insert({
          kullanici_id: userId,
          deneme_adi: denemeAdi,
          deneme_tarihi: denemeTarihi.toISOString().split('T')[0]
        })
        .select()
        .single();

      if (denemeError) throw denemeError;

      const sonuclarToInsert = Object.keys(sonuclar).map(dersId => ({
        deneme_id: denemeData.id,
        ders_id: dersId,
        dogru_sayisi: sonuclar[dersId].correct || 0,
        yanlis_sayisi: sonuclar[dersId].incorrect || 0,
      }));

      const { error: sonuclarError } = await supabase.from('deneme_sonuclari').insert(sonuclarToInsert);
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

  return (
    <div className="space-y-6">
      <LgsCountdown />

      {/* Dynamic Streak and Freeze grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StreakBoosterCard streak={streak || 0} />
        <StreakFreezeShield freezes={streakFreezes || 0} />
      </div>

      {/* Weekly Duel progress card removed */}
      
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

      {/* --- BU BUTONLARIN OLDUĞU BÖLÜM --- */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={() => setIsDenemeDialogOpen(true)} 
          className="w-full py-5 flex-col h-auto font-bold bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-600 text-white shadow-lg shadow-indigo-500/15 hover:shadow-indigo-500/25 transition-all border border-indigo-500/25 gap-1.5"
        >
            <BookCopy className="h-5 w-5 text-indigo-200" />
            LGS Denemesi Ekle
        </Button>
        <Button 
          onClick={() => navigate('/deneme-kayitlarim')} 
          className="w-full py-5 flex-col h-auto font-bold bg-gradient-to-br from-sky-600 via-cyan-600 to-sky-700 hover:from-sky-500 hover:to-cyan-600 text-white shadow-lg shadow-sky-500/15 hover:shadow-sky-500/25 transition-all border border-sky-500/25 gap-1.5"
        >
            <BarChart className="h-5 w-5 text-sky-200" />
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
        isSaving={isSaving}
      />
    </div>
  );
};

export default Index;