// src/pages/LeaderboardPage.tsx

import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/supabaseClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Crown, Star, Target, Flame, X, Swords } from 'lucide-react';
import { cn } from '@/lib/utils';
import { avatars } from '@/data/avatars';
import { UserAvatars } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAppContext } from './AppLayout';
import { getLevelInfo } from "@/utils/level";
import { getThemeById } from "@/data/themes";

interface LeaderboardEntry {
  rank: number; // Bu artık SADECE 'Tümü' filtresi için kullanılacak
  user_id: string;
  user_name: string;
  user_avatar: UserAvatars | null;
  user_class: string;
  total_score: number;
  total_questions: number;
  seri: number;
  challenge_wins: number;
  lifetime_points: number;
  active_theme?: string;
}

const defaultAvatar = avatars.find(a => a.id === 'default')?.image || '';

const getAvatarImage = (avatarData: UserAvatars | null) => {
  const currentAvatarId = avatarData?.current || 'default';
  return avatars.find(a => a.id === currentAvatarId)?.image || defaultAvatar;
};

const getRankText = (rank: number) => {
  if (rank === 1) return 'Lider!';
  if (rank === 2) return 'Yakın Takipte!';
  if (rank === 3) return 'Podyumda!';
  if (rank <= 10) return 'İlk 10\'da';
  return 'Sıralamada';
};

