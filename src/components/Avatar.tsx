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

// Space / Uzay Gezgini Warp Effect
function WarpCanvas({ width = 80, height = 80 }: { width?: number; height?: number }) {
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

    interface Star {
      x: number;
      y: number;
      z: number;
    }

    const stars: Star[] = Array.from({ length: 30 }, () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * width,
    }));

    let animationId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 30, 0.25)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#ffffff";
      stars.forEach((s) => {
        s.z -= 1.5;
        if (s.z <= 0) {
          s.x = (Math.random() - 0.5) * width;
          s.y = (Math.random() - 0.5) * height;
          s.z = width;
        }

        const k = width / s.z;
        const px = s.x * k + width / 2;
        const py = s.y * k + height / 2;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = (1 - s.z / width) * 2;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
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
      className="absolute inset-0 rounded-full bg-slate-950 pointer-events-none"
    />
  );
}

// RGB Fluid Wavy Color Flow (Antigravity colors)
function RGBWaveCanvas({ width = 80, height = 80 }: { width?: number; height?: number }) {
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

    let offset = 0;
    let animationId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 3; i++) {
        const grad = ctx.createLinearGradient(0, 0, width, height);
        const hue1 = (offset + i * 120) % 360;
        const hue2 = (hue1 + 180) % 360;
        grad.addColorStop(0, `hsla(${hue1}, 80%, 50%, 0.45)`);
        grad.addColorStop(1, `hsla(${hue2}, 80%, 50%, 0.45)`);
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 5) {
          const y = height / 2 + Math.sin(x * 0.05 + offset * 0.03 + i) * (height / 4 - i * 3);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      }

      offset += 1.5;
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

