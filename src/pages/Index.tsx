import { useAppContext } from '@/pages/AppLayout';
import SubjectCard from '@/components/SubjectCard';
import DailyQuote from '@/components/ui/DailyQuote';
import LgsCountdown from '@/components/ui/LgsCountdown';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Briefcase } from 'lucide-react';
import { useActiveSubjects } from "@/hooks/useActiveSubjects";

const Index = () => {
  const { subjects, handleAddQuestions, tomorrowSubjects, isEvening } = useAppContext();

  // 🔑 SADECE BU SATIRLAR YENİ: subjects -> activeSubjects
  const activeSubjects = useActiveSubjects(subjects, new Date());

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="glass bg-white/10 dark:bg-gray-900/50 backdrop-blur-2xl border border-white/20 dark:border-gray-700 rounded-2xl shadow-inner p-4 transition-all">
        <LgsCountdown />
      </div>

      {isEvening && tomorrowSubjects && tomorrowSubjects.length > 0 && (
        <div className="animate-fade-in">
          <Card className="glass bg-gradient-to-r from-orange-400/60 to-yellow-300/50 dark:from-yellow-700/40 dark:to-orange-600/40 border border-white/20 dark:border-gray-700 shadow-lg rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white drop-shadow-sm">
                Yarınki Derslerin
              </CardTitle>
              <Briefcase className="h-4 w-4 text-white/70" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white drop-shadow-md">{tomorrowSubjects.join(', ')}</p>
              <p className="text-xs text-white/80">Çantan hazır mı?</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="glass bg-white/10 dark:bg-gray-900/50 backdrop-blur-2xl border border-white/20 dark:border-gray-700 rounded-2xl shadow-inner p-4">
        <DailyQuote />
      </div>

      {/* 🔑 BURADA activeSubjects kullanıyoruz */}
      {activeSubjects && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeSubjects.map((subject: any) => (
            <div
              key={subject.id} // ⚠️ key her zaman primitive (id) olmalı
              className="glass bg-white/10 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700 backdrop-blur-xl rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <SubjectCard subject={subject} onAddQuestions={handleAddQuestions} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
