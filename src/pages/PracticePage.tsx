// src/pages/PracticePage.tsx

import { useState, useMemo, useEffect } from "react"; 
import { Question, SolvedStat, Subject, ChallengeOpponent, UserAvatars } from "@/types";
import { questions as allQuestions } from "@/data/questions";
import { useAppContext } from "./AppLayout";
import QuestionSolver from "@/components/QuestionSolver";
import DailyQuestions from "@/components/DailyQuestions";
import MotivationalQuote from "@/components/MotivationalQuote";
import WordSwiper from "@/components/WordSwiper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Swords, Trophy, Lock, History, ChevronDown, Search, Shuffle, User, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dailyWords } from "@/data/dailywords";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { isTopicActive } from "@/curriculum";
import ChallengeHistory from "@/components/ChallengeHistory";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { avatars } from "@/data/avatars";
import { supabase } from "@/supabaseClient";

const defaultAvatar = avatars.find(a => a.id === 'default')?.image || '';

const badges = [
  { wins: 0, image: '/assets/default.png', name: 'Başlangıç Ligi' },
  { wins: 25, image: '/assets/badge25.png', name: 'Bronz Lig' },
  { wins: 75, image: '/assets/badge75.png', name: 'Gümüş Lig' },
  { wins: 100, image: '/assets/badge100.png', name: 'Altın Lig' },
  { wins: 150, image: '/assets/badge150.png', name: 'Kristal Lig' },
  { wins: 250, image: '/assets/badge250.png', name: 'Usta Ligi' },
  { wins: 500, image: '/assets/badge500.png', name: 'Şampiyonlar Ligi' },
];

