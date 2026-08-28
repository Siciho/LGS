// src/pages/Index.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/pages/AppLayout';
import SubjectCard from '@/components/SubjectCard';
import DailyQuote from '@/components/ui/DailyQuote';
import LgsCountdown from '@/components/ui/LgsCountdown';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Briefcase, BookCopy, BarChart, BookOpen, Library, Trash2 } from 'lucide-react';
import { DenemeSinaviDialog, DenemeSonucu } from '@/components/DenemeSinaviDialog';
import { supabase } from '@/supabaseClient';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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

  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
  const [isBookListOpen, setIsBookListOpen] = useState(false);
  const [bookName, setBookName] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [bookComment, setBookComment] = useState("");
  const [isSavingBook, setIsSavingBook] = useState(false);
  const [booksList, setBooksList] = useState<any[]>([]);
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);

  const handleSaveBook = async () => {
    if (!userId) return;
    if (!bookName.trim() || !pageCount) {
      toast.error("Lütfen kitap adı ve sayfa sayısını girin.");
      return;
    }
    setIsSavingBook(true);
    try {
      const { error } = await supabase.from('okunan_kitaplar').insert({
        kullanici_id: userId,
        kitap_adi: bookName,
        sayfa_sayisi: parseInt(pageCount),
        aciklama: bookComment
      });
      if (error) throw error;
      toast.success(`"${bookName}" başarıyla okunan kitaplara eklendi!`);
      setIsBookDialogOpen(false);
      setBookName("");
      setPageCount("");
      setBookComment("");
    } catch (err: any) {
      console.error("Kitap kaydedilirken hata:", err);
      toast.error("Kitap kaydedilemedi: " + err.message);
    } finally {
      setIsSavingBook(false);
    }
  };

  const handleOpenBookList = async () => {
    setIsBookListOpen(true);
    if (!userId) return;
    setIsLoadingBooks(true);
    try {
      const { data, error } = await supabase
        .from('okunan_kitaplar')
        .select('*')
        .eq('kullanici_id', userId)
        .order('eklenme_tarihi', { ascending: false });
      if (error) throw error;
      setBooksList(data || []);
    } catch (err: any) {
      console.error("Kitaplar yüklenirken hata:", err);
      toast.error("Kitap listesi yüklenemedi.");
    } finally {
      setIsLoadingBooks(false);
    }
  };

  const handleDeleteBook = async (bookId: number) => {
    try {
      const { error } = await supabase
        .from('okunan_kitaplar')
        .delete()
        .eq('id', bookId);
      if (error) throw error;
      setBooksList(prev => prev.filter(b => b.id !== bookId));
      toast.success("Kitap başarıyla silindi.");
    } catch (err: any) {
      console.error("Kitap silinirken hata:", err);
      toast.error("Kitap silinemedi.");
    }
  };

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
        <Button 
          onClick={() => setIsBookDialogOpen(true)} 
          className="w-full py-5 flex-col h-auto font-bold bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/25 transition-all border border-emerald-500/25 gap-1.5"
        >
            <BookOpen className="h-5 w-5 text-emerald-200" />
            Okuduğum Kitabı Ekle
        </Button>
        <Button 
          onClick={handleOpenBookList} 
          className="w-full py-5 flex-col h-auto font-bold bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 hover:from-amber-500 hover:to-orange-600 text-white shadow-lg shadow-amber-500/15 hover:shadow-amber-500/25 transition-all border border-amber-500/25 gap-1.5"
        >
            <Library className="h-5 w-5 text-amber-200" />
            Okuduğum Kitaplar
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

      {/* KİTAP EKLEME DIALOGU */}
      <Dialog open={isBookDialogOpen} onOpenChange={setIsBookDialogOpen}>
        <DialogContent className="max-w-md rounded-2xl p-6">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-xl font-bold tracking-tight">Okuduğum Kitabı Ekle</DialogTitle>
            <DialogDescription className="text-sm">
              Okuduğunuz kitabı sayfa sayısı ve görüşlerinizle birlikte kaydedin.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <div className="space-y-1.5">
              <Label htmlFor="book-name" className="font-bold">Kitap Adı</Label>
              <Input
                id="book-name"
                placeholder="Örn: Nutuk, Küçük Prens"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="page-count" className="font-bold">Sayfa Sayısı</Label>
              <Input
                id="page-count"
                type="number"
                placeholder="Örn: 150"
                value={pageCount}
                onChange={(e) => setPageCount(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="book-comment" className="font-bold">Düşünceleriniz / Açıklama</Label>
              <Textarea
                id="book-comment"
                placeholder="Kitap hakkında 1-2 cümlelik düşünceniz veya hissettikleriniz..."
                value={bookComment}
                onChange={(e) => setBookComment(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button
              variant="outline"
              disabled={isSavingBook}
              onClick={() => setIsBookDialogOpen(false)}
              className="w-full sm:w-auto font-semibold"
            >
              İptal
            </Button>
            <Button
              disabled={isSavingBook}
              onClick={handleSaveBook}
              className="w-full sm:w-auto font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
            >
              {isSavingBook ? "Kaydediliyor..." : "Kitabı Kaydet"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* OKUNAN KİTAPLAR LİSTESİ DIALOGU */}
      <Dialog open={isBookListOpen} onOpenChange={setIsBookListOpen}>
        <DialogContent className="max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight">Okuduğum Kitaplar</DialogTitle>
            <DialogDescription className="text-sm">
              Şimdiye kadar okuduğunuz ve kaydettiğiniz kitaplar.
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 max-h-[350px] overflow-y-auto space-y-3 pr-1">
            {isLoadingBooks ? (
              <p className="text-center text-muted-foreground py-4 text-sm">Kitaplar yükleniyor...</p>
            ) : booksList.length === 0 ? (
              <p className="text-center text-muted-foreground py-4 text-sm">Henüz kaydedilmiş kitap bulunmuyor.</p>
            ) : (
              booksList.map(book => (
                <div key={book.id} className="p-3 bg-muted/40 rounded-xl border border-border/50 flex justify-between items-start gap-2">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-foreground">{book.kitap_adi}</h4>
                    <p className="text-xs text-muted-foreground font-semibold">Sayfa Sayısı: {book.sayfa_sayisi}</p>
                    {book.aciklama && (
                      <p className="text-xs text-muted-foreground italic mt-1 bg-background/50 p-2 rounded-lg border border-border/20">
                        "{book.aciklama}"
                      </p>
                    )}
                    <p className="text-[10px] text-muted-foreground/75 mt-0.5">
                      Kayıt Tarihi: {new Date(book.eklenme_tarihi).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10 h-7 w-7 flex-shrink-0"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setIsBookListOpen(false)}
              className="w-full font-semibold"
            >
              Kapat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;