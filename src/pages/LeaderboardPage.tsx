// src/pages/LeaderboardPage.tsx

import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Crown, Star, Target, Flame, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { avatars } from '@/data/avatars';
import { UserAvatars } from '@/types';
import { Button } from '@/components/ui/button';

interface LeaderboardEntry {
  rank: number;
  user_id: string;
  user_name: string;
  user_avatar: UserAvatars | null;
  total_score: number;
  total_questions: number;
  seri: number;
}

const defaultAvatar = avatars.find(a => a.id === 'default')?.image || '';

const getAvatarImage = (avatarData: UserAvatars | null) => {
  const currentAvatarId = avatarData?.current || 'default';
  return avatars.find(a => a.id === currentAvatarId)?.image || defaultAvatar;
};

// --- YENİ EKLENEN YARDIMCI FONKSİYON ---
const getRankText = (rank: number) => {
  if (rank === 1) return 'Lider!';
  if (rank === 2) return 'Yakın Takipte!';
  if (rank === 3) return 'Podyumda!';
  if (rank <= 10) return 'İlk 10\'da';
  return 'Sıralamada';
};
// --- BİTİŞ ---

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [timeFilter, setTimeFilter] = useState<'all' | 'month' | 'week'>('all');
  const [loading, setLoading] = useState(true);
  
  const [selectedStudent, setSelectedStudent] = useState<LeaderboardEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      
      let rpcName = 'get_all_time_leaderboard';
      let rpcParams = {};

      if (timeFilter === 'all') {
        rpcName = 'get_all_time_leaderboard';
        rpcParams = {};
      } else if (timeFilter === 'month') {
        rpcName = 'get_monthly_leaderboard';
        rpcParams = {};
      } else if (timeFilter === 'week') {
        rpcName = 'get_weekly_leaderboard_for_date'; 
        rpcParams = {};
      }

      const { data, error } = await supabase.rpc(rpcName, rpcParams);

      if (error) {
        console.error("Liderlik tablosu hatası:", error); 
        toast.error('Liderlik tablosu yüklenemedi.', {
          description: `Fonksiyon (${rpcName}) bulunamadı veya bir hata oluştu.`,
        });
      } else {
        setLeaderboard(data || []);
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, [timeFilter]);

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
            <Tabs value={timeFilter} onValueChange={(v) => setTimeFilter(v as 'all' | 'month' | 'week')}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">Tüm Zamanlar</TabsTrigger>
                <TabsTrigger value="month">Aylık</TabsTrigger>
                <TabsTrigger value="week">Haftalık</TabsTrigger>
              </TabsList>
              <TabsContent value={timeFilter}>
                {loading ? (
                  <div className="text-center p-10">Yükleniyor...</div>
                ) : (
                  <div className="mt-4 space-y-2">
                    {leaderboard.length === 0 ? (
                      <div className="text-center p-10 text-muted-foreground">Bu zaman aralığı için veri bulunamadı.</div>
                    ) : (
                      leaderboard.map((entry) => (
                        <Button
                          key={entry.user_id}
                          variant="ghost" 
                          className={cn(
                            'p-4 h-auto w-full justify-start text-left', 
                            'border rounded-lg transition-all',
                            getRankClass(entry.rank)
                          )}
                          onClick={() => handleStudentClick(entry)}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                              <span className="text-lg font-bold w-6 text-center">{entry.rank}</span>
                              <img
                                src={getAvatarImage(entry.user_avatar)}
                                alt={entry.user_name}
                                className="w-12 h-12 rounded-full border-2 border-border"
                              />
                              <div>
                                <p className="font-semibold text-foreground">{entry.user_name}</p>
                                {/* --- DEĞİŞİKLİK BURADA: Yeni 'getRankText' fonksiyonu kullanıldı --- */}
                                <p className="text-sm text-muted-foreground">
                                  {getRankText(entry.rank)}
                                </p>
                                {/* --- DEĞİŞİKLİK SONA ERDİ --- */}
                              </div>
                            </div>
                            {entry.rank === 1 && <Crown className="h-5 w-5 text-yellow-400" />}
                            {entry.rank === 2 && <Crown className="h-5 w-5 text-gray-400" />}
                            {entry.rank === 3 && <Crown className="h-5 w-5 text-yellow-600" />}
                          </div>
                        </Button>
                      ))
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
                <DialogTitle className="text-2xl mt-4">{selectedStudent.user_name}</DialogTitle>
                <DialogDescription>
                  {timeFilter === 'all' && 'Tüm Zamanlar'}
                  {timeFilter === 'month' && 'Bu Ay'}
                  {timeFilter === 'week' && 'Bu Hafta'}
                  {' İstatistikleri'}
                </DialogDescription>
              </div>
            )}
          </DialogHeader>
          {selectedStudent && (
            <div className="grid grid-cols-3 gap-4 text-center py-4">
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
            </div>
          )}
          <Button variant="outline" onClick={() => setIsModalOpen(false)} className="w-full">Kapat</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}