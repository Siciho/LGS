import { Challenge } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Swords, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";
import { useState, useRef } from "react";

interface ChallengeNotificationProps {
  challenges: Challenge[];
  onDismiss: (challengeId: string) => void;
}

export default function ChallengeNotification({ challenges, onDismiss }: ChallengeNotificationProps) {
  const navigate = useNavigate();

  if (!challenges || challenges.length === 0) {
    return null;
  }

  const handleAccept = (challenge: Challenge) => {
    onDismiss(challenge.id);
    navigate(`/word-quiz/${challenge.unit_id}`, { state: { challengeId: challenge.id } });
  };

  const handleDecline = async (challengeId: string) => {
    const { error } = await supabase
      .from('challenges')
      .update({ status: 'declined' })
      .eq('id', challengeId);

    if (error) {
      toast.error("Meydan okuma reddedilemedi.");
    } else {
      toast.info("Meydan okuma reddedildi.");
      onDismiss(challengeId);
    }
  };

  return (
    <div className="fixed top-24 right-4 z-50 w-80 space-y-2 animate-slide-in-right">
      {challenges.map(challenge => (
        <ChallengeNotificationCard
          key={challenge.id}
          challenge={challenge}
          onDismiss={onDismiss}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      ))}
    </div>
  );
}

interface ChallengeCardProps {
  challenge: Challenge;
  onDismiss: (challengeId: string) => void;
  onAccept: (challenge: Challenge) => void;
  onDecline: (challengeId: string) => void;
}

function ChallengeNotificationCard({ challenge, onDismiss, onAccept, onDecline }: ChallengeCardProps) {
  const [offsetX, setOffsetX] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const hasMovedRef = useRef(false);

  const handleStart = (clientX: number, clientY: number) => {
    startXRef.current = clientX;
    startYRef.current = clientY;
    setIsDragging(true);
    hasMovedRef.current = false;
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const diffX = clientX - startXRef.current;
    
    if (Math.abs(diffX) > 5) {
      hasMovedRef.current = true;
      setOffsetX(diffX);
      const progress = Math.min(Math.abs(diffX) / 200, 1);
      setOpacity(1 - progress * 0.7);
    }
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const totalDiff = offsetX;
    const swipeThreshold = 100;

    if (Math.abs(totalDiff) > swipeThreshold) {
      setOffsetX(totalDiff > 0 ? 400 : -400);
      setOpacity(0);
      setTimeout(() => {
        onDismiss(challenge.id);
      }, 200);
    } else {
      setOffsetX(0);
      setOpacity(1);
    }
  };

  return (
    <Card
      onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
        if (hasMovedRef.current && e.cancelable) e.preventDefault();
      }}
      onTouchEnd={handleEnd}
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={() => { if (isDragging) handleEnd(); }}
      style={{
        transform: `translateX(${offsetX}px)`,
        opacity: opacity,
        transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s ease-out",
        cursor: isDragging ? "grabbing" : "grab"
      }}
      className="shadow-lg border-primary/20 bg-card select-none"
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-sm font-bold flex items-center gap-2 min-w-0">
              <Swords className="h-4 w-4 text-primary shrink-0 animate-pulse" />
              <span className="truncate">{challenge.challenger_name} Sana Meydan Okudu!</span>
            </CardTitle>
            <CardDescription className="text-xs mt-1 truncate">
              Seni Ünite {challenge.unit_id} testinde yenmeye çalışıyor.
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0 text-slate-400 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss(challenge.id);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-1">
        <div className="flex gap-2">
          <Button className="flex-1" size="sm" onClick={() => onAccept(challenge)}>Kabul Et</Button>
          <Button className="flex-1" size="sm" variant="outline" onClick={() => onDecline(challenge.id)}>Reddet</Button>
        </div>
      </CardContent>
    </Card>
  );
}