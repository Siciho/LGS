// src/pages/MultiplicationChallengePage.tsx

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./AppLayout";
import { supabase } from "@/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Timer, ArrowLeft, RotateCcw, Zap, CheckCircle2, XCircle, BookOpen } from "lucide-react";
import { playSuccessSound, playFailSound, playConfirmSound } from "@/utils/sounds";
import { toast } from "sonner";
import SwipeableToast from '@/components/SwipeableToast';
import { cn } from "@/lib/utils";

interface Question {
  num1: number;
  num2: number;
  correctAnswer: number;
  options: number[];
}

export default function MultiplicationChallengePage() {
  const navigate = useNavigate();
  const { userId, setTotalPoints, setLifetimePoints, isMuted } = useAppContext();

  // Game states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<"correct" | "incorrect" | null>(null);

  // Highest streak from Supabase
  const [dbMaxStreak, setDbMaxStreak] = useState(0);
  const [gameMode, setGameMode] = useState<"championship" | "practice" | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef(isPlaying);
  const timeLeftRef = useRef(timeLeft);
  const scoreRef = useRef(score);
  const maxStreakRef = useRef(maxStreak);

  // Sync refs with state changes
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    maxStreakRef.current = maxStreak;
  }, [maxStreak]);

  // Load max streak from Supabase on mount
  useEffect(() => {
    if (userId) {
      const fetchMaxStreak = async () => {
        try {
          const { data, error } = await supabase
            .from('tamamlanan_gunluk_gorevler')
            .select('ders_id')
            .eq('kullanici_id', userId)
            .like('ders_id', 'multiplication_max_streak:%');

          if (data && data.length > 0) {
            let maxVal = 0;
            data.forEach(r => {
              const val = parseInt(r.ders_id.split(':')[1] || '0', 10);
              if (val > maxVal) maxVal = val;
            });
            setDbMaxStreak(maxVal);
          }
        } catch (e) {
          console.error("Error fetching max streak:", e);
        }
      };
      fetchMaxStreak();
    }
  }, [userId]);

  // Generate a random multiplication question
  const generateQuestion = (currentStreakVal?: number, modeOverride?: "championship" | "practice"): Question => {
    const streakToUse = currentStreakVal !== undefined ? currentStreakVal : streak;
    const modeToUse = modeOverride !== undefined ? modeOverride : gameMode;
    
    let num1, num2;
    if (modeToUse === "practice") {
      num1 = Math.floor(Math.random() * 9) + 1; // 1 to 9
      num2 = Math.floor(Math.random() * 10) + 1; // 1 to 10
    } else if (streakToUse >= 40) {
      // 2-digit by 2-digit numbers: 10 to 99
      num1 = Math.floor(Math.random() * 90) + 10;
      num2 = Math.floor(Math.random() * 90) + 10;
    } else {
      // Standard multiplication table numbers between 2 and 12
      num1 = Math.floor(Math.random() * 11) + 2; 
      num2 = Math.floor(Math.random() * 11) + 2;
    }
    const correctAnswer = num1 * num2;

    // Generate distractors
    const distractors = new Set<number>();
    while (distractors.size < 3) {
      let diff;
      if (modeToUse !== "practice" && streakToUse >= 40) {
        // Distractors close to the correct answer for 2-digit x 2-digit
        const step = Math.random() > 0.5 ? 10 : 1;
        const multiplier = Math.floor(Math.random() * 9) - 4; // -4 to 4
        diff = multiplier * step;
      } else {
        diff = (Math.floor(Math.random() * 7) - 3) * (Math.random() > 0.5 ? 1 : num1);
      }
      const opt = correctAnswer + (diff === 0 ? 7 : diff);
      if (opt > 0 && opt !== correctAnswer) {
        distractors.add(opt);
      }
    }

    // Shuffle options
    const options = [correctAnswer, ...Array.from(distractors)].sort(() => 0.5 - Math.random());

    return { num1, num2, correctAnswer, options };
  };

  // Start the game
  const startGame = (mode: "championship" | "practice" = "championship") => {
    playConfirmSound(isMuted);
    setGameMode(mode);
    setIsPlaying(true);
    setIsFinished(false);
    setTimeLeft(mode === "practice" ? 999999 : 60);
    setScore(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setStreak(0);
    setMaxStreak(0);
    setSelectedAnswer(null);
    setShowFeedback(null);
    setCurrentQuestion(generateQuestion(0, mode));
  };

  // Timer Effect
  useEffect(() => {
    if (isPlaying && gameMode === "championship") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, gameMode]);

  // End the game
  const endGame = async () => {
    if (!isPlayingRef.current) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
    setIsFinished(true);
    playSuccessSound(isMuted);

    const finalScore = scoreRef.current;
    const finalMaxStreak = maxStreakRef.current;

    if (gameMode === "championship") {
      // Persist scores via context to database
      if (finalScore > 0) {
        setTotalPoints((prev: number) => prev + finalScore);
        setLifetimePoints((prev: number) => prev + finalScore);
        toast.custom((t) => (
          <SwipeableToast
            id={t}
            title="Tebrikler! 🥳"
            description={`Çarpım tablosundan +${finalScore} Puan cüzdanına eklendi.`}
            variant="success"
            icon="🥳"
          />
        ), { duration: 6000, position: "top-center" });
      }

      // Save max streak to Supabase if exceeded
      if (finalMaxStreak > dbMaxStreak) {
        setDbMaxStreak(finalMaxStreak);
        if (userId) {
          try {
            const todayStrDb = new Date().toISOString().split('T')[0];
            await supabase.from('tamamlanan_gunluk_gorevler').insert({
              kullanici_id: userId,
              ders_id: `multiplication_max_streak:${finalMaxStreak}`,
              tamamlanma_tarihi: todayStrDb
            });
          } catch (e) {
            console.error("Save max streak error:", e);
          }
        }
      }
    }
  };

  const handleBackToSelect = () => {
    playConfirmSound(isMuted);
    setIsPlaying(false);
    setIsFinished(false);
    setGameMode(null);
  };

  // Handle Answer Selection
  const handleAnswer = (option: number) => {
    if (selectedAnswer !== null || !currentQuestion) return;

    setSelectedAnswer(option);
    const isCorrect = option === currentQuestion.correctAnswer;
    let nextStreakValue = 0;

    if (isCorrect) {
      setShowFeedback("correct");
      setCorrectCount((prev) => prev + 1);
      
      const newStreak = streak + 1;
      nextStreakValue = newStreak;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      if (gameMode === "championship") {
        // Calculate score based on new streak
        let earnedPoints = 1;
        if (newStreak >= 40) earnedPoints = 15;
        else if (newStreak >= 20) earnedPoints = 9;
        else if (newStreak >= 15) earnedPoints = 7;
        else if (newStreak >= 10) earnedPoints = 5;
        else if (newStreak >= 5) earnedPoints = 3;

        setScore((prev) => prev + earnedPoints);
        setTimeLeft((prev) => Math.min(prev + 2, 90)); // Add +2s time bonus
      }
    } else {
      setShowFeedback("incorrect");
      playFailSound(isMuted);
      setIncorrectCount((prev) => prev + 1);
      setStreak(0);
      nextStreakValue = 0;

      if (gameMode === "championship") {
        setTimeLeft((prev) => {
          const nextTime = Math.max(prev - 5, 0);
          if (nextTime <= 0) {
            endGame();
          }
          return nextTime;
        });
      }
    }

    // Go to next question after animation delay
    setTimeout(() => {
      setSelectedAnswer(null);
      setShowFeedback(null);
      if (isPlayingRef.current && (gameMode === "practice" || timeLeftRef.current > 0)) {
        setCurrentQuestion(generateQuestion(nextStreakValue));
      }
    }, 800);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="space-y-6 animate-slide-up max-w-2xl mx-auto p-6 relative bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 border border-purple-500/20 rounded-3xl shadow-2xl backdrop-blur-lg">
      <style>{`
        @keyframes pulse-red-border {
          0%, 100% {
            box-shadow: inset 0 0 25px rgba(239, 68, 68, 0.4);
            border-color: rgba(239, 68, 68, 0.4);
          }
          50% {
            box-shadow: inset 0 0 45px rgba(239, 68, 68, 0.85);
            border-color: rgba(239, 68, 68, 0.85);
          }
        }
        .animate-pulse-red-border {
          animation: pulse-red-border 1s infinite ease-in-out;
        }
        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(234, 179, 8, 0.2);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 35px rgba(168, 85, 247, 0.7), 0 0 55px rgba(234, 179, 8, 0.5);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite ease-in-out;
        }
      `}</style>

      {isPlaying && timeLeft <= 10 && timeLeft > 0 && (
        <div className="fixed inset-0 z-40 pointer-events-none animate-pulse-red-border border-[8px] border-red-500/35" />
      )}
      {/* Header / Back Navigation */}
      <div className="flex items-center gap-4 border-b border-purple-500/10 pb-4 mb-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => (isPlaying || isFinished ? handleBackToSelect() : navigate("/practice", { state: { activeTab: "mini-oyunlar" } }))}
          className="h-10 w-10 rounded-full border-purple-500/30 text-purple-500 hover:text-white hover:bg-purple-600 hover:border-purple-600 active:scale-95 transition-all shadow-[0_0_15px_rgba(168,85,247,0.15)]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            {gameMode === "practice" ? "Çarpım Tablosu Alıştırma Modu" : "Çarpım Tablosu Hız Şampiyonası"}
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            {gameMode === "practice" 
              ? "Puan kaygısı olmadan 1-9 arası çarpım tablosu alıştırması yap!" 
              : "İşlem hızını artır ve ekstra puanları topla!"}
          </p>
        </div>
      </div>

      {!isPlaying && !isFinished ? (
        // Start screen
        <Card className="border-purple-500/30 bg-slate-900/60 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <CardHeader className="text-center space-y-5 py-8">
            <div className="relative mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-amber-400 via-yellow-400 to-purple-600 p-0.5 animate-pulse-glow flex items-center justify-center border border-yellow-300/30">
              <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center text-4xl select-none">
                ⚡
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 font-extrabold text-sm tracking-wider shadow-sm animate-pulse">
                🔥 En Yüksek Serin: {dbMaxStreak}
              </span>
            </div>
            <div>
              <CardTitle className="text-2xl font-extrabold text-white">Hazır Mısın?</CardTitle>
              <CardDescription className="text-sm mt-1 max-w-md mx-auto text-slate-300 font-medium">
                Süreye karşı yarışarak puan toplamak için **Yarışı Başlat** seçeneğini, 1-9 arası rakamlarla sınırsız ve puansız alıştırma yapmak için **Pratik Yap** seçeneğini kullan.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pb-8">
            <div className="bg-purple-950/20 p-4 rounded-xl space-y-3 border border-purple-500/20">
              <h4 className="font-bold text-sm text-purple-400">Mod Detayları:</h4>
              <ul className="text-sm space-y-2 list-disc list-inside text-slate-300 font-medium">
                <li><span className="font-bold text-purple-400">Şampiyona Modu:</span> Süreli yarış, doğru serisine göre katlanarak artan puanlar ve sıralama kaydı.</li>
                <li><span className="font-bold text-purple-400">Alıştırma Modu:</span> 1-9 arası rakamların 1-10 arası sayılarla sınırsız çarpımı, ateşli seri barı. Puan verilmez.</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => startGame("championship")} 
                className="flex-1 py-6 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20 rounded-xl transition-all hover:scale-[1.01] active:scale-95"
              >
                ⚡ Yarışı Başlat!
              </Button>
              <Button 
                onClick={() => startGame("practice")} 
                variant="outline"
                className="flex-1 py-6 text-lg font-bold border-purple-500/30 text-purple-400 hover:text-white hover:bg-purple-950/40 rounded-xl transition-all hover:scale-[1.01] active:scale-95"
              >
                📖 Pratik Yap
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : isPlaying ? (
        // Playing Screen
        <div className="space-y-6">
          {/* Top Status Bar */}
          <div className="grid grid-cols-3 gap-4">
            {gameMode === "practice" ? (
              <Card className="p-3 text-center border-purple-500/10 bg-card/50">
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Mod</span>
                <div className="text-sm font-bold flex items-center justify-center gap-1 mt-1.5 text-purple-400">
                  <BookOpen className="h-4 w-4" />
                  <span>Alıştırma</span>
                </div>
              </Card>
            ) : (
              <Card className="p-3 text-center border-purple-500/10 bg-card/50">
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Süre</span>
                <div className="text-xl font-bold flex items-center justify-center gap-1.5 mt-1 text-amber-500">
                  <Timer className="h-4 w-4" />
                  <span>{timeLeft} sn</span>
                </div>
              </Card>
            )}

            <Card className="p-3 text-center border-purple-500/10 bg-card/50">
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                {gameMode === "practice" ? "Doğru Sayısı" : "Puan"}
              </span>
              <div className="text-xl font-bold mt-1 text-green-500">
                <span>{gameMode === "practice" ? `${correctCount} Doğru` : `${score} Puan`}</span>
              </div>
            </Card>

            <Card className="p-3 text-center border-purple-500/10 bg-card/50">
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Aktif Seri</span>
              <div className="text-xl font-bold flex items-center justify-center gap-1 mt-1 text-purple-500">
                <Zap className="h-4 w-4 fill-purple-500" />
                <span>{streak}</span>
              </div>
            </Card>
          </div>

          {/* Time Progress Bar / Practice Streak Fire Bar */}
          {gameMode === "practice" ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-muted-foreground font-bold">
                <span>Seri Barı (Pratik)</span>
                <span className="flex items-center gap-1 text-amber-500">
                  {streak >= 10 ? "🔥 ATEŞLENDİN! 🔥" : `${streak} / 10`}
                </span>
              </div>
              <div className="h-4 w-full bg-slate-950/60 rounded-full border border-purple-500/15 overflow-hidden relative p-0.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-300",
                    streak >= 10 && "animate-pulse"
                  )}
                  style={{
                    width: `${Math.max(Math.min(streak, 10) * 10, streak > 0 ? 8 : 0)}%`,
                    backgroundColor: streak > 0 ? `hsl(${Math.max(60 - (streak - 1) * 6.6, 0)}, 100%, 50%)` : '#1e293b',
                    boxShadow: streak > 0 ? `0 0 12px hsl(${Math.max(60 - (streak - 1) * 6.6, 0)}, 100%, 50%, 0.7)` : 'none'
                  }}
                />
              </div>
            </div>
          ) : (
            <Progress value={(timeLeft / 60) * 100} className="h-2 bg-muted transition-all" />
          )}

          {/* Question Card */}
          {currentQuestion && (
            <Card className="border-purple-500/30 shadow-2xl relative overflow-hidden">
              {/* Feedback Overlay */}
              {showFeedback && (
                <div className={`absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[2px] transition-all ${
                  showFeedback === "correct" ? "bg-green-500/10" : "bg-red-500/10"
                }`}>
                  <div className="animate-ping-once text-5xl">
                    {showFeedback === "correct" ? (
                      <CheckCircle2 className="h-16 w-16 text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    ) : (
                      <XCircle className="h-16 w-16 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                    )}
                  </div>
                </div>
              )}

              <CardContent className="pt-10 pb-8 text-center space-y-6">
                {/* Multiplication formula visualization */}
                <div className="text-6xl font-black tracking-widest bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent py-4">
                  {currentQuestion.num1} <span className="text-3xl text-muted-foreground/60">×</span> {currentQuestion.num2}
                </div>
                <div className="text-sm text-muted-foreground">İşlemin cevabı nedir?</div>
              </CardContent>
            </Card>
          )}

          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion?.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOpt = option === currentQuestion.correctAnswer;
              
              let btnVariant: "outline" | "default" | "success" | "destructive" = "outline";
              if (selectedAnswer !== null) {
                if (isCorrectOpt) btnVariant = "success";
                else if (isSelected) btnVariant = "destructive";
              }

              return (
                <Button
                  key={idx}
                  variant={btnVariant}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className="h-20 text-2xl font-bold rounded-xl transition-all shadow-md active:scale-95"
                >
                  {option}
                </Button>
              );
            })}
          </div>

          {gameMode === "practice" && (
            <div className="pt-2 flex justify-center">
              <Button 
                onClick={endGame} 
                variant="ghost" 
                className="text-red-400 hover:text-red-300 hover:bg-red-950/20 font-bold px-6 py-2 rounded-xl transition-all animate-pulse"
              >
                Pratiği Bitir
              </Button>
            </div>
          )}
        </div>
      ) : (
        // Finished Screen
        <Card className="border-purple-500/30 bg-slate-900/60 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <CardHeader className="text-center space-y-4 py-8">
            <div className="mx-auto h-20 w-20 rounded-full bg-purple-500/10 flex items-center justify-center text-4xl shadow-lg border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)] animate-bounce-slow">
              {gameMode === "practice" ? (
                <BookOpen className="h-10 w-10 text-purple-500" />
              ) : (
                <Trophy className="h-10 w-10 text-yellow-500" />
              )}
            </div>
            <div>
              <CardTitle className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                {gameMode === "practice" ? "Alıştırma Tamamlandı!" : "Süre Bitti!"}
              </CardTitle>
              <CardDescription className="text-sm mt-1 text-slate-300 font-medium">
                {gameMode === "practice" ? "Kendini geliştirmek için harika bir çalışma yaptın." : "Yarışı başarıyla tamamladın."}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pb-8">
            {/* Stats display */}
            <div className="grid grid-cols-2 gap-4 text-center">
              {gameMode === "practice" ? (
                <div className="p-4 bg-slate-950/45 rounded-2xl border border-purple-500/10 col-span-2">
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Mod</span>
                  <p className="text-xl font-black text-purple-400 mt-1">Alıştırma Modu</p>
                  <span className="text-xs text-slate-400 font-medium">Bu moddan puan veya sıralama derecesi kazanılmaz.</span>
                </div>
              ) : (
                <>
                  <div className="p-4 bg-slate-950/45 rounded-2xl border border-purple-500/10">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Kazanılan Puan</span>
                    <p className="text-3xl font-black text-green-400 mt-1">+{score}</p>
                  </div>
                  <div className="p-4 bg-slate-950/45 rounded-2xl border border-purple-500/10">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">En Yüksek Seri</span>
                    <p className="text-3xl font-black text-purple-400 mt-1">{maxStreak}</p>
                  </div>
                </>
              )}
              {gameMode === "practice" && (
                <div className="p-3 bg-slate-950/30 rounded-xl border border-purple-500/5 col-span-2">
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">En Yüksek Seri</span>
                  <p className="text-2xl font-bold text-purple-400 mt-1">{maxStreak}</p>
                </div>
              )}
              <div className="p-3 bg-slate-950/30 rounded-xl border border-purple-500/5">
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Doğru Cevap</span>
                <p className="text-2xl font-bold text-green-500 mt-1">{correctCount}</p>
              </div>
              <div className="p-3 bg-slate-950/30 rounded-xl border border-purple-500/5">
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Hatalı Cevap</span>
                <p className="text-2xl font-bold text-red-400 mt-1">{incorrectCount}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button 
                onClick={handleBackToSelect} 
                variant="outline" 
                className="flex-1 py-6 font-bold rounded-xl border-purple-500/20 text-purple-400 hover:text-white hover:bg-purple-950/50"
              >
                Geri Dön
              </Button>
              <Button 
                onClick={() => startGame(gameMode || "championship")} 
                className="flex-1 py-6 font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg rounded-xl transition-all hover:scale-[1.01] active:scale-95"
              >
                <RotateCcw className="h-4 w-4 mr-2" /> Tekrar Oyna
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
