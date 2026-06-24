import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Snowflake, Shield, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface StreakFreezeShieldProps {
  freezes: number;
}

export default function StreakFreezeShield({ freezes }: StreakFreezeShieldProps) {
  const [isCracking, setIsCracking] = useState(false);

  const hasFreezes = freezes > 0;

  const handleCardClick = () => {
    setIsCracking(true);
    if (hasFreezes) {
      toast.info("Dondurma Kalkanı Aktif! ❄️", {
        description: `Şu an ${freezes} adet seri koruma kalkanın var. Çalışamadığın günlerde serin erimeyecek!`
      });
    } else {
      toast.warning("Dondurma Kalkanın Yok! ⚠️", {
        description: "Serin tehlikede! Marketten hemen yeni bir koruma kalkanı satın alabilirsin."
      });
    }
    setTimeout(() => setIsCracking(false), 800);
  };

  return (
    <Card 
      onClick={handleCardClick}
      className={cn(
        "cursor-pointer overflow-hidden border transition-all duration-500 hover:-translate-y-1 select-none",
        hasFreezes 
          ? "bg-gradient-to-br from-cyan-950 via-blue-900 to-indigo-900 border-cyan-500/30 text-white shadow-cyan-500/10" 
          : "bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-900 border-slate-700/35 text-white opacity-85",
        isCracking && "animate-shake scale-102"
      )}
    >
      <CardContent className="p-4 flex items-center justify-between relative min-h-[96px]">
        {/* Glow Aura behind shield */}
        <div className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full blur-xl transition-all duration-500",
          hasFreezes ? "bg-cyan-400/20 shadow-[0_0_30px_rgba(34,211,238,0.4)]" : "bg-slate-700/10"
        )} />

        {/* Snowfall particles overlay */}
        {hasFreezes && (
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#a5f3fc_1px,transparent_1px)] [background-size:12px_12px] animate-pulse" />
        )}

        <div className="flex-1 pr-4 z-10 text-left">
          <h3 className={cn(
            "font-black tracking-tight text-xs uppercase",
            hasFreezes ? "text-cyan-300" : "text-slate-400"
          )}>
            {hasFreezes ? "Seri Koruyucu ❄️" : "Kalkan Kırık! ⚠️"}
          </h3>
          <p className="text-xl font-black text-white mt-0.5">
            {freezes} Dondurma
          </p>
          <p className="text-xs text-slate-300 font-medium leading-tight mt-1">
            {hasFreezes 
              ? "Buz Kalkanın devrede! Serin güvende." 
              : "Hemen marketten yeni bir kalkan al!"}
          </p>
        </div>

        {/* Shield element */}
        <div className="relative shrink-0 z-10 pr-2">
          {hasFreezes ? (
            <div className="relative">
              <Shield className="h-11 w-11 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
              <Snowflake className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-white animate-spin-slow" />
            </div>
          ) : (
            <div className="relative opacity-65">
              <ShieldAlert className="h-11 w-11 text-slate-500" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
