import { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, XCircle, ChevronDown, TrendingUp, TrendingDown, AlertTriangle, BookCopy } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { subjects as allSubjectsData } from '@/data/subjects';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

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
  weekly_stats: SubjectStat[];
  overall_stats: SubjectStat[];
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

export default function StudentDetailPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  
  const [report, setReport] = useState<ReportData | null>(null);
  const [denemeler, setDenemeler] = useState<DenemeKaydi[]>([]);
  const [topicReport, setTopicReport] = useState<TopicStat[]>([]);
  const [studentName, setStudentName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openSubjectId, setOpenSubjectId] = useState<string | null>(null);
  const [openDenemeId, setOpenDenemeId] = useState<number | null>(null);

  useEffect(() => {
    if (!studentId) return;

    const fetchAllData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            toast.error("Oturum bulunamadı.");
            navigate('/login');
            return;
        }
        const token = session.access_token;
        
        // Edge function ve RPC'yi aynı anda çağır
        const edgeFunctionPromise = supabase.functions.invoke('student-report', {
            headers: { Authorization: `Bearer ${token}` },
            body: { student_id: studentId }
        });
        const denemelerPromise = supabase.rpc('get_student_denemeler', { p_student_id: studentId });

        const [edgeFunctionResult, denemelerResult] = await Promise.all([edgeFunctionPromise, denemelerPromise]);

        // Edge Function sonuçlarını işle
        if (edgeFunctionResult.error) throw new Error(edgeFunctionResult.error.message);
        const { records: allRecords, student_name } = edgeFunctionResult.data;
        setStudentName(student_name);
        
        // Deneme sonuçlarını işle
        if (denemelerResult.error) throw new Error(denemelerResult.error.message);
        setDenemeler(denemelerResult.data || []);

        // --- TAM KOD BAŞLANGICI: Gelen ham veriyi işleyerek raporları oluştur ---
        const overallStatsMap: { [key: string]: SubjectStat } = {};
        const topicStatsMap: { [key: string]: TopicStat } = {};
        
        allRecords.forEach((record: any) => {
            if (!overallStatsMap[record.ders_id]) {
                const subject = allSubjectsData.find(s => s.id === record.ders_id);
                overallStatsMap[record.ders_id] = {
                    subject_id: record.ders_id,
                    subject_name: subject?.name || 'Bilinmeyen Ders',
                    total_questions: 0,
                    correct_questions: 0,
                    incorrect_questions: 0,
                };
            }
            overallStatsMap[record.ders_id].correct_questions += record.dogru_sayisi;
            overallStatsMap[record.ders_id].incorrect_questions += record.yanlis_sayisi;
            overallStatsMap[record.ders_id].total_questions += record.dogru_sayisi + record.yanlis_sayisi;

            const topicKey = `${record.ders_id}-${record.konu}`;
            if (!topicStatsMap[topicKey]) {
                const subject = allSubjectsData.find(s => s.id === record.ders_id);
                topicStatsMap[topicKey] = {
                    subject_id: record.ders_id,
                    subject_name: subject?.name || 'Bilinmeyen Ders',
                    topic: record.konu,
                    total_correct: 0,
                    total_incorrect: 0,
                };
            }
            topicStatsMap[topicKey].total_correct += record.dogru_sayisi;
            topicStatsMap[topicKey].total_incorrect += record.yanlis_sayisi;
        });
        
        const finalOverallStats = Object.values(overallStatsMap);
        const finalTopicReport = Object.values(topicStatsMap);

        setReport({
            overall_stats: finalOverallStats,
            weekly_stats: finalOverallStats, // Haftalık ve genel şimdilik aynı
        });
        setTopicReport(finalTopicReport);
        // --- TAM KOD SONU ---
        
      } catch (e: any) {
        console.error("Veri çekilirken hata:", e);
        setError(e.message.includes("Yetkiniz yok") ? e.message : "Rapor verileri yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [studentId, navigate]);
  
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
  
  if (!report) return <div className="text-center p-8 text-destructive">Rapor verileri bulunamadı.</div>;
  
  const overallCorrect = report.overall_stats.reduce((sum, stat) => sum + stat.correct_questions, 0);
  const overallIncorrect = report.overall_stats.reduce((sum, stat) => sum + stat.incorrect_questions, 0);
  const pieData = [{ name: 'Doğru', value: overallCorrect }, { name: 'Yanlış', value: overallIncorrect }];

  return (
    <div className="space-y-6 animate-slide-up">
      <Link to="/coach" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" />
        Koç Paneline Geri Dön
      </Link>
      <Card><CardHeader><CardTitle className="text-2xl">{studentName}</CardTitle><CardDescription>Öğrencinin genel ve deneme performans analizi.</CardDescription></CardHeader></Card>
      
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Genel Başarı Oranı (Manuel Girişler)</CardTitle></CardHeader>
          <CardContent>{(overallCorrect + overallIncorrect) > 0 ? (<div className="h-64"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>{pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />))}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer></div>) : (<p className="text-muted-foreground">Henüz veri yok.</p>)}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Haftanın Özeti (Manuel)</CardTitle><CardDescription>Bu hafta çözülen soru sayıları</CardDescription></CardHeader>
          <CardContent>{report.weekly_stats.reduce((sum, s) => sum + s.total_questions, 0) > 0 ? (<div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={report.weekly_stats} layout="vertical"><XAxis type="number" hide /><YAxis type="category" dataKey="subject_name" width={80} stroke="hsl(var(--foreground))" /><Tooltip cursor={{ fill: 'hsl(var(--muted))' }} /><Bar dataKey="total_questions" name="Çözülen Soru" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} /></BarChart></ResponsiveContainer></div>) : (<p className="text-muted-foreground">Bu hafta henüz soru çözülmedi.</p>)}</CardContent>
        </Card>
      </div>
      
      <Card>
          <CardHeader><CardTitle>Genel Konu Analizi (Manuel)</CardTitle><CardDescription>Tüm zamanlardaki başarıyı görmek için derse tıkla.</CardDescription></CardHeader>
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
  );
}