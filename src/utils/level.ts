// src/utils/level.ts

export interface LevelInfo {
  level: number;
  title: string;
  minPoints: number;
  maxPoints: number;
  progress: number;
}

export const getLevelInfo = (totalPoints: number): LevelInfo => {
  // Safe default
  const points = Math.max(0, totalPoints || 0);
  
  // Level formula: Level = Math.floor(Math.sqrt(points / 100)) + 1
  const level = Math.floor(Math.sqrt(points / 100)) + 1;
  
  // Calculate points range for current level
  const minPoints = Math.pow(level - 1, 2) * 100;
  const maxPoints = Math.pow(level, 2) * 100;
  
  // Progress percentage inside current level
  const pointsInCurrentLevel = points - minPoints;
  const pointsNeededForNextLevel = maxPoints - minPoints;
  const progress = Math.min(100, Math.max(0, (pointsInCurrentLevel / pointsNeededForNextLevel) * 100));

  let title = "Yeni Başlayan";
  if (level === 2) title = "Çırak";
  else if (level === 3) title = "Gelişmekte Olan";
  else if (level === 4) title = "Savaşçı";
  else if (level === 5) title = "Uzman";
  else if (level === 6) title = "Üstat";
  else if (level === 7) title = "Efsane";
  else if (level === 8) title = "Bilge";
  else if (level === 9) title = "LGS Kaşifi";
  else if (level >= 10) title = "LGS Fatihi";

  return {
    level,
    title,
    minPoints,
    maxPoints,
    progress
  };
};
