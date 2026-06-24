import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Swords, Trophy, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface WeeklyDuelCardProps {
  totalQuestions: number;
}

export default function WeeklyDuelCard({ totalQuestions }: WeeklyDuelCardProps) {
  const [isClashing, setIsClashing] = useState(false);
  
  const weeklyGoal = 150;
  const progressPercent = Math.min(100, Math.round((totalQuestions / weeklyGoal) * 100));

  const handleClashClick = () => {
    setIsClashing(true);
    if (progressPercent >= 100) {
      toast.success("Haftalık Hedef Feshedildi! ⚔️🎉", {
        description: "Haftalık düelloyu kazandın! Hedefini darmadağın ettin!"
      });
    } else {
      toast.info("Düello Devam Ediyor! ⚔️🔥", {
        description: `Hedefe ulaşmak için ${weeklyGoal - totalQuestions} soru daha çözmen gerek. Bastır!`
      });
    }
    setTimeout(() => setIsClashing(false), 800);
  };

  return (
    <Card 
      onClick={handleClashClick}
      className={cn(
        "cursor-pointer overflow-hidden border bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 border-indigo-500/20 text-white shadow-lg transition-all duration-500 select-none",
        isClashing && "scale-101 border-indigo-500/40"
      )}
    >
      <CardContent className="p-5 space-y-4">
        {/* Avatars Duel Header */}
        <div className="flex items-center justify-between relative">
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Left Fighter: Student */}
          <div className="flex flex-col items-center gap-1 z-10 w-24">
            <div className="h-10 w-10 rounded-full border-2 border-indigo-400 bg-indigo-950/50 flex items-center justify-center text-xl shadow-[0_0_10px_rgba(129,140,248,0.3)] animate-pulse">
              🎓
            </div>
            <span className="text-[10px] font-black uppercase text-indigo-300 truncate max-w-full">
              Sen
            </span>
          </div>

          {/* Center Clash Area */}
          <div className="flex flex-col items-center justify-center z-10 flex-1 relative">
            {isClashing && (
              <div className="absolute text-yellow-400 text-lg animate-ping">⚡</div>
            )}
            <div className={cn(
              "bg-indigo-500/10 p-2 rounded-full border border-indigo-500/30 shadow-[0_0_15px_rgba(129,140,248,0.2)] text-indigo-400 transition-all duration-200",
              isClashing ? "animate-bounce scale-120 rotate-12 text-yellow-400 border-yellow-400/40" : "animate-pulse"
            )}>
              <Swords className="h-5 w-5" />
            </div>
            <span className="text-[9px] font-bold tracking-widest text-indigo-400 uppercase mt-1">
              Düello
            </span>
          </div>

          {/* Right Fighter: Target Goal */}
          <div className="flex flex-col items-center gap-1 z-10 w-24">
            <div className="h-10 w-10 rounded-full border-2 border-pink-400 bg-pink-950/50 flex items-center justify-center text-xl shadow-[0_0_10px_rgba(244,114,182,0.3)] animate-pulse">
              👾
            </div>
            <span className="text-[10px] font-black uppercase text-pink-300 truncate max-w-full">
              Haftalık Canavar
            </span>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-1.5 z-10 relative">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300 flex items-center gap-1">
              <Trophy className="h-3.5 w-3.5 text-yellow-500" />
              Soru Çözme İlerlemesi
            </span>
            <span className="text-indigo-300 font-extrabold">{totalQuestions} / {weeklyGoal}</span>
          </div>
          
          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50 relative">
            <div 
              className={cn(
                "h-full bg-gradient-to-r rounded-full transition-all duration-500",
                progressPercent >= 100 
                  ? "from-emerald-500 to-green-400" 
                  : "from-indigo-500 via-purple-500 to-pink-500"
              )}
              style={{ width: `${progressPercent}%` }}
            />
            {progressPercent >= 100 && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-black text-white uppercase tracking-wider flex items-center gap-0.5">
                <Sparkles className="h-2.5 w-2.5 text-yellow-300 animate-spin" /> Defeated!
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
