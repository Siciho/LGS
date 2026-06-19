import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Lock, Trophy, UserRound, Palette } from "lucide-react";
import { useAppContext } from "@/pages/AppLayout";
import { avatars as allAvatars } from "@/data/avatars";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Achievement } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLevelInfo } from "@/utils/level";
import { Progress } from "@/components/ui/progress";
import { cardThemes } from "@/data/themes";

export default function ProfilePage() {
  const { userAvatars, handleSetAvatar, achievements, lifetimePoints, unlockedThemes, activeTheme, handleSetTheme } = useAppContext();

  const lvlInfo = getLevelInfo(lifetimePoints);

  const sortedAvatars = useMemo(() => {
    const unlockedAvatars = allAvatars.filter(avatar =>
      (userAvatars?.unlocked || []).includes(avatar.id)
    );

    return [...unlockedAvatars].sort((a, b) => {
      if (a.id === 'default') return -1;
      if (b.id === 'default') return 1;
      return 0;
    });
  }, [userAvatars?.unlocked]);

  const sortedAchievements = useMemo(() => {
    const safeAchievements = achievements || [];
    return [...safeAchievements].sort((a, b) => {
      if (a.unlocked && !b.unlocked) return -1;
      if (!a.unlocked && b.unlocked) return 1;
      return 0;
    });
  }, [achievements]);

  const renderAchievements = () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sortedAchievements.map((achievement: Achievement) => (
          <Card
            key={achievement.id}
            className={cn(
              "relative transition-all duration-300",
              achievement.unlocked ? "bg-card/90" : "bg-card/50 opacity-60"
            )}
          >
            <CardContent className="flex flex-col items-center justify-center text-center p-4">
              <span className="text-4xl">
                {achievement.unlocked ? achievement.icon : <Lock className="h-10 w-10 text-muted-foreground" />}
              </span>
              <p className="font-semibold mt-2">{achievement.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Seviye ve İlerleme Kartı */}
      <Card className="shadow-card border border-border/50 dark:border-white/10 bg-card/90 backdrop-blur-sm p-5 flex flex-col md:flex-row items-center gap-6">
        <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shrink-0">
          <div className="flex flex-col items-center justify-center">
            <span className="text-[10px] font-black uppercase tracking-wider opacity-90">SEVİYE</span>
            <span className="text-3xl font-black leading-none">{lvlInfo.level}</span>
          </div>
          <div className="absolute -bottom-1 bg-primary text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-card shadow-sm">
            LVL
          </div>
        </div>

        <div className="flex-1 w-full space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">{lvlInfo.title}</h2>
              <p className="text-xs text-muted-foreground font-medium">Toplam kazanılan puana göre unvanın.</p>
            </div>
            <div className="text-sm font-bold text-muted-foreground text-right">
              <span className="text-foreground font-extrabold">{lifetimePoints || 0}</span> / {lvlInfo.maxPoints} XP
            </div>
          </div>

          <Progress value={lvlInfo.progress} className="h-3 bg-muted" />
          <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-wider">
            <span>Seviye {lvlInfo.level}</span>
            <span>Seviye {lvlInfo.level + 1}</span>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="avatarlar" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="avatarlar" className="flex items-center gap-2">
            <UserRound className="h-4 w-4" />
            Avatarlarım
          </TabsTrigger>
          <TabsTrigger value="temalar" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Temalarım
          </TabsTrigger>
          <TabsTrigger value="basarimlar" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Başarımlarım
          </TabsTrigger>
        </TabsList>

        <TabsContent value="avatarlar">
          <Card className="card-canli gradient-mor shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-2xl metin-beyaz font-bold">Profil ve Avatarlar</CardTitle>
              <CardDescription className="metin-acik-gri">Mevcut avatarını seç.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {sortedAvatars.map(avatar => {
                  const isCurrent = userAvatars?.current === avatar.id;

                  return (
                    <div
                      key={avatar.id}
                      className={cn(
                        "relative flex flex-col items-center gap-2 p-2 rounded-lg border-2 transition-all duration-300",
                        isCurrent ? 'border-white shadow-lg scale-105 bg-white/20' : 'border-transparent',
                        'cursor-pointer hover:border-white/50'
                      )}
                      onClick={() => handleSetAvatar(avatar.id)}
                    >
                      <img
                        src={avatar.image}
                        alt={avatar.name}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full aspect-square object-cover"
                      />
                      {isCurrent && (
                        <div className="absolute top-0 right-0 bg-white text-violet-500 rounded-full p-1">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                      )}
                      <p className="text-xs text-center font-medium metin-beyaz">{avatar.name}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="temalar">
          <Card className="card-canli gradient-mor shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-2xl metin-beyaz font-bold">Kart Temalarım</CardTitle>
              <CardDescription className="metin-acik-gri">Liderlik tablosundaki satırının görünümünü özelleştir.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cardThemes.map(theme => {
                  const isUnlocked = (unlockedThemes || []).includes(theme.id);
                  const isActive = activeTheme === theme.id;
                  
                  if (!isUnlocked) return null;

                  return (
                    <div
                      key={theme.id}
                      className={cn(
                        "relative flex flex-col justify-between p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer bg-background/90 dark:bg-background/40",
                        theme.className,
                        isActive ? 'border-indigo-500 dark:border-white ring-2 ring-indigo-500/20 scale-[1.01]' : 'border-transparent'
                      )}
                      onClick={() => handleSetTheme(theme.id)}
                    >
                      <div className="flex flex-col gap-1 pr-8">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className={cn("font-black text-sm md:text-base", theme.textClassName)}>{theme.name}</h4>
                          <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[9px] uppercase font-black", theme.badgeClassName)}>
                            {theme.label}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-2">{theme.description}</p>
                      </div>
                      
                      {isActive && (
                        <div className="absolute top-4 right-4 bg-emerald-500 text-white rounded-full p-0.5 shadow-md">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="basarimlar">
          <Card className="card-canli gradient-yesil shadow-lg border-none">
            <CardHeader>
              <CardTitle className="metin-beyaz font-bold">Başarımlarım</CardTitle>
              <CardDescription className="metin-acik-gri">Kazandığın tüm başarımları buradan görebilirsin.</CardDescription>
            </CardHeader>
            <CardContent>
              {renderAchievements()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};