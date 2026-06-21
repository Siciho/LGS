// src/components/Statistics.tsx

import { useState, useMemo, useEffect } from 'react';
import { Subject, StudySession } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronDown, BarChart3, TrendingUp, TrendingDown, Info, Calendar, Trophy, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/supabaseClient";
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend
} from 'recharts';

interface StatisticsProps {
  subjects: Subject[];
  sessions: StudySession[];
}

interface TrendEntry {
  date: string;
  dogru: number;
  yanlis: number;
  toplam: number;
}

export default function Statistics({ subjects, sessions }: StatisticsProps) {
  const [openSubjectId, setOpenSubjectId] = useState<string | null>(null);
  const [trendData, setTrendData] = useState<TrendEntry[]>([]);
  const [trendLoading, setTrendLoading] = useState(true);

  // 1. Gruplanmış oturumlar
  const sessionsBySubject = useMemo(() => {
    return sessions.reduce((acc, session) => {
      const { subjectId } = session;
      if (!acc[subjectId]) {
        acc[subjectId] = [];
      }
      acc[subjectId].push(session);
      return acc;
    }, {} as Record<string, StudySession[]>);
  }, [sessions]);

  // 2. Haftalık Trend Verilerini Supabase'den Çek
  useEffect(() => {
    const fetchDailyTrend = async () => {
      setTrendLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id;
        if (!userId) return;

        // Son 7 günün başlama tarihi (gece yarısı)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const { data, error } = await supabase
          .from('cozulen_sorular')
          .select('dogru_sayisi, yanlis_sayisi, eklenme_zamani')
          .eq('kullanici_id', userId)
          .gte('eklenme_zamani', sevenDaysAgo.toISOString())
          .order('eklenme_zamani', { ascending: true });

        if (error) throw error;

        // Son 7 günü boş verilerle başlat
        const dailyDataMap: Record<string, TrendEntry> = {};
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const dateLabel = d.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric' });
          const isoDate = d.toISOString().split('T')[0];
          dailyDataMap[isoDate] = { date: dateLabel, dogru: 0, yanlis: 0, toplam: 0 };
        }

        if (data) {
          data.forEach(item => {
            const isoDate = item.eklenme_zamani.split('T')[0];
            if (dailyDataMap[isoDate]) {
              dailyDataMap[isoDate].dogru += item.dogru_sayisi;
              dailyDataMap[isoDate].yanlis += item.yanlis_sayisi;
              dailyDataMap[isoDate].toplam += item.dogru_sayisi + item.yanlis_sayisi;
            }
          });
        }

        setTrendData(Object.values(dailyDataMap));
      } catch (err) {
        console.error("Haftalık trend verisi çekilemedi:", err);
      } finally {
        setTrendLoading(false);
      }
    };

    fetchDailyTrend();
  }, []);

  // 3. Ders bazlı soru dağılımı verisi
  const subjectChartData = useMemo(() => {
    return subjects.map(s => ({
      name: s.name,
      dogru: s.correct,
      yanlis: s.incorrect,
      toplam: s.correct + s.incorrect
    })).filter(item => item.toplam > 0);
  }, [subjects]);

  // Genel İstatistik Özetleri
  const totalCorrect = useMemo(() => subjects.reduce((sum, s) => sum + s.correct, 0), [subjects]);
  const totalIncorrect = useMemo(() => subjects.reduce((sum, s) => sum + s.incorrect, 0), [subjects]);
  const grandTotal = totalCorrect + totalIncorrect;
  const successRate = grandTotal > 0 ? Math.round((totalCorrect / grandTotal) * 100) : 0;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Üst Bilgi Kartı */}
      <Card className="shadow-card border border-border/50 dark:border-white/10 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BarChart3 className="h-5 w-5" /> İstatistik ve Analiz
          </CardTitle>
          <p className="text-sm text-white/80">Soru çözme performansını ve konu dağılımını analiz et.</p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="charts">Grafik Analizi</TabsTrigger>
          <TabsTrigger value="topics">Ders İlerlemesi</TabsTrigger>
        </TabsList>

        {/* 1. SEKME: Grafik Analizleri */}
        <TabsContent value="charts" className="space-y-6">
          {/* Özet Kartları */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-3 flex flex-col items-center justify-center bg-muted/30">
              <Trophy className="h-5 w-5 text-yellow-500 mb-1" />
              <p className="text-lg font-bold">{grandTotal}</p>
              <p className="text-xxs sm:text-xs text-muted-foreground text-center">Çözülen Soru</p>
            </Card>
            <Card className="p-3 flex flex-col items-center justify-center bg-muted/30">
              <TrendingUp className="h-5 w-5 text-green-500 mb-1" />
              <p className="text-lg font-bold text-green-500">%{successRate}</p>
              <p className="text-xxs sm:text-xs text-muted-foreground text-center">Başarı Oranı</p>
            </Card>
            <Card className="p-3 flex flex-col items-center justify-center bg-muted/30">
              <Star className="h-5 w-5 text-blue-500 mb-1" />
              <p className="text-lg font-bold text-blue-500">{totalCorrect * 10}</p>
              <p className="text-xxs sm:text-xs text-muted-foreground text-center">Toplam Puan</p>
            </Card>
          </div>

          {/* Haftalık Soru Çözüm Trendi Grafiği */}
          <Card className="shadow-card border border-border/50 dark:border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-1.5 font-bold">
                <Calendar className="h-4 w-4 text-primary" />
                Haftalık Soru Çözme Eğrisi
              </CardTitle>
              <CardDescription>Son 7 günde çözdüğün günlük toplam soru miktarı.</CardDescription>
            </CardHeader>
            <CardContent>
              {trendLoading ? (
                <div className="h-64 flex items-center justify-center text-muted-foreground">Grafik yükleniyor...</div>
              ) : trendData.reduce((sum, d) => sum + d.toplam, 0) === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-muted-foreground text-center gap-2 p-4">
                  <Info className="h-6 w-6" />
                  <p className="text-sm">Son 7 günde soru çözülmemiş. Çözmeye başladıktan sonra trendiniz burada listelenecektir.</p>
                </div>
              ) : (
                <div className="h-64 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          borderColor: 'hsl(var(--border))', 
                          borderRadius: '8px',
                          color: 'hsl(var(--foreground))'
                        }}
                      />
                      <Area type="monotone" dataKey="toplam" name="Toplam Soru" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorTrend)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ders Bazlı Soru Dağılımı Grafiği */}
          <Card className="shadow-card border border-border/50 dark:border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-1.5 font-bold">
                <BarChart3 className="h-4 w-4 text-success" />
                Ders Bazlı Soru Analizi
              </CardTitle>
              <CardDescription>Derslere göre doğru ve yanlış soru dağılımların.</CardDescription>
            </CardHeader>
            <CardContent>
              {subjectChartData.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-muted-foreground text-center gap-2 p-4">
                  <Info className="h-6 w-6" />
                  <p className="text-sm">Henüz veri yok. Soru çözmeye başladıktan sonra analiziniz burada görünecektir.</p>
                </div>
              ) : (
                <div className="h-64 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          borderColor: 'hsl(var(--border))', 
                          borderRadius: '8px',
                          color: 'hsl(var(--foreground))'
                        }}
                      />
                      <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                      <Bar dataKey="dogru" name="Doğru Soru" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="yanlis" name="Yanlış Soru" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2. SEKME: Konu/Ders İlerlemesi (Accordion) */}
        <TabsContent value="topics">
          <div className="space-y-4">
            {subjects.map(subject => {
              const totalSolved = subject.correct + subject.incorrect;
              const successRate = totalSolved > 0 ? Math.round((subject.correct / totalSolved) * 100) : 0;
              const subjectSessions = sessionsBySubject[subject.id] || [];
              
              return (
                <Card
                  key={subject.id}
                  className="shadow-card border border-border/50 dark:border-white/10"
                >
                  <CardHeader 
                    className="py-4 px-6 flex flex-row items-center justify-between cursor-pointer"
                    onClick={() => setOpenSubjectId(openSubjectId === subject.id ? null : subject.id)}
                  >
                    <div className="flex flex-col flex-1 gap-2">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{subject.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{subject.name}</h3>
                          <div className="text-xs sm:text-sm text-muted-foreground flex flex-wrap gap-x-2 gap-y-0.5 mt-0.5">
                            <span>Doğru: <span className="text-success font-bold">{subject.correct}</span></span>
                            <span className="text-border">|</span>
                            <span>Yanlış: <span className="text-destructive font-bold">{subject.incorrect}</span></span>
                            <span className="text-border">|</span>
                            <span>Başarı: <span className="text-primary dark:text-primary-glow font-bold">%{successRate}</span></span>
                            <span className="text-border">|</span>
                            <span className="text-muted-foreground/80">(Toplam: {totalSolved} Soru)</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 w-full">
                        <Progress 
                          value={successRate} 
                          className="h-2"
                          indicatorClassName={cn({
                            "bg-primary": subject.color === "primary",
                            "bg-success": subject.color === "success",
                            "bg-warning": subject.color === "warning"
                          })}
                        />
                      </div>
                    </div>
                    <ChevronDown
                      className={cn(
                        `h-5 w-5 transition-transform duration-300`, 
                        openSubjectId === subject.id ? 'rotate-180' : ''
                      )}
                    />
                  </CardHeader>
                  {openSubjectId === subject.id && (
                    <CardContent className="px-6 pb-6 space-y-4">
                      <hr className="border-t border-border/50" />
                      <h4 className="font-semibold text-foreground">Konulara Göre İstatistikler</h4>
                      <div className="space-y-3">
                        {subjectSessions.length > 0 ? (
                          subjectSessions.map(session => {
                            const { topic, correctCount, incorrectCount } = session;
                            const total = correctCount + incorrectCount;
                            const progressValue = total > 0 ? (correctCount / total) * 100 : 0;
                            
                            if (topic === 'Günlük Test') return null;

                            return (
                              <div key={topic} className="flex flex-col gap-2 p-3 bg-muted/30 rounded-lg">
                                <div className="flex justify-between items-center text-sm">
                                  <span className="font-medium">{topic}</span>
                                  <span className="font-semibold">%{Math.round(progressValue)}</span>
                                </div>
                                <Progress 
                                  value={progressValue} 
                                  className="h-2" 
                                  indicatorClassName={cn({
                                    "bg-primary": subject.color === "primary",
                                    "bg-success": subject.color === "success",
                                    "bg-warning": subject.color === "warning"
                                  })} 
                                />
                                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                  <div className="flex items-center gap-1 text-success">
                                    <TrendingUp className="h-3 w-3" /> {correctCount} Doğru
                                  </div>
                                  <div className="flex items-center gap-1 text-destructive">
                                    <TrendingDown className="h-3 w-3" /> {incorrectCount} Yanlış
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="flex items-center justify-center gap-2 text-center text-muted-foreground p-4">
                             <Info className="h-4 w-4" />
                            <p>Bu ders için henüz manuel konu girişi yapılmamış.</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}