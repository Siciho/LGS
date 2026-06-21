// src/pages/DailyScramblePage.tsx

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { dailyWords } from '@/data/dailywords';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAppContext } from './AppLayout';
import { supabase } from '@/supabaseClient';
import { toast } from 'sonner';
import { playSuccessSound, playFailSound, playConfirmSound } from '@/utils/sounds';
import { Trophy, HelpCircle, ArrowLeft, RefreshCw, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrambleQuestion {
  wordId: string;
  word: string; // e.g. "Advice"
  meaning: string; // e.g. "Tavsiye"
  sentence: string; // e.g. "Can you give me some advice?"
  sentenceMeaning: string; // e.g. "Bana biraz tavsiye verebilir misin?"
  beforeText: string;
  afterText: string;
  targetLetters: string[]; // only letters, uppercase
  targetChars: string[]; // all characters, uppercase (including spaces/symbols)
  letterIndices: number[]; // indices of letters in targetChars
}

const getActiveUnitForCurrentMonth = (): number => {
  const month = new Date().getMonth(); // 0: Jan, 8: Sep, etc.
  
  if (month === 8) return 1;  // Eylül -> Ünite 1
  if (month === 9) return 2;  // Ekim -> Ünite 2
  if (month === 10) return 3; // Kasım -> Ünite 3
  if (month === 11) return 4; // Aralık -> Ünite 4
  if (month === 0) return 5;  // Ocak -> Ünite 5
  if (month === 1) return 6;  // Şubat -> Ünite 6
  if (month === 2) return 7;  // Mart -> Ünite 7
  if (month === 3) return 8;  // Nisan -> Ünite 8
  if (month === 4) return 9;  // Mayıs -> Ünite 9
  if (month === 5) return 10; // Haziran -> Ünite 10
  
  return 0; // Temmuz, Ağustos -> Genel Tekrar
};

const getUnitName = (unitNum: number): string => {
  switch (unitNum) {
    case 1: return "Friendship (Arkadaşlık)";
    case 2: return "Teen Life (Gençlik Yaşamı)";
    case 3: return "In the Kitchen (Mutfakta)";
    case 4: return "On the Phone (Telefonda)";
    case 5: return "The Internet (İnternet)";
    case 6: return "Adventures (Maceralar)";
    case 7: return "Tourism (Turizm)";
    case 8: return "Chores (Ev İşleri)";
    case 9: return "Science (Bilim)";
    case 10: return "Natural Forces (Doğal Güçler)";
    default: return "Genel Tekrar";
  }
};

export default function DailyScramblePage() {
  const { userId, isMuted, setTotalPoints, setLifetimePoints, dailySolvedSubjects, completeDailyTask } = useAppContext();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<ScrambleQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [slots, setSlots] = useState<string[]>([]); // Student's typed letters
  const [shuffledPool, setShuffledPool] = useState<{ id: string; letter: string; used: boolean }[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isIncorrect, setIsIncorrect] = useState<boolean | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const activeUnit = useMemo(() => getActiveUnitForCurrentMonth(), []);

  // Redirect if already solved today
  useEffect(() => {
    if (dailySolvedSubjects && dailySolvedSubjects.includes('english_scramble')) {
      toast.info("Bugünkü Cümle Avı'nı zaten tamamladınız.");
      navigate('/practice', { replace: true });
    }
  }, [dailySolvedSubjects, navigate]);

  // 1. Generate questions on mount
  useEffect(() => {
    // 0 is Review, otherwise select from activeUnit
    const filtered = activeUnit === 0 
      ? dailyWords 
      : dailyWords.filter(w => w.unit === activeUnit);

    // Pick words where the word is directly in the example sentence (case-insensitive)
    const validWords = filtered.filter(w => {
      const sentence = w.example.toLowerCase();
      const word = w.word.toLowerCase();
      return sentence.includes(word);
    });

    if (validWords.length < 5) {
      // Fallback: If not enough matching, use general list
      const fallbackList = dailyWords.filter(w => w.example.toLowerCase().includes(w.word.toLowerCase()));
      const shuffledFallback = [...fallbackList].sort(() => 0.5 - Math.random()).slice(0, 5);
      setupQuestions(shuffledFallback);
    } else {
      const selected = [...validWords].sort(() => 0.5 - Math.random()).slice(0, 5);
      setupQuestions(selected);
    }
  }, [activeUnit]);

  const setupQuestions = (selectedWords: typeof dailyWords) => {
    const formatted: ScrambleQuestion[] = selectedWords.map(w => {
      const sentence = w.example;
      const wordVal = w.word;
      
      const idx = sentence.toLowerCase().indexOf(wordVal.toLowerCase());
      const beforeText = sentence.slice(0, idx);
      const afterText = sentence.slice(idx + wordVal.length);

      const targetChars = wordVal.toUpperCase().split('');
      const targetLetters = targetChars.filter(char => /[A-Z]/.test(char));

      const letterIndices: number[] = [];
      targetChars.forEach((char, index) => {
        if (/[A-Z]/.test(char)) {
          letterIndices.push(index);
        }
      });

      return {
        wordId: w.id,
        word: w.word,
        meaning: w.meaning,
        sentence,
        sentenceMeaning: w.exampleMeaning,
        beforeText,
        afterText,
        targetLetters,
        targetChars,
        letterIndices
      };
    });

    setQuestions(formatted);
  };

  const currentQuestion = questions[currentIdx];

  // 2. Initialize slots and shuffled letters when current question changes
  useEffect(() => {
    if (!currentQuestion) return;

    // Reset state for new question
    setIsCorrect(null);
    setIsIncorrect(null);
    setShowCorrectAnswer(false);

    // Slots array is the length of target letters
    setSlots(new Array(currentQuestion.targetLetters.length).fill(""));

    // Scramble the target letters
    const pool = currentQuestion.targetLetters.map((l, i) => ({
      id: `${l}-${i}-${Math.random()}`,
      letter: l,
      used: false
    })).sort(() => 0.5 - Math.random());

    setShuffledPool(pool);
  }, [currentQuestion]);

  // 3. Game actions
  const handleTapLetterFromPool = (poolItem: { id: string; letter: string; used: boolean }) => {
    if (isCorrect || isIncorrect || poolItem.used) return;

    // Find first empty slot index
    const firstEmptyIdx = slots.indexOf("");
    if (firstEmptyIdx === -1) return;

    playConfirmSound(isMuted);

    const newSlots = [...slots];
    newSlots[firstEmptyIdx] = poolItem.letter;
    setSlots(newSlots);

    // Mark as used in pool
    setShuffledPool(prev => prev.map(item => item.id === poolItem.id ? { ...item, used: true } : item));

    // If slots are fully filled now, check the answer
    if (newSlots.indexOf("") === -1) {
      checkAnswer(newSlots);
    }
  };

  const handleRemoveLetterFromSlot = (slotIdx: number) => {
    if (isCorrect || isIncorrect) return;
    const letterToRemove = slots[slotIdx];
    if (!letterToRemove) return;

    playConfirmSound(isMuted);

    // Find the corresponding item in the pool that is marked as used and matches this letter
    const poolItemToRestore = shuffledPool.find(item => item.letter === letterToRemove && item.used);

    if (poolItemToRestore) {
      setShuffledPool(prev => prev.map(item => item.id === poolItemToRestore.id ? { ...item, used: false } : item));
    }

    const newSlots = [...slots];
    newSlots[slotIdx] = "";
    setSlots(newSlots);
  };

  const handleReset = () => {
    if (isCorrect || isIncorrect) return;
    setSlots(new Array(currentQuestion.targetLetters.length).fill(""));
    setShuffledPool(prev => prev.map(item => ({ ...item, used: false })));
    playConfirmSound(isMuted);
  };

  const checkAnswer = (finalSlots: string[]) => {
    const guess = finalSlots.join('');
    const actual = currentQuestion.targetLetters.join('');

    if (guess === actual) {
      // CORRECT
      setIsCorrect(true);
      setScore(prev => prev + 1);
      playSuccessSound(isMuted);
      
      setTimeout(() => {
        advanceQuestion();
      }, 1500);
    } else {
      // INCORRECT
      setIsIncorrect(true);
      playFailSound(isMuted);
      
      // Auto fill slots with correct answer for learning display
      setSlots(currentQuestion.targetLetters);
      setShowCorrectAnswer(true);

      // User requested 2.0 or 2.5 seconds wait for incorrect display
      setTimeout(() => {
        advanceQuestion();
      }, 2500);
    }
  };

  const advanceQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      handleFinished();
    }
  };

  const handleFinished = async () => {
    setIsFinished(true);
    setIsSaving(true);

    if (!userId) {
      setIsSaving(false);
      return;
    }

    const earnedPoints = score * 10;

    try {
      // 1. Log to cozulen_sorular (for leaderboards)
      await supabase.from('cozulen_sorular').insert({
        kullanici_id: userId,
        ders_id: 'english',
        dogru_sayisi: score,
        yanlis_sayisi: questions.length - score,
        konu: 'Günlük Cümle Avı'
      });

      // 2. Mark daily scramble completed in database
      const todayStr = new Date().toISOString().split('T')[0];
      await supabase.from('tamamlanan_gunluk_gorevler').insert({
        kullanici_id: userId,
        ders_id: 'english_scramble',
        tamamlanma_tarihi: todayStr
      });

      // 3. Update points locally (which triggers auto-save database sync via debounce hook)
      if (earnedPoints > 0 && setTotalPoints && setLifetimePoints) {
        setTotalPoints(prev => prev + earnedPoints);
        setLifetimePoints(prev => prev + earnedPoints);
        toast.success(`Günlük görev tamamlandı! +${earnedPoints} Puan cüzdanınıza eklendi! 🎉`);
      }

      // 4. Update daily solved subjects locally to sync the state across tabs instantly
      if (completeDailyTask) {
        completeDailyTask('english_scramble');
      }
    } catch (e) {
      console.error("Save Daily Scramble results error:", e);
      toast.error("Günlük görev sonuçları kaydedilemedi.");
    } finally {
      setIsSaving(false);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader className="animate-spin text-primary h-8 w-8" />
        <span className="ml-2 font-semibold">Cümleler hazırlanıyor...</span>
      </div>
    );
  }

  // Loader fallback
  function Loader({ className }: { className?: string }) {
    return <RefreshCw className={className} />;
  }

  if (isFinished) {
    const earnedPoints = score * 10;
    return (
      <div className="max-w-md mx-auto p-4 text-center animate-slide-up">
        <Card className="shadow-elegant border-border/50 bg-card/90 backdrop-blur-md">
          <CardHeader className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-4xl mb-4">
              🏆
            </div>
            <CardTitle className="text-2xl font-black">Cümle Avı Bitti!</CardTitle>
            <CardDescription className="text-sm font-semibold">Bugünkü İngilizce kelime harf avını tamamladın.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/40 p-4 rounded-xl border border-border/40 grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-extrabold text-success">{score}</span>
                <span className="text-xxs text-muted-foreground uppercase font-bold tracking-wider">Doğru</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-extrabold text-destructive">{questions.length - score}</span>
                <span className="text-xxs text-muted-foreground uppercase font-bold tracking-wider">Yanlış</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-extrabold text-primary flex items-center gap-0.5">
                  +{earnedPoints}
                </span>
                <span className="text-xxs text-muted-foreground uppercase font-bold tracking-wider">Puan</span>
              </div>
            </div>

            <div className="text-xs text-muted-foreground/80 leading-relaxed font-medium">
              Kazanılan puanlar cüzdanınıza ve liderlik sıralamanıza eklenmiştir. Yarın saat 03:00'te yeni kelimelerle Cümle Avı tekrar açılacaktır!
            </div>

            <Button 
              onClick={() => navigate('/practice')} 
              className="w-full py-6 font-bold text-lg shadow-md hover:translate-y-[-1px] transition-all"
              disabled={isSaving}
            >
              Vocab World'e Geri Dön ➔
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentIdx + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-2 sm:p-4 space-y-6 animate-slide-up">
      {/* Header Info */}
      <div className="flex items-center justify-between bg-muted/40 px-4 py-3 rounded-xl border border-border/50">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/practice')}
          className="text-muted-foreground hover:text-foreground font-semibold"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" /> Geri Dön
        </Button>
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-primary/10 text-primary px-3 py-1 rounded-full">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span>Soru {currentIdx + 1} / {questions.length}</span>
        </div>
      </div>

      <Card className="border border-border/60 shadow-card bg-card/50 backdrop-blur-sm overflow-hidden">
        {/* Progress Bar */}
        <div className="w-full bg-muted/20">
          <Progress value={progress} className="h-1.5 rounded-none bg-muted" />
        </div>

        <CardHeader className="text-center space-y-2 pt-6">
          <span className="text-xxs font-black text-primary uppercase tracking-widest bg-primary/5 border border-primary/20 px-2.5 py-1 rounded-full mx-auto w-max">
            {getUnitName(activeUnit)}
          </span>
          <CardTitle className="text-lg sm:text-xl font-bold leading-relaxed pt-2">
            {/* The sentence with blank blanks */}
            <span>{currentQuestion.beforeText}</span>
            <span className="inline-flex gap-0.5 mx-1.5 px-2 py-0.5 border border-dashed border-primary/40 rounded bg-primary/5 text-primary-glow font-black tracking-widest drop-shadow-[0_0_8px_rgba(168,85,247,0.1)]">
              {currentQuestion.targetChars.map((c, i) => /[A-Z]/.test(c) ? "_" : c)}
            </span>
            <span>{currentQuestion.afterText}</span>
          </CardTitle>
          <CardDescription className="text-sm font-semibold italic text-muted-foreground flex items-center justify-center gap-1.5">
            <HelpCircle className="h-4 w-4 shrink-0 text-muted-foreground/80" />
            <span>{currentQuestion.sentenceMeaning}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 pb-8 pt-4">
          <div className="flex flex-col items-center justify-center gap-6">
            
            {/* 1. Word Definition Clue */}
            <div className="text-center bg-muted/30 border border-border/40 px-5 py-3 rounded-xl max-w-sm w-full">
              <span className="text-xxs text-muted-foreground font-black uppercase tracking-widest block">Kelime Anlamı (İpucu)</span>
              <span className="text-base font-extrabold text-foreground capitalize mt-1 block">
                {currentQuestion.meaning}
              </span>
            </div>

            {/* 2. Character Slots (Guess Input) */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 py-4 max-w-lg">
              {currentQuestion.targetChars.map((char, index) => {
                const isLetter = /[A-Z]/.test(char);
                if (!isLetter) {
                  return (
                    <span key={index} className="mx-1 text-2xl font-black text-muted-foreground/50 self-end select-none">
                      {char === ' ' ? ' ' : char}
                    </span>
                  );
                }

                const slotIdx = currentQuestion.letterIndices.indexOf(index);
                const letterVal = slots[slotIdx];

                return (
                  <button
                    key={index}
                    onClick={() => handleRemoveLetterFromSlot(slotIdx)}
                    disabled={isCorrect !== null || isIncorrect !== null}
                    className={cn(
                      "w-8 h-10 sm:w-10 sm:h-12 border-2 rounded-lg font-black text-lg sm:text-xl flex items-center justify-center transition-all duration-300",
                      isCorrect && "border-success text-success bg-success/15 scale-105 shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-bounce",
                      isIncorrect && "border-destructive text-destructive bg-destructive/15 scale-105 shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-[shake_0.4s_ease-in-out]",
                      !isCorrect && !isIncorrect && letterVal && "border-primary bg-primary/5 text-primary-glow font-bold",
                      !isCorrect && !isIncorrect && !letterVal && "border-border bg-muted/20 hover:border-muted-foreground/30"
                    )}
                  >
                    {letterVal}
                  </button>
                );
              })}
            </div>

            {/* 3. Feedback overlay when wrong */}
            {showCorrectAnswer && (
              <div className="text-center font-bold text-sm text-destructive bg-destructive/10 border border-destructive/20 px-4 py-2 rounded-lg animate-pulse">
                Yanlış! Doğru Kelime: <span className="underline font-black text-base ml-1 tracking-wider">{currentQuestion.word.toUpperCase()}</span>
              </div>
            )}

            {/* 4. Scrambled Letters Pool */}
            <div className="w-full space-y-4 border-t border-border/30 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground">Harf Havuzu</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  disabled={isCorrect !== null || isIncorrect !== null}
                  className="text-xs text-muted-foreground hover:text-foreground font-semibold h-7"
                >
                  <RefreshCw className="h-3 w-3 mr-1" /> Sıfırla
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto min-h-[50px] p-2 bg-muted/10 rounded-xl border border-border/20">
                {shuffledPool.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTapLetterFromPool(item)}
                    disabled={item.used || isCorrect !== null || isIncorrect !== null}
                    className={cn(
                      "w-10 h-10 sm:w-11 sm:h-11 rounded-full font-black text-base sm:text-lg flex items-center justify-center transition-all duration-200 border-2 select-none shadow-sm",
                      item.used 
                        ? "bg-muted/10 text-muted-foreground/30 border-muted/20 opacity-0 pointer-events-none scale-75"
                        : "bg-card border-border hover:border-primary/70 active:scale-95 text-foreground hover:text-primary-glow"
                    )}
                  >
                    {item.letter}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
