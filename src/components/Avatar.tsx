import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { getThemeById } from "@/data/themes";

// Matrix 1s and 0s falling rain canvas effect (Back Face of Matrix Theme)
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

// Magma boiling canvas effect (Back Face of Lava Theme)
function MagmaCanvas({ width = 80, height = 80 }: { width?: number; height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    interface Bubble {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedY: number;
      life: number;
      maxLife: number;
    }

    const bubbles: Bubble[] = [];
    const colors = ["#f97316", "#ef4444", "#facc15"];

    let animationId: number;

    const draw = () => {
      ctx.fillStyle = "#1a0505";
      ctx.fillRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(width/2, height/2, 5, width/2, height/2, width/2);
      gradient.addColorStop(0, "rgba(239, 68, 68, 0.25)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      if (bubbles.length < 10 && Math.random() > 0.4) {
        bubbles.push({
          x: Math.random() * width,
          y: height - Math.random() * 5,
          radius: Math.random() * 3 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedY: -(Math.random() * 0.4 + 0.2),
          life: 0,
          maxLife: Math.random() * 30 + 15
        });
      }

      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius * (1 - b.life / b.maxLife), 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.shadowBlur = 5;
        ctx.shadowColor = b.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        b.y += b.speedY;
        b.life++;

        if (b.life >= b.maxLife || b.y < 0) {
          bubbles.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      className="absolute inset-0 rounded-full bg-black pointer-events-none"
    />
  );
}

// Blizzard swirling snow storm canvas effect (Back Face of Frost Theme)
function BlizzardCanvas({ width = 80, height = 80 }: { width?: number; height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    interface Snowflake {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
    }

    const flakes: Snowflake[] = [];
    const maxFlakes = 16;

    for (let i = 0; i < maxFlakes; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.4,
        speedY: Math.random() * 1.2 + 0.8,
        speedX: -(Math.random() * 0.8 + 0.5),
        opacity: Math.random() * 0.7 + 0.3
      });
    }

    let animationId: number;

    const draw = () => {
      ctx.fillStyle = "#0c4a6e"; // sky-900
      ctx.fillRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(width/2, height/2, 5, width/2, height/2, width/2);
      gradient.addColorStop(0, "rgba(56, 189, 248, 0.2)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      flakes.forEach((f) => {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
        ctx.fill();

        f.y += f.speedY;
        f.x += f.speedX;

        if (f.y > height || f.x < 0) {
          f.y = -5;
          f.x = Math.random() * (width + 10);
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      className="absolute inset-0 rounded-full bg-black pointer-events-none"
    />
  );
}

// Particle system overlay (Front Face overlay for Lava and Frost)
function ThemeParticleCanvas({ themeId, width = 80, height = 80 }: { themeId: string; width?: number; height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 6;

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: themeId === "lava" ? height + Math.random() * 20 : Math.random() * -20,
        size: Math.random() * 1.8 + 0.8,
        speedY: themeId === "lava" ? -(Math.random() * 0.4 + 0.2) : (Math.random() * 0.4 + 0.2),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.4,
      });
    }

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        if (themeId === "lava") {
          ctx.fillStyle = `rgba(249, 115, 22, ${p.opacity})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = "#ef4444";
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.shadowBlur = 2;
          ctx.shadowColor = "#e0f2fe";
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;

        p.y += p.speedY;
        p.x += p.speedX;

        if (themeId === "lava" && p.y < -5) {
          p.y = height + Math.random() * 10;
          p.x = Math.random() * width;
          p.opacity = Math.random() * 0.6 + 0.4;
        } else if (themeId === "frost" && p.y > height + 5) {
          p.y = -Math.random() * 10;
          p.x = Math.random() * width;
          p.opacity = Math.random() * 0.6 + 0.4;
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [themeId, width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      className="absolute inset-0 rounded-full pointer-events-none z-10"
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
  const [isAnimating, setIsAnimating] = useState(false);
  const userTheme = getThemeById(themeId);

  const isFlipTheme = themeId === "matrix" || themeId === "lava" || themeId === "frost";

  // Auto flip effect on mount if it's a 3D flip theme and interactive is true
  useEffect(() => {
    if (isFlipTheme && interactive) {
      const flipTimer = setTimeout(() => {
        setIsFlipped(true);

        const unflipTimer = setTimeout(() => {
          setIsFlipped(false);
        }, 2200);

        return () => clearTimeout(unflipTimer);
      }, 1500);

      return () => clearTimeout(flipTimer);
    }
  }, [themeId, src, interactive]);

  // Sync highlighting
  useEffect(() => {
    setShowHighlight(highlight);
  }, [highlight]);

  // Auto clean highlight
  useEffect(() => {
    if (showHighlight) {
      const timer = setTimeout(() => {
        setShowHighlight(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showHighlight]);

  // Auto stop click animation
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14 md:w-16 md:h-16",
    lg: "w-20 h-20 md:w-24 md:h-24",
    xl: "w-28 h-28 md:w-32 md:h-32",
    "2xl": "w-36 h-36 md:w-40 md:h-40",
  };

  const currentSizeClass = sizeClasses[size];

  const getDimensions = () => {
    switch (size) {
      case "sm":
        return 40;
      case "md":
        return 60;
      case "lg":
        return 90;
      case "xl":
        return 120;
      case "2xl":
        return 150;
      default:
        return 64;
    }
  };

  const dim = getDimensions();

  const handleInteraction = (e: React.MouseEvent) => {
    // DO NOT stop propagation so parent click handlers (like avatar selection) can execute
    setIsAnimating(true);
    
    if (isFlipTheme && interactive) {
      setIsFlipped((prev) => !prev);
    }
    
    if (showHighlight) {
      setShowHighlight(false);
      if (onHighlightClick) onHighlightClick();
    }
  };

  // Base theme styles for borders
  const isDefaultTheme = themeId === "default";
  const avatarBorderClass = isDefaultTheme 
    ? "border-2 border-primary/50 shadow-md" 
    : userTheme.avatarClassName;

  // Render 3D flip card structure for Matrix, Lava, and Frost
  if (isFlipTheme) {
    const showFrontParticles = themeId === "lava" || themeId === "frost";
    
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
            isAnimating ? `animate-${themeId}-click` : "",
            showHighlight ? "animate-pulse-red-glow border-2" : avatarBorderClass
          )}
        >
          {/* Front Face: Avatar Image with optional particles overlay */}
          <div 
            className="absolute inset-0 w-full h-full rounded-full backface-hidden overflow-hidden bg-background"
            style={{ transform: "translateZ(2px)" }}
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-full rounded-full aspect-square object-cover"
            />
            {showFrontParticles && <ThemeParticleCanvas themeId={themeId} width={dim} height={dim} />}
          </div>

          {/* Back Face: Dynamic Animation Canvas (Matrix, Magma, or Blizzard) */}
          <div 
            className="absolute inset-0 w-full h-full rounded-full backface-hidden rotate-y-180 bg-black overflow-hidden flex items-center justify-center"
            style={{ transform: "rotateY(180deg) translateZ(2px)" }}
          >
            {isFlipped && (
              <>
                {themeId === "matrix" && <MatrixRainCanvas width={dim} height={dim} />}
                {themeId === "lava" && <MagmaCanvas width={dim} height={dim} />}
                {themeId === "frost" && <BlizzardCanvas width={dim} height={dim} />}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Standard static render for other themes (Gold, Neon, Space)
  return (
    <div
      className={cn(
        "relative rounded-full aspect-square object-cover flex-shrink-0 cursor-pointer overflow-hidden transition-all duration-300",
        currentSizeClass,
        isAnimating ? `animate-${themeId}-click scale-110 z-10` : "hover:scale-105",
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