export default function LeaderboardPage() {
  const { userRole } = useAppContext();
  const isCoach = useMemo(() => {
    const lowerRole = userRole?.toLowerCase();
    return lowerRole === 'koç' || lowerRole === 'admin' || lowerRole === 'hoca';
  }, [userRole]);

  const [timeFilter, setTimeFilter] = useState<'all' | 'month' | 'last_week'>('all');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]); 
  const [loading, setLoading] = useState(true);
  
  const [selectedStudent, setSelectedStudent] = useState<LeaderboardEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedClass, setSelectedClass] = useState("Tümü");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setSelectedClass("Tümü");
      
      let rpcName = 'get_all_time_leaderboard';
      let rpcParams = {};

      if (timeFilter === 'all') {
        rpcName = 'get_all_time_leaderboard';
        rpcParams = {};
      } else if (timeFilter === 'month') {
        rpcName = 'get_monthly_leaderboard';
        rpcParams = {};
      } else if (timeFilter === 'last_week') {
        rpcName = 'get_last_week_leaderboard'; 
        rpcParams = {};
      }

      const { data, error } = await supabase.rpc(rpcName, rpcParams);

      if (error) {
        console.error("Liderlik tablosu hatası:", error); 
        toast.error('Liderlik tablosu yüklenemedi.', {
          description: `Fonksiyon (${rpcName}) bulunamadı veya bir hata oluştu.`,
        });
      } else {
        // SQL'den gelen 'rank' verisini SAKLIYORUZ (Tümü filtresi için)
        setLeaderboard(data || []);
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, [timeFilter]);

  const availableClasses = useMemo(() => {
    if (leaderboard.length === 0) return [];
    const classSet = new Set(leaderboard.map(s => s.user_class).filter(Boolean));
    return ["Tümü", ...Array.from(classSet).sort()];
  }, [leaderboard]);

  const filteredLeaderboard = useMemo(() => {
    if (selectedClass === 'Tümü') {
      // 'Tümü' seçiliyse, SQL'den gelen orijinal listeyi (ve rank'i) kullan
      return leaderboard; 
    }
    // Sınıf filtresi varsa, listeyi filtrele
    return leaderboard.filter(student => student.user_class === selectedClass);
  }, [leaderboard, selectedClass]);

  // --- DEĞİŞİKLİK 1: getRankClass fonksiyonu artık 'index + 1'e göre çalışacak ---
  const getRankClass = (rank: number) => {
    if (rank === 1) return 'border-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20';
    if (rank === 2) return 'border-gray-400 bg-gray-400/10 hover:bg-gray-400/20';
    if (rank === 3) return 'border-yellow-600 bg-yellow-600/10 hover:bg-yellow-600/20';
    return 'border-border/50 hover:bg-muted/50';
  };

  const handleStudentClick = (student: LeaderboardEntry) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="space-y-6 animate-slide-up">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-yellow-500" />
              Liderlik Tablosu
            </CardTitle>
            <CardDescription>Skorlara göz at ve rekabete katıl! (Bir öğrencinin detayını görmek için tıkla)</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={timeFilter} onValueChange={(v) => setTimeFilter(v as 'all' | 'month' | 'last_week')}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">Tüm Zamanlar</TabsTrigger>
                <TabsTrigger value="month">Bu Ay</TabsTrigger>
                <TabsTrigger value="last_week">Bu Hafta</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2 overflow-x-auto pb-2 pt-4 mb-2">
                {availableClasses.length > 1 && availableClasses.map(className => (
                  <Button
                    key={className}
                    variant={selectedClass === className ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedClass(className)}
                    className="flex-shrink-0"
                  >
                    {className}
                  </Button>
                ))}
              </div>

              <TabsContent value={timeFilter}>
                {loading ? (
                  <div className="text-center p-10">Yükleniyor...</div>
                ) : (
                  <div className="mt-4 space-y-2">
                    {filteredLeaderboard.length === 0 ? (
                      <div className="text-center p-10 text-muted-foreground">
                        {leaderboard.length === 0 ? 
                          "Bu zaman aralığı için veri bulunamadı." : 
                          "Bu sınıfta öğrenci bulunamadı."}
                      </div>
                    ) : (
                      filteredLeaderboard.map((entry, index) => {
                        const currentRank = selectedClass === 'Tümü' ? entry.rank : index + 1;
                        const theme = getThemeById(entry.active_theme || 'default');
                        const rowStyle = theme.id === 'default' 
                          ? getRankClass(currentRank) 
                          : theme.className;
                        
                        return (
                          <Button
                            key={entry.user_id}
                            variant="ghost" 
                            className={cn(
                              'p-4 h-auto w-full justify-start text-left', 
                              'border rounded-lg transition-all',
                              rowStyle
                            )}
                            onClick={() => handleStudentClick(entry)}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                {/* --- DEĞİŞİKLİK 5: 'entry.rank' yerine 'currentRank' gösteriliyor --- */}
                                <span className="text-lg font-bold w-6 text-center">{currentRank}</span>
                                <img
                                  src={getAvatarImage(entry.user_avatar)}
                                  alt={entry.user_name}
                                  className={cn("w-12 h-12 rounded-full object-cover shrink-0 transition-all duration-300", theme.avatarClassName)}
                                />
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <p className={cn("font-semibold text-foreground", theme.id !== 'default' && theme.textClassName)}>
                                      {entry.user_name}
                                    </p>
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm shrink-0">
                                      LVL {getLevelInfo(entry.lifetime_points || 0).level}
                                    </span>
                                    {theme.id !== 'default' && (
                                      <span className={cn("inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider shrink-0", theme.badgeClassName)}>
                                        {theme.label}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {/* --- DEĞİŞİKLİK 6: 'getRankText' yeni rank'i kullanıyor --- */}
                                    {entry.user_class} Sınıfı - {getRankText(currentRank)}
                                  </p>
                                </div>
                              </div>
                              {/* --- DEĞİŞİKLİK 7: Rozetler de yeni rank'e göre gösteriliyor --- */}
                              {currentRank === 1 && <Crown className="h-5 w-5 text-yellow-400" />}
                              {currentRank === 2 && <Crown className="h-5 w-5 text-gray-400" />}
                              {currentRank === 3 && <Crown className="h-5 w-5 text-yellow-600" />}
                            </div>
                          </Button>
                        )
                      })
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            {selectedStudent && (
              <div className="flex flex-col items-center pt-4">
                <img
                  src={getAvatarImage(selectedStudent.user_avatar)}
                  alt={selectedStudent.user_name}
                  className="w-24 h-24 rounded-full border-4 border-primary/20"
                />
                <DialogTitle className="text-2xl mt-4">
                  {isCoach ? (
                    <Link 
                      to={`/student/${selectedStudent.user_id}`} 
                      className="text-primary hover:underline hover:opacity-90 inline-flex items-center gap-1.5"
                    >
                      {selectedStudent.user_name}
                      <span className="text-[10px] uppercase tracking-wider font-extrabold bg-primary/10 text-primary px-2 py-0.5 rounded-full select-none">Detayları Gör ➔</span>
                    </Link>
                  ) : (
                    selectedStudent.user_name
                  )}
                </DialogTitle>
                <DialogDescription className="text-center mt-1">
                  <span className="block font-bold text-foreground mb-1">
                    Seviye {getLevelInfo(selectedStudent.lifetime_points || 0).level} - {getLevelInfo(selectedStudent.lifetime_points || 0).title}
                  </span>
                  <span>
                    {selectedStudent.user_class} Sınıfı
                    {' - '}
                    {timeFilter === 'all' && 'Tüm Zamanlar'}
                    {timeFilter === 'month' && 'Bu Ay'}
                    {timeFilter === 'last_week' && 'Geçen Hafta'}
                    {' İstatistikleri'}
                  </span>
                </DialogDescription>
              </div>
            )}
          </DialogHeader>
          {/* Modal (Açılır pencere) içeriği değişmedi, çünkü burada rank göstermiyoruz */}
          {selectedStudent && (
            <div className="grid grid-cols-2 gap-3 text-center py-4">
              <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
                <Star className="h-6 w-6 text-yellow-500 mb-1" />
                <p className="text-xl font-bold">{selectedStudent.total_score}</p>
                <p className="text-xs text-muted-foreground">Puan</p>
              </div>
              <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
                <Target className="h-6 w-6 text-blue-500 mb-1" />
                <p className="text-xl font-bold">{selectedStudent.total_questions}</p>
                <p className="text-xs text-muted-foreground">Soru</p>
              </div>
              <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
                <Flame className="h-6 w-6 text-amber-500 mb-1" />
                <p className="text-xl font-bold">{selectedStudent.seri || 0}</p>
                <p className="text-xs text-muted-foreground">Seri</p>
              </div>
              <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
                <Swords className="h-6 w-6 text-primary mb-1" />
                <p className="text-xl font-bold">{selectedStudent.challenge_wins || 0}</p>
                <p className="text-xs text-muted-foreground">Düello Galibiyeti</p>
              </div>
            </div>
          )}
          <Button variant="outline" onClick={() => setIsModalOpen(false)} className="w-full">Kapat</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}