import { useState, useMemo, useEffect } from "react";
import { useAppContext } from "./AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Pencil, Save, X, BookOpen, Clock, User } from "lucide-react";
import { AddStudyPlanDialog } from "@/components/AddStudyPlanDialog";
import { StudyPlanEntry, ManualSchedule } from "@/types";
import { emptySchedule } from '@/data/schedule';
import { subjects as allSubjectsData } from '@/data/subjects';
import { cn } from "@/lib/utils";

const weekDays = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"];
const allWeekDays = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

const dayShortNames: Record<string, string> = {
  "Pazartesi": "Pzt",
  "Salı": "Sal",
  "Çarşamba": "Çar",
  "Perşembe": "Per",
  "Cuma": "Cum"
};

const getSubjectVisuals = (subjectName: string) => {
  const name = (subjectName || "").trim().toUpperCase();
  if (name.includes("MAT") || name.includes("MATE")) {
    return {
      icon: "➗",
      bg: "bg-blue-500/10 dark:bg-blue-500/20",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-500/30",
      sideBorder: "border-l-blue-500",
      label: "Matematik"
    };
  }
  if (name.includes("FEN") || name.includes("FİZ") || name.includes("KİM") || name.includes("BİY")) {
    return {
      icon: "🔬",
      bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-500/30",
      sideBorder: "border-l-emerald-500",
      label: "Fen Bilimleri"
    };
  }
  if (name.includes("TÜR") || name.includes("TUR") || name.includes("EDEB")) {
    return {
      icon: "✍️",
      bg: "bg-amber-500/10 dark:bg-amber-500/20",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-500/30",
      sideBorder: "border-l-amber-500",
      label: "Türkçe"
    };
  }
  if (name.includes("İNG") || name.includes("ING") || name.includes("ENG")) {
    return {
      icon: "🇬🇧",
      bg: "bg-violet-500/10 dark:bg-violet-500/20",
      text: "text-violet-600 dark:text-violet-400",
      border: "border-violet-500/30",
      sideBorder: "border-l-violet-500",
      label: "İngilizce"
    };
  }
  if (name.includes("İNK") || name.includes("TAR") || name.includes("TARİH")) {
    return {
      icon: "🇹🇷",
      bg: "bg-rose-500/10 dark:bg-rose-500/20",
      text: "text-rose-600 dark:text-rose-400",
      border: "border-rose-500/30",
      sideBorder: "border-l-rose-500",
      label: "İnkılap Tarihi"
    };
  }
  if (name.includes("DİN") || name.includes("DKAB") || name.includes("AHL")) {
    return {
      icon: "🕌",
      bg: "bg-teal-500/10 dark:bg-teal-500/20",
      text: "text-teal-600 dark:text-teal-400",
      border: "border-teal-500/30",
      sideBorder: "border-l-teal-500",
      label: "Din Kültürü"
    };
  }
  if (!name || name === "BOŞ" || name === "BOS" || name === "-") {
    return {
      icon: "😴",
      bg: "bg-slate-500/10 dark:bg-slate-500/20",
      text: "text-slate-500 dark:text-slate-400",
      border: "border-slate-500/20",
      sideBorder: "border-l-slate-400/50",
      label: "Boş Ders"
    };
  }
  return {
    icon: "📚",
    bg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-500/30",
    sideBorder: "border-l-indigo-500",
    label: subjectName
  };
};

