import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Lock, Trophy, UserRound, Palette } from "lucide-react";
import { useAppContext } from "@/pages/AppLayout";
import { avatars as allAvatars } from "@/data/avatars";
import { useMemo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Achievement } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLevelInfo } from "@/utils/level";
import { Progress } from "@/components/ui/progress";
import { cardThemes, getThemeById, badges } from "@/data/themes";
import { useLocation } from "react-router-dom";
import Avatar from "@/components/Avatar";

export default function ProfilePage() {
  const { 
    userAvatars, 
    handleSetAvatar, 
    achievements, 
    lifetimePoints, 
    unlockedThemes, 
    activeTheme, 
    handleSetTheme,
    challengeWins,
    handleSetBadge,
    subjects,
    streak
  } = useAppContext();
  const location = useLocation();
  const state = location.state as { activeTab?: string; highlightAvatarId?: string } | null;

  const [activeTab, setActiveTab] = useState("avatarlar");

  useEffect(() => {
    if (state?.activeTab) {
      setActiveTab(state.activeTab);
    }
  }, [state?.activeTab]);

  const highlightAvatarId = state?.highlightAvatarId;

  useEffect(() => {
    if (highlightAvatarId) {
      const element = document.getElementById(`avatar-card-${highlightAvatarId}`);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [highlightAvatarId]);

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

  const totalQuestions = useMemo(() => {
    return subjects?.reduce((sum, s) => sum + (s.correct || 0) + (s.incorrect || 0), 0) || 0;
  }, [subjects]);

  const renderAchievements = () => {
    const totalCount = achievements?.length || 0;
    const unlockedCount = achievements?.filter(a => a.unlocked).length || 0;
    const percent = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

    return (
      <div className="space-y-6">
        {/* Başarı İstatistikleri Üst Paneli */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          {/* Arka plan dekoratif daireleri */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 rounded-full filter blur-2xl pointer-events-none -ml-12 -mb-12" />

          <div className="flex items-center gap-4 w-full md:w-auto relative z-10">
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] shrink-0">
              <Trophy className="h-7 w-7 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white tracking-wide">Başarım İlerlemesi</h3>
              <p className="text-xs text-slate-450 font-semibold mt-0.5">LGS Asistanım yolculuğunda kazandığın ödüller</p>
            </div>
          </div>

          <div className="w-full md:w-80 space-y-2 relative z-10">
            <div className="flex justify-between text-xs font-black tracking-wider text-slate-350">
              <span className="bg-slate-950/50 px-2.5 py-1 rounded-md border border-slate-850 flex items-center gap-1.5 text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-550 animate-pulse" />
                {unlockedCount} / {totalCount} Kazanıldı
              </span>
              <span className="text-emerald-400 font-black text-sm">{percent}%</span>
            </div>
            <div className="h-2.5 w-full bg-slate-950/80 rounded-full border border-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-550 via-teal-500 to-emerald-450 rounded-full transition-all duration-750 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Başarı Kartları Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sortedAchievements.map((achievement: Achievement) => {
            const isUnlocked = achievement.unlocked;

            // Kilitli başarımlar için ilerleme hesaplama
            const getProgressInfo = () => {
              if (isUnlocked) return null;
              if (achievement.category === 'questions' && achievement.requiredQuestions) {
                return { current: totalQuestions, target: achievement.requiredQuestions };
              }
              if (achievement.category === 'subject' && achievement.requiredSubjectId && achievement.requiredQuestions) {
                const subject = subjects?.find(s => s.id === achievement.requiredSubjectId);
                const solved = subject ? ((subject.correct || 0) + (subject.incorrect || 0)) : 0;
                return { current: solved, target: achievement.requiredQuestions };
              }
              if (achievement.category === 'streak' && achievement.requiredQuestions) {
                return { current: streak || 0, target: achievement.requiredQuestions };
              }
              return null;
            };

            const progressInfo = getProgressInfo();

            // Tarih formatlama
            const formatUnlockDate = (dateVal: any) => {
              if (!dateVal) return "";
              try {
                const d = new Date(dateVal);
                if (isNaN(d.getTime())) return "";
                return d.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
              } catch (e) {
                return "";
              }
            };
            const unlockDateStr = formatUnlockDate(achievement.unlockedAt);

            return (
              <Card
                key={achievement.id}
                className={cn(
                  "relative overflow-hidden transition-all duration-500 border-2 flex flex-col justify-between h-full min-h-[240px]",
                  isUnlocked 
                    ? "border-emerald-500/25 bg-gradient-to-br from-slate-900/98 via-slate-900/90 to-emerald-950/20 hover:scale-[1.03] hover:shadow-[0_12px_24px_rgba(16,185,129,0.18)] shadow-md animate-glow-emerald achievement-shine"
                    : "border-slate-800 bg-slate-950/40 opacity-70 hover:opacity-90 hover:border-slate-700/80 hover:bg-slate-900/40"
                )}
              >
                {/* Top Glowing Edge Strip */}
                <div className={cn(
                  "absolute top-0 left-0 right-0 h-1.5",
                  isUnlocked 
                    ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-green-500 shadow-[0_1px_5px_rgba(16,185,129,0.5)]" 
                    : "bg-slate-800/40"
                )} />

                <CardContent className="flex flex-col items-center text-center p-6 space-y-4 pt-8 h-full justify-between">
                  <div className="flex flex-col items-center space-y-3 w-full">
                    {/* Icon Container */}
                    <div className={cn(
                      "relative h-18 w-18 rounded-2xl flex items-center justify-center border transition-all duration-500",
                      isUnlocked 
                        ? "border-emerald-400/45 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-float-slow" 
                        : "border-slate-800 bg-slate-950/60 text-slate-500"
                    )}>
                      {isUnlocked ? (
                        <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(16,185,129,0.55)] select-none">
                          {achievement.icon}
                        </span>
                      ) : (
                        <Lock className="h-6 w-6 text-slate-600" />
                      )}
                      
                      {isUnlocked && (
                        <span className="absolute -bottom-1.5 -right-1.5 text-[10px] bg-emerald-500 text-white rounded-full h-5 w-5 flex items-center justify-center shadow-lg border-2 border-slate-900 font-black select-none">
                          ✓
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h4 className={cn(
                        "font-black text-base tracking-wide transition-colors",
                        isUnlocked ? "text-emerald-400 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]" : "text-slate-400"
                      )}>
                        {achievement.title}
                      </h4>
                      <p className={cn(
                        "text-xs font-medium leading-relaxed max-w-[210px] mx-auto",
                        isUnlocked ? "text-slate-350" : "text-slate-500"
                      )}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>

                  <div className="w-full space-y-2.5">
                    {/* Progress Bar (Kilitli ve İlerlemeli ise) */}
                    {progressInfo ? (
                      <div className="w-full space-y-1 px-1 bg-slate-950/30 p-2 rounded-xl border border-slate-900/40">
                        <div className="flex justify-between text-[9px] text-slate-450 font-bold uppercase tracking-wider">
                          <span>İlerleme</span>
                          <span>{progressInfo.current} / {progressInfo.target}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min(100, (progressInfo.current / progressInfo.target) * 100)}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      !isUnlocked && achievement.requirement && (
                        <p className="text-[10px] text-slate-500 bg-slate-950/20 py-1.5 px-2 rounded-lg border border-slate-900/40 font-semibold italic">
                          Gereksinim: {achievement.requirement}
                        </p>
                      )
                    )}

                    <div className="flex flex-col items-center w-full gap-1">
                      <span className={cn(
                        "inline-flex items-center px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm",
                        isUnlocked 
                          ? "bg-emerald-950/80 text-emerald-300 border-emerald-800 shadow-[0_0_8px_rgba(16,185,129,0.2)]" 
                          : "bg-slate-950/40 text-slate-500 border-slate-800"
                      )}>
                        {isUnlocked ? "Kazanıldı" : "Kilitli"}
                      </span>
                      
                      {isUnlocked && unlockDateStr && (
                        <span className="text-[9px] text-emerald-500/60 font-semibold tracking-wide mt-0.5">
                          {unlockDateStr} tarihinde açıldı
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="avatarlar" className="flex items-center gap-2 data-[state=active]:text-violet-400 data-[state=active]:font-black">
            <UserRound className="h-4 w-4 text-violet-500" />
            Avatarlarım
          </TabsTrigger>
          <TabsTrigger value="temalar" className="flex items-center gap-2 data-[state=active]:text-pink-400 data-[state=active]:font-black">
            <Palette className="h-4 w-4 text-pink-500" />
            Temalarım
          </TabsTrigger>
          <TabsTrigger value="basarimlar" className="flex items-center gap-2 data-[state=active]:text-emerald-400 data-[state=active]:font-black">
            <Trophy className="h-4 w-4 text-emerald-500" />
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
                  const isHighlighted = highlightAvatarId === avatar.id;

                  return (
                    <div
                      key={avatar.id}
                      id={`avatar-card-${avatar.id}`}
                      className={cn(
                        "relative flex flex-col items-center gap-2 p-2 rounded-lg border-2 transition-all duration-300",
                        isCurrent ? 'shadow-lg scale-105 bg-white/20' : 'border-transparent hover:border-white/50',
                        'cursor-pointer'
                      )}
                      onClick={() => handleSetAvatar(avatar.id)}
                    >
                      <Avatar
                        src={avatar.image}
                        alt={avatar.name}
                        themeId={isCurrent ? (activeTheme || 'default') : 'default'}
                        activeBadge={isCurrent ? userAvatars?.activeBadge : undefined}
                        size="lg"
                        highlight={isHighlighted}
                        interactive={false}
                      />
                      {isCurrent && (
                        <div className="absolute top-0 right-0 bg-white text-violet-500 rounded-full p-1 z-10">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                      )}
                      <p className="text-xs text-center font-medium metin-beyaz mt-1">{avatar.name}</p>
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

          {/* Mücadele Rozetlerim Section */}
          <Card className="card-canli gradient-mavi shadow-lg border-none mt-6">
            <CardHeader>
              <CardTitle className="text-2xl metin-beyaz font-bold flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-300 animate-bounce-slow" /> Mücadele Rozetlerim
              </CardTitle>
              <CardDescription className="metin-acik-gri">
                Word Challenge düellolarından kazandığın rozetleri avatarının arka yüzüne yerleştir. (Kuşanmak veya çıkarmak için tıklayın)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
                {badges.map(badge => {
                  const isUnlocked = (challengeWins || 0) >= badge.wins;
                  const isActive = userAvatars?.activeBadge === badge.image;

                  return (
                    <div
                      key={badge.name}
                      onClick={() => isUnlocked && handleSetBadge(isActive ? "" : badge.image)}
                      className={cn(
                        "relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-300 bg-background/90 dark:bg-background/40",
                        isUnlocked 
                          ? "cursor-pointer hover:scale-105 active:scale-95" 
                          : "opacity-40 cursor-not-allowed",
                        isActive 
                          ? "border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)]" 
                          : "border-transparent"
                      )}
                    >
                      <div className="relative">
                        <img
                          src={badge.image}
                          alt={badge.name}
                          className={cn(
                            "w-16 h-16 rounded-full object-cover aspect-square drop-shadow-md",
                            !isUnlocked && "grayscale"
                          )}
                        />
                        {isActive && (
                          <div className="absolute -top-1 -right-1 bg-yellow-400 text-black rounded-full p-0.5 shadow-md">
                            <CheckCircle className="h-4 w-4" />
                          </div>
                        )}
                        {!isUnlocked && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                            <Lock className="h-6 w-6 text-white/80" />
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-bold text-foreground mt-1 truncate max-w-[100px]">{badge.name}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {isUnlocked ? "Açık" : `${badge.wins} Galibiyet`}
                        </p>
                      </div>
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