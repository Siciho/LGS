import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Flame } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface StreakBoosterCardProps {
  streak: number;
}

export default function StreakBoosterCard({ streak }: StreakBoosterCardProps) {
  const [isSparking, setIsSparking] = useState(false);

  const getFlameStyles = () => {
    if (streak >= 8) {
      return {
        cardBg: "bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 border-purple-500/30 text-white shadow-purple-500/10",
        flameColor: "text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]",
        glow: "bg-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.4)]",
        title: "Efsanevi Seri! 🔥",
        description: "Alevlerin maviye döndü! Kimse seni durduramaz!",
        textColor: "text-purple-300"
      };
    }
    if (streak >= 4) {
      return {
        cardBg: "bg-gradient-to-br from-cyan-950 via-sky-900 to-slate-900 border-cyan-500/30 text-white shadow-cyan-500/10",
        flameColor: "text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]",
        glow: "bg-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.4)]",
        title: "Kozmik Seri! ⚡",
        description: "Harika gidiyorsun! Yıldızların gücü seninle!",
        textColor: "text-cyan-300"
      };
    }
    return {
      cardBg: "bg-gradient-to-br from-orange-950 via-amber-900 to-slate-900 border-orange-500/30 text-white shadow-orange-500/10",
      flameColor: "text-orange-400 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]",
      glow: "bg-orange-500/20 shadow-[0_0_30px_rgba(249,115,22,0.4)]",
      title: "Sıcak Seri! 🎒",
      description: "Günlük çalışma serini sürdür, zirveye yaklaş!",
      textColor: "text-orange-300"
    };
  };

  const styles = getFlameStyles();

  const handleCardClick = () => {
    setIsSparking(true);
    toast.success("Ateş Harladı! 🔥", {
      description: `Gidişatın süper, tam ${streak} gündür hedeflerine ulaşıyorsun!`
    });
    setTimeout(() => setIsSparking(false), 1000);
  };

  return (
    <Card 
      onClick={handleCardClick}
      className={cn(
        "cursor-pointer overflow-hidden border transition-all duration-500 hover:-translate-y-1 select-none",
        styles.cardBg,
        isSparking && "scale-102 rotate-1"
      )}
    >
      <CardContent className="p-4 flex items-center justify-between relative min-h-[96px]">
        {/* Glow Aura behind flame */}
        <div className={cn("absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full blur-xl transition-all duration-500", styles.glow)} />

        <div className="flex-1 pr-4 z-10 text-left">
          <h3 className={cn("font-black tracking-tight text-xs uppercase", styles.textColor)}>
            {styles.title}
          </h3>
          <p className="text-xl font-black text-white mt-0.5">
            {streak} Günlük Seri
          </p>
          <p className="text-xs text-slate-300 font-medium leading-tight mt-1">
            {styles.description}
          </p>
        </div>

        {/* Flame element */}
        <div className="relative shrink-0 z-10 pr-2">
          {isSparking && (
            <div className="absolute inset-0 z-0">
              <span className="absolute -top-4 left-1/2 text-sm animate-ping">✨</span>
              <span className="absolute top-2 -left-3 text-xs animate-ping">🔥</span>
              <span className="absolute top-4 -right-3 text-sm animate-ping">⚡</span>
            </div>
          )}
          <Flame 
            className={cn(
              "h-12 w-12 transition-all duration-300", 
              styles.flameColor,
              isSparking ? "animate-bounce scale-110" : "animate-[pulse_1.5s_infinite]"
            )} 
          />
        </div>
      </CardContent>
    </Card>
  );
}