export default function PracticePage() {
  const [dailyQuestions, setDailyQuestions] = useState<Question[]>([]);
  const [isSolving, setIsSolving] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { handleQuizCompletion, subjects: allSubjectsFromContext, dailySolvedSubjects, challengeWins } = useAppContext();

  const [isHistoryOpen, setIsHistoryOpen] = useState(false); 

  const [selectedUnitForDialog, setSelectedUnitForDialog] = useState<number | null>(null);
  const [showOpponentSelection, setShowOpponentSelection] = useState(false);
  const [opponents, setOpponents] = useState<ChallengeOpponent[]>([]);
  const [opponentsLoading, setOpponentsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { userId } = useAppContext();

  useEffect(() => {
    if (showOpponentSelection && userId) {
      const fetchOpponents = async () => {
        setOpponentsLoading(true);
        const { data, error } = await supabase.rpc('get_challenge_opponents', { p_user_id: userId });
        if (error) {
          console.error("Rakip listesi çekilemedi:", error);
          toast.error("Rakip listesi yüklenemedi.");
        } else {
          setOpponents(data || []);
        }
        setOpponentsLoading(false);
      };
      fetchOpponents();
    }
  }, [showOpponentSelection, userId]);

  const filteredOpponents = useMemo(() => {
    return opponents.filter(op =>
      op.user_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [opponents, searchTerm]);

  const getAvatarImage = (avatarData: UserAvatars | null) => {
    const currentAvatarId = avatarData?.current || 'default';
    return avatars.find(a => a.id === currentAvatarId)?.image || defaultAvatar;
  };


  const handleSelectSubject = (subjectId: string) => {
    const subject = allSubjectsFromContext.find(s => s.id === subjectId);
    const subjectName = subject ? subject.name : "";
    const availableQuestions = allQuestions.filter(q =>
        q.subjectId === subjectId && q.topic && isTopicActive(subjectName, q.topic, new Date())
    );
    if (availableQuestions.length < 6) {
      toast.info("Bu ders için henüz yeterli sayıda aktif soru bulunmuyor.", {
        description: "Lütfen daha sonra tekrar deneyin veya başka bir ders seçin.",
      });
      return;
    }
    const shuffledQuestions = [...availableQuestions].sort(() => 0.5 - Math.random()).slice(0, 6);
    setDailyQuestions(shuffledQuestions);
    setSelectedSubjectId(subjectId);
    setIsSolving(true);
  };

  const handleFinishSolving = (solvedStats: SolvedStat[]) => {
    setIsSolving(false);
    if (selectedSubjectId) {
      handleQuizCompletion(selectedSubjectId, solvedStats);
    }
    setSelectedSubjectId(null);
  };

  const handleForfeitSolving = () => {
    setIsSolving(false);
    if (selectedSubjectId) {
      toast.error("Görevden ayrıldın!", {
        description: "Bu ders bugünkü görevlerden tamamlandı sayıldı.",
      });
      handleQuizCompletion(selectedSubjectId, null);
    }
    setSelectedSubjectId(null);
  };
  
  const availableSubjectsForSelection = allSubjectsFromContext.filter(s =>
    (s.id === 'turkish' || s.id === 'math' || s.id === 'science' || s.id === 'religion' || s.id === 'english' || s.id === 'revolution') &&
    !dailySolvedSubjects.includes(s.id)
  );

  const wordUnits = useMemo(() => {
    return [...new Set(dailyWords.map(w => w.unit))].sort((a,b) => a-b);
  }, []);

  const getCurrentBadge = (wins: number) => {
    let currentBadge = badges[0];
    for (const badge of badges) {
      if (wins >= badge.wins) {
        currentBadge = badge;
      } else {
        break;
      }
    }
    return currentBadge;
  };

  const currentBadge = getCurrentBadge(challengeWins || 0);

  if (isSolving) {
    return <QuestionSolver 
      questions={dailyQuestions} 
      subjects={allSubjectsFromContext}
      onFinish={handleFinishSolving} 
      onClose={handleForfeitSolving} 
    />;
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <Tabs defaultValue="vocab-world" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gunluk-gorev">Günlük Görev</TabsTrigger>
          <TabsTrigger value="vocab-world">Vocab World</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <MotivationalQuote />
        </div>

        <TabsContent value="gunluk-gorev" className="mt-6 space-y-6">
          <DailyQuestions 
            dailyQuestionsCount={36}
            availableSubjects={availableSubjectsForSelection}
            onSelectSubject={handleSelectSubject}
            solvedCount={dailySolvedSubjects.length}
          />
        </TabsContent>

        <TabsContent value="vocab-world" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Swords /> Word Challenge
              </CardTitle>
              <CardDescription>Bilgini sına, arkadaşlarına meydan oku ve rozetleri kazan!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center p-4 pt-0">
                <div className="flex flex-col items-center gap-2 mb-4">
                    <img src={currentBadge.image} alt={currentBadge.name} className="w-24 h-24 rounded-full object-cover aspect-square drop-shadow-lg" />
                    <div className="text-center">
                        <p className="font-bold">{currentBadge.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <span>{challengeWins || 0} Galibiyet</span>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-muted/30 p-3 rounded-lg">
                    <h4 className="text-sm font-semibold text-center mb-3">Tüm Rozetler</h4>
                    <div className="flex justify-center items-end gap-2">
                        {badges.map(badge => {
                            const isUnlocked = (challengeWins || 0) >= badge.wins;
                            return (
                                <Tooltip key={badge.name}>
                                    <TooltipTrigger>
                                        <img 
                                            src={badge.image} 
                                            alt={badge.name} 
                                            className={cn("w-10 h-10 rounded-full object-cover aspect-square transition-all", !isUnlocked && "grayscale opacity-40")}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {isUnlocked ? (
                                            <p>{badge.name} (Kazanıldı)</p>
                                        ) : (
                                            <p className="flex items-center gap-1">
                                                <Lock className="h-3 w-3"/>
                                                {badge.wins} galibiyet gerekli
                                            </p>
                                        )}
                                    </TooltipContent>
                                </Tooltip>
                            )
                        })}
                    </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {wordUnits.map(unit => (
                  <Button 
                    key={unit} 
                    onClick={() => {
                      setSelectedUnitForDialog(unit);
                      setShowOpponentSelection(false);
                      setSearchTerm('');
                    }}
                    variant="default"
                    className="h-16"
                  >
                    Ünite {unit} Testi
                  </Button>
                ))}
              </div>

            </CardContent>
          </Card>

          <Card>
            <CardHeader 
              className="flex-row items-center justify-between cursor-pointer" 
              onClick={() => setIsHistoryOpen(!isHistoryOpen)} 
            >
              <div> 
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  Son Düellolar
                </CardTitle>
                <CardDescription>Tamamlanan meydan okumalarının sonuçları.</CardDescription>
              </div>
              <ChevronDown 
                className={cn(
                  'h-5 w-5 text-muted-foreground transition-transform duration-300',
                  isHistoryOpen && 'rotate-180' 
                )} 
              />
            </CardHeader>
            
            {/* --- DEĞİŞİKLİK BURADA: 'animate-slide-up' sınıfı kaldırıldı --- */}
            {isHistoryOpen && (
              <CardContent> 
                <ChallengeHistory />
              </CardContent>
            )}
          </Card>

          <WordSwiper />
        </TabsContent>
        
      </Tabs>

      {/* Mod ve Rakip Seçim Modalı */}
      <Dialog open={selectedUnitForDialog !== null} onOpenChange={(open) => { if (!open) setSelectedUnitForDialog(null); }}>
        <DialogContent className="max-w-md max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Ünite {selectedUnitForDialog} Kelime Testi</DialogTitle>
            <DialogDescription>
              {!showOpponentSelection 
                ? "Bu testi tek başına çözerek puan kazanabilir veya bir arkadaşına meydan okuyabilirsin."
                : "Meydan okumak istediğin rakibini seç."}
            </DialogDescription>
          </DialogHeader>

          {!showOpponentSelection ? (
            <div className="grid grid-cols-2 gap-4 py-4">
              <Button 
                variant="outline" 
                className="h-24 flex flex-col gap-2 font-semibold text-lg"
                onClick={() => {
                  const unit = selectedUnitForDialog;
                  setSelectedUnitForDialog(null);
                  navigate(`/word-quiz/${unit}`);
                }}
              >
                <User className="h-6 w-6 text-muted-foreground" />
                Tek Başına Çöz
              </Button>
              <Button 
                variant="default" 
                className="h-24 flex flex-col gap-2 font-semibold text-lg"
                onClick={() => setShowOpponentSelection(true)}
              >
                <Swords className="h-6 w-6" />
                Düello Başlat
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 flex-1 overflow-hidden mt-2">
              <Button 
                variant="secondary" 
                className="w-full flex items-center justify-center gap-2 py-6 font-semibold"
                onClick={() => {
                  const unit = selectedUnitForDialog;
                  setSelectedUnitForDialog(null);
                  navigate(`/word-quiz/${unit}`, { state: { duelMode: 'random' } });
                }}
              >
                <Shuffle className="h-5 w-5" />
                Rastgele Rakip Bul ve Başlat
              </Button>

              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Arkadaş ara..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <ScrollArea className="flex-1 min-h-[200px] max-h-[40vh] pr-2 mt-2">
                <div className="space-y-2">
                  {opponentsLoading && <p className="text-center text-muted-foreground py-4">Yükleniyor...</p>}
                  {!opponentsLoading && filteredOpponents.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">Rakip bulunamadı.</p>
                  )}
                  {filteredOpponents.map(opponent => (
                    <div key={opponent.user_id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted border border-transparent hover:border-border transition-all">
                      <div className="flex items-center gap-3">
                        <img
                          src={getAvatarImage(opponent.user_avatar)}
                          alt={opponent.user_name}
                          className="w-10 h-10 rounded-full border border-border"
                        />
                        <span className="font-medium text-sm">{opponent.user_name}</span>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => {
                          const unit = selectedUnitForDialog;
                          setSelectedUnitForDialog(null);
                          navigate(`/word-quiz/${unit}`, { 
                            state: { 
                              duelMode: 'friend', 
                              opponentId: opponent.user_id, 
                              opponentName: opponent.user_name 
                            } 
                          });
                        }}
                      >
                        <Send className="h-4 w-4 mr-1.5" />
                        Seç ve Başlat
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <Button variant="ghost" onClick={() => setShowOpponentSelection(false)} className="mt-2">
                Geri Dön
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};