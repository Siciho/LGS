// src/pages/MultiplicationChallengePage.tsx

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./AppLayout";
import { supabase } from "@/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Timer, ArrowLeft, RotateCcw, Zap, CheckCircle2, XCircle } from "lucide-react";
import { playSuccessSound, playFailSound, playConfirmSound } from "@/utils/sounds";
import { toast } from "sonner";

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

  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
  const generateQuestion = (): Question => {
    // Standard multiplication table numbers between 2 and 12
    const num1 = Math.floor(Math.random() * 11) + 2; 
    const num2 = Math.floor(Math.random() * 11) + 2;
    const correctAnswer = num1 * num2;

    // Generate distractors
    const distractors = new Set<number>();
    while (distractors.size < 3) {
      // Create reasonable distractors close to correct answer or common mistakes
      const diff = (Math.floor(Math.random() * 7) - 3) * (Math.random() > 0.5 ? 1 : num1);
      const opt = correctAnswer + (diff === 0 ? 5 : diff);
      if (opt > 0 && opt !== correctAnswer) {
        distractors.add(opt);
      }
    }

    // Shuffle options
    const options = [correctAnswer, ...Array.from(distractors)].sort(() => 0.5 - Math.random());

    return { num1, num2, correctAnswer, options };
  };

  // Start the game
  const startGame = () => {
    playConfirmSound(isMuted);
    setIsPlaying(true);
    setIsFinished(false);
    setTimeLeft(60);
    setScore(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setStreak(0);
    setMaxStreak(0);
    setSelectedAnswer(null);
    setShowFeedback(null);
    setCurrentQuestion(generateQuestion());
  };

  // Timer Effect
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
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
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, timeLeft]);

  // End the game
  const endGame = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
    setIsFinished(true);
    playSuccessSound(isMuted);

    // Persist scores via context to database
    if (score > 0) {
      setTotalPoints((prev: number) => prev + score);
      setLifetimePoints((prev: number) => prev + score);
      toast.success(`Tebrikler! Çarpım tablosundan +${score} Puan kazandın! 🥳`);
    }

    // Save max streak to Supabase if exceeded
    if (maxStreak > dbMaxStreak) {
      setDbMaxStreak(maxStreak);
      if (userId) {
        try {
          const todayStrDb = new Date().toISOString().split('T')[0];
          await supabase.from('tamamlanan_gunluk_gorevler').insert({
            kullanici_id: userId,
            ders_id: `multiplication_max_streak:${maxStreak}`,
            tamamlanma_tarihi: todayStrDb
          });
        } catch (e) {
          console.error("Save max streak error:", e);
        }
      }
    }
  };

  // Handle Answer Selection
  const handleAnswer = (option: number) => {
    if (selectedAnswer !== null || !currentQuestion) return;

    setSelectedAnswer(option);
    const isCorrect = option === currentQuestion.correctAnswer;

    if (isCorrect) {
      setShowFeedback("correct");
      setCorrectCount((prev) => prev + 1);
      setStreak((prev) => {
        const newStreak = prev + 1;
        if (newStreak > maxStreak) setMaxStreak(newStreak);
        return newStreak;
      });

      // Calculate score based on new streak
      const newStreak = streak + 1;
      let earnedPoints = 1;
      if (newStreak >= 20) earnedPoints = 9;
      else if (newStreak >= 15) earnedPoints = 7;
      else if (newStreak >= 10) earnedPoints = 5;
      else if (newStreak >= 5) earnedPoints = 3;

      setScore((prev) => prev + earnedPoints);
      setTimeLeft((prev) => Math.min(prev + 2, 90)); // Add +2s time bonus
    } else {
      setShowFeedback("incorrect");
      playFailSound(isMuted);
      setIncorrectCount((prev) => prev + 1);
      setStreak(0);
      setTimeLeft((prev) => Math.max(prev - 5, 0)); // -5s penalty
    }

    // Go to next question after animation delay
    setTimeout(() => {
      setSelectedAnswer(null);
      setShowFeedback(null);
      if (timeLeft > 0) {
        setCurrentQuestion(generateQuestion());
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
          onClick={() => navigate("/practice", { state: { activeTab: "mini-oyunlar" } })}
          className="h-10 w-10 rounded-full border-purple-500/30 text-purple-500 hover:text-white hover:bg-purple-600 hover:border-purple-600 active:scale-95 transition-all shadow-[0_0_15px_rgba(168,85,247,0.15)]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Çarpım Tablosu Hız Şampiyonası
          </h1>
          <p className="text-sm text-muted-foreground font-medium">İşlem hızını artır ve ekstra puanları topla!</p>
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
                60 saniye içinde yapabildiğin kadar çarpma işlemini doğru cevapla. Hızlı ol, seriler oluştur ve kat kat puan kazan!
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pb-8">
            <div className="bg-purple-950/20 p-4 rounded-xl space-y-3 border border-purple-500/20">
              <h4 className="font-bold text-sm text-purple-400">Oyun Kuralları:</h4>
              <ul className="text-sm space-y-2 list-disc list-inside text-slate-300 font-medium">
                <li>Her doğru cevap taban **+1 Puan** kazandırır.</li>
                <li>Doğru cevaplar sürene **+2 saniye** ekler.</li>
                <li>Hatalı cevaplar sürenden **-5 saniye** düşürür.</li>
                <li>Her 5'li doğru seride (Streak) kazanç artar: 5 seride **3**, 10 seride **5**, 15 seride **7**, 20+ seride **9 Puan**!</li>
              </ul>
            </div>
            <Button onClick={startGame} className="w-full py-6 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20 rounded-xl transition-all hover:scale-[1.01] active:scale-95">
              Yarışı Başlat!
            </Button>
          </CardContent>
        </Card>
      ) : isPlaying ? (
        // Playing Screen
        <div className="space-y-6">
          {/* Top Status Bar */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-3 text-center border-purple-500/10 bg-card/50">
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Süre</span>
              <div className="text-xl font-bold flex items-center justify-center gap-1.5 mt-1 text-amber-500">
                <Timer className="h-4 w-4" />
                <span>{timeLeft} sn</span>
              </div>
            </Card>

            <Card className="p-3 text-center border-purple-500/10 bg-card/50">
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Puan</span>
              <div className="text-xl font-bold mt-1 text-green-500">
                <span>{score} Puan</span>
              </div>
            </Card>

            <Card className="p-3 text-center border-purple-500/10 bg-card/50">
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Seri (Streak)</span>
              <div className="text-xl font-bold flex items-center justify-center gap-1 mt-1 text-purple-500">
                <Zap className="h-4 w-4 fill-purple-500" />
                <span>{streak}</span>
              </div>
            </Card>
          </div>

          {/* Time Progress Bar */}
          <Progress value={(timeLeft / 60) * 100} className="h-2 bg-muted transition-all" />

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
        </div>
      ) : (
        // Finished Screen
        <Card className="border-purple-500/30 bg-slate-900/60 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <CardHeader className="text-center space-y-4 py-8">
            <div className="mx-auto h-20 w-20 rounded-full bg-yellow-500/10 flex items-center justify-center text-4xl shadow-lg border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.2)] animate-bounce-slow">
              <Trophy className="h-10 w-10 text-yellow-500" />
            </div>
            <div>
              <CardTitle className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Süre Bitti!</CardTitle>
              <CardDescription className="text-sm mt-1 text-slate-300 font-medium">Yarışı başarıyla tamamladın.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pb-8">
            {/* Stats display */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-slate-950/45 rounded-2xl border border-purple-500/10">
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Kazanılan Puan</span>
                <p className="text-3xl font-black text-green-400 mt-1">+{score}</p>
              </div>
              <div className="p-4 bg-slate-950/45 rounded-2xl border border-purple-500/10">
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">En Yüksek Seri</span>
                <p className="text-3xl font-black text-purple-400 mt-1">{maxStreak}</p>
              </div>
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
                onClick={() => navigate("/practice", { state: { activeTab: "mini-oyunlar" } })} 
                variant="outline" 
                className="flex-1 py-6 font-bold rounded-xl border-purple-500/20 text-purple-400 hover:text-white hover:bg-purple-950/50"
              >
                Geri Dön
              </Button>
              <Button 
                onClick={startGame} 
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
