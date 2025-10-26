import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, BookCopy, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { subjects as allSubjects } from '@/data/subjects';
import { toast } from "sonner";

const denemeDersleriIds = ['turkish', 'math', 'science', 'revolution', 'religion', 'english'];
const denemeDersleri = allSubjects.filter(s => denemeDersleriIds.includes(s.id));

const maxQuestions: { [key: string]: number } = {
    turkish: 20, math: 20, science: 20,
    revolution: 10, religion: 10, english: 10,
};

export interface DenemeSonucu {
  [subjectId: string]: { correct: number; incorrect: number; };
}

interface DenemeSinaviDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (sonuclar: DenemeSonucu, denemeAdi: string, denemeTarihi: Date) => void; // denemeTarihi eklendi
  isSaving: boolean;
}

export function DenemeSinaviDialog({ open, onOpenChange, onSave, isSaving }: DenemeSinaviDialogProps) {
  const [results, setResults] = useState<DenemeSonucu>({});
  const [denemeAdi, setDenemeAdi] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date()); // Tarih state'i eklendi

  const handleResultChange = (subjectId: string, type: 'correct' | 'incorrect', value: string) => {
    let numberValue = parseInt(value);
    if (isNaN(numberValue) || numberValue < 0) numberValue = 0;
    
    const max = maxQuestions[subjectId];
    const subjectName = allSubjects.find(s => s.id === subjectId)?.name || 'Bu ders';
    if (max && numberValue > max) {
      toast.warning(`${subjectName} için girilen sayı, toplam soru sayısını (${max}) aşamaz.`);
      numberValue = max;
    }
    const otherType = type === 'correct' ? 'incorrect' : 'correct';
    const otherValue = results[subjectId]?.[otherType] || 0;
    if (max && (numberValue + otherValue > max)) {
      toast.warning(`${subjectName} için toplam doğru ve yanlış sayısı (${max}) aşılamaz.`);
      numberValue = max - otherValue;
    }
    setResults(prev => ({ ...prev, [subjectId]: { ...prev[subjectId], [type]: numberValue } }));
  };

  const handleSave = () => {
    if (!denemeAdi.trim()) {
        toast.error("Lütfen deneme sınavına bir isim verin.");
        return;
    }
    if (!date) {
        toast.error("Lütfen bir deneme tarihi seçin.");
        return;
    }
    if (Object.keys(results).length === 0) {
        toast.error("Lütfen en az bir ders için sonuç girin.");
        return;
    }
    onSave(results, denemeAdi, date);
  };
  
  const handleClose = () => {
    if (isSaving) return;
    onOpenChange(false);
    setTimeout(() => {
        setResults({});
        setDenemeAdi("");
        setDate(new Date());
    }, 200);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><BookCopy className="h-5 w-5 text-primary" />Deneme Sınavı Sonucu Ekle</DialogTitle>
          <DialogDescription>LGS denemesi sonuçlarını ve tarihini gir.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                  <Label htmlFor="denemeAdi">Deneme Adı</Label>
                  <Input id="denemeAdi" placeholder="Örn: TÖDER LGS Deneme 1" value={denemeAdi} onChange={e => setDenemeAdi(e.target.value)} />
              </div>
              {/* --- YENİ EKLENEN TARİH SEÇİCİ --- */}
              <div className="space-y-2 col-span-2">
                <Label>Deneme Tarihi</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Tarih seç</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={setDate} initialFocus /></PopoverContent>
                </Popover>
              </div>
            </div>
            {denemeDersleri.map(ders => (
                <div key={ders.id} className="grid grid-cols-3 items-center gap-4">
                    <Label className="text-right">{ders.name}</Label>
                    <Input type="number" placeholder="Doğru" value={results[ders.id]?.correct || ""} onChange={e => handleResultChange(ders.id, 'correct', e.target.value)} />
                    <Input type="number" placeholder="Yanlış" value={results[ders.id]?.incorrect || ""} onChange={e => handleResultChange(ders.id, 'incorrect', e.target.value)} />
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