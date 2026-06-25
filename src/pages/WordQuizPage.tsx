import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { dailyWords } from '@/data/dailywords';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAppContext } from './AppLayout';
import { supabase } from '@/supabaseClient';
import { toast } from 'sonner';
import { ChallengeDialog } from '@/components/ChallengeDialog';
import { Swords, Trophy, Shield, User, Clock, Loader2, Shuffle, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription as DialogDescriptionComponent } from "@/components/ui/dialog"; 
import { Challenge } from '@/types';
import { cn } from '@/lib/utils';
// --- DEĞİŞİKLİK 1: Gerekli ses fonksiyonları import edildi ---
import { playSwipeSound, playSuccessSound } from '@/utils/sounds';
import SwipeableToast from '@/components/SwipeableToast';

// Listenizi (onkayit_ogrenciler_rows.csv) buraya yapıştırın
const DUMMY_NAMES = [
  "HİRANUR GÜCÜK", "ECRİN SEL", "MERVE HELLI", "Z. KÜBRA ALBAYRAK", "SAFA HELLI", "RUMEYSA TAYCI", "BUĞLEM OSMANOĞLU", "ESLEM AKGÜL", "ELİF KIZILBOĞA", "SÜMEYYE DÖNMEZ", "ESLEM BULGUR", "MERYEM N. YOĞURTCU", "TUBA BERRA TURAN", "ECRİN BULUT", "ECRİN KILIÇ", "BEREN AYŞE TURAN", "FATMA YILMAZ", "BÜŞRA GÜRKAN", "ŞEVVAL HİRA ERDEM", "EDA NUR ALTAY", "TOLIB AL ELLAWI", "ASELMİNA MUTLUTÜRK", "MELİS ÇAKICI", "ZEYNEP DAĞCI", "EGE TÜRKMEN", "M. HALİT HELLİ", "MUSA CAN ERDEN", "MEHMET SAİT FİDAN", "MUSA TÜRTÜK", "ÖMER HATTAP", "M.EBUBEKİR BAŞGÖYNÜK", "KAHRAMAN ZOBU", "TALHA KÜLCÜ", "EREN KAŞ", "İSMAİL ÇAKIR", "YAŞAR ÇINAR KARNAK", "ERDEM KARAYEL", "AYAZ TOSUN", "AHMET EMİR YILDIZ", "EYÜP TALHA KILINÇ", "ALİ DEVRAN GÜNEŞ", "ERDEM UZUN", "EMİR KURUÇAY", "MUSTAFA KEMAL KURT", "M.ÖMER DEMİRBAŞ", "HAMZA TOPAL", "EYMEN AYTEN", "RESUL TANYEL", "YAZAN HIŞFE", "UFUK TAHA YILDIZ", "METEHAN KURT", "BERAT DİNİBÜTÜNOĞLU", "ÖMER TAHA CAN", "KAYRA AĞBULAK", "MUSA ÖRGEL", "YİĞİT H. TOKTEMÜR", "CİHAT C. ÖZVATAN", "EYMEN H. YOĞURTCU", "M. BERA BAŞ", "MERVE SERRA GÜNEŞ", "MELEK NUR ÖZTÜRK", "BERİKA EROL", "MERVE HAMMEDE", "BUĞLEM KANBAL", "MERYEM BİLTEKİN", "RÜVEYDA KAFA", "SEMA YILMAZOĞLU", "RÜMEYSA ÇATLI", "ECEM MELEK MEMİŞ", "ÖYKÜ BERRA CİHAN", "İREM YILMAZ", "AYSHA ABDULLAYEVA", "ZEYNEP KURT", "RÜMEYSA ARSLAN", "MERDA GÜLFER", "BUSENUR ZOLAN", "DAMLA NUR KAYA", "ELİSA AŞIK", "SARE HELLI", "AZRA KÜÇÜKOĞLU", "HAVVANUR ÇAKICI", "ELA BEREN YILMAZ", "HİRANUR KAYA", "ECE FATMA YÜCE", "ÜMRAN DEMİR", "MUSTAFA SAİT CEVİZCİ", "ARİF ASLAN", "M. MİRAÇ ÖZTÜRK", "MURAT BALCI", "MUHAMMED YALVAÇ", "MÜCAHİD M.IŞIK", "İSMAİL EFE DELDAK", "FATİH ARICAN", "AHMET BURAK YILMAZ", "M.NOUR AL JOHMANI", "OSMAN MELİH KAYMAK", "POYRAZ EFE KAYAOĞLU", "SELAHADDİN A. ZENGİN", "EMİR EFE AKSEL", "RAMAZAN AYAZ EVREM", "HOCA TEST"
];


