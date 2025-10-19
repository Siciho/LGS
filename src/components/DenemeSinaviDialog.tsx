import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { subjects as allSubjects } from '@/data/subjects';
import { BookCopy, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Deneme sınavında yer alacak ana derslerin ID'leri
const denemeDersleriIds = ['turkish', 'math', 'science', 'revolution', 'religion', 'english'];
const denemeDersleri = allSubjects.filter(s => denemeDersleriIds.includes(s.id));

// Her ders için maksimum soru sayılarını tanımlıyoruz
const maxQuestions: { [key: string]: number } = {
    turkish: 20,
    math: 20,
    science: 20,
    revolution: 10,
    religion: 10,
    english: 10,
};

export interface DenemeSonucu {
  [subjectId: string]: {
    correct: number;
    incorrect: number;
  };
}

interface DenemeSinaviDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (sonuclar: DenemeSonucu, denemeAdi: string) => void;
  isSaving: boolean;
}

export function DenemeSinaviDialog({ open, onOpenChange, onSave, isSaving }: DenemeSinaviDialogProps) {
  const [results, setResults] = useState<DenemeSonucu>({});
  const [denemeAdi, setDenemeAdi] = useState("");

  // --- DEĞİŞİKLİK BURADA BAŞLIYOR: GİRİLEN SAYILARI DOĞRULAMA MANTIĞI ---
  const handleResultChange = (subjectId: string, type: 'correct' | 'incorrect', value: string) => {
    let numberValue = parseInt(value);
    
    // Eğer girilen değer bir sayı değilse veya negatifse 0 olarak ayarla
    if (isNaN(numberValue) || numberValue < 0) {
        numberValue = 0;
    }

    const max = maxQuestions[subjectId];
    const subjectName = allSubjects.find(s => s.id === subjectId)?.name || 'Bu ders';

    // 1. Girilen tek bir değerin (doğru veya yanlış) maksimum soru sayısını aşıp aşmadığını kontrol et
    if (max && numberValue > max) {
      toast.warning(`${subjectName} için girilen sayı (${numberValue}), toplam soru sayısını (${max}) aşamaz.`);
      numberValue = max;
    }
    
    // 2. Doğru ve yanlış sayılarının toplamının maksimumu aşıp aşmadığını kontrol et
    const otherType = type === 'correct' ? 'incorrect' : 'correct';
    const otherValue = results[subjectId]?.[otherType] || 0;
    
    if (max && (numberValue + otherValue > max)) {
        toast.warning(`${subjectName} için toplam doğru ve yanlış sayısı (${max}) aşılamaz.`);
        // Girilen değeri, toplam maksimumu aşmayacak şekilde sınırla
        numberValue = max - otherValue;
    }

    setResults(prev => ({
      ...prev,
      [subjectId]: {
        ...prev[subjectId],
        [type]: numberValue,
      }
    }));
  };
  // --- DEĞİŞİKLİK BURADA BİTİYOR ---

  const handleSave = () => {
    if (!denemeAdi.trim()) {
        toast.error("Lütfen deneme sınavına bir isim verin (örn: Özdebir Deneme 1).");
        return;
    }
    if (Object.keys(results).length === 0 || Object.values(results).every(r => !r.correct && !r.incorrect)) {
        toast.error("Lütfen en az bir ders için doğru veya yanlış sayısı girin.");
        return;
    }

    onSave(results, denemeAdi);
  };
  
  const handleClose = () => {
    if (isSaving) return;
    onOpenChange(false);
    // Diyalog kapandığında state'leri sıfırla
    setTimeout(() => {
        setResults({});
        setDenemeAdi("");
    }, 200);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookCopy className="h-5 w-5 text-primary" />
            Deneme Sınavı Sonucu Ekle
          </DialogTitle>
          <DialogDescription>
            LGS denemesi sonuçlarını derslere göre gir.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="space-y-2">
                <Label htmlFor="denemeAdi">Deneme Adı</Label>
                <Input 
                    id="denemeAdi" 
                    placeholder="Örn: TÖDER LGS Deneme 1" 
                    value={denemeAdi} 
                    onChange={e => setDenemeAdi(e.target.value)} 
                />
            </div>
            {denemeDersleri.map(ders => (
                <div key={ders.id} className="grid grid-cols-3 items-center gap-4">
                    <Label className="text-right">{ders.name}</Label>
                    <Input 
                        type="number" 
                        placeholder="Doğru"
                        value={results[ders.id]?.correct || ""}
                        onChange={e => handleResultChange(ders.id, 'correct', e.target.value)}
                    />
                    <Input 
                        type="number" 
                        placeholder="Yanlış"
                        value={results[ders.id]?.incorrect || ""}
                        onChange={e => handleResultChange(ders.id, 'incorrect', e.target.value)}
                    />
                </div>
            ))}
        </div>
        <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose} disabled={isSaving}>İptal</Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSaving ? "Kaydediliyor..." : "Kaydet"}
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}