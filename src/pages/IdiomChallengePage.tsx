// src/pages/IdiomChallengePage.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./AppLayout";
import { supabase } from "@/supabaseClient";
import { idioms, Idiom } from "@/data/idioms";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, Check, RefreshCw, Star, Swords, Award } from "lucide-react";
import { playSuccessSound, playFailSound, playConfirmSound, playSwipeSound } from "@/utils/sounds";
import { toast } from "sonner";
import SwipeableToast from '@/components/SwipeableToast';
import { cn } from "@/lib/utils";

import deyimGif from "../../assets/deyim.gif";
import kartGif from "../../assets/kart.gif";

type GameMode = "quiz" | "matching" | null;

interface MatchingItem {
  id: number;
  text: string;
  type: "idiom" | "meaning";
  matched: boolean;
}

export default function IdiomChallengePage() {
  const navigate = useNavigate();
  const { 
    userId, 
    dailySolvedSubjects = [], 
    completeDailyTask, 
    setTotalPoints, 
    setLifetimePoints, 
    isMuted 
  } = useAppContext();

  // Mode Selection State
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [roundScore, setRoundScore] = useState(0);

  // --- QUIZ MODE STATE ---
  const [quizQuestions, setQuizQuestions] = useState<Idiom[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [quizCorrectCount, setQuizCorrectCount] = useState(0);

  // --- MATCHING MODE STATE ---
  const [leftItems, setLeftItems] = useState<MatchingItem[]>([]);
  const [rightItems, setRightItems] = useState<MatchingItem[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null); // Index
  const [selectedRight, setSelectedRight] = useState<number | null>(null); // Index
  const [matchCount, setMatchCount] = useState(0);
  const [matchTries, setMatchTries] = useState(0);
  const [idiomAttempts, setIdiomAttempts] = useState<{ [id: number]: number }>({});

  // Dynamic plays limit calculation from context
  const quizPlays = (dailySolvedSubjects.includes("idiom_quiz_1") ? 1 : 0) + 
                    (dailySolvedSubjects.includes("idiom_quiz_2") ? 1 : 0);

  const matchingPlays = (dailySolvedSubjects.includes("idiom_matching_1") ? 1 : 0) + 
                        (dailySolvedSubjects.includes("idiom_matching_2") ? 1 : 0);

  // --- RED FLASH & SHAKE STATE ---
  const [showRedFlash, setShowRedFlash] = useState(false);
  const [mismatchedIndices, setMismatchedIndices] = useState<{ left: number; right: number } | null>(null);

  // Setup Quiz Game
  const startQuizMode = async () => {
    if (quizPlays >= 2) {
      toast.error("Bugünkü test çözme sınırına ulaştın! Yarın tekrar gel. 🧠");
      return;
    }

    const nextPlayId = `idiom_quiz_${quizPlays + 1}`;

    // Sync to Supabase
    if (userId) {
      try {
        const todayStrDb = new Date().toISOString().split('T')[0];
        await supabase.from('tamamlanan_gunluk_gorevler').insert({
          kullanici_id: userId,
          ders_id: nextPlayId,
          tamamlanma_tarihi: todayStrDb
        });
      } catch (e) {
        console.error("Save idiom quiz play error:", e);
      }
    }

    // Update local state instantly
    if (completeDailyTask) {
      completeDailyTask(nextPlayId);
    }

    playConfirmSound(isMuted);
    setGameMode("quiz");
    setIsPlaying(true);
    setIsFinished(false);
    setRoundScore(0);
    setQuizCorrectCount(0);
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setQuizFeedback(null);

    // Pick 5 random idioms
    const shuffled = [...idioms].sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuizQuestions(shuffled);
  };

  // Setup Matching Game
  const startMatchingMode = async () => {
    if (matchingPlays >= 2) {
      toast.error("Bugünkü kart eşleştirme sınırına ulaştın! Yarın tekrar gel. 🧠");
      return;
    }

    const nextPlayId = `idiom_matching_${matchingPlays + 1}`;

    // Sync to Supabase
    if (userId) {
      try {
        const todayStrDb = new Date().toISOString().split('T')[0];
        await supabase.from('tamamlanan_gunluk_gorevler').insert({
          kullanici_id: userId,
          ders_id: nextPlayId,
          tamamlanma_tarihi: todayStrDb
        });
      } catch (e) {
        console.error("Save idiom matching play error:", e);
      }
    }

    // Update local state instantly
    if (completeDailyTask) {
      completeDailyTask(nextPlayId);
    }

    playConfirmSound(isMuted);
    setGameMode("matching");
    setIsPlaying(true);
    setIsFinished(false);
    setRoundScore(0);
    setMatchCount(0);
    setMatchTries(0);
    setSelectedLeft(null);
    setSelectedRight(null);

    // Pick 4 random idioms for matching
    const selectedIdioms = [...idioms].sort(() => 0.5 - Math.random()).slice(0, 4);
    
    // Left items (idioms)
    const left: MatchingItem[] = selectedIdioms.map(item => ({
      id: item.id,
      text: item.idiom,
      type: "idiom",
      matched: false
    })).sort(() => 0.5 - Math.random());

    // Right items (meanings)
    const right: MatchingItem[] = selectedIdioms.map(item => ({
      id: item.id,
      text: item.meaning,
      type: "meaning",
      matched: false
    })).sort(() => 0.5 - Math.random());

    // Initialize attempts to 1 for all selected idioms
    const initialAttempts: { [id: number]: number } = {};
    selectedIdioms.forEach(item => {
      initialAttempts[item.id] = 1;
    });
    setIdiomAttempts(initialAttempts);

    setLeftItems(left);
    setRightItems(right);
  };

  // Handle Quiz Option Selection
  const handleQuizAnswer = (option: string) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(option);
    const currentQuestion = quizQuestions[currentQuizIndex];
    const isCorrect = option === currentQuestion.meaning;

    if (isCorrect) {
      setQuizFeedback("correct");
      setQuizCorrectCount(prev => prev + 1);
      setRoundScore(prev => prev + 5); // +5 points per correct answer
    } else {
      setQuizFeedback("incorrect");
      playFailSound(isMuted);
      setShowRedFlash(true);
      setTimeout(() => {
        setShowRedFlash(false);
      }, 500);
    }

    setTimeout(() => {
      setSelectedOption(null);
      setQuizFeedback(null);
      
      if (currentQuizIndex < quizQuestions.length - 1) {
        setCurrentQuizIndex(prev => prev + 1);
      } else {
        // End game
        endGame(roundScore + (isCorrect ? 5 : 0));
      }
    }, 1200);
  };

  // Handle Matching Cards clicks
  const handleLeftCardClick = (idx: number) => {
    if (leftItems[idx].matched) return;
    playSwipeSound(isMuted);
    setSelectedLeft(idx);

    // Check if right is already selected, try matching
    if (selectedRight !== null) {
      checkMatch(idx, selectedRight);
    }
  };

  const handleRightCardClick = (idx: number) => {
    if (rightItems[idx].matched) return;
    playSwipeSound(isMuted);
    setSelectedRight(idx);

    // Check if left is already selected, try matching
    if (selectedLeft !== null) {
      checkMatch(selectedLeft, idx);
    }
  };

  const checkMatch = (leftIdx: number, rightIdx: number) => {
    setMatchTries(prev => prev + 1);
    const leftItem = leftItems[leftIdx];
    const rightItem = rightItems[rightIdx];

    if (leftItem.id === rightItem.id) {
      // SUCCESSFUL MATCH
      const attempts = idiomAttempts[leftItem.id] || 1;
      let pointsEarned = 5;
      if (attempts === 2) {
        pointsEarned = 3;
      } else if (attempts >= 3) {
        pointsEarned = 1;
      }

      const updatedLeft = [...leftItems];
      updatedLeft[leftIdx].matched = true;
      setLeftItems(updatedLeft);

      const updatedRight = [...rightItems];
      updatedRight[rightIdx].matched = true;
      setRightItems(updatedRight);

      setMatchCount(prev => prev + 1);
      setRoundScore(prev => prev + pointsEarned);
      
      setSelectedLeft(null);
      setSelectedRight(null);

      // Check if all matched
      if (matchCount + 1 === 4) {
        setTimeout(() => {
          endGame(roundScore + pointsEarned);
        }, 800);
      }
    } else {
      // MISMATCH
      setIdiomAttempts(prev => ({
        ...prev,
        [leftItem.id]: (prev[leftItem.id] || 1) + 1,
        [rightItem.id]: (prev[rightItem.id] || 1) + 1
      }));

      playFailSound(isMuted);
      setShowRedFlash(true);
      setMismatchedIndices({ left: leftIdx, right: rightIdx });
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setShowRedFlash(false);
        setMismatchedIndices(null);
      }, 500);
    }
  };

  // End Game and Credit Points
  const endGame = (finalScore: number) => {
    setIsPlaying(false);
    setIsFinished(true);
    playSuccessSound(isMuted);

    if (finalScore > 0) {
      setTotalPoints((prev: number) => prev + finalScore);
      setLifetimePoints((prev: number) => prev + finalScore);
      toast.custom((t) => (
        <SwipeableToast
          id={t}
          title="Harika! 📚"
          description={`Deyim oyunundan +${finalScore} Puan cüzdanına eklendi.`}
          variant="success"
          icon="📚"
        />
      ), { duration: 6000, position: "top-center" });
    }
  };

  const handleBackToSelect = () => {
    playConfirmSound(isMuted);
    setIsPlaying(false);
    setIsFinished(false);
    setGameMode(null);
  };

  return (
    <div className="space-y-6 animate-slide-up max-w-2xl mx-auto p-6 relative bg-gradient-to-br from-slate-950 via-amber-950/20 to-slate-950 border border-amber-500/20 rounded-3xl shadow-2xl backdrop-blur-lg">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15%, 45%, 75% { transform: translateX(-6px); }
          30%, 60% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        @keyframes flash-red-bg {
          0% { opacity: 0.45; }
          100% { opacity: 0; }
        }
        .animate-flash-red {
          animation: flash-red-bg 0.5s ease-out forwards;
        }
        @keyframes pulse-glow-amber {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 15px rgba(245, 158, 11, 0.3), inset 0 0 8px rgba(245, 158, 11, 0.15);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 25px rgba(245, 158, 11, 0.6), inset 0 0 12px rgba(245, 158, 11, 0.35);
          }
        }
        .animate-pulse-glow-amber {
          animation: pulse-glow-amber 2s infinite ease-in-out;
        }
      `}</style>

      {showRedFlash && (
        <div className="fixed inset-0 bg-red-600/30 border-[16px] border-red-600/50 z-50 pointer-events-none animate-flash-red" />
      )} 
      <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-amber-500/10 pb-4 mb-6">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => (isPlaying || isFinished ? handleBackToSelect() : navigate("/practice", { state: { activeTab: "mini-oyunlar" } }))}
          className="h-10 w-10 rounded-full border-amber-500/30 text-amber-500 hover:text-white hover:bg-amber-600 hover:border-amber-600 active:scale-95 transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
            Deyim Avcısı
          </h1>
          <p className="text-sm text-muted-foreground font-medium">Deyimleri ve anlamlarını eğlenerek pekiştir!</p>
        </div>
      </div>

      {!isPlaying && !isFinished ? (
        // Mode Selection Screen
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-amber-500/30 bg-slate-900/60 backdrop-blur-md shadow-2xl hover:shadow-amber-500/10 hover:border-amber-500/50 transition-all flex flex-col justify-between rounded-2xl group overflow-hidden">
            <CardHeader className="text-center space-y-3 pt-8">
              <div className="mx-auto h-16 w-16 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)] group-hover:scale-110 transition-transform animate-pulse-glow-amber overflow-hidden">
                <img src={deyimGif} alt="Deyim Testi" className="h-full w-full object-cover" />
              </div>
              <CardTitle className="text-xl font-bold text-white">Deyim Anlam Testi</CardTitle>
              <CardDescription className="text-xs text-slate-300 font-medium">
                Sana sorulan deyimlerin doğru anlamlarını çoktan seçmeli sorularda bul. 5 soruluk test.
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="text-center text-xs text-muted-foreground mb-3 font-semibold">
                Kalan Hak: <span className="font-bold text-amber-500">{Math.max(0, 2 - quizPlays)} / 2</span>
              </div>
              <Button 
                onClick={startQuizMode} 
                disabled={quizPlays >= 2}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-5 rounded-xl shadow-lg transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
              >
                {quizPlays >= 2 ? "Günlük Hak Doldu" : "Testi Başlat"}
              </Button>
            </CardContent>
          </Card>
 
          <Card className="border-amber-500/30 bg-slate-900/60 backdrop-blur-md shadow-2xl hover:shadow-amber-500/10 hover:border-amber-500/50 transition-all flex flex-col justify-between rounded-2xl group overflow-hidden">
            <CardHeader className="text-center space-y-3 pt-8">
              <div className="mx-auto h-16 w-16 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)] group-hover:scale-110 transition-transform animate-pulse-glow-amber overflow-hidden">
                <img src={kartGif} alt="Kart Eşleştirmece" className="h-full w-full object-cover" />
              </div>
              <CardTitle className="text-xl font-bold text-white">Kart Eşleştirmece</CardTitle>
              <CardDescription className="text-xs text-slate-300 font-medium">
                Ekranda karışık gelen 4 deyim ve 4 anlamı birbirleriyle en az hamlede eşleştir.
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="text-center text-xs text-muted-foreground mb-3 font-semibold">
                Kalan Hak: <span className="font-bold text-amber-500">{Math.max(0, 2 - matchingPlays)} / 2</span>
              </div>
              <Button 
                onClick={startMatchingMode} 
                disabled={matchingPlays >= 2}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-5 rounded-xl shadow-lg transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
              >
                {matchingPlays >= 2 ? "Günlük Hak Doldu" : "Eşleştirmeyi Başlat"}
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : isPlaying && gameMode === "quiz" ? (
        // --- QUIZ GAMEPLAY ---
        <div className="space-y-6">
          <div className="flex justify-between items-center text-sm font-semibold text-muted-foreground">
            <span>Soru {currentQuizIndex + 1} / 5</span>
            <span className="text-green-500 flex items-center gap-1 font-bold"><Star className="h-4 w-4 fill-green-500 text-green-500" /> {roundScore} Puan</span>
          </div>

          <Progress value={((currentQuizIndex + 1) / 5) * 100} className="h-2 bg-slate-950" />

          {quizQuestions.length > 0 && (
            <Card className="border-amber-500/30 bg-slate-900/60 backdrop-blur-md shadow-2xl relative overflow-hidden rounded-2xl">
              <CardContent className="pt-8 pb-6 text-center space-y-4">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Deyim</span>
                <h2 className="text-3xl font-extrabold text-white italic">
                  "{quizQuestions[currentQuizIndex].idiom}"
                </h2>
                <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 text-sm text-slate-300 font-medium">
                  <span className="font-extrabold text-amber-500 mr-1">İpucu/Örnek:</span>
                  {quizQuestions[currentQuizIndex].hint}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Options List */}
          {quizQuestions.length > 0 && (
            <div className="space-y-3">
              {[quizQuestions[currentQuizIndex].meaning, ...quizQuestions[currentQuizIndex].distractors]
                .sort((a, b) => a.localeCompare(b)) // Simple alphabetical sort to shuffle options consistently
                .map((option, idx) => {
                  const isSelected = selectedOption === option;
                  const isCorrect = option === quizQuestions[currentQuizIndex].meaning;
                  
                  let btnVariant: "outline" | "default" | "success" | "destructive" = "outline";
                  if (selectedOption !== null) {
                    if (isCorrect) btnVariant = "success";
                    else if (isSelected) btnVariant = "destructive";
                  }

                  return (
                    <Button
                      key={idx}
                      variant={btnVariant}
                      onClick={() => handleQuizAnswer(option)}
                      disabled={selectedOption !== null}
                      className={cn(
                        "w-full min-h-16 py-3 px-4 text-left justify-start font-bold text-wrap rounded-xl border border-amber-500/20 bg-slate-900/40 hover:bg-amber-500/5 hover:border-amber-500/40 transition-all text-white",
                        isSelected && !isCorrect && "animate-shake border-red-500 ring-2 ring-red-500/40 bg-red-500/15 dark:bg-red-500/25 text-red-600 dark:text-red-400"
                      )}
                    >
                      {option}
                    </Button>
                  );
                })}
            </div>
          )}
        </div>
      ) : isPlaying && gameMode === "matching" ? (
        // --- MATCHING GAMEPLAY ---
        <div className="space-y-6">
          <div className="flex justify-between items-center text-sm font-semibold text-muted-foreground">
            <span>Eşleşen: {matchCount} / 4</span>
            <span>Hamle: {matchTries}</span>
            <span className="text-green-500 flex items-center gap-1 font-bold"><Star className="h-4 w-4 fill-green-500 text-green-500" /> {roundScore} Puan</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Left Column: Idioms */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-center text-amber-500/70 mb-1">Deyimler</h3>
              {leftItems.map((item, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleLeftCardClick(idx)}
                  className={cn(
                    "w-full h-24 text-base font-extrabold rounded-xl border border-amber-500/20 bg-slate-900/60 text-white justify-center hover:bg-amber-500/5 transition-all text-wrap px-2",
                    selectedLeft === idx && mismatchedIndices?.left !== idx && "border-amber-500 ring-2 ring-amber-500/30 bg-amber-500/10",
                    item.matched && "opacity-40 border-green-500 bg-green-500/5 text-green-400 cursor-not-allowed",
                    mismatchedIndices?.left === idx && "border-red-500 ring-2 ring-red-500/40 bg-red-500/15 dark:bg-red-500/25 animate-shake text-red-400"
                  )}
                  disabled={item.matched}
                >
                  {item.matched && <Check className="h-4 w-4 mr-1 inline-block" />}
                  {item.text}
                </Button>
              ))}
            </div>

            {/* Right Column: Meanings */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-center text-amber-500/70 mb-1">Anlamları</h3>
              {rightItems.map((item, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleRightCardClick(idx)}
                  className={cn(
                    "w-full h-24 text-xs font-bold rounded-xl border border-amber-500/20 bg-slate-900/60 text-slate-200 justify-center hover:bg-amber-500/5 transition-all text-wrap px-3 leading-tight",
                    selectedRight === idx && mismatchedIndices?.right !== idx && "border-amber-500 ring-2 ring-amber-500/30 bg-amber-500/10",
                    item.matched && "opacity-40 border-green-500 bg-green-500/5 text-green-400 cursor-not-allowed",
                    mismatchedIndices?.right === idx && "border-red-500 ring-2 ring-red-500/40 bg-red-500/15 dark:bg-red-500/25 animate-shake text-red-400"
                  )}
                  disabled={item.matched}
                >
                  {item.text}
                </Button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // --- FINISHED SCREEN ---
        <Card className="border-amber-500/30 bg-slate-900/60 backdrop-blur-md shadow-2xl relative overflow-hidden rounded-2xl">
          <CardHeader className="text-center space-y-4 py-8">
            <div className="mx-auto h-20 w-20 rounded-full bg-amber-500/10 flex items-center justify-center text-4xl shadow-lg border border-amber-500/30 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)] animate-bounce-slow">
              <Award className="h-10 w-10" />
            </div>
            <div>
              <CardTitle className="text-3xl font-black bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">Tebrikler!</CardTitle>
              <CardDescription className="text-sm mt-1 text-slate-300 font-medium">Deyim avını tamamladın.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pb-8">
            {/* Stats display */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-slate-950/45 rounded-2xl border border-amber-500/10 col-span-2">
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Kazanılan Puan</span>
                <p className="text-4xl font-black text-green-400 mt-1">+{roundScore} Puan</p>
              </div>
              
              {gameMode === "quiz" ? (
                <>
                  <div className="p-3 bg-slate-950/30 rounded-xl border border-amber-500/5">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Doğru Sayısı</span>
                    <p className="text-2xl font-bold text-green-500 mt-1">{quizCorrectCount}</p>
                  </div>
                  <div className="p-3 bg-slate-950/30 rounded-xl border border-amber-500/5">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Yanlış Sayısı</span>
                    <p className="text-2xl font-bold text-red-400 mt-1">{5 - quizCorrectCount}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 bg-slate-950/30 rounded-xl border border-amber-500/5">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Toplam Hamle</span>
                    <p className="text-2xl font-bold text-amber-500 mt-1">{matchTries}</p>
                  </div>
                  <div className="p-3 bg-slate-950/30 rounded-xl border border-amber-500/5">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Doğruluk</span>
                    <p className="text-2xl font-bold text-amber-500 mt-1">
                      {matchTries > 0 ? Math.round((4 / matchTries) * 100) : 0}%
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button 
                onClick={handleBackToSelect} 
                variant="outline" 
                className="flex-1 py-6 font-bold rounded-xl border-amber-500/20 text-amber-400 hover:text-white hover:bg-amber-950/50"
              >
                Mod Seçimine Dön
              </Button>
              <Button 
                onClick={gameMode === "quiz" ? startQuizMode : startMatchingMode} 
                disabled={gameMode === "quiz" ? quizPlays >= 2 : matchingPlays >= 2}
                className="flex-1 py-6 font-bold bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg rounded-xl transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
              >
                <RefreshCw className="h-4 w-4 mr-2" /> 
                {gameMode === "quiz" 
                  ? (quizPlays >= 2 ? "Hak Doldu" : "Tekrar Oyna") 
                  : (matchingPlays >= 2 ? "Hak Doldu" : "Tekrar Oyna")
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      </div>
    </div>
  );
}
