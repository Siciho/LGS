import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer } from "lucide-react";
import { supabase } from '@/supabaseClient';

const DEFAULT_LGS_DATE = '2026-06-07T09:30:00';
const CACHE_KEY = 'lgs_app_target_lgs_date';

const LgsCountdown = () => {
  const [targetDateStr, setTargetDateStr] = useState<string>(() => {
    return localStorage.getItem(CACHE_KEY) || DEFAULT_LGS_DATE;
  });

  const calculateTimeLeft = (targetStr: string) => {
    const targetDate = new Date(targetStr);
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDateStr));

  useEffect(() => {
    const fetchTargetDate = async () => {
      try {
        const { data, error } = await supabase
          .from('sistem_ayarlari')
          .select('deger')
          .eq('anahtar', 'lgs_tarihi')
          .maybeSingle();

        if (!error && data?.deger) {
          setTargetDateStr(data.deger);
          localStorage.setItem(CACHE_KEY, data.deger);
        }
      } catch (err) {
        console.error('LGS tarihi Supabase\'den çekilemedi:', err);
      }
    };

    fetchTargetDate();
  }, []);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetDateStr));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDateStr));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateStr]);

  const totalSchoolYearDays = 280;
  const daysPassed = Math.max(0, totalSchoolYearDays - timeLeft.days);
  const progressPercent = Math.min(100, Math.max(0, (daysPassed / totalSchoolYearDays) * 100));

  const [isBoosting, setIsBoosting] = useState(false);

  const handleRocketClick = () => {
    setIsBoosting(true);
    toast.success("LGS Yolculuğunda Tam Gaz İleri! 🚀", {
      description: "Çalışmaya devam et, hedefe adım adım yaklaşıyorsun!"
    });
    setTimeout(() => setIsBoosting(false), 1500);
  };

  return (
    <Card className="shadow-lg border-primary/20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white relative overflow-hidden">
      {/* Space stars styling effect */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-center gap-2 text-white">
          <Timer className="h-5 w-5 text-cyan-300 animate-pulse" />
          LGS Hedef Takipçisi
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Roket İlerleme Çubuğu (Rocket Track) */}
        <div className="relative w-full h-12 bg-white/5 rounded-xl border border-white/10 overflow-visible flex items-center px-4">
          <div className="absolute left-6 right-6 h-0.5 border-t border-dashed border-white/20 z-0" />
          
          <div 
            className="absolute left-6 h-1 bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 rounded-full z-0" 
            style={{ width: `calc(${progressPercent}% * 0.85)` }} 
          />

          <div className="absolute left-2 text-lg z-10 select-none cursor-help" title="Başlangıç (Dünya)">🌍</div>
          <div className="absolute right-2 text-xl z-10 select-none animate-pulse cursor-help" title="LGS Sınavı (Ay)">🌕</div>

          <div 
            onClick={handleRocketClick}
            className="absolute z-20 cursor-pointer transition-all duration-1000 ease-out"
            style={{ 
              left: `calc(1.5rem + ${progressPercent}% * 0.78)`,
              transform: `translateY(-2px) ${isBoosting ? 'scale(1.2) rotate(10deg)' : ''}`
            }}
          >
            <div className="relative group">
              {/* Flare flame trail */}
              <div 
                className={`absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-2 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 rounded-full blur-xs transition-all duration-300 ${
                  isBoosting ? 'scale-x-[2.2] opacity-100 animate-pulse' : 'opacity-80 scale-x-100'
                }`}
                style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}
              />
              
              <div className="absolute -inset-2 rounded-full bg-cyan-400/0 group-hover:bg-cyan-400/10 blur transition-all duration-300 pointer-events-none" />
              
              <svg 
                className={`w-7 h-7 text-cyan-200 transition-transform ${isBoosting ? 'animate-bounce' : 'animate-[pulse_1.5s_infinite]'}`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5L13 10l-4-4Z" />
                <path d="m12 8 4 4 6-6-1.5-1.5L16 6l-1.5-1.5Z" />
                <path d="M9 15 20 4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Geri Sayım Rakamları Grid */}
        <div className="grid grid-cols-4 gap-2 md:gap-4 text-center">
          <div className="bg-white/10 p-3 rounded-lg border border-white/5 backdrop-blur-xs">
            <p className="text-3xl md:text-4xl font-bold">{timeLeft.days}</p>
            <p className="text-xs uppercase text-cyan-200/80 font-medium mt-0.5">Gün</p>
          </div>
          <div className="bg-white/10 p-3 rounded-lg border border-white/5 backdrop-blur-xs">
            <p className="text-3xl md:text-4xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</p>
            <p className="text-xs uppercase text-cyan-200/80 font-medium mt-0.5">Saat</p>
          </div>
          <div className="bg-white/10 p-3 rounded-lg border border-white/5 backdrop-blur-xs">
            <p className="text-3xl md:text-4xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</p>
            <p className="text-xs uppercase text-cyan-200/80 font-medium mt-0.5">Dakika</p>
          </div>
          <div className="bg-white/10 p-3 rounded-lg border border-white/5 backdrop-blur-xs">
            <p className="text-3xl md:text-4xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</p>
            <p className="text-xs uppercase text-cyan-200/80 font-medium mt-0.5">Saniye</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LgsCountdown;