// Gold / Altın Sparks
function GoldSparkleCanvas({ width = 80, height = 80 }: { width?: number; height?: number }) {
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
      angle: number;
      radius: number;
      speed: number;
      size: number;
    }

    const particles: Particle[] = Array.from({ length: 25 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * (width / 2),
      speed: Math.random() * 0.03 + 0.01,
      size: Math.random() * 2 + 1,
    }));

    let animationId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(20, 15, 5, 0.2)";
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(width/2, height/2, 2, width/2, height/2, width/2);
      glow.addColorStop(0, "rgba(234, 179, 8, 0.3)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#facc15";
      ctx.shadowBlur = 4;
      ctx.shadowColor = "#eab308";

      particles.forEach((p) => {
        p.angle += p.speed;
        const x = width / 2 + Math.cos(p.angle) * p.radius;
        const y = height / 2 + Math.sin(p.angle) * p.radius;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      className="absolute inset-0 rounded-full bg-slate-950 pointer-events-none"
    />
  );
}

// Neon cyberpunk grid
function NeonGridCanvas({ width = 80, height = 80 }: { width?: number; height?: number }) {
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

    let offset = 0;
    let animationId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(10, 5, 20, 0.3)";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(168, 85, 247, 0.25)";
      ctx.lineWidth = 1;

      for (let i = 0; i <= width; i += 10) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      ctx.strokeStyle = "#ec4899";
      ctx.lineWidth = 2;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "#f43f5e";

      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      for (let x = 0; x <= width; x += 3) {
        const y = height / 2 + Math.sin(x * 0.15 + offset * 0.1) * 8;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.shadowBlur = 0;
      offset += 0.5;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      className="absolute inset-0 rounded-full bg-slate-950 pointer-events-none"
    />
  );
}

// Sunset / Gün Batımı
function SunFlareCanvas({ width = 80, height = 80 }: { width?: number; height?: number }) {
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

    let angle = 0;
    let animationId: number;

    const draw = () => {
      ctx.fillStyle = "#1e0b0b";
      ctx.fillRect(0, 0, width, height);

      const grad = ctx.createRadialGradient(width/2, height/2, 2, width/2, height/2, width/2);
      grad.addColorStop(0, "rgba(249, 115, 22, 0.45)");
      grad.addColorStop(0.5, "rgba(236, 72, 153, 0.2)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(253, 186, 116, 0.35)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = angle + (i * Math.PI) / 4;
        const x1 = width/2 + Math.cos(a) * 4;
        const y1 = height/2 + Math.sin(a) * 4;
        const x2 = width/2 + Math.cos(a) * (width/3);
        const y2 = height/2 + Math.sin(a) * (width/3);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();

      angle += 0.015;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      className="absolute inset-0 rounded-full bg-slate-950 pointer-events-none"
    />
  );
}

// Midnight / Gece Yarısı
function AuroraCanvas({ width = 80, height = 80 }: { width?: number; height?: number }) {
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

    let offset = 0;
    let animationId: number;

    const draw = () => {
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, width, height);

      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "rgba(59, 130, 246, 0.2)");
      grad.addColorStop(1, "rgba(99, 102, 241, 0.2)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(34, 211, 238, 0.4)";
      ctx.lineWidth = 3;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#06b6d4";

      ctx.beginPath();
      ctx.moveTo(-10, height/2);
      for (let x = -10; x <= width + 10; x += 4) {
        const y = height/2 + Math.sin(x * 0.06 + offset * 0.05) * 8 + Math.cos(x * 0.03 + offset * 0.03) * 4;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.shadowBlur = 0;
      offset += 0.8;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      className="absolute inset-0 rounded-full bg-slate-950 pointer-events-none"
    />
  );
}

// Forest / Zümrüt Ormanı
function ForestCanvas({ width = 80, height = 80 }: { width?: number; height?: number }) {
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

    interface Leaf {
      x: number;
      y: number;
      r: number;
      speedY: number;
      speedX: number;
    }

    const leaves: Leaf[] = Array.from({ length: 8 }, () => ({
      x: Math.random() * width,
      y: Math.random() * -20,
      r: Math.random() * 2 + 1.5,
      speedY: Math.random() * 0.4 + 0.3,
      speedX: Math.random() * 0.2 - 0.1
    }));

    let animationId: number;

    const draw = () => {
      ctx.fillStyle = "#022c22";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(16, 185, 129, 0.45)";
      ctx.shadowBlur = 3;
      ctx.shadowColor = "#10b981";

      leaves.forEach((l) => {
        ctx.beginPath();
        ctx.arc(l.x, l.y, l.r, 0, Math.PI * 2);
        ctx.fill();

        l.y += l.speedY;
        l.x += l.speedX;

        if (l.y > height) {
          l.y = -5;
          l.x = Math.random() * width;
        }
      });

      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      className="absolute inset-0 rounded-full bg-slate-950 pointer-events-none"
    />
  );
}

// Bubblegum / Barbie Pembe (Kalp Animasyonlu)
function BubblegumCanvas({ width = 80, height = 80 }: { width?: number; height?: number }) {
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

    interface Heart {
      x: number;
      y: number;
      r: number;
      speedY: number;
      opacity: number;
      rot: number;
      speedRot: number;
    }

    const hearts: Heart[] = Array.from({ length: 8 }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 20,
      r: Math.random() * 3 + 4, // 4px to 7px size
      speedY: -(Math.random() * 0.4 + 0.25),
      opacity: Math.random() * 0.45 + 0.45, // 0.45 to 0.90 opacity
      rot: Math.random() * Math.PI * 2,
      speedRot: (Math.random() - 0.5) * 0.03
    }));

    let animationId: number;

    const draw = () => {
      ctx.fillStyle = "#3b0764"; // Barbie koyu pembe/mor arka planı
      ctx.fillRect(0, 0, width, height);

      ctx.shadowBlur = 5;
      ctx.shadowColor = "#f43f5e";

      hearts.forEach((h) => {
        ctx.save();
        ctx.translate(h.x, h.y);
        ctx.rotate(h.rot);

        ctx.beginPath();
        // Kalp çizimi (0,0 merkezli)
        ctx.moveTo(0, -h.r * 0.3);
        ctx.bezierCurveTo(-h.r / 2, -h.r * 1.1, -h.r * 1.2, -h.r * 0.25, 0, h.r);
        ctx.bezierCurveTo(h.r * 1.2, -h.r * 0.25, h.r / 2, -h.r * 1.1, 0, -h.r * 0.3);
        ctx.closePath();

        ctx.fillStyle = `rgba(244, 63, 94, ${h.opacity})`;
        ctx.fill();

        ctx.restore();

        h.y += h.speedY;
        h.rot += h.speedRot;

        if (h.y < -15) {
          h.y = height + 10;
          h.x = Math.random() * width;
          h.opacity = Math.random() * 0.45 + 0.45;
        }
      });

      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      className="absolute inset-0 rounded-full bg-slate-950 pointer-events-none"
    />
  );
}