export default function ProgramimSayfasi() {
  const { 
    manualSchedule, 
    customPlan, 
    handleUpdateManualSchedule, 
    handleAddPlanEntry, 
    handleRemovePlanEntry,
  } = useAppContext();

  const getSubjectName = (subjectId: string) => {
    const subject = allSubjectsData.find(s => s.id === subjectId);
    return subject ? subject.name : 'Bilinmeyen Ders';
  };

  const todayIndex = new Date().getDay();
  const todayKey = weekDays[todayIndex - 1] || weekDays[0];

  const [selectedDay, setSelectedDay] = useState(todayKey);
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);
  const [isEditingManual, setIsEditingManual] = useState(false);

  const [localSchedule, setLocalSchedule] = useState<ManualSchedule>(manualSchedule || emptySchedule);

  useEffect(() => {
    if (!isEditingManual && manualSchedule) {
      setLocalSchedule(manualSchedule);
    }
  }, [manualSchedule, isEditingManual]);

  const handleManualEditChange = (day: string, index: number, field: 'subject' | 'teacher', value: string) => {
    setLocalSchedule(prev => {
      const newSchedule = JSON.parse(JSON.stringify(prev));
      if (newSchedule[day] && newSchedule[day][index]) {
        newSchedule[day][index][field] = value.toUpperCase();
      }
      return newSchedule;
    });
  };

  const handleSaveManualSchedule = () => {
    handleUpdateManualSchedule(localSchedule);
    setIsEditingManual(false);
  };

  const handleCancelEdit = () => {
    setLocalSchedule(manualSchedule || emptySchedule);
    setIsEditingManual(false);
  };

  const handleEditClick = () => {
    setLocalSchedule(manualSchedule || emptySchedule);
    setIsEditingManual(true);
  };

  const lessonsForSelectedDay = useMemo(() => {
    const schedule = localSchedule || emptySchedule;
    return schedule[selectedDay] || [];
  }, [localSchedule, selectedDay]);

  const sortedPlanDays = useMemo(() => {
    if (!customPlan) return [];
    return allWeekDays.filter(day => customPlan[day] && customPlan[day].length > 0);
  }, [customPlan]);

  const handleSaveNewPlan = (newPlanData: Omit<StudyPlanEntry, 'id' | 'notificationId'>) => {
    handleAddPlanEntry(newPlanData);
    setIsPlanDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-slide-up max-w-3xl mx-auto p-6 relative bg-gradient-to-br from-slate-950 via-indigo-950/10 to-slate-950 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-lg pb-24">
      <Tabs defaultValue="ders-programi">
        <TabsList className="grid w-full grid-cols-2 h-14 bg-muted/60 p-1.5 rounded-2xl border border-border/40 shadow-inner">
          <TabsTrigger 
            value="ders-programi"
            className="rounded-xl font-bold py-2.5 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-[0_4px_12px_rgba(99,102,241,0.3)] hover:text-indigo-500 active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span className="text-base">📅</span> Ders Programım
          </TabsTrigger>
          <TabsTrigger 
            value="calisma-plani"
            className="rounded-xl font-bold py-2.5 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:text-emerald-500 active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span className="text-base">🎯</span> Çalışma Planım
          </TabsTrigger>
        </TabsList>

        {/* DERS PROGRAMIM SEKMESİ */}
        <TabsContent value="ders-programi">
          <Card className="border-indigo-500/20 bg-slate-900/60 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden mt-6">
            <CardHeader className="border-b border-indigo-500/10 pb-4">
              <div className="flex justify-between items-center">
                <div>
                    <CardTitle className="text-xl font-extrabold text-white">Haftalık Ders Programı</CardTitle>
                    <CardDescription className="text-slate-300 text-sm font-medium">Okul ders programını buradan yönetebilirsin.</CardDescription>
                </div>
                {isEditingManual ? (
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" onClick={handleCancelEdit} className="rounded-lg font-semibold"><X className="h-4 w-4 mr-2"/>İptal</Button>
                    <Button size="sm" onClick={handleSaveManualSchedule} className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold rounded-lg shadow-md"><Save className="h-4 w-4 mr-2"/>Kaydet</Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" onClick={handleEditClick} className="border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 rounded-lg font-bold"><Pencil className="h-4 w-4 mr-2"/>Düzenle</Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
                <div className="bg-slate-950/50 rounded-xl p-1.5 mb-6 border border-slate-800 shadow-inner">
                    <div className="grid grid-cols-6 md:grid-cols-5 gap-1.5">
                        {weekDays.map((day, idx) => {
                          const colSpan = idx < 3 ? "col-span-2 md:col-span-1" : "col-span-3 md:col-span-1";
                          const isSelected = selectedDay === day;
                          return (
                            <Button 
                                key={day} 
                                variant={isSelected ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setSelectedDay(day)}
                                className={cn(
                                  "font-bold rounded-lg transition-all duration-200 py-2.5 h-auto w-full",
                                  colSpan,
                                  isSelected 
                                    ? "shadow-md bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-extrabold" 
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                                )}
                            >
                                <span className="hidden md:inline">{day}</span>
                                <span className="md:hidden">{dayShortNames[day] || day}</span>
                            </Button>
                          );
                        })}
                    </div>
                </div>
              <div className="space-y-3">
                {lessonsForSelectedDay.length > 0 ? (
                  lessonsForSelectedDay.map((lesson, lessonIndex) => {
                    const visuals = getSubjectVisuals(lesson.subject);
                    return isEditingManual ? (
                      <div 
                        key={lessonIndex} 
                        className={cn(
                          "flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-xl border bg-slate-950/20 border-l-4 shadow-sm transition-all duration-200 border-slate-800",
                          visuals.sideBorder
                        )}
                      >
                        <div className="flex items-center gap-2 shrink-0">
                          <div className={cn(
                            "flex items-center justify-center h-8 w-8 rounded-full font-extrabold text-sm shrink-0",
                            visuals.bg, visuals.text
                          )}>
                            {lessonIndex + 1}
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 sm:hidden">. Ders</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 flex-1">
                          <div className="relative">
                            <Input
                              value={lesson.subject}
                              onChange={(e) => handleManualEditChange(selectedDay, lessonIndex, 'subject', e.target.value)}
                              placeholder="Ders Adı (Örn: MAT)"
                              className="uppercase h-10 pr-8 font-semibold tracking-wide bg-slate-950/50 border-slate-800 text-white"
                            />
                            <span className="absolute right-2.5 top-2.5 text-base pointer-events-none" role="img" aria-label="subject icon">
                              {visuals.icon}
                            </span>
                          </div>
                          <Input
                            value={lesson.teacher}
                            onChange={(e) => handleManualEditChange(selectedDay, lessonIndex, 'teacher', e.target.value)}
                            placeholder="Öğretmen"
                            className="uppercase h-10 font-medium bg-slate-950/50 border-slate-800 text-white"
                          />
                        </div>
                      </div>
                    ) : (
                      <div 
                        key={lessonIndex} 
                        className={cn(
                          "flex items-center gap-4 p-3.5 rounded-xl border-l-4 shadow-md bg-slate-950/30 hover:bg-slate-900/30 transition-all duration-300 border border-slate-800/50 hover:translate-x-1",
                          visuals.sideBorder
                        )}
                      >
                        {/* Ders Numarası */}
                        <div className={cn(
                          "flex items-center justify-center h-9 w-9 rounded-full font-black text-sm shrink-0 shadow-inner",
                          visuals.bg, visuals.text
                        )}>
                          {lessonIndex + 1}
                        </div>

                        {/* Ders İkonu */}
                        <div className="text-2xl shrink-0 p-1 bg-slate-900/60 rounded-lg border border-slate-800">
                          {visuals.icon}
                        </div>

                        {/* Ders ve Öğretmen Bilgisi */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-extrabold text-base tracking-tight truncate text-white leading-tight">
                            {lesson.subject ? visuals.label : "Boş Ders"}
                          </h4>
                          {lesson.subject && (
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 text-slate-400">
                                {lesson.subject}
                              </span>
                              {lesson.teacher && (
                                <>
                                  <span className="text-slate-600 text-xs">•</span>
                                  <p className="text-xs text-slate-300 flex items-center gap-1 font-medium truncate max-w-[150px]">
                                    <User className="h-3 w-3 inline text-slate-400" />
                                    {lesson.teacher}
                                  </p>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-slate-400 py-10 bg-slate-950/35 rounded-xl border border-dashed border-slate-800">
                    <p className="font-medium">Seçili gün için ders programı boş.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ÇALIŞMA PLANIM SEKMESİ */}
        <TabsContent value="calisma-plani">
          <Card className="border-emerald-500/20 bg-slate-900/60 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden mt-6">
            <CardHeader className="border-b border-emerald-500/10 pb-4">
              <CardTitle className="text-xl font-extrabold text-white">Kişisel Çalışma Planı</CardTitle>
              <CardDescription className="text-slate-300 text-sm font-medium">Kendi çalışma rutinini oluştur ve takip et.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {sortedPlanDays.length > 0 ? (
                sortedPlanDays.map(day => (
                  <div key={day} className="mb-6 last:mb-0">
                    <h3 className="font-extrabold mb-3 border-b border-slate-800 pb-2 text-lg text-emerald-400">{day}</h3>
                    <div className="space-y-3">
                      {(customPlan?.[day] || []).sort((a,b) => a.timeRange.localeCompare(b.timeRange)).map(entry => (
                        <div key={entry.id} className="flex items-center justify-between border-l-4 border-emerald-500 bg-slate-950/40 p-4 rounded-r-xl hover:bg-slate-900/40 transition-all border border-slate-800/40">
                           <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center justify-center p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                <Clock className="h-5 w-5 text-emerald-400 mb-1"/>
                                <p className="text-[10px] font-mono font-bold text-slate-300">{entry.timeRange.split(' - ')[0]}</p>
                            </div>
                            <div>
                                <p className="font-extrabold flex items-center gap-2 text-white">
                                    <BookOpen className="h-4 w-4 text-slate-400"/>
                                    {getSubjectName(entry.subjectId)}
                                </p>
                                <p className="text-xs font-semibold text-slate-400 mt-0.5">{entry.studyType}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg" onClick={() => handleRemovePlanEntry(entry.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-400 py-10 bg-slate-950/35 rounded-xl border border-dashed border-slate-800">
                  <p className="font-semibold text-white">Henüz kişisel çalışma planı oluşturmadın.</p>
                  <p className="text-sm mt-1">Yeni etkinlik eklemek için (+) butonuna tıkla.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Button
            onClick={() => setIsPlanDialogOpen(true)}
            className="fixed bottom-24 right-6 h-14 w-14 rounded-full shadow-lg z-10 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white animate-pulse-glow"
            variant="hero"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </TabsContent>
      </Tabs>

      <AddStudyPlanDialog
        open={isPlanDialogOpen}
        onOpenChange={setIsPlanDialogOpen}
        onSave={handleSaveNewPlan}
      />
    </div>
  );
}