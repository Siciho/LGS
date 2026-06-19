// src/components/QuestionSolver.tsx

import { useState } from "react";
import { Question, Subject, SolvedStat } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { X, CheckCircle, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { playYaySound, playFailSound } from "@/utils/sounds";
import { useAppContext } from "@/pages/AppLayout";

export function parseMathText(text: string): string {
  if (!text) return "";
  let cleaned = text;
  
  // Çift ters eğik çizgileri teke indir
  cleaned = cleaned.replace(/\\\\/g, '\\');
  
  // Karekök düzeltme: \sqrt{50} -> √50
  cleaned = cleaned.replace(/\\sqrt{([^}]+)}/g, '√$1');
  cleaned = cleaned.replace(/\\sqrt/g, '√');
  
  // Derece sembolü: \circ -> °
  cleaned = cleaned.replace(/\^{\\circ}/g, '°');
  cleaned = cleaned.replace(/\^\\circ/g, '°');
  cleaned = cleaned.replace(/\\circ/g, '°');
  
  // Üslü sayılar: 5^{-2} -> 5⁻², x^2 -> x²
  const superscripts: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
    '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾', 'n': 'ⁿ', 'x': 'ˣ', 'y': 'ʸ'
  };
  
  cleaned = cleaned.replace(/\^{([^}]+)}/g, (_, p1) => {
    return p1.split('').map((char: string) => superscripts[char] || char).join('');
  });
  cleaned = cleaned.replace(/\^([0-9nx-y])/g, (_, p1) => superscripts[p1] || p1);
  
  // Alt indisler: a_{1} -> a₁
  const subscripts: Record<string, string> = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
    '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎'
  };
  cleaned = cleaned.replace(/_{([^}]+)}/g, (_, p1) => {
    return p1.split('').map((char: string) => subscripts[char] || char).join('');
  });
  cleaned = cleaned.replace(/_([0-9])/g, (_, p1) => subscripts[p1] || p1);
  
  // Çarpım noktası
  cleaned = cleaned.replace(/\\cdot/g, ' · ');
  
  // Dolar işaretlerini kaldır
  cleaned = cleaned.replace(/\$/g, '');
  
  return cleaned;
}

interface QuestionSolverProps {
  questions: Question[];
  subjects: Subject[];
  onFinish: (solvedStats: SolvedStat[]) => void;
  onClose: () => void;
}

export default function QuestionSolver({ questions, subjects, onFinish, onClose }: QuestionSolverProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [solvedStats, setSolvedStats] = useState<SolvedStat[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showExplanationModal, setShowExplanationModal] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const { isMuted } = useAppContext();

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : "Bilinmeyen Ders";
  };
  
  const isCorrect = selectedAnswer !== null && selectedAnswer === currentQuestion.correctAnswer;

  const handleNext = () => {
    setShowExplanationModal(false);
    setShowResult(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      onFinish(solvedStats);
    }
  };
  
  const handleSelectAnswer = (selectedIndex: number | null) => {
    if (showResult) return;

    const correct = selectedIndex === currentQuestion.correctAnswer;
    if (correct) {
      playYaySound(isMuted);
    } else {
      playFailSound(isMuted);
    }

    setSolvedStats(prev => [...prev, {
      subjectId: currentQuestion.subjectId,
      topic: currentQuestion.topic,
      correct: correct,
    }]);

    setSelectedAnswer(selectedIndex);
    setShowResult(true);

    setTimeout(() => {
        setShowExplanationModal(true);
    }, 1200);
  };

  return (
    <div className="p-4 animate-slide-up">
      <Card className="max-w-4xl mx-auto shadow-card border-border/50">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <Badge variant="secondary">{getSubjectName(currentQuestion.subjectId)}</Badge>
            <Button variant="ghost" size="icon" onClick={onClose}><X /></Button>
          </div>
          <Progress value={progress} />
          
          {/* --- DEĞİŞİKLİK 1: Soru metnine anti-translate eklendi --- */}
          <CardTitle 
            className="pt-6 text-center text-lg md:text-xl notranslate" 
            translate="no"
          >
            {parseMathText(currentQuestion.question)}
          </CardTitle>

        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === currentQuestion.correctAnswer;
              
              let buttonVariant = "outline";
              let resultClass = "";

              if (showResult) {
                if (isCorrectAnswer) {
                  buttonVariant = "success";
                  resultClass = "animate-pulse";
                } else if (isSelected && !isCorrectAnswer) {
                  buttonVariant = "destructive";
                  resultClass = "animate-pulse";
                }
              }

              return (
                <Button 
                  key={index} 
                  variant={buttonVariant as any}
                  onClick={() => handleSelectAnswer(index)} 
                  disabled={showResult}
                  className={`h-auto min-h-[60px] whitespace-normal justify-start text-left p-4 ${resultClass}`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <span className="font-bold text-lg min-w-[32px] h-8 rounded-full bg-muted flex items-center justify-center">{String.fromCharCode(65 + index)}</span>
                    
                    {/* --- DEĞİŞİKLİK 2: Seçenek metnine anti-translate eklendi --- */}
                    <span 
                      className="flex-1 text-base text-wrap break-words notranslate" 
                      translate="no"
                    >
                      {parseMathText(option)}
                    </span>

                    {showResult && isCorrectAnswer && (<CheckCircle className="h-5 w-5 text-success-foreground" />)}
                    {showResult && isSelected && !isCorrectAnswer && (<XCircle className="h-5 w-5 text-destructive-foreground" />)}
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <Dialog open={showExplanationModal} onOpenChange={setShowExplanationModal}>
        <DialogContent className="max-w-md animate-slide-up-fade">
          <DialogHeader>
            <DialogTitle className={`text-xl ${isCorrect ? 'text-success' : 'text-destructive'}`}>{isCorrect ? 'Doğru!' : 'Yanlış!'}</DialogTitle>
            
            {/* --- DEĞİŞİKLİK 3: Açıklama metnine anti-translate eklendi --- */}
            <DialogDescription 
              className="notranslate" 
              translate="no"
            > 
              {parseMathText(currentQuestion.explanation || (isCorrect ? 'Tebrikler!' : 'Bir dahaki sefere!'))}
            </DialogDescription>

          </DialogHeader>
          <Button onClick={handleNext} className="mt-4 w-full">{currentQuestionIndex < questions.length - 1 ? 'İleri' : 'Bitir'}</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}