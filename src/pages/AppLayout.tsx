// src/pages/AppLayout.tsx

import { Outlet, useOutletContext, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { storage } from "@/utils/storage";
import { toast } from 'sonner';
import { SolvedStat, Challenge } from '@/types';
import { LocalNotifications } from '@capacitor/local-notifications';
import { playFailSound } from '@/utils/sounds';
import { App } from '@capacitor/app';
import { supabase } from "@/supabaseClient";
import { Browser } from '@capacitor/browser';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CURRENT_VERSION = "1.0.0";

const isNewerVersion = (current: string, latest: string) => {
  const cParts = current.split('.').map(Number);
  const lParts = latest.split('.').map(Number);
  for (let i = 0; i < Math.max(cParts.length, lParts.length); i++) {
    const cVal = cParts[i] || 0;
    const lVal = lParts[i] || 0;
    if (lVal > cVal) return true;
    if (cVal > lVal) return false;
  }
  return false;
};

import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import ChallengeNotification from "@/components/ChallengeNotification";
import { useAuthContext } from "@/contexts/AuthContext"; 
import { useStudyData } from '@/hooks/useStudyData';
import { useCoreData } from '@/hooks/useCoreData';
import { useScheduler } from '@/hooks/useScheduler';

export type AppContextType =
  ReturnType<typeof useAuthContext> &
  ReturnType<typeof useCoreData> &
  ReturnType<typeof useStudyData> &
  ReturnType<typeof useScheduler> &
  {
    handleQuizCompletion: (subjectId: string, solvedStats: SolvedStat[] | null) => Promise<void>;
    handleEnglishUnitUnlocked: () => void;
    isMuted: boolean;
    toggleMute: () => void;
    pendingChallenges: Challenge[];
    dismissChallenge: (challengeId: string) => void;
  };

export default function AppLayout() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMuted, setIsMuted] = useState(() => storage.loadIsMuted());
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);
  const [pendingChallenges, setPendingChallenges] = useState<Challenge[]>([]);
  const [updateInfo, setUpdateInfo] = useState<{
    show: boolean;
    latestVersion: string;
    changelog: string;
    apkUrl: string;
  }>({ show: false, latestVersion: "", changelog: "", apkUrl: "" });
  
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/' || location.pathname === '/derslerim';
  const auth = useAuthContext();
  const { userId, userName, userRole } = auth;

  useEffect(() => {
    const checkUpdate = async () => {
      try {
        if (sessionStorage.getItem("update_prompt_dismissed") === "true") return;

        const { data, error } = await supabase
          .from("app_settings")
          .select("latest_version, changelog, apk_url")
          .eq("id", "config")
          .maybeSingle();

        if (error) {
          console.warn("Uygulama güncelleme kontrolü başarısız:", error);
          return;
        }

        if (data && data.latest_version) {
          const isNew = isNewerVersion(CURRENT_VERSION, data.latest_version);
          if (isNew) {
            setUpdateInfo({
              show: true,
              latestVersion: data.latest_version,
              changelog: data.changelog || "",
              apkUrl: data.apk_url || ""
            });
          }
        }
      } catch (err) {
        console.error("Güncelleme kontrolü sırasında beklenmeyen hata:", err);
      }
    };

    if (isInitialized && userId) {
      checkUpdate();
    }
  }, [isInitialized, userId]);

  const handleUpdateClick = async () => {
    if (updateInfo.apkUrl) {
      try {
        await Browser.open({ url: updateInfo.apkUrl });
      } catch (e) {
        window.open(updateInfo.apkUrl, '_blank');
      }
    }
  };

  useEffect(() => {
    const lowerCaseRole = userRole?.toLowerCase();
    if (lowerCaseRole === 'koç' || lowerCaseRole === 'admin' || lowerCaseRole === 'hoca') {
        if (location.pathname === '/' || location.pathname === '/derslerim' || location.pathname === '/practice') {
             navigate('/coach', { replace: true });
        }
    }
  }, [userRole, navigate, location.pathname]);

  const coreData = useCoreData(userId, userName, userRole, isInitialized, isMuted);
  const studyData = useStudyData(userId, isInitialized, isMuted, (result, newDailySolvedCount) => {
    if (userRole?.toLowerCase() === 'koç' || userRole?.toLowerCase() === 'admin') return;
    if (coreData.setTotalPoints && coreData.setLifetimePoints && coreData.setStreak) {
        const earnedPoints = result.correct * 10;
        coreData.setTotalPoints(prev => prev + earnedPoints);
        coreData.setLifetimePoints(prev => prev + earnedPoints);

        if (newDailySolvedCount === 3) {
            coreData.setStreak(prev => prev + 1);
            toast.success("Günlük seri arttı! 🔥");
        } else {
            toast.info("Harika bir paket tamamladın, devam et! 🎉");
        }
    }
  });
  const scheduler = useScheduler(userId, isInitialized);

  useEffect(() => {
    if (!userId) {
      setPendingChallenges([]);
      return;
    }
    const fetchChallenges = async () => {
      const { data, error } = await supabase.rpc('get_pending_challenges', { p_user_id: userId });
      if (error) console.error("Meydan okumalar çekilirken hata:", error);
      else if (data) setPendingChallenges(data);
    };
    fetchChallenges();
    const channel = supabase.channel(`challenges_for_${userId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'challenges', filter: `opponent_id=eq.${userId}` },
        () => fetchChallenges()
      ).subscribe();
    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [userId]);
  
  useEffect(() => {
    if (userId) { setTheme(storage.loadTheme(userId)); } else { setTheme('dark'); }
  }, [userId]);

  useEffect(() => {
    const checkDeepLink = async () => {
      const listener = await App.addListener('appUrlOpen', (event) => {
        if (event?.url) {
          const path = new URL(event.url).pathname.replace('/app', '');
          if (path) navigate(path);
        }
      });
      const initialUrl = await App.getLaunchUrl();
      if (initialUrl?.url) {
          const path = new URL(initialUrl.url).pathname.replace('/app', '');
          if (path) navigate(path);
      }
      return listener;
    };
    const listenerPromise = checkDeepLink();
    return () => { listenerPromise.then(l => l.remove()); };
  }, [navigate]);

  useEffect(() => {
    if (userId && userRole !== 'koç' && userRole !== 'admin' && !studyData.isLoading && studyData.lastActiveDate && coreData.setStreak) {
      const { lastActiveDate, setLastActiveDate } = studyData;
      const { streak, streakFreezes, setStreak, setStreakFreezes } = coreData;
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0]; 
      
      if (lastActiveDate !== todayStr) {
        const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (lastActiveDate < yesterdayStr) {
          if (streak > 0) {
            if (streakFreezes > 0) {
              setStreakFreezes(prev => prev - 1);
              setLastActiveDate(yesterdayStr);
              toast.info("Bir gün ara verdin ama Seri Dondurma serini kurtardı! ❄️");
            } else {
              setStreak(0);
              playFailSound(isMuted);
              toast.error("Serin sıfırlandı! 😢");
            }
          }
        }
      }
    }
  }, [userId, userRole, studyData.isLoading, studyData.lastActiveDate, coreData.streak, isMuted]);

  useEffect(() => {
    const requestPermissions = async () => {
      try { await LocalNotifications.requestPermissions(); } 
      catch (e) { console.error("Bildirim izni istenemedi.", e); } 
      finally { setIsInitialized(true); }
    };
    requestPermissions();
  }, []);

  useEffect(() => {
    if (coreData.isCloudDataLoaded && userId && studyData.subjects?.length > 0 && userRole !== 'koç' && userRole !== 'admin') {
      coreData.checkAchievements(studyData.subjects, { type: 'questions' });
    }
  }, [coreData.isCloudDataLoaded, userId, studyData.subjects, userRole, coreData]);

  useEffect(() => { storage.saveIsMuted(isMuted); }, [isMuted]);
  
  useEffect(() => {
    if (theme) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      if (userId) storage.saveTheme(userId, theme);
    }
  }, [theme, userId]);

  const toggleMute = () => setIsMuted(prev => !prev);
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  
  const handleQuizCompletion = async (subjectId: string, solvedStats: SolvedStat[] | null) => {
    if (!studyData.handleQuizCompletion || !coreData.checkAchievements) return;
    
    await studyData.handleQuizCompletion(subjectId, solvedStats);
    
    const correctCount = solvedStats ? solvedStats.filter(s => s.correct).length : 0;
    const incorrectCount = solvedStats ? 6 - correctCount : 6;
    
    coreData.checkAchievements(studyData.subjects, { type: 'quiz', data: { quizResult: { correct: correctCount, incorrect: incorrectCount } } });
  };
  
  const handleEnglishUnitUnlocked = () => {
    if (coreData.checkAchievements) { coreData.checkAchievements(studyData.subjects, { type: 'english_unit' }); }
  };
  const dismissChallenge = (challengeId: string) => { setPendingChallenges(prev => prev.filter(c => c.id !== challengeId)); };
  const totalQuestions = useMemo(() => studyData.subjects?.reduce((sum, s) => sum + s.correct + s.incorrect, 0) || 0, [studyData.subjects]);
  const unlockedAchievements = useMemo(() => coreData.achievements?.filter(a => a.unlocked).length || 0, [coreData.achievements]);

  const contextValue: AppContextType = {
    ...auth, ...studyData, ...coreData, ...scheduler,
    handleQuizCompletion, handleEnglishUnitUnlocked,
    isMuted, toggleMute,
    pendingChallenges, dismissChallenge,
  };
  
  if (auth.authLoading || !coreData.isCloudDataLoaded) {
    return <div className="fixed inset-0 flex items-center justify-center bg-background"><p>Uygulama Yükleniyor...</p></div>;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-2 sm:p-4 min-h-screen flex flex-col">
        <Header
          userName={userName}
          totalQuestions={totalQuestions}
          streak={coreData.streak}
          streakFreezes={coreData.streakFreezes} // --- DEĞİŞİKLİK: Prop olarak geçirildi ---
          unlockedAchievements={unlockedAchievements}
          totalPoints={coreData.totalPoints}
          theme={theme}
          toggleTheme={toggleTheme}
          currentAvatarId={coreData.userAvatars?.current || 'default'}
          isMuted={isMuted}
          toggleMute={toggleMute}
          isHomePage={isHomePage}
          userRole={userRole}
        />
        <main className="flex-1 pb-32">
          {scheduler.notificationSettings.challengeReminder && (
            <ChallengeNotification challenges={pendingChallenges} onDismiss={dismissChallenge} />
          )}
          <div>
            <Outlet context={contextValue} />
          </div>
        </main>
      </div>
      <BottomNav isMuted={isMuted} userRole={userRole} />

      {/* GÜNCELLEME DIALOGU */}
      <Dialog 
        open={updateInfo.show} 
        onOpenChange={(open) => {
          if (!open) {
            sessionStorage.setItem("update_prompt_dismissed", "true");
            setUpdateInfo(prev => ({ ...prev, show: false }));
          }
        }}
      >
        <DialogContent className="max-w-sm sm:max-w-md rounded-2xl p-6">
          <DialogHeader className="flex flex-col items-center text-center space-y-3">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-3xl animate-bounce">
              🚀
            </div>
            <DialogTitle className="text-2xl font-black tracking-tight text-center">Yeni Güncelleme Mevcut!</DialogTitle>
            <DialogDescription className="text-sm text-center">
              Uygulamanın en son sürümü hazır. Daha iyi bir deneyim için lütfen güncelleyin.
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 bg-muted/30 p-4 rounded-xl border border-border/50 max-h-[180px] overflow-y-auto">
            <div className="flex justify-between items-center text-xs font-bold text-muted-foreground mb-3 pb-2 border-b border-border/40">
              <span>Mevcut Sürüm: v{CURRENT_VERSION}</span>
              <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-full font-extrabold">Yeni: v{updateInfo.latestVersion}</span>
            </div>
            <h5 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-1">Yenilikler</h5>
            <p className="text-sm text-foreground/90 whitespace-pre-line leading-relaxed font-medium">
              {updateInfo.changelog || "Çeşitli iyileştirmeler ve hata düzeltmeleri."}
            </p>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                sessionStorage.setItem("update_prompt_dismissed", "true");
                setUpdateInfo(prev => ({ ...prev, show: false }));
              }}
              className="w-full sm:w-auto font-semibold order-2 sm:order-1"
            >
              Daha Sonra
            </Button>
            <Button 
              onClick={handleUpdateClick}
              className="w-full sm:w-auto font-bold bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:translate-y-[-1px] transition-all order-1 sm:order-2"
            >
              Şimdi Güncelle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function useAppContext(): AppContextType { 
  return useOutletContext<AppContextType>();
}