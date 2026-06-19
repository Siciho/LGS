// src/hooks/useCoreData.ts

import { useState, useEffect, useMemo } from 'react';
import { storage } from '@/utils/storage';
import { supabase } from '@/supabaseClient';
import { toast } from 'sonner';
import { Achievement, UserAvatars, Subject } from '@/types';
import { achievements as initialAchievementsData } from '@/data/achievements';
import { avatars as allAvatars } from "@/data/avatars";
import { playPurchaseSound, playConfirmSound } from "@/utils/sounds";
import { cardThemes } from '@/data/themes';

export const useCoreData = (
  userId: string | null,
  userName: string | null, 
  userRole: string | null,
  isInitialized: boolean,
  isMuted: boolean
) => {
  const [totalPoints, setTotalPoints] = useState(0); // Bu artık "CÜZDAN"
  // --- DEĞİŞİKLİK 1: Yeni state eklendi ---
  const [lifetimePoints, setLifetimePoints] = useState(0); // Bu "TOPLAM KAZANILAN PUAN" (Sıralama için)

  const [streak, setStreak] = useState(0);
  const [streakFreezes, setStreakFreezes] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievementsData);
  const [userAvatars, setUserAvatars] = useState<UserAvatars>({ current: 'default', unlocked: ['default'] });
  const [challengeWins, setChallengeWins] = useState(0);
  const [unlockedThemes, setUnlockedThemes] = useState<string[]>(['default']);
  const [activeTheme, setActiveTheme] = useState<string>('default');
  const [isCloudDataLoaded, setIsCloudDataLoaded] = useState(false);
  const [isTestAccount, setIsTestAccount] = useState(false);
  const [pendingGiftPoints, setPendingGiftPoints] = useState<number>(0);
  const [pendingGiftReason, setPendingGiftReason] = useState<string>("");

  const isPrivilegedUser = useMemo(() => {
    const lowerCaseRole = userRole?.toLowerCase();
    return lowerCaseRole === 'koç' || lowerCaseRole === 'admin' || lowerCaseRole === 'hoca';
  }, [userRole]);


  const updateUserCloudData = async (dataToUpdate: object) => {
    if (!userId || !isInitialized) return;
    const { error } = await supabase.from('kullanicilar').update(dataToUpdate).eq('id', userId);
    if (error) console.error("Bulut verisi güncellenirken hata oluştu:", error);
  };

  useEffect(() => {
    if (!userId) {
      setIsCloudDataLoaded(true);
      setTotalPoints(0);
      setLifetimePoints(0); // Sıfırla
      setStreak(0);
      setStreakFreezes(0);
      setChallengeWins(0);
      setUserAvatars({ current: 'default', unlocked: ['default'] });
      setAchievements(initialAchievementsData);
      setIsTestAccount(false);
      return; 
    }

    setIsCloudDataLoaded(false);

    const fetchCoreData = async () => {
      try {
        const [cloudDataRes, winsDataRes] = await Promise.all([
          // --- DEĞİŞİKLİK 2: 'toplam_kazanilan_puan' ve tema sütunları da çekiliyor ---
          supabase.from('kullanicilar').select('puan, toplam_kazanilan_puan, seri, seri_dondurma, avatar, kazanilan_basarimlar, is_test_account, pending_gift_points, pending_gift_reason, unlocked_themes, active_theme').eq('id', userId).maybeSingle(),
          supabase.rpc('get_challenge_win_count', { p_user_id: userId })
        ]);

        if (winsDataRes.data) setChallengeWins(winsDataRes.data);

        const { data: cloudData, error } = cloudDataRes;
        
        if (!error && cloudData) {
            const isTest = cloudData.is_test_account === true;
            setIsTestAccount(isTest);
            
            if (isPrivilegedUser) {
                // ... (Ayrıcalıklı kullanıcı yüklemesi aynı kalır) ...
                let savedAvatarCurrent = 'default';
                if (cloudData.avatar) {
                    try { const parsed = typeof cloudData.avatar === 'string' ? JSON.parse(cloudData.avatar) : cloudData.avatar; if (parsed && parsed.current) { savedAvatarCurrent = parsed.current; } } catch (e) { /* Hata olursa varsayılanı kullan */ }
                }
                const allAvatarIds = allAvatars.map(avatar => avatar.id);
                const finalPrivilegedAvatars: UserAvatars = { current: savedAvatarCurrent, unlocked: allAvatarIds };
                setUserAvatars(finalPrivilegedAvatars);
                storage.saveUserAvatars(userId, finalPrivilegedAvatars);
                setTotalPoints(9999);
                setLifetimePoints(9999); // Test hesabı için bu da güncellendi
                setStreak(9999);
                setStreakFreezes(99);
                setAchievements(initialAchievementsData.map(a => ({ ...a, unlocked: true, unlockedAt: new Date() })));
                setChallengeWins(999);
                
                // Ayrıcalıklı kullanıcılar tüm temalara sahip olsun
                const allThemeIds = ['default', 'gold', 'neon', 'space'];
                setUnlockedThemes(allThemeIds);
                setActiveTheme(cloudData.active_theme || 'default');
                storage.saveUnlockedThemes(userId, allThemeIds);
                storage.saveActiveTheme(userId, cloudData.active_theme || 'default');
            } else {
                // --- DEĞİŞİKLİK 3: Her iki puan da set ediliyor ---
                setTotalPoints(cloudData.puan ?? 0); // Cüzdan
                setLifetimePoints(cloudData.toplam_kazanilan_puan ?? cloudData.puan ?? 0); // Sıralama Puanı (Eğer yeni sütun boşsa eskisini kullanır)
                setPendingGiftPoints(cloudData.pending_gift_points ?? 0);
                setPendingGiftReason(cloudData.pending_gift_reason ?? "");

                setStreak(cloudData.seri ?? 0);
                setStreakFreezes(cloudData.seri_dondurma ?? 0);

                const defaultAvatarState: UserAvatars = { current: 'default', unlocked: ['default'] };
                let cloudAvatars: UserAvatars | null = null;
                if (cloudData.avatar) {
                    try { cloudAvatars = typeof cloudData.avatar === 'string' ? JSON.parse(cloudData.avatar) : cloudData.avatar; } catch (e) { cloudAvatars = null; }
                }
                
                const finalAvatars: UserAvatars = {
                    current: cloudAvatars?.current || defaultAvatarState.current,
                    unlocked: cloudAvatars?.unlocked || defaultAvatarState.unlocked,
                };
                setUserAvatars(finalAvatars);
                storage.saveUserAvatars(userId, finalAvatars);
                
                const unlockedAchievementIds = new Set(cloudData.kazanilan_basarimlar || []);
                const syncedAchievements = initialAchievementsData.map(ach => ({ ...ach, unlocked: unlockedAchievementIds.has(ach.id) }));
                setAchievements(syncedAchievements);

                // Temaları buluttan yükle
                const finalThemes = cloudData.unlocked_themes || ['default'];
                const finalActiveTheme = cloudData.active_theme || 'default';
                setUnlockedThemes(finalThemes);
                setActiveTheme(finalActiveTheme);
                storage.saveUnlockedThemes(userId, finalThemes);
                storage.saveActiveTheme(userId, finalActiveTheme);
            }
        } else {
            setIsTestAccount(false);
            // ... (Lokal depolama yüklemesi aynı kalır, ancak lifetimePoints eklenir) ...
            setTotalPoints(storage.loadPoints(userId));
            setLifetimePoints(storage.loadPoints(userId)); // Lokal depolamada ayrım olmadığı için ikisine de aynısını yüklüyoruz
            setStreak(storage.loadStreak(userId));
            setStreakFreezes(storage.loadStreakFreezes(userId));
            setUserAvatars(storage.loadUserAvatars(userId));
            setAchievements(storage.loadAchievements(userId));

            // Lokal depolamadan yükle
            setUnlockedThemes(storage.loadUnlockedThemes(userId));
            setActiveTheme(storage.loadActiveTheme(userId));
        }
      } catch (e) {
          console.error("fetchCoreData içinde beklenmedik bir hata oluştu:", e);
      } finally {
          setIsCloudDataLoaded(true);
      }
    };
    fetchCoreData();

  }, [userId, userRole, userName, isPrivilegedUser]);

  // --- DEĞİŞİKLİK 4: Bu useEffect artık HER İKİ PUANI da güncelliyor ---
  useEffect(() => {
    if (!isInitialized || !userId || isPrivilegedUser) return;
    
    // NOT: Bu zamanlayıcı puan kazanma (quiz sonrası) veya seri artışı içindir.
    // 'harcama' işlemleri (handleBuyAvatar) GECİKMEZ.
    const debounceTimer = setTimeout(() => {
        // Lokal depolama (storage) sadece cüzdanı tutar (harcanabilir)
        storage.savePoints(userId, totalPoints); 
        storage.saveStreak(userId, streak);
        storage.saveStreakFreezes(userId, streakFreezes);
        
        // Supabase'e her iki puanı da gönder
        updateUserCloudData({
            puan: totalPoints, // Cüzdan
            toplam_kazanilan_puan: lifetimePoints, // Sıralama Puanı
            seri: streak,
            seri_dondurma: streakFreezes,
        });
    }, 1500);

    return () => clearTimeout(debounceTimer);
  // 'lifetimePoints' bağımlılıklara eklendi
  }, [totalPoints, lifetimePoints, streak, streakFreezes, isInitialized, userId, isPrivilegedUser, isTestAccount]);

  useEffect(() => {
    if (isInitialized && userId && achievements.length > 0 && !isPrivilegedUser) {
      storage.saveAchievements(userId, achievements);
      const unlockedIds = achievements.filter(a => a.unlocked).map(a => a.id);
      updateUserCloudData({ kazanilan_basarimlar: unlockedIds });
    }
  }, [achievements, isInitialized, userId, isPrivilegedUser, isTestAccount]);

  const handleSetAvatar = (avatarId: string) => {
    if (!userId) return;
    if ((userAvatars?.unlocked || []).includes(avatarId)) {
      const newAvatarsState: UserAvatars = {
        current: avatarId,
        unlocked: userAvatars?.unlocked || ['default']
      };
      setUserAvatars(newAvatarsState);
      storage.saveUserAvatars(userId, newAvatarsState);
      if (!isPrivilegedUser) {
        updateUserCloudData({ avatar: newAvatarsState });
      }
      toast.success("Avatarın değiştirildi!");
      playConfirmSound(isMuted);
    }
  };

  // --- DEĞİŞİKLİK 5: Avatar Satın Alma ---
  const handleBuyAvatar = (avatarId: string) => {
    if (!userId || isPrivilegedUser) return;
    const avatar = allAvatars.find(a => a.id === avatarId);
    if (!avatar || avatar.unlockMethod !== 'purchase') return;
    const price = avatar.price || 0;
    
    if (totalPoints >= price && !(userAvatars?.unlocked || []).includes(avatarId)) {
      
      const newTotalPoints = totalPoints - price; // Cüzdan azalır
      const newAvatarsState: UserAvatars = {
        current: userAvatars?.current || 'default',
        unlocked: [...(userAvatars?.unlocked || []), avatarId]
      };

      // Lokal state'i GÜNCELLE (Cüzdan azalır, sıralama puanı (lifetimePoints) AYNI KALIR)
      setTotalPoints(newTotalPoints);
      setUserAvatars(newAvatarsState);

      storage.saveUserAvatars(userId, newAvatarsState);

      // Buluta gönder (Sadece 'puan' (Cüzdan) güncellenir, 'toplam_kazanilan_puan' DEĞİŞMEZ)
      updateUserCloudData({ 
        avatar: newAvatarsState,
        puan: newTotalPoints 
      });
      
      toast.success(`${avatar.name} avatarı satın alındı!`);
      playPurchaseSound(isMuted);
    } else {
      toast.error("Yetersiz puan veya bu avatara zaten sahipsin.");
    }
  };
  
  // --- DEĞİŞİKLİK 6: Seri Dondurma Satın Alma ---
  const handleBuyStreakFreeze = () => {
    if (!userId || isPrivilegedUser) return;
    const price = 200; 
    
    if (totalPoints >= price) {
      
      const newTotalPoints = totalPoints - price; // Cüzdan azalır
      const newStreakFreezes = streakFreezes + 1;

      // Lokal state'i GÜNCELLE (Cüzdan azalır, sıralama puanı (lifetimePoints) AYNI KALIR)
      setTotalPoints(newTotalPoints);
      setStreakFreezes(newStreakFreezes);

      // Buluta gönder (Sadece 'puan' (Cüzdan) güncellenir, 'toplam_kazanilan_puan' DEĞİŞMEZ)
      updateUserCloudData({
        puan: newTotalPoints,
        seri_dondurma: newStreakFreezes
      });
      
      playPurchaseSound(isMuted);
    } else {
      toast.error("Yetersiz puan!");
    }
  };

  const claimGiftPoints = async () => {
    if (!userId || pendingGiftPoints <= 0) return;
    
    const pointsToAdd = pendingGiftPoints;
    const newTotalPoints = totalPoints + pointsToAdd;
    const newLifetimePoints = lifetimePoints + pointsToAdd;

    setTotalPoints(newTotalPoints);
    setLifetimePoints(newLifetimePoints);
    setPendingGiftPoints(0);
    setPendingGiftReason("");

    storage.savePoints(userId, newTotalPoints);

    const { error } = await supabase
      .from('kullanicilar')
      .update({
        puan: newTotalPoints,
        toplam_kazanilan_puan: newLifetimePoints,
        pending_gift_points: 0,
        pending_gift_reason: null
      })
      .eq('id', userId);

    if (error) {
      console.error("Hediye puan talep edilirken hata oluştu:", error);
    }
  };

  const checkAchievements = (subjects: Subject[], trigger: { type: 'quiz' | 'questions' | 'english_unit', data?: any }) => {
    if (!userId || isPrivilegedUser) return;
    
    const totalQuestions = subjects.reduce((sum, s) => sum + s.correct + s.incorrect, 0);
    
    let newAchievementsUnlocked = false;
    const updatedAchievements = achievements.map(ach => {
      if (ach.unlocked) return ach;
      let conditionMet = false;
      switch (ach.category) {
        case 'questions': if (ach.requiredQuestions && totalQuestions >= ach.requiredQuestions) conditionMet = true; break;
        case 'streak': if (ach.requiredQuestions && streak >= ach.requiredQuestions) conditionMet = true; break;
        case 'subject':
          const subjectData = subjects.find(s => s.id === ach.requiredSubjectId);
          if (subjectData && ach.requiredQuestions && (subjectData.correct + subjectData.incorrect) >= ach.requiredQuestions) { conditionMet = true; }
          break;
      }
      if (trigger.type === 'quiz') {
        const now = new Date();
        const quizResult: {correct: number, incorrect: number} = trigger.data.quizResult;
        if (ach.id === 'perfect-performance' && quizResult.incorrect === 0) conditionMet = true;
        if (ach.id === 'night-owl' && now.getHours() >= 0 && now.getHours() < 5) conditionMet = true;
        if (ach.id === 'early-bird' && now.getHours() >= 5 && now.getHours() < 7) conditionMet = true;
      }
      if (trigger.type === 'english_unit') { if (ach.id === 'english-unit-unlocked') conditionMet = true; }

      if (conditionMet) {
        newAchievementsUnlocked = true;
        toast.info(`Başarım Kazanıldı: ${ach.title}`);
        const avatarToUnlock = allAvatars.find(avatar => avatar.achievementId === ach.id);
        if (avatarToUnlock && userId) {
            setUserAvatars(currentAvatars => {
                const newAvatarsState: UserAvatars = {
                    current: currentAvatars.current || 'default',
                    unlocked: [...(currentAvatars.unlocked || []), avatarToUnlock.id]
                };
                storage.saveUserAvatars(userId, newAvatarsState);
                updateUserCloudData({ avatar: newAvatarsState });
                toast.success("Yeni bir avatar kazandın! 🥳");
                return newAvatarsState;
            });
        }
        return { ...ach, unlocked: true, unlockedAt: new Date() };
      }
      return ach;
    });
    if (newAchievementsUnlocked) {
      setAchievements(updatedAchievements);
    }
  };

  const handleSetTheme = (themeId: string) => {
    if (!userId) return;
    if (unlockedThemes.includes(themeId)) {
      setActiveTheme(themeId);
      storage.saveActiveTheme(userId, themeId);
      if (!isPrivilegedUser) {
        updateUserCloudData({ active_theme: themeId });
      }
      toast.success("Kart teman değiştirildi!");
      playConfirmSound(isMuted);
    }
  };

  const handleBuyTheme = (themeId: string) => {
    if (!userId || isPrivilegedUser) return;
    const theme = cardThemes.find(t => t.id === themeId);
    if (!theme) return;
    const price = theme.price;
    
    if (totalPoints >= price && !unlockedThemes.includes(themeId)) {
      const newTotalPoints = totalPoints - price;
      const newThemes = [...unlockedThemes, themeId];
      
      setTotalPoints(newTotalPoints);
      setUnlockedThemes(newThemes);
      
      storage.saveUnlockedThemes(userId, newThemes);
      
      updateUserCloudData({
        unlocked_themes: newThemes,
        puan: newTotalPoints
      });
      
      toast.success(`${theme.name} satın alındı!`);
      playPurchaseSound(isMuted);
    } else {
      toast.error("Yetersiz puan veya bu temaya zaten sahipsin.");
    }
  };

  return {
    totalPoints, setTotalPoints, // Cüzdan
    lifetimePoints, setLifetimePoints, // Sıralama Puanı (Yeni eklendi)
    streak, setStreak,
    streakFreezes, setStreakFreezes,
    achievements,
    userAvatars,
    challengeWins,
    handleBuyStreakFreeze,
    handleBuyAvatar,
    handleSetAvatar,
    checkAchievements,
    isCloudDataLoaded,
    isTestAccount,
    pendingGiftPoints,
    pendingGiftReason,
    claimGiftPoints,
    unlockedThemes,
    activeTheme,
    handleSetTheme,
    handleBuyTheme,
  };
};