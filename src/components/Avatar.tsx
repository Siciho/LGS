import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { getThemeById } from "@/data/themes";

// Matrix 1s and 0s falling rain canvas effect
function MatrixRainCanvas({ width = 80, height = 80 }: { width?: number; height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set high-DPI scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const fontSize = 8;
    const columns = Math.floor(width / 6) || 8;
    const drops: number[] = Array(columns).fill(0);
    const chars = ["0", "1"];

    let intervalId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#10b981"; // Emerald-500
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 7;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drops when they hit the bottom randomly
        if (y > height && Math.random() > 0.96) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    intervalId = window.setInterval(draw, 40);
    return () => {
      window.clearInterval(intervalId);
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      className="absolute inset-0 rounded-full bg-black pointer-events-none"
    />
  );
}

interface AvatarProps {
  src: string;
  alt?: string;
  themeId?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  highlight?: boolean;
  onHighlightClick?: () => void;
  interactive?: boolean;
}

export default function Avatar({
  src,
  alt = "Kullanıcı Avatarı",
  themeId = "default",
  className,
  size = "md",
  highlight = false,
  onHighlightClick,
  interactive = true,
}: AvatarProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHighlight, setShowHighlight] = useState(highlight);
  const userTheme = getThemeById(themeId);

  // Auto flip effect on mount/src changes if theme is Matrix
  useEffect(() => {
    if (themeId === "matrix") {
      const flipTimer = setTimeout(() => {
        setIsFlipped(true);

        const unflipTimer = setTimeout(() => {
          setIsFlipped(false);
        }, 2200); // Keep flipped showing matrix code for 2.2 seconds

        return () => clearTimeout(unflipTimer);
      }, 1500); // Wait 1.5 seconds before starting the flip

      return () => clearTimeout(flipTimer);
    }
  }, [themeId, src]);

  // Sync highlighting state
  useEffect(() => {
    setShowHighlight(highlight);
  }, [highlight]);

  // Auto clean highlight after 5 seconds
  useEffect(() => {
    if (showHighlight) {
      const timer = setTimeout(() => {
        setShowHighlight(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showHighlight]);

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14 md:w-16 md:h-16",
    lg: "w-20 h-20 md:w-24 md:h-24",
    xl: "w-28 h-28 md:w-32 md:h-32",
    "2xl": "w-36 h-36 md:w-40 md:h-40",
  };

  const currentSizeClass = sizeClasses[size];

  // Extract numeric dimensions for canvas scaling
  const getDimensions = () => {
    switch (size) {
      case "sm":
        return 40;
      case "md":
        return 60; // Average of w-14 and w-16
      case "lg":
        return 90; // Average of w-20 and w-24
      case "xl":
        return 120;
      case "2xl":
        return 150;
      default:
        return 64;
    }
  };

  const dim = getDimensions();

  const handleInteraction = () => {
    if (themeId === "matrix" && interactive) {
      setIsFlipped((prev) => !prev);
    }
    if (showHighlight) {
      setShowHighlight(false);
      if (onHighlightClick) onHighlightClick();
    }
  };

  // Base theme styles for normal avatars (non-matrix)
  const isDefaultTheme = themeId === "default";
  const avatarBorderClass = isDefaultTheme 
    ? "border-2 border-primary/50 shadow-md" 
    : userTheme.avatarClassName;

  // Render flip structure for siber matrix theme
  if (themeId === "matrix") {
    return (
      <div
        className={cn(
          "perspective-1000 cursor-pointer relative shrink-0",
          currentSizeClass,
          className
        )}
        onClick={handleInteraction}
        onMouseEnter={() => interactive && setIsFlipped(true)}
        onMouseLeave={() => interactive && setIsFlipped(false)}
      >
        <div
          className={cn(
            "w-full h-full flipper preserve-3d rounded-full relative transition-transform duration-500",
            isFlipped ? "rotate-y-180" : "",
            showHighlight ? "animate-pulse-red-glow border-2" : avatarBorderClass
          )}
        >
          {/* Front Face: Avatar Image */}
          <div className="absolute inset-0 w-full h-full rounded-full backface-hidden overflow-hidden bg-background">
            <img
              src={src}
              alt={alt}
              className="w-full h-full rounded-full aspect-square object-cover"
            />
          </div>

          {/* Back Face: Matrix Code Rain */}
          <div className="absolute inset-0 w-full h-full rounded-full backface-hidden rotate-y-180 bg-black overflow-hidden flex items-center justify-center">
            {isFlipped && <MatrixRainCanvas width={dim} height={dim} />}
          </div>
        </div>
      </div>
    );
  }

  // Standard static render for other themes
  return (
    <div
      className={cn(
        "relative rounded-full aspect-square object-cover flex-shrink-0 cursor-pointer overflow-hidden",
        currentSizeClass,
        showHighlight ? "animate-pulse-red-glow border-2" : avatarBorderClass,
        className
      )}
      onClick={handleInteraction}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full rounded-full object-cover"
      />
    </div>
  );
}