export default function WordQuizPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  // --- DEĞİŞİKLİK 2: 'isMuted' context'ten alındı ---
  const { dismissChallenge, userId, isMuted, setTotalPoints, setLifetimePoints } = useAppContext();

  const challengeId = location.state?.challengeId;

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [isFinished, setIsFinished] = useState(false);
  const [showChallengeDialog, setShowChallengeDialog] = useState(false);
  const [finalTime, setFinalTime] = useState(0);

  const [challengeResult, setChallengeResult] = useState<Challenge | null>(null);
  const [isSendingChallenge, setIsSendingChallenge] = useState(false); 
  const [challengeSentToName, setChallengeSentToName] = useState<string | null>(null);
  const [spinningName, setSpinningName] = useState(""); 


  useEffect(() => {
    const numericUnitId = parseInt(unitId || '1');
    const unitWords = dailyWords.filter(w => w.unit === numericUnitId);
    if (unitWords.length < 4) {
      toast.error("Bu ünitede test oluşturmak için yeterli kelime yok.");
      navigate('/practice');
      return;
    }
    const shuffled = [...unitWords].sort(() => 0.5 - Math.random());
    const quizWords = shuffled;
    const generatedQuestions = quizWords.map(correctWord => {
      const otherWordsInUnit = shuffled.filter(w => w.id !== correctWord.id);
      let wrongOptionsPool = otherWordsInUnit;
      if (wrongOptionsPool.length < 3) {
        wrongOptionsPool = [...wrongOptionsPool, ...dailyWords.filter(w => w.unit !== numericUnitId)];
      }
      const wrongOptions = wrongOptionsPool.sort(() => 0.5 - Math.random()).slice(0, 3).map(w => w.meaning);
      const options = [...wrongOptions, correctWord.meaning].sort(() => 0.5 - Math.random());
      return { word: correctWord.word, correctMeaning: correctWord.meaning, options };
    });
    setQuestions(generatedQuestions);
    setStartTime(Date.now());
  }, [unitId, navigate]);

  // --- DEĞİŞİKLİK 3: Ses çalma mantığı animasyon döngüsüne eklendi ---
  useEffect(() => {
    let spinInterval: NodeJS.Timeout | null = null;

    if (isSendingChallenge) {
      setSpinningName("Rakip Aranıyor..."); 
      spinInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * DUMMY_NAMES.length);
        setSpinningName(DUMMY_NAMES[randomIndex]);
        playSwipeSound(isMuted); // Her isim değişiminde ses çal
      }, 90); 
    }
    
    return () => {
      if (spinInterval) {
        clearInterval(spinInterval);
      }
    };
  }, [isSendingChallenge, isMuted]); // 'isMuted' bağımlılıklara eklendi
  // --- DEĞİŞİKLİK 3 SONU ---


  const sendRandomChallenge = async (score: number, time: number) => {
    if (!userId) {
        toast.error("Rastgele düello göndermek için giriş yapmalısınız.");
        return;
    }
    
    setIsSendingChallenge(true);    
    setChallengeSentToName(null);   

    try {
      const { data, error: rpcError } = await supabase.rpc('get_random_opponent', {
        p_user_id: userId
      });

      if (rpcError || !data || data.length === 0) {
        throw new Error(rpcError?.message || "Gönderilecek rastgele bir rakip bulunamadı.");
      }

      const { opponent_id, opponent_name } = data[0];
      
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1500)); 

      setIsSendingChallenge(false); // Bu, useEffect'teki interval'ı durdurur
      setSpinningName(opponent_name); 
      setChallengeSentToName(opponent_name); 
      playSuccessSound(isMuted); // Rakip bulunduğunda başarı sesi çal
      
      const { error: insertError } = await supabase.from('challenges').insert({
        challenger_id: userId,
        opponent_id: opponent_id,
        unit_id: parseInt(unitId || '1'),
        challenger_score: score,
        challenger_time_seconds: time,
        status: 'pending'
      });
      
      if (insertError) throw insertError;

      await new Promise(resolve => setTimeout(resolve, 1500));

    } catch (error) {
      setIsSendingChallenge(false); 
      const errorMsg = error instanceof Error ? error.message : String(error);
      toast.error("Düello gönderilemedi.", { description: errorMsg });
      setChallengeSentToName(null); 
    } 
  };




  const handleAnswerClick = async (option: string) => {
    if (showResult) return;
    setSelectedAnswer(option);
    const isCorrectNow = option === questions[currentQuestionIndex].correctMeaning;
    if (isCorrectNow) {
      setCorrectCount(prev => prev + 1);
    }
    setShowResult(true);

    setTimeout(async () => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        const endTime = Date.now();
        const timeTaken = Math.round((endTime - startTime) / 1000);
        const finalCorrectCount = isCorrectNow ? correctCount + 1 : correctCount;
        
        setFinalTime(timeTaken);

        const earnedPoints = finalCorrectCount * 10;
        if (setTotalPoints && setLifetimePoints && earnedPoints > 0) {
          setTotalPoints(prev => prev + earnedPoints);
          setLifetimePoints(prev => prev + earnedPoints);
          toast.custom((t) => (
            <SwipeableToast
              id={t}
              title="Puan Kazandın! 🪙"
              description={`Kelime çalışmasından +${earnedPoints} puan cüzdanına eklendi.`}
              variant="success"
              icon="🪙"
            />
          ), { duration: 6000, position: "top-center" });
          
          // Log to cozulen_sorular so it counts in monthly/weekly leaderboard
          try {
            await supabase.from('cozulen_sorular').insert({
              kullanici_id: userId,
              ders_id: 'english',
              dogru_sayisi: finalCorrectCount,
              yanlis_sayisi: questions.length - finalCorrectCount,
              konu: challengeId ? 'Kelime Düellosu' : 'Kelime Çalışması'
            });
          } catch (e) {
            console.error("Error logging word quiz to cozulen_sorular:", e);
          }
        }

        if (challengeId) {
          const { data, error } = await supabase.from('challenges').update({
            opponent_score: finalCorrectCount,
            opponent_time_seconds: timeTaken,
            status: 'completed',
            completed_at: new Date().toISOString()
          }).eq('id', challengeId).select(`*, challenger:challenger_id(ad_soyad), opponent:opponent_id(ad_soyad)`).single();

          if (error) { toast.error("Meydan okuma sonucu kaydedilemedi."); } 
          else if (data) {
            setChallengeResult({
                ...data,
                challenger_name: data.challenger.ad_soyad,
                opponent_name: data.opponent.ad_soyad,
            });
            dismissChallenge(challengeId);
          }
          setIsFinished(true); 

        } else {
          setIsFinished(true);
        }
      }
    }, 400);
  };

  if (isFinished) {
    if (challengeResult) {
        const myScore = challengeResult.opponent_score ?? 0;
        const theirScore = challengeResult.challenger_score;
        const myTime = challengeResult.opponent_time_seconds ?? 0;
        const theirTime = challengeResult.challenger_time_seconds;
        const iAmWinner = (myScore > theirScore) || (myScore === theirScore && myTime < theirTime);

        return (
            <div className="text-center p-4 animate-slide-up">
                <Card className={`max-w-md mx-auto ${iAmWinner ? 'border-green-500' : 'border-red-500'}`}>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2">
                           {iAmWinner ? <Trophy className="h-6 w-6 text-yellow-500" /> : <Shield className="h-6 w-6 text-red-500" />}
                           {iAmWinner ? "Kazandın!" : "Kaybettin"}
                        </CardTitle>
                        <CardDescription>Meydan okuma sonucu</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="space-y-1 p-2 bg-muted/50 rounded-lg">
                                <p className="text-sm font-medium flex items-center justify-center gap-1"><User className="h-4 w-4" /> Sen</p>
                                <p className="text-2xl font-bold">{myScore} <span className="text-base font-normal text-muted-foreground">doğru</span></p>
                                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1"><Clock className="h-3 w-3" /> {myTime} sn</p>
                            </div>
                            <div className="space-y-1 p-2 bg-muted/50 rounded-lg">
                                <p className="text-sm font-medium flex items-center justify-center gap-1"><User className="h-4 w-4" /> {challengeResult.challenger_name}</p>
                                <p className="text-2xl font-bold">{theirScore} <span className="text-base font-normal text-muted-foreground">doğru</span></p>
                                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1"><Clock className="h-3 w-3" /> {theirTime} sn</p>
                            </div>
                        </div>
                        <Button onClick={() => navigate('/practice')} className="w-full">Geri Dön</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const score = correctCount;
    return (
        <>
          <div className="text-center p-4 animate-slide-up">
              <Card className="max-w-md mx-auto">
                  <CardHeader>
                      <CardTitle>Test Tamamlandı!</CardTitle>
                      <CardDescription>Ünite {unitId} kelime testini bitirdin.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p className="text-2xl font-bold">Skorun: {score * 10}</p>
                      <div className="grid grid-cols-3 text-center">
                        <div><p className="font-bold text-lg text-green-500">{correctCount}</p><p className="text-sm text-muted-foreground">Doğru</p></div>
                        <div><p className="font-bold text-lg text-red-500">{questions.length - correctCount}</p><p className="text-sm text-muted-foreground">Yanlış</p></div>
                        <div><p className="font-bold text-lg">{finalTime} sn</p><p className="text-sm text-muted-foreground">Süre</p></div>
                      </div>
                      
                      {!challengeId && !challengeSentToName && (
                        <div className="grid grid-cols-2 gap-3">
                          <Button 
                            onClick={() => setShowChallengeDialog(true)} 
                            variant="outline"
                            disabled={isSendingChallenge} 
                          >
                            <Swords className="h-4 w-4 mr-2" />Arkadaşına Gönder
                          </Button>
                          
                          <Button 
                            onClick={() => sendRandomChallenge(correctCount, finalTime)}
                            disabled={isSendingChallenge}
                          >
                            <Shuffle className="h-4 w-4 mr-2" />
                            Rastgele Rakip
                          </Button>
                        </div>
                      )}
                      
                      <Button onClick={() => navigate('/practice')} className="w-full">Geri Dön</Button>

                      {challengeSentToName && (
                        <div className="text-center p-3 bg-success/10 border border-success/20 rounded-lg">
                          <p className="font-medium text-success flex items-center justify-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            {challengeSentToName}'a meydan okuma gönderildi! ⚔️
                          </p>
                        </div>
                      )}
                      
                  </CardContent>
              </Card>
          </div>
          
          <ChallengeDialog 
            open={showChallengeDialog} 
            onClose={() => setShowChallengeDialog(false)}
            onChallengeSent={(name) => {
              setChallengeSentToName(name);
              setShowChallengeDialog(false);
            }}
            unitId={parseInt(unitId || '1')} 
            score={score} 
            time={finalTime} 
          />

          <Dialog open={isSendingChallenge}>
            <DialogContent 
              className="max-w-xs" 
              onInteractOutside={(e) => e.preventDefault()}
              id="spinning-modal-content"
            >
              <DialogHeader className="sr-only">
                <DialogTitle>Rakip Aranıyor</DialogTitle>
                <DialogDescriptionComponent>
                  Sizin için rastgele bir rakip aranıyor, lütfen bekleyin.
                </DialogDescriptionComponent>
              </DialogHeader>

              <div className="flex flex-col items-center justify-center p-6 space-y-4 min-h-[150px]">
                {challengeSentToName ? (
                  <CheckCircle className="h-12 w-12 text-success" />
                ) : (
                  <Shuffle className="h-12 w-12 text-primary animate-spin" />
                )}
                
                <p className="text-sm text-muted-foreground">
                  {challengeSentToName ? "Rakip Bulundu!" : "Rakip Aranıyor..."}
                </p>
                
                <div className={cn(
                    "text-2xl font-bold text-center h-8 transition-all duration-100",
                    challengeSentToName && "text-success" 
                )}>
                  {spinningName}
                </div>
              </div>
            </DialogContent>
          </Dialog>

        </>
    );
  }

  if (questions.length === 0) return <div>Test yükleniyor...</div>;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  return (
    <div 
      className="p-4 animate-slide-up notranslate select-none" 
      translate="no"
      onContextMenu={(e) => e.preventDefault()}
    >
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
            <Progress value={progress} className="h-2 mb-4" />
            <CardTitle className="text-center text-4xl font-bold tracking-wider notranslate" translate="no">
              {currentQuestion.word}
            </CardTitle>
            <CardDescription className="text-center">Doğru anlamı seç.</CardDescription>
        </CardHeader>
         <CardContent className="grid grid-cols-2 gap-4 pt-4">
             {currentQuestion.options.map((option: string, index: number) => {
                 const isSelected = selectedAnswer === option;
                 const isCorrect = currentQuestion.correctMeaning === option;
                 let buttonVariant: "default" | "secondary" | "destructive" | "success" = "secondary";
                 if(showResult) { if(isCorrect) buttonVariant = "success"; else if (isSelected && !isCorrect) buttonVariant = "destructive"; }
                 return (
                   <Button 
                     key={index} 
                     variant={buttonVariant} 
                     className="h-24 text-lg text-wrap hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 shadow-sm hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]" 
                     onClick={() => handleAnswerClick(option)} 
                     disabled={showResult}
                   >
                     {option}
                   </Button>
                 )
             })}
         </CardContent>
      </Card>
    </div>
  );
}