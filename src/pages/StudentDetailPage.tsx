import { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, XCircle, ChevronDown, TrendingUp, TrendingDown, AlertTriangle, BookCopy, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { subjects as allSubjectsData } from '@/data/subjects';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useAuthContext } from "@/contexts/AuthContext";
import { UserAvatars } from "@/types";
import { avatars } from "@/data/avatars";
import { getLevelInfo } from "@/utils/level";

const defaultAvatar = avatars.find(a => a.id === 'default')?.image || '';

const getAvatarImage = (avatarData: UserAvatars | null) => {
    const currentAvatarId = avatarData?.current || 'default';
    return avatars.find(a => a.id === currentAvatarId)?.image || defaultAvatar;
};

// Arayüz için tipler
interface DenemeSonucuDetay {
  ders_id: string;
  dogru_sayisi: number;
  yanlis_sayisi: number;
  net_sayisi: number;
}
interface DenemeKaydi {
  id: number;
  deneme_adi: string;
  deneme_tarihi: string;
  sonuclar: DenemeSonucuDetay[];
}
interface SubjectStat {
  subject_id: string;
  subject_name: string;
  total_questions: number;
  correct_questions: number;
  incorrect_questions: number;
}
interface ReportData {
  weekly_stats: SubjectStat[]; // Bu aslında filtrelenmiş veriyi tutacak
  overall_stats: SubjectStat[]; // Bu da filtrelenmiş veriyi tutacak
}
interface TopicStat {
  subject_id: string;
  subject_name: string;
  topic: string;
  total_correct: number;
  total_incorrect: number;
}

const PIE_COLORS = ['#00C49F', '#FF8042'];
const getSubjectName = (subjectId: string) => allSubjectsData.find(s => s.id === subjectId)?.name || 'Bilinmeyen Ders';

// Filtre seçenekleri
const filterOptions = [
  { value: 'all', label: 'Tüm Zamanlar' },
  { value: 'week', label: 'Bu Hafta' },
  { value: 'month-9', label: 'Eylül' },
  { value: 'month-10', label: 'Ekim' },
  { value: 'month-11', label: 'Kasım' },
  { value: 'month-12', label: 'Aralık' },
  { value: 'month-1', label: 'Ocak' },
  { value: 'month-2', label: 'Şubat' },
  { value: 'month-3', label: 'Mart' },
  { value: 'month-4', label: 'Nisan' },
  { value: 'month-5', label: 'Mayıs' },
  { value: 'month-6', label: 'Haziran' },
];

