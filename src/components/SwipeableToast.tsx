import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SwipeableToastProps {
  id: string | number;
  title: string;
  description?: string;
  icon?: string | React.ReactNode;
  onClick?: () => void;
  variant?: "achievement" | "avatar" | "success" | "info";
}

export default function SwipeableToast({
  id,
  title,
  description,
  icon,
  onClick,
  variant = "info"
}: SwipeableToastProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  
  // Track start positions
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const currentXRef = useRef(0);
  const hasMovedRef = useRef(false);

  const handleStart = (clientX: number, clientY: number) => {
    startXRef.current = clientX;
    startYRef.current = clientY;
    currentXRef.current = clientX;
    setIsDragging(true);
    hasMovedRef.current = false;
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const diffX = clientX - startXRef.current;
    
    // If movement is mostly horizontal, we track it
    if (Math.abs(diffX) > 5) {
      hasMovedRef.current = true;
      setOffsetX(diffX);
      
      // Reduce opacity as we drag away
      const progress = Math.min(Math.abs(diffX) / 200, 1);
      setOpacity(1 - progress * 0.7);
    }
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const totalDiff = offsetX;
    const swipeThreshold = 100; // pixels

    if (Math.abs(totalDiff) > swipeThreshold) {
      // Swipe away
      setOffsetX(totalDiff > 0 ? 400 : -400);
      setOpacity(0);
      
      // Wait for exit animation, then dismiss toast
      setTimeout(() => {
        toast.dismiss(id);
      }, 200);
    } else {
      // Snap back
      setOffsetX(0);
      setOpacity(1);
      
      // If we didn't move much, it's a tap/click!
      if (!hasMovedRef.current) {
        if (onClick) {
          onClick();
          toast.dismiss(id);
        }
      }
    }
  };

  // Touch event handlers
  const onTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
    // Prevent page scrolling when swiping the toast
    if (hasMovedRef.current && e.cancelable) {
      e.preventDefault();
    }
  };

  const onTouchEnd = () => {
    handleEnd();
  };

  // Mouse event handlers (for desktop testing)
  const onMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const onMouseUp = () => {
    handleEnd();
  };

  const onMouseLeave = () => {
    if (isDragging) {
      handleEnd();
    }
  };

  // Color theme definitions matching the game style
  const getThemeClasses = () => {
    switch (variant) {
      case "achievement":
        return {
          border: "border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.25)]",
          badgeBg: "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400",
          titleText: "text-emerald-400",
          bg: "bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/85",
        };
      case "avatar":
        return {
          border: "border-violet-500/40 shadow-[0_0_20px_rgba(139,92,246,0.25)]",
          badgeBg: "bg-violet-500/10 border border-violet-500/30 text-violet-400",
          titleText: "text-violet-400",
          bg: "bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950/85",
        };
      case "success":
        return {
          border: "border-teal-500/40 shadow-[0_0_20px_rgba(20,184,166,0.25)]",
          badgeBg: "bg-teal-500/10 border border-teal-500/30 text-teal-400",
          titleText: "text-teal-400",
          bg: "bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/85",
        };
      default:
        return {
          border: "border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.25)]",
          badgeBg: "bg-indigo-500/10 border border-indigo-500/30 text-indigo-400",
          titleText: "text-indigo-400",
          bg: "bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/85",
        };
    }
  };

  const theme = getThemeClasses();

  return (
    <div
      ref={containerRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `translateX(${offsetX}px)`,
        opacity: opacity,
        transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s ease-out",
        cursor: isDragging ? "grabbing" : "grab"
      }}
      className={cn(
        "relative w-full max-w-sm sm:max-w-md pointer-events-auto rounded-xl p-4 overflow-hidden border backdrop-blur-md select-none",
        theme.bg,
        theme.border,
        "group achievement-shine"
      )}
    >
      <div className="flex items-center gap-3.5">
        {icon && (
          <div className={cn("w-11 h-11 rounded-full flex items-center justify-center text-2xl shrink-0 animate-float-slow", theme.badgeBg)}>
            {icon}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h4 className={cn("text-sm font-black tracking-wide", theme.titleText)}>
            {title}
          </h4>
          {description && (
            <p className="text-xs text-slate-300 font-medium mt-0.5 leading-snug">
              {description}
            </p>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toast.dismiss(id);
          }}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors shrink-0"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Swipe visual indicator at the bottom */}
      <div className="w-full flex justify-center mt-2.5 pointer-events-none">
        <div className="w-8 h-1 rounded-full bg-slate-700/50 group-hover:bg-slate-500/50 transition-colors" />
      </div>
    </div>
  );
}
