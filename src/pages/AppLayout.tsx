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
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileTransfer } from '@capacitor/file-transfer';
import { FileOpener } from '@capacitor-community/file-opener';
import { Capacitor } from '@capacitor/core';
import { Button } from "@/components/ui/button";

export const CURRENT_VERSION = "1.1.3";

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
    checkForUpdatesManual: (showFeedback: boolean) => Promise<void>;
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
  const [downloadState, setDownloadState] = useState<{
    status: 'idle' | 'downloading' | 'installing' | 'error';
    progress: number;
    errorMessage?: string;
  }>({ status: 'idle', progress: 0 });
  
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

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

    const isWeb = !Capacitor.isNativePlatform() || Capacitor.getPlatform() === 'web';
    if (isInitialized && userId && !isWeb && Capacitor.getPlatform() === 'android') {
      checkUpdate();
    }
  }, [isInitialized, userId]);

  const handleUpdateClick = async () => {
    if (!updateInfo.apkUrl) return;

    if (!Capacitor.isNativePlatform()) {
      // Fallback for web
      try {
        await Browser.open({ url: updateInfo.apkUrl });
      } catch (e) {
        window.open(updateInfo.apkUrl, '_blank');
      }
      return;
    }

    // Native OTA Download & Installation
    try {
      setDownloadState({ status: 'downloading', progress: 0 });

      // Resolve absolute local cache directory path
      const uriResult = await Filesystem.getUri({
        directory: Directory.Cache,
        path: 'LGS_Kocluk_Update.apk'
      });
      const localFilePath = uriResult.uri;

      // Proactively clean up any previous file to avoid conflicts
      try {
        await Filesystem.deleteFile({
          directory: Directory.Cache,
          path: 'LGS_Kocluk_Update.apk'
        });
      } catch (e) {
        // Ignore if file doesn't exist
      }

      // Add file-transfer listener
      const progressListener = await FileTransfer.addListener('progress', (progress) => {
        const pct = progress.contentLength > 0 
          ? Math.round((progress.bytes / progress.contentLength) * 100) 
          : 0;
        setDownloadState({ status: 'downloading', progress: isNaN(pct) ? 0 : pct });
      });

      // Start the download
      await FileTransfer.downloadFile({
        url: updateInfo.apkUrl,
        path: localFilePath,
        progress: true
      });

      // Remove the progress listener
      progressListener.remove();

      setDownloadState({ status: 'installing', progress: 100 });

      // Trigger the OS native package installer
      await FileOpener.open({
        filePath: localFilePath,
        contentType: 'application/vnd.android.package-archive'
      });
    } catch (err: any) {
      console.error("Native OTA update error:", err);
      setDownloadState({
        status: 'error',
        progress: 0,
        errorMessage: err.message || "Güncelleme paketi indirilirken veya kurulurken bir hata oluştu."
      });
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
  const handleClaimGift = async () => {
    if (coreData.claimGiftPoints) {
      await coreData.claimGiftPoints();
      toast.success("Ödül başarıyla hesabınıza eklendi! 🎉");
    }
  };
  
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

  const checkForUpdatesManual = async (showFeedback: boolean) => {
    const isWeb = !Capacitor.isNativePlatform() || Capacitor.getPlatform() === 'web';
    if (isWeb) {
      if (showFeedback) toast.success("Web sürümünüz güncel! 🎉");
      return;
    }
    try {
      const { data, error } = await supabase
        .from("app_settings")
        .select("latest_version, changelog, apk_url")
        .eq("id", "config")
        .maybeSingle();

      if (error) {
        if (showFeedback) toast.error("Güncelleme kontrolü başarısız oldu.");
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
        } else {
          if (showFeedback) toast.success("Uygulamanız güncel! 🎉");
        }
      } else {
        if (showFeedback) toast.success("Uygulamanız güncel! 🎉");
      }
    } catch (err) {
      if (showFeedback) toast.error("Beklenmeyen bir hata oluştu.");
    }
  };

  const contextValue: AppContextType = {
    ...auth, ...studyData, ...coreData, ...scheduler,
    handleQuizCompletion, handleEnglishUnitUnlocked,
    isMuted, toggleMute,
    pendingChallenges, dismissChallenge,
    checkForUpdatesManual,
  };
  
  if (auth.authLoading || !coreData.isCloudDataLoaded) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#090514] overflow-hidden">
        {/* Neon Işıma Arka Plan Halkaları (Galaxy Aura) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-purple-500/10 blur-[80px] animate-[pulse_3s_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-cyan-500/10 blur-[60px] animate-[pulse_2s_infinite]" />
        
        {/* Ortadaki Pulsing Logo ve Çerçeve */}
        <div className="relative flex flex-col items-center">
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center border-4 border-purple-500/30 bg-[#120b24] shadow-[0_0_30px_rgba(168,85,247,0.25)] animate-[pulse_1.5s_infinite]">
            {/* Pulsing Işıma Halkası (Radar Ping) */}
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-20" />
            
            <img 
              src="/logo.png" 
              alt="LGS Logo" 
              className="w-16 h-16 md:w-20 md:h-20 object-contain animate-bounce-slow"
              onError={(e) => {
                // Logo yüklenemezse yedek ikon göster
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const fallback = document.createElement('span');
                  fallback.className = 'text-5xl';
                  fallback.innerText = '🚀';
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
          
          {/* Neon Yükleniyor Yazısı */}
          <h2 className="text-xl md:text-2xl font-black mt-8 tracking-wider bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
            LGS ASİSTANIN
          </h2>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-2 animate-pulse">
            Veriler Yükleniyor...
          </p>
        </div>
      </div>
    );
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
          lifetimePoints={coreData.lifetimePoints}
          activeTheme={coreData.activeTheme} // ✅ Yeni prop: Aktif kart teması çerçeve efekti için
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
          if (downloadState.status === 'downloading' || downloadState.status === 'installing') return;
          if (!open) {
            sessionStorage.setItem("update_prompt_dismissed", "true");
            setUpdateInfo(prev => ({ ...prev, show: false }));
            setDownloadState({ status: 'idle', progress: 0 });
          }
        }}
      >
        <DialogContent className={`max-w-sm sm:max-w-md rounded-2xl p-6 overflow-hidden transition-all duration-500 ${downloadState.status !== 'idle' ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border-purple-500/30' : ''}`}>
          {downloadState.status !== 'idle' && (
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
          )}

          {downloadState.status === 'idle' ? (
            <>
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
            </>
          ) : (
            <div className="flex flex-col items-center text-center py-6 space-y-6 relative z-10 text-white">
              {downloadState.status === 'downloading' && (
                <>
                  <div className="relative h-32 w-32 flex items-center justify-center">
                    {/* Glowing outer ring */}
                    <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-xl animate-pulse" />
                    
                    {/* SVG Circular Progress */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="52"
                        className="stroke-white/10"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="52"
                        className="stroke-cyan-400 transition-all duration-300 ease-out"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 52}
                        strokeDashoffset={2 * Math.PI * 52 - (downloadState.progress / 100) * (2 * Math.PI * 52)}
                        strokeLinecap="round"
                        style={{ filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))" }}
                      />
                    </svg>
                    
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-black tracking-tighter text-cyan-300 drop-shadow-md">
                        %{downloadState.progress}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                        İndiriliyor
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold tracking-tight text-white animate-pulse">Yeni Sürüm Yükleniyor</h3>
                    <p className="text-xs text-slate-300 max-w-[280px]">
                      Güncelleme paketi güvenli bir şekilde indiriliyor. Lütfen uygulamayı kapatmayın.
                    </p>
                  </div>
                </>
              )}

              {downloadState.status === 'installing' && (
                <>
                  <div className="relative h-32 w-32 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl animate-ping" />
                    <div className="h-24 w-24 rounded-full bg-purple-500/10 border-2 border-purple-400/50 flex items-center justify-center text-4xl animate-bounce shadow-[0_0_20px_rgba(192,132,252,0.4)]">
                      🛠️
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold tracking-tight text-purple-300">Kurulum Hazırlanıyor</h3>
                    <p className="text-xs text-slate-300 max-w-[280px]">
                      Sistem yükleyicisi başlatılıyor. Lütfen ekranda çıkacak olan onay penceresini onaylayın.
                    </p>
                  </div>
                </>
              )}

              {downloadState.status === 'error' && (
                <>
                  <div className="relative h-32 w-32 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-xl animate-pulse" />
                    <div className="h-24 w-24 rounded-full bg-rose-500/10 border-2 border-rose-400/50 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(251,113,133,0.4)]">
                      ❌
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold tracking-tight text-rose-400">Güncelleme Başarısız</h3>
                    <p className="text-xs text-rose-200/80 max-w-[280px] font-medium">
                      {downloadState.errorMessage || "İndirme sırasında beklenmedik bir hata oluştu."}
                    </p>
                  </div>

                  <div className="flex gap-2 w-full pt-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setDownloadState({ status: 'idle', progress: 0 });
                      }}
                      className="flex-1 font-semibold text-slate-300 hover:text-white hover:bg-white/10"
                    >
                      Vazgeç
                    </Button>
                    <Button
                      onClick={() => {
                        setDownloadState({ status: 'idle', progress: 0 });
                        handleUpdateClick();
                      }}
                      className="flex-1 font-bold bg-rose-500 text-white hover:bg-rose-600 shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                    >
                      Tekrar Dene
                    </Button>
                  </div>

                  <button
                    onClick={async () => {
                      try {
                        await Browser.open({ url: updateInfo.apkUrl });
                      } catch (e) {
                        window.open(updateInfo.apkUrl, '_blank');
                      }
                    }}
                    className="text-[10px] text-slate-400 hover:text-cyan-400 underline transition-colors font-medium"
                  >
                    Tarayıcı ile indirmeyi dene (Alternatif)
                  </button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* HEDİYE PUAN KUTLAMA MODALI */}
      <Dialog 
        open={coreData.pendingGiftPoints > 0} 
        onOpenChange={(open) => {
          // Öğrenci modalı dışarı tıklayarak kapatamaz, hediye puanı al butonuna basmalıdır.
        }}
      >
        <DialogContent className="max-w-sm sm:max-w-md rounded-2xl p-6 overflow-hidden border-2 border-yellow-500/30 bg-card/95 backdrop-blur-md">
          {/* Arka plan süslemesi */}
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent pointer-events-none" />

          <div className="flex flex-col items-center text-center space-y-4 relative z-10 py-4">
            <div className="relative">
              <div className="text-6xl animate-bounce">🏆</div>
              <div className="absolute -top-2 -left-2 text-2xl animate-ping opacity-75">✨</div>
              <div className="absolute -bottom-2 -right-2 text-2xl animate-ping opacity-75">🎉</div>
            </div>

            <DialogTitle className="text-3xl font-black tracking-tight bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              Tebrikler! 🎉
            </DialogTitle>
            
            <DialogDescription className="text-sm font-bold text-foreground">
              Koçunuz sana özel bir başarı ödülü tanımladı!
            </DialogDescription>

            <div className="w-full bg-amber-500/10 border border-amber-500/25 p-4 rounded-2xl my-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-500 dark:text-amber-400">Kazanılan Ödül</span>
              <div className="text-4xl font-black text-amber-600 dark:text-amber-400 mt-1 mb-2 flex items-center justify-center gap-1.5">
                <span>+{coreData.pendingGiftPoints}</span>
                <span className="text-2xl">Puan</span>
              </div>
              
              {coreData.pendingGiftReason && (
                <div className="border-t border-amber-500/20 pt-2.5 mt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Ödül Sebebi</span>
                  <p className="text-sm text-foreground/90 font-semibold mt-0.5 leading-relaxed">
                    "{coreData.pendingGiftReason}"
                  </p>
                </div>
              )}
            </div>

            <p className="text-xs text-muted-foreground leading-normal">
              Ödül puanları cüzdanına ve liderlik sıralamana eklenmiştir. Başarılarının devamını dileriz!
            </p>

            <Button 
              onClick={handleClaimGift}
              className="w-full font-black text-lg bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white py-6 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-xl hover:translate-y-[-1px] transition-all"
            >
              Harika! Ödülü Al 🥳
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function useAppContext(): AppContextType { 
  return useOutletContext<AppContextType>();
}