export default function StudentDetailPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  
  const { userRole } = useAuthContext();
  const isCoach = useMemo(() => {
    const lowerRole = userRole?.toLowerCase();
    return lowerRole === 'koç' || lowerRole === 'admin' || lowerRole === 'hoca';
  }, [userRole]);

  const [isGiftDialogOpen, setIsGiftDialogOpen] = useState(false);
  const [giftPoints, setGiftPoints] = useState<number>(100);
  const [giftReason, setGiftReason] = useState<string>('Deneme Sınavı Birinciliği');
  const [customReason, setCustomReason] = useState<string>('');
  const [isSendingGift, setIsSendingGift] = useState(false);

  const handleSendGift = async () => {
    if (!studentId) return;
    setIsSendingGift(true);
    const reasonText = giftReason === 'Diğer' ? customReason : giftReason;
    if (!reasonText.trim()) {
      toast.error("Lütfen bir ödül sebebi belirtin.");
      setIsSendingGift(false);
      return;
    }

    try {
      const { data: studentData, error: fetchError } = await supabase
        .from('kullanicilar')
        .select('pending_gift_points, pending_gift_reason')
        .eq('id', studentId)
        .maybeSingle();

      if (fetchError) throw fetchError;

      const currentPendingPoints = studentData?.pending_gift_points || 0;
      const currentPendingReason = studentData?.pending_gift_reason || '';

      const newPendingPoints = currentPendingPoints + giftPoints;
      const newPendingReason = currentPendingReason
        ? `${currentPendingReason} + ${reasonText}`
        : reasonText;

      const { error: updateError } = await supabase
        .from('kullanicilar')
        .update({
          pending_gift_points: newPendingPoints,
          pending_gift_reason: newPendingReason
        })
        .eq('id', studentId);

      if (updateError) throw updateError;

      toast.success(`${studentName} isimli öğrenciye ${giftPoints} hediye puan başarıyla tanımlandı!`);
      setIsGiftDialogOpen(false);
      setCustomReason('');
    } catch (e: any) {
      console.error("Ödül puanı gönderilirken hata:", e);
      toast.error("Ödül puanı gönderilemedi.");
    } finally {
      setIsSendingGift(false);
    }
  };
  
  const [report, setReport] = useState<ReportData | null>(null);
  const [denemeler, setDenemeler] = useState<DenemeKaydi[]>([]);
  const [topicReport, setTopicReport] = useState<TopicStat[]>([]);
  const [studentName, setStudentName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openSubjectId, setOpenSubjectId] = useState<string | null>(null);
  const [openDenemeId, setOpenDenemeId] = useState<number | null>(null);
  const [timeFilter, setTimeFilter] = useState('all');
  const [studentLifetimePoints, setStudentLifetimePoints] = useState<number>(0);
  const [studentAvatar, setStudentAvatar] = useState<UserAvatars | null>(null);

  useEffect(() => {
    if (!studentId) return;

    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      setReport(null); // Raporu temizle
      setTopicReport([]); // Konu raporunu temizle

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            toast.error("Oturum bulunamadı.");
            navigate('/login');
            return;
        }
        const token = session.access_token;
        
        // Edge Function'a timeFilter state'i gönderiliyor
        const edgeFunctionPromise = supabase.functions.invoke('student-report', {
            headers: { Authorization: `Bearer ${token}` },
            body: { 
              student_id: studentId,
              time_frame: timeFilter // Filtre bilgisi
            }
        });
        
        // Denemeler her zaman hepsi çekilir
        const denemelerPromise = supabase.rpc('get_student_denemeler', { p_student_id: studentId });

        // Öğrencinin profil bilgilerini çek
        const profilePromise = supabase
          .from('kullanicilar')
          .select('puan, toplam_kazanilan_puan, avatar')
          .eq('id', studentId)
          .maybeSingle();

        const [edgeFunctionResult, denemelerResult, profileResult] = await Promise.all([
          edgeFunctionPromise, 
          denemelerPromise,
          profilePromise
        ]);

        // Profil sonuçlarını işle
        if (profileResult.data) {
          const lp = profileResult.data.toplam_kazanilan_puan ?? profileResult.data.puan ?? 0;
          setStudentLifetimePoints(lp);
          
          let avatarData = null;
          if (profileResult.data.avatar) {
            try {
              avatarData = typeof profileResult.data.avatar === 'string' 
                ? JSON.parse(profileResult.data.avatar) 
                : profileResult.data.avatar;
            } catch (e) {
              avatarData = null;
            }
          }
          setStudentAvatar(avatarData);
        }

        // Edge Function sonuçlarını işle
        if (edgeFunctionResult.error) {
          // Edge Function'dan gelen özel hatayı yakala
          const errorBody = edgeFunctionResult.error.context?.responseBody;
          if (errorBody && errorBody.error) {
            throw new Error(errorBody.error);
          }
          throw new Error(edgeFunctionResult.error.message);
        }
        
        const { records: allRecords, student_name } = edgeFunctionResult.data;
        setStudentName(student_name);
        
        // Deneme sonuçlarını işle
        if (denemelerResult.error) throw new Error(denemelerResult.error.message);
        setDenemeler(denemelerResult.data || []);

        // Gelen ham veriyi işleyerek raporları oluştur
        processRecords(allRecords);
        
      } catch (e: any) {
        console.error("Veri çekilirken hata:", e);
        setError(e.message.includes("Yetkiniz yok") ? e.message : "Rapor verileri yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    
    // Rapor oluşturma mantığını ayrı bir fonksiyona taşıdık
    const processRecords = (allRecords: any[]) => {
      const overallStatsMap: { [key: string]: SubjectStat } = {};
      const topicStatsMap: { [key: string]: TopicStat } = {};
      
      allRecords.forEach((record: any) => {
          if (!overallStatsMap[record.ders_id]) {
              const subject = allSubjectsData.find(s => s.id === record.ders_id);
              overallStatsMap[record.ders_id] = { subject_id: record.ders_id, subject_name: subject?.name || 'Bilinmeyen Ders', total_questions: 0, correct_questions: 0, incorrect_questions: 0 };
          }
          overallStatsMap[record.ders_id].correct_questions += record.dogru_sayisi;
          overallStatsMap[record.ders_id].incorrect_questions += record.yanlis_sayisi;
          overallStatsMap[record.ders_id].total_questions += record.dogru_sayisi + record.yanlis_sayisi;

          const topicKey = `${record.ders_id}-${record.konu}`;
          if (!topicStatsMap[topicKey]) {
              const subject = allSubjectsData.find(s => s.id === record.ders_id);
              topicStatsMap[topicKey] = { subject_id: record.ders_id, subject_name: subject?.name || 'Bilinmeyen Ders', topic: record.konu, total_correct: 0, total_incorrect: 0 };
          }
          topicStatsMap[topicKey].total_correct += record.dogru_sayisi;
          topicStatsMap[topicKey].total_incorrect += record.yanlis_sayisi;
      });
      
      const finalOverallStats = Object.values(overallStatsMap);
      const finalTopicReport = Object.values(topicStatsMap);

      setReport({
          overall_stats: finalOverallStats,
          weekly_stats: finalOverallStats, // 'weekly_stats' artık 'filtrelenmiş' veriyi tutuyor
      });
      setTopicReport(finalTopicReport);
    };

    fetchAllData();
  }, [studentId, navigate, timeFilter]);
  
  const topicsBySubject = useMemo(() => {
    return topicReport.reduce((acc, topic) => {
        if (!acc[topic.subject_id]) {
            acc[topic.subject_id] = [];
        }
        acc[topic.subject_id].push(topic);
        return acc;
    }, {} as Record<string, TopicStat[]>);
  }, [topicReport]);

  if (loading) return <div className="text-center p-8">Öğrenci raporu yükleniyor...</div>;

  if (error) {
    return (
      <div className="p-4 text-center">
        <Card className="max-w-md mx-auto border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-destructive">
              <AlertTriangle/> Erişim Hatası
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Link to="/coach">
              <Button variant="outline">Koç Paneline Geri Dön</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // report null değilse devam et
  const overallCorrect = report?.overall_stats.reduce((sum, stat) => sum + stat.correct_questions, 0) || 0;
  const overallIncorrect = report?.overall_stats.reduce((sum, stat) => sum + stat.incorrect_questions, 0) || 0;
  const pieData = [{ name: 'Doğru', value: overallCorrect }, { name: 'Yanlış', value: overallIncorrect }];
  const selectedFilterLabel = filterOptions.find(f => f.value === timeFilter)?.label;

  return (
    <div className="space-y-6 animate-slide-up">
      <Link to="/coach" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" />
        Koç Paneline Geri Dön
      </Link>
      <Card className="shadow-card border border-border/50 bg-card/90 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <img
              src={getAvatarImage(studentAvatar)}
              alt={studentName}
              className="w-16 h-16 rounded-full border-2 border-primary/30 aspect-square object-cover"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <CardTitle className="text-2xl font-bold tracking-tight">{studentName}</CardTitle>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm">
                  LVL {getLevelInfo(studentLifetimePoints).level}
                </span>
              </div>
              <CardDescription className="mt-1 font-semibold text-primary">
                Unvan: {getLevelInfo(studentLifetimePoints).title} • {studentLifetimePoints} Toplam Puan
              </CardDescription>
            </div>
          </div>
          {isCoach && (
            <Button 
              onClick={() => setIsGiftDialogOpen(true)} 
              className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-extrabold shadow-md hover:shadow-lg transition-all"
            >
              <Award className="h-5 w-5 mr-2 animate-pulse" />
              Ödül Puanı Ver
            </Button>
          )}
        </CardHeader>
      </Card>
      
      {/* Deneme Sınavları Raporu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BookCopy/>Deneme Sınavları</CardTitle>
          <CardDescription>Öğrencinin girdiği deneme sınavlarının sonuçları.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {denemeler.length === 0 ? (
            <p className="text-center text-muted-foreground p-4">Bu öğrenci henüz hiç deneme sınavı kaydı eklememiş.</p>
          ) : (
            denemeler.map(deneme => {
              const isOpen = openDenemeId === deneme.id;
              const toplamNet = deneme.sonuclar?.reduce((sum, s) => sum + s.net_sayisi, 0) || 0;
              return (
                <div key={deneme.id} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => setOpenDenemeId(isOpen ? null : deneme.id)}>
                    <div className="flex-1">
                      <h4 className="font-semibold">{deneme.deneme_adi}</h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(deneme.deneme_tarihi).toLocaleDateString('tr-TR')} - Toplam Net: {toplamNet.toFixed(2)}
                      </p>
                    </div>
                    <ChevronDown className={cn('h-5 w-5 transition-transform duration-300 ml-2', isOpen ? 'rotate-180' : '')} />
                  </div>
                  {isOpen && (
                    <div className="mt-4 pt-4 border-t space-y-2">
                      <div className="grid grid-cols-4 gap-2 text-xs font-bold text-center text-muted-foreground">
                        <span>Ders</span><span>Doğru</span><span>Yanlış</span><span>Net</span>
                      </div>
                      {deneme.sonuclar?.sort((a,b) => a.ders_id.localeCompare(b.ders_id)).map(sonuc => (
                        <div key={sonuc.ders_id} className="grid grid-cols-4 gap-2 text-sm text-center items-center p-2 bg-background/50 rounded">
                          <span className="font-medium text-left">{getSubjectName(sonuc.ders_id)}</span>
                          <span className="flex items-center justify-center gap-1 text-green-500"><CheckCircle className="h-4 w-4" />{sonuc.dogru_sayisi}</span>
                          <span className="flex items-center justify-center gap-1 text-red-500"><XCircle className="h-4 w-4" />{sonuc.yanlis_sayisi}</span>
                          <span className="font-bold">{sonuc.net_sayisi.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
      
      {/* Manuel Soru Analizi ve Filtreleme */}
      <Card>
          <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                      <CardTitle>Manuel Soru Analizi</CardTitle>
                      <CardDescription>Öğrencinin manuel olarak girdiği soru kayıtları.</CardDescription>
                  </div>
                  <Select value={timeFilter} onValueChange={setTimeFilter}>
                      <SelectTrigger className="w-full md:w-[200px]">
                          <SelectValue placeholder="Zaman Aralığı Seç" />
                      </SelectTrigger>
                      <SelectContent>
                          {filterOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          ))}
                      </SelectContent>
                  </Select>
              </div>
          </CardHeader>
      </Card>
        
      {/* Raporlar artık filtrelenmiş veriyi gösterecek */}
      {report && report.overall_stats.length === 0 ? (
          <p className="text-center text-muted-foreground p-4">Seçilen zaman aralığı ("{selectedFilterLabel}") için gösterilecek manuel soru kaydı bulunamadı.</p>
      ) : report && (
          <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader><CardTitle>Başarı Oranı ({selectedFilterLabel})</CardTitle></CardHeader>
                    <CardContent>{(overallCorrect + overallIncorrect) > 0 ? (<div className="h-64"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>{pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />))}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer></div>) : (<p className="text-muted-foreground">Henüz veri yok.</p>)}</CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>Soru Dağılımı ({selectedFilterLabel})</CardTitle></CardHeader>
                    <CardContent>{report.overall_stats.reduce((sum, s) => sum + s.total_questions, 0) > 0 ? (<div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={report.overall_stats} layout="vertical"><XAxis type="number" hide /><YAxis type="category" dataKey="subject_name" width={80} stroke="hsl(var(--foreground))" /><Tooltip cursor={{ fill: 'hsl(var(--muted))' }} /><Bar dataKey="total_questions" name="Çözülen Soru" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} /></BarChart></ResponsiveContainer></div>) : (<p className="text-muted-foreground">Henüz soru çözülmedi.</p>)}</CardContent>
                  </Card>
              </div>
              <Card>
                  <CardHeader><CardTitle>Konu Analizi ({selectedFilterLabel})</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                      {report.overall_stats.map((stat) => {
                          const total = stat.correct_questions + stat.incorrect_questions;
                          const successRate = total > 0 ? Math.round((stat.correct_questions / total) * 100) : 0;
                          const isOpen = openSubjectId === stat.subject_id;
                          const subjectTopics = topicsBySubject[stat.subject_id] || [];
                          return (
                              <div key={stat.subject_id} className="p-3 bg-muted/50 rounded-lg">
                                  <div className="flex items-center justify-between cursor-pointer" onClick={() => setOpenSubjectId(isOpen ? null : stat.subject_id)}>
                                    <div className='flex-1'>
                                        <h4 className="font-semibold">{stat.subject_name}</h4>
                                        <div className="flex items-center justify-between text-sm mt-1">
                                            <div className="flex gap-4">
                                                <span className="flex items-center gap-1 text-green-500"><CheckCircle className="h-4 w-4" /> {stat.correct_questions}</span>
                                                <span className="flex items-center gap-1 text-red-500"><XCircle className="h-4 w-4" /> {stat.incorrect_questions}</span>
                                            </div>
                                            <span className={`font-bold ${successRate > 75 ? 'text-green-500' : successRate > 50 ? 'text-amber-500' : 'text-red-500'}`}>
                                              %{successRate} Başarı
                                            </span>
                                        </div>
                                    </div>
                                     <ChevronDown className={cn(`h-5 w-5 transition-transform duration-300 ml-2`, isOpen ? 'rotate-180' : '')} />
                                  </div>
                                  {isOpen && (
                                    <div className="mt-4 pt-4 border-t space-y-3">
                                        {subjectTopics.length > 0 ? subjectTopics.map(topic => {
                                            const topicTotal = topic.total_correct + topic.total_incorrect;
                                            const topicRate = topicTotal > 0 ? (topic.total_correct / topicTotal) * 100 : 0;
                                            return (
                                                <div key={topic.topic} className="flex flex-col gap-2 p-2 bg-background/50 rounded-lg">
                                                    <div className="flex justify-between items-center text-sm">
                                                        <span className="font-medium">{topic.topic}</span>
                                                        <span className="font-semibold">%{Math.round(topicRate)}</span>
                                                    </div>
                                                    <Progress value={topicRate} className="h-2" />
                                                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                                        <div className="flex items-center gap-1 text-green-500"><TrendingUp className="h-3 w-3" /> {topic.total_correct} Doğru</div>
                                                        <div className="flex items-center gap-1 text-red-500"><TrendingDown className="h-3 w-3" /> {topic.total_incorrect} Yanlış</div>
                                                    </div>
                                                </div>
                                            )
                                        }) : <p className="text-sm text-muted-foreground text-center">Bu ders için henüz konu detayı bulunmuyor.</p>}
                                    </div>
                                  )}
                              </div>
                          )
                      })}
                  </CardContent>
                </Card>
          </div>
      )}
      {/* ÖDÜL PUANI GÖNDERME DIALOGU */}
      <Dialog open={isGiftDialogOpen} onOpenChange={setIsGiftDialogOpen}>
        <DialogContent className="max-w-md rounded-2xl p-6">
          <DialogHeader className="flex flex-col items-center text-center space-y-2">
            <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-2xl text-amber-500 animate-pulse">
              🏆
            </div>
            <DialogTitle className="text-xl font-bold tracking-tight text-center">Öğrenciyi Ödüllendir</DialogTitle>
            <DialogDescription className="text-sm text-center">
              {studentName} isimli öğrenciye hediye puan ve tebrik mesajı gönderin.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Puan Miktarı</label>
              <div className="grid grid-cols-4 gap-2">
                {[100, 250, 500].map(points => (
                  <Button
                    key={points}
                    type="button"
                    variant={giftPoints === points ? "default" : "outline"}
                    onClick={() => setGiftPoints(points)}
                    className="font-bold"
                  >
                    {points}
                  </Button>
                ))}
                <Input
                  type="number"
                  placeholder="Diğer"
                  value={giftPoints || ""}
                  onChange={(e) => setGiftPoints(Number(e.target.value))}
                  className="font-bold text-center h-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Ödül Sebebi</label>
              <Select value={giftReason} onValueChange={setGiftReason}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Bir sebep seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Deneme Sınavı Birinciliği">Deneme Sınavı Birinciliği 🏆</SelectItem>
                  <SelectItem value="Haftalık Soru Çözme Rekoru">Haftalık Soru Çözme Rekoru 🔥</SelectItem>
                  <SelectItem value="Gayretli ve Başarılı Çalışma">Gayretli ve Başarılı Çalışma ⭐</SelectItem>
                  <SelectItem value="Kitap Bitirme Ödülü">Kitap Bitirme Ödülü 📚</SelectItem>
                  <SelectItem value="Diğer">Diğer (Kendi Sebebinizi Yazın)...</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {giftReason === 'Diğer' && (
              <div className="space-y-1.5 animate-slide-up">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Özel Sebep</label>
                <Input
                  placeholder="Örn: Sınıf içi sınavda 1. oldu"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                />
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button
              variant="outline"
              disabled={isSendingGift}
              onClick={() => setIsGiftDialogOpen(false)}
              className="w-full sm:w-auto font-semibold"
            >
              İptal
            </Button>
            <Button
              disabled={isSendingGift || giftPoints <= 0}
              onClick={handleSendGift}
              className="w-full sm:w-auto font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md"
            >
              {isSendingGift ? "Gönderiliyor..." : "Ödülü Tanımla"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}