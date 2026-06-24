import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Gift, Snowflake, Palette } from "lucide-react";
import { useAppContext } from "@/pages/AppLayout";
import { avatars as allAvatars } from "@/data/avatars";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export default function MysteryChestCard() {
  const { totalPoints, handleBuyMysteryChest } = useAppContext();
  const [chestState, setChestState] = useState<'idle' | 'shaking' | 'open'>('idle');
  const [reward, setReward] = useState<{ 
    rewardType: 'avatar' | 'freeze' | 'theme'; 
    rewardId?: string; 
    amount?: number; 
    rarity?: 'common' | 'rare' | 'legendary'; 
  } | null>(null);
  const [showRewardModal, setShowRewardModal] = useState(false);

  const price = 300;

  const handleBuyAndOpen = async () => {
    if (totalPoints < price) {
      toast.error("Gizemli Sandık için yeterli puanın yok!");
      return;
    }

    setChestState('shaking');
    
    const result = await handleBuyMysteryChest();
    
    setTimeout(() => {
      if (result && result.success) {
        setChestState('open');
        setReward({ 
          rewardType: result.rewardType!, 
          rewardId: result.rewardId, 
          amount: result.amount, 
          rarity: result.rarity 
        });
        setTimeout(() => {
          setShowRewardModal(true);
          setChestState('idle');
        }, 600);
      } else {
        setChestState('idle');
      }
    }, 1500);
  };

  const getRewardDetails = () => {
    if (!reward) return null;
    
    const rarityConfig = {
      common: {
        rarityText: "Sıradan Ödül",
        borderClass: "border-slate-500 shadow-[0_0_20px_rgba(148,163,184,0.3)] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100",
        titleClass: "from-slate-400 via-slate-200 to-slate-400",
        glowColor: "rgba(148,163,184,0.15)",
        iconBg: "from-slate-800 to-slate-900",
        iconBorder: "border-slate-500",
        buttonClass: "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white shadow-slate-500/20",
        tagClass: "bg-slate-800/80 text-slate-300 border-slate-700",
        emoji: "◽",
        sparkles: ["⚪", "◽", "✨"]
      },
      rare: {
        rarityText: "Nadir Ödül",
        borderClass: "border-cyan-500 shadow-[0_0_25px_rgba(6,182,212,0.45)] bg-gradient-to-b from-cyan-950 via-slate-950 to-cyan-950 text-cyan-100",
        titleClass: "from-cyan-400 via-sky-200 to-teal-400",
        glowColor: "rgba(6,182,212,0.25)",
        iconBg: "from-cyan-900 to-slate-900",
        iconBorder: "border-cyan-400",
        buttonClass: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-cyan-500/20",
        tagClass: "bg-cyan-900/80 text-cyan-200 border-cyan-800",
        emoji: "🔷",
        sparkles: ["🔷", "✨", "🔵", "🌟"]
      },
      legendary: {
        rarityText: "Efsanevi Ödül",
        borderClass: "border-yellow-400 shadow-[0_0_40px_rgba(250,204,21,0.65)] bg-gradient-to-br from-indigo-950/95 via-slate-950 to-purple-950/95 text-yellow-100",
        titleClass: "from-yellow-400 via-amber-200 to-orange-500",
        glowColor: "rgba(250,204,21,0.35)",
        iconBg: "from-yellow-500/10 to-orange-500/20",
        iconBorder: "border-yellow-400 animate-pulse",
        buttonClass: "bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 text-white shadow-yellow-500/30",
        tagClass: "bg-yellow-950/80 text-yellow-200 border-yellow-800",
        emoji: "👑",
        sparkles: ["👑", "✨", "🎉", "🌟", "🥳"]
      }
    };
    
    const rarity = reward.rarity || 'common';
    const config = rarityConfig[rarity];
    
    const sparkles = config.sparkles;
    const paddedSparkles = Array.from({ length: 5 }, (_, i) => sparkles[i % sparkles.length]);

    if (reward.rewardType === 'theme') {
      const theme = cardThemes.find(t => t.id === reward.rewardId);
      return {
        title: "Yeni Bir Kart Teması Kazandın! 🎨",
        name: theme?.name || "Bilinmeyen Tema",
        image: null,
        description: "Profil sayfasındaki Temalarım sekmesinden bu temayı kuşanabilirsin.",
        rarityText: "Efsanevi Ödül",
        borderClass: "border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.45)] bg-gradient-to-b from-purple-950 via-slate-950 to-purple-950 text-purple-100",
        titleClass: "from-purple-400 via-pink-300 to-indigo-400",
        glowColor: "rgba(168,85,247,0.25)",
        iconBg: "from-purple-900 to-slate-900",
        iconBorder: "border-purple-400 animate-pulse",
        buttonClass: "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-purple-500/20",
        tagClass: "bg-purple-900/80 text-purple-200 border-purple-800",
        emoji: "🎨",
        sparkles: ["✨", "🎨", "🌟", "🎉", "🥳"],
        rarity: 'legendary'
      };
    }

    if (reward.rewardType === 'avatar') {
      const avatar = allAvatars.find(a => a.id === reward.rewardId);
      return {
        title: "Yeni Bir Avatar Kazandın! 🥳",
        name: avatar?.name || "Bilinmeyen Avatar",
        image: avatar?.image || "/placeholder.svg",
        description: "Profil sayfasından bu avatarı hemen kuşanabilirsin.",
        rarityText: config.rarityText,
        borderClass: config.borderClass,
        titleClass: config.titleClass,
        glowColor: config.glowColor,
        iconBg: config.iconBg,
        iconBorder: config.iconBorder,
        buttonClass: config.buttonClass,
        tagClass: config.tagClass,
        emoji: config.emoji,
        sparkles: paddedSparkles,
        rarity
      };
    }
    
    const count = reward.amount || 1;
    let titleStr = "Seri Dondurma Kazandın! ❄️";
    let nameStr = `${count} Adet Seri Dondurma`;
    if (count === 2) {
      titleStr = "Nadir Seri Dondurma Paketi! ❄️❄️";
    } else if (count === 5) {
      titleStr = "Efsanevi Seri Dondurma Deposu! 🧊👑";
    }
    
    return {
      title: titleStr,
      name: nameStr,
      image: null,
      description: "Çalışma serini korumak için cüzdanına dondurma hakları eklendi.",
      rarityText: config.rarityText,
      borderClass: config.borderClass,
      titleClass: config.titleClass,
      glowColor: config.glowColor,
      iconBg: config.iconBg,
      iconBorder: config.iconBorder,
      buttonClass: config.buttonClass,
      tagClass: config.tagClass,
      emoji: config.emoji,
      sparkles: paddedSparkles,
      rarity
    };
  };

  const rewardDetails = getRewardDetails();

  return (
    <>
      <Card className={cn(
        "shadow-card border-2 relative overflow-hidden transition-all duration-300",
        chestState === 'shaking' 
          ? "border-yellow-400 bg-yellow-500/5 shadow-yellow-500/10" 
          : "border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-900/10"
      )}>
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Gift className="h-32 w-32 text-purple-500" />
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-xl text-purple-600 dark:text-purple-400 font-extrabold">
            <Gift className="h-6 w-6 text-purple-500 animate-bounce-slow" /> Şanslı Gizem Sandığı
          </CardTitle>
          <CardDescription className="text-foreground/90 leading-relaxed text-sm">
            Şansını dene! 🎁 Puanlarını kullanarak gizemli sandığı aç; Liderlik Tablosunu süsleyecek efsanevi <strong className="font-semibold text-purple-700 dark:text-purple-300">Kart Temaları</strong>, birbirinden havalı özel <strong className="font-semibold text-purple-700 dark:text-purple-300">Avatarlar</strong> veya serini koruyacak <strong className="font-semibold text-purple-700 dark:text-purple-300">Seri Dondurma</strong> güçlendiricileri kazanma şansı yakala!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-purple-100 dark:border-purple-800 shadow-sm gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto justify-start">
              <div 
                className={cn(
                  "p-1 rounded-full shrink-0 flex items-center justify-center relative w-20 h-20 border border-purple-300/30 overflow-hidden bg-gradient-to-br from-indigo-950/20 to-purple-950/20",
                  chestState === 'shaking' && "animate-shake",
                  chestState === 'open' && "scale-105 bg-yellow-500/10 border-yellow-400/40"
                )}
              >
                <div className={cn(
                  "absolute inset-0 rounded-full blur transition-opacity duration-300",
                  chestState !== 'idle' ? "bg-yellow-400/20 opacity-100" : "opacity-0"
                )} />

                {chestState === 'open' ? (
                  <span className="text-4xl select-none animate-bounce">✨</span>
                ) : (
                  <img 
                    src="/assets/mystery.png" 
                    alt="Gizemli Sandık" 
                    className={cn(
                      "w-16 h-16 object-contain select-none",
                      chestState === 'idle' && "animate-bounce-slow"
                    )}
                  />
                )}
              </div>

              <div className="text-left">
                <p className="font-bold text-lg">Şans Kutusu</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground font-medium">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  Açılış: {price} Puan
                </div>
              </div>
            </div>

            <Button 
              onClick={handleBuyAndOpen} 
              disabled={totalPoints < price || chestState !== 'idle'}
              size="lg"
              className={cn(
                "w-full sm:w-auto font-bold shadow-md hover:shadow-lg transition-all",
                totalPoints < price 
                  ? "bg-slate-400 text-white cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/20"
              )}
            >
              {chestState === 'shaking' ? (
                "Sandık Sallanıyor..."
              ) : totalPoints < price ? (
                "Yetersiz Puan"
              ) : (
                "Sandığı Aç"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showRewardModal} onOpenChange={setShowRewardModal}>
        <DialogContent className={cn("max-w-sm sm:max-w-md rounded-2xl p-6 overflow-hidden border-2 transition-all duration-500", rewardDetails?.borderClass)}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
            {rewardDetails?.sparkles.map((sparkle, idx) => (
              <span 
                key={idx} 
                className={cn(
                  "absolute text-lg animate-ping",
                  idx === 0 && "top-1/4 left-1/4",
                  idx === 1 && "top-1/3 right-1/4",
                  idx === 2 && "bottom-1/4 left-1/2",
                  idx === 3 && "top-1/2 right-1/3",
                  idx === 4 && "bottom-1/3 left-1/4",
                )}
              >
                {sparkle}
              </span>
            ))}
          </div>

          <div className="flex flex-col items-center text-center space-y-4 relative z-10 py-2">
            <div className={cn(
              "relative h-28 w-28 rounded-full flex items-center justify-center border-2 shadow-[0_0_20px_rgba(250,204,21,0.2)] animate-[pulse_2s_infinite] bg-gradient-to-br transition-all duration-500", 
              rewardDetails?.iconBg, 
              rewardDetails?.iconBorder
            )}>
              {reward?.rewardType === 'theme' ? (
                <Palette className="h-14 w-14 text-purple-400 animate-pulse" />
              ) : rewardDetails?.image ? (
                <img 
                  src={rewardDetails.image} 
                  alt="Ödül Avatar" 
                  className="w-20 h-20 rounded-full object-cover border border-white/10"
                />
              ) : (
                <Snowflake className="h-14 w-14 text-cyan-400 animate-spin-slow animate-pulse" />
              )}
              
              {rewardDetails?.rarity === 'legendary' && reward.rewardType === 'avatar' && (
                <div className="absolute -top-1 -right-1 text-2xl animate-bounce">🏆</div>
              )}
              
              {reward?.rewardType === 'freeze' && reward.amount && reward.amount > 1 && (
                <div className={cn(
                  "absolute -bottom-1 -right-1 text-sm font-black px-2.5 py-0.5 rounded-full border shadow-md",
                  reward.rarity === 'common' && "bg-slate-700 border-slate-500 text-white",
                  reward.rarity === 'rare' && "bg-cyan-500 border-cyan-300 text-white",
                  reward.rarity === 'legendary' && "bg-yellow-500 border-yellow-300 text-black animate-pulse"
                )}>
                  x{reward.amount}
                </div>
              )}
            </div>

            <DialogHeader className="space-y-1 w-full flex flex-col items-center">
              <div className="flex justify-center mb-1">
                <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-bold border flex items-center gap-1 shadow-sm transition-all duration-500", rewardDetails?.tagClass)}>
                  <span>{rewardDetails?.emoji}</span>
                  <span>{rewardDetails?.rarityText}</span>
                </span>
              </div>
              <DialogTitle className={cn("text-2xl font-black bg-gradient-to-r bg-clip-text text-transparent text-center leading-tight transition-all duration-500", rewardDetails?.titleClass)}>
                {rewardDetails?.title}
              </DialogTitle>
              <DialogDescription className="text-base font-bold text-foreground mt-1">
                {rewardDetails?.name}
              </DialogDescription>
            </DialogHeader>

            <p className="text-xs text-muted-foreground leading-normal max-w-xs">
              {rewardDetails?.description}
            </p>

            <DialogFooter className="w-full pt-2">
              <Button 
                onClick={() => setShowRewardModal(false)}
                className={cn("w-full font-black text-base py-5 rounded-xl transition-all hover:translate-y-[-1px] active:translate-y-0", rewardDetails?.buttonClass)}
              >
                Harika, Devam Et! 🥳
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