// Music / Müzik Ritmi Equalizer
function MusicEqualizerCanvas({ width = 80, height = 80 }: { width?: number; height?: number }) {
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

    const barCount = 6;
    const barWidth = 6;
    const barGap = 3;
    const heights = Array(barCount).fill(5);

    let animationId: number;

    const draw = () => {
      ctx.fillStyle = "#0f051d";
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(width/2, height/2, 2, width/2, height/2, width/2);
      glow.addColorStop(0, "rgba(236, 72, 153, 0.2)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      const startX = (width - (barCount * barWidth + (barCount - 1) * barGap)) / 2;

      for (let i = 0; i < barCount; i++) {
        const target = Math.random() * (height * 0.6) + 4;
        heights[i] += (target - heights[i]) * 0.25;

        const x = startX + i * (barWidth + barGap);
        const barHeight = heights[i];
        const y = height - barHeight - (height * 0.15);

        const barGrad = ctx.createLinearGradient(0, y, 0, y + barHeight);
        barGrad.addColorStop(0, "#f43f5e");
        barGrad.addColorStop(1, "#8b5cf6");

        ctx.fillStyle = barGrad;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "#f43f5e";

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x, y, barWidth, barHeight, 2);
        } else {
          ctx.rect(x, y, barWidth, barHeight);
        }
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      className="absolute inset-0 rounded-full bg-slate-950 pointer-events-none"
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
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "custom";
  highlight?: boolean;
  onHighlightClick?: () => void;
  interactive?: boolean;
  activeBadge?: string;
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
  activeBadge = "",
}: AvatarProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHighlight, setShowHighlight] = useState(highlight);
  const [isAnimating, setIsAnimating] = useState(false);
  const userTheme = getThemeById(themeId);

  const hasActiveBadge = !!activeBadge && activeBadge !== "";
  const isFlipTheme = themeId !== "default" || hasActiveBadge;

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

          {/* Back Face: Dynamic Animation Canvas or Badge */}
          <div 
            className="absolute inset-0 w-full h-full rounded-full backface-hidden rotate-y-180 overflow-hidden flex items-center justify-center border border-indigo-500/30 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950"
            style={{ transform: "rotateY(180deg) translateZ(2px)" }}
          >
            {isFlipped && (
              <>
                {hasActiveBadge ? (
                  <div className="relative w-full h-full flex items-center justify-center p-1.5 bg-black/40 rounded-full">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25)_0%,transparent_70%)] animate-pulse" />
                    <img 
                      src={activeBadge} 
                      alt="Rozet" 
                      className="w-4/5 h-4/5 rounded-full object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                    />
                  </div>
                ) : (
                  <>
                    {themeId === "matrix" && <MatrixRainCanvas width={dim} height={dim} />}
                    {themeId === "lava" && <MagmaCanvas width={dim} height={dim} />}
                    {themeId === "frost" && <BlizzardCanvas width={dim} height={dim} />}
                    {themeId === "space" && <WarpCanvas width={dim} height={dim} />}
                    {themeId === "rainbow" && <RGBWaveCanvas width={dim} height={dim} />}
                    {themeId === "gold" && <GoldSparkleCanvas width={dim} height={dim} />}
                    {themeId === "neon" && <NeonGridCanvas width={dim} height={dim} />}
                    {themeId === "sunset" && <SunFlareCanvas width={dim} height={dim} />}
                    {themeId === "midnight" && <AuroraCanvas width={dim} height={dim} />}
                    {themeId === "forest" && <ForestCanvas width={dim} height={dim} />}
                    {themeId === "bubblegum" && <BubblegumCanvas width={dim} height={dim} />}
                    {themeId === "music" && <MusicEqualizerCanvas width={dim} height={dim} />}
                  </>
                )}
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
