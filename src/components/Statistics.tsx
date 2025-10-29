// src/components/Statistics.tsx

import { useState, useMemo } from 'react';
import { Subject, StudySession } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, BarChart3, TrendingUp, TrendingDown, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StatisticsProps {
  subjects: Subject[];
  sessions: StudySession[];
}

export default function Statistics({ subjects, sessions }: StatisticsProps) {
  const [openSubjectId, setOpenSubjectId] = useState<string | null>(null);

  // --- DEĞİŞİKLİK: 'sessions' dizisi artık 'subjectId'ye göre gruplanıyor ---
  // Bu işlem, 'sessions' dizisi üzerinde SADECE BİR KEZ çalışır.
  // Eski 'getTopicStats' fonksiyonu gibi her konu için tekrar tekrar çalışmaz.
  const sessionsBySubject = useMemo(() => {
    // KONTROL NOKTASI: Gelen 'sessions' verisini kontrol et
    // console.log("Statistics bileşenine gelen 'sessions':", sessions);

    return sessions.reduce((acc, session) => {
      const { subjectId } = session;
      if (!acc[subjectId]) {
        acc[subjectId] = [];
      }
      acc[subjectId].push(session);
      return acc;
    }, {} as Record<string, StudySession[]>);
  }, [sessions]);
  // --- DEĞİŞİKLİK SONU ---

  return (
    <div className="space-y-6 animate-slide-up">
      <Card className="shadow-card border border-border/50 dark:border-white/10 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BarChart3 className="h-5 w-5" /> İstatistikler
          </CardTitle>
          <p className="text-sm text-white/80">Konu bazlı ilerlemeni takip et.</p>
        </CardHeader>
      </Card>
      
      <div className="space-y-4">
        {subjects.map(subject => {
          const totalSolved = subject.correct + subject.incorrect;
          const overallProgress = subject.targetQuestions > 0 ? (totalSolved / subject.targetQuestions) * 100 : 0;
          
          // --- DEĞİŞİKLİK: Gruplanmış 'sessions' verisi buradan alınıyor ---
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
                    <div>
                      <h3 className="font-bold text-lg">{subject.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Toplam Soru: {totalSolved} / {subject.targetQuestions}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 w-full">
                    <Progress 
                      value={overallProgress} 
                      className={cn("h-2", {
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
                    {/* --- DEĞİŞİKLİK: 'subject.topics.map' yerine 'subjectSessions.map' kullanılıyor --- */}
                    {subjectSessions.length > 0 ? (
                      subjectSessions.map(session => {
                        // Veriler artık doğrudan 'session' objesinden alınıyor.
                        const { topic, correctCount, incorrectCount } = session;
                        const total = correctCount + incorrectCount;
                        const progressValue = total > 0 ? (correctCount / total) * 100 : 0;
                        
                        // 'Günlük Test' kayıtlarını filtrele (isteğe bağlı, ama rapor için temiz)
                        if (topic === 'Günlük Test') return null;

                        return (
                          <div key={topic} className="flex flex-col gap-2 p-3 bg-muted/30 rounded-lg">
                            <div className="flex justify-between items-center text-sm">
                              <span className="font-medium">{topic}</span>
                              <span className="font-semibold">%{Math.round(progressValue)}</span>
                            </div>
                            <Progress value={progressValue} className={cn("h-2", {
                              "bg-primary": subject.color === "primary",
                              "bg-success": subject.color === "success",
                              "bg-warning": subject.color === "warning"
                            })} />
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
                      // Eğer 'subjectSessions' boşsa (hiç soru girilmemişse)
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
    </div>
  );
}