// src/data/themes.ts

export interface CardTheme {
  id: string;
  name: string;
  price: number;
  description: string;
  className: string;
  textClassName: string;
  label: string;
  badgeClassName: string;
  avatarClassName: string; // ✅ Yeni eklendi: Avatar çerçeve animasyon sınıfı
}

export const cardThemes: CardTheme[] = [
  {
    id: 'default',
    name: 'Standart Tema',
    price: 0,
    description: 'Varsayılan şık, sade ve modern kart görünümü.',
    className: 'border-border bg-card hover:bg-muted/30 transition-all duration-300',
    textClassName: 'text-foreground',
    label: 'Klasik',
    badgeClassName: 'bg-muted text-muted-foreground',
    avatarClassName: 'border-border'
  },
  {
    id: 'gold',
    name: 'Altın Kart Teması',
    price: 800,
    description: 'Altın sarısı ışıltılı kenarlıklar, sarımsı degrade arka plan ve şampiyonluk hissi.',
    className: 'border-amber-400 dark:border-amber-500 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 hover:from-amber-500/20 hover:to-yellow-500/15 shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all duration-300 border-2',
    textClassName: 'text-amber-600 dark:text-amber-400 font-extrabold',
    label: 'Efsanevi',
    badgeClassName: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-sm font-black',
    avatarClassName: 'border-2 animate-avatar-gold' // ✅ Altın nabız (pulse) çerçevesi
  },
  {
    id: 'neon',
    name: 'Neon Gece Teması',
    price: 1000,
    description: 'Koyu mor/pembe neon parlama çizgileri ve gizemli siberpunk tasarımı.',
    className: 'border-purple-500 dark:border-pink-500 bg-gradient-to-r from-purple-950/20 via-pink-950/10 to-purple-950/20 hover:from-purple-950/30 hover:to-pink-950/25 shadow-[0_0_18px_rgba(168,85,247,0.25)] hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all duration-300 border-2',
    textClassName: 'text-purple-600 dark:text-pink-400 font-black tracking-wide',
    label: 'Siberpunk',
    badgeClassName: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm font-black',
    avatarClassName: 'border-2 animate-avatar-neon' // ✅ Neon nabız (pulse) çerçevesi
  },
  {
    id: 'space',
    name: 'Uzay Gezgini Teması',
    price: 1200,
    description: 'Mavi-mor geçişli derin galaktik arka plan ve yıldız tozu ışıltısı.',
    className: 'border-blue-400 dark:border-indigo-400 bg-gradient-to-r from-indigo-950/30 via-slate-900/40 to-purple-950/30 hover:from-indigo-950/45 hover:via-slate-900/50 hover:to-purple-950/45 shadow-[0_0_18px_rgba(59,130,246,0.25)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all duration-300 border-2',
    textClassName: 'text-blue-600 dark:text-indigo-400 font-extrabold',
    label: 'Kozmik',
    badgeClassName: 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm font-black',
    avatarClassName: 'border-2 animate-avatar-space' // ✅ Kozmik nabız (pulse) çerçevesi
  },
  {
    id: 'matrix',
    name: 'Siber Matrix Teması',
    price: 1500,
    description: 'Akan yeşil Matrix kodları ve 3D takla atan siberpunk avatar tasarımı.',
    className: 'border-emerald-500 dark:border-emerald-400 bg-black/95 hover:bg-black hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all duration-300 border-2',
    textClassName: 'text-emerald-500 font-mono font-black tracking-widest',
    label: 'Hacker',
    badgeClassName: 'bg-emerald-500 text-black shadow-sm font-mono font-black',
    avatarClassName: 'border-2 border-emerald-500 animate-avatar-matrix'
  },
  {
    id: 'lava',
    name: 'Volkanik Alev Teması',
    price: 1300,
    description: 'Kenarlarından kızgın lav akan ve dokunulduğunda magma patlaması yaratan volkanik tasarım.',
    className: 'border-orange-500 dark:border-red-500 bg-gradient-to-r from-red-950/20 via-orange-950/15 to-red-950/20 hover:from-red-950/30 hover:to-orange-950/25 shadow-[0_0_18px_rgba(249,115,22,0.25)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all duration-300 border-2',
    textClassName: 'text-orange-500 dark:text-red-400 font-extrabold tracking-wide',
    label: 'Magma',
    badgeClassName: 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-sm font-black',
    avatarClassName: 'border-2 border-orange-500 animate-avatar-lava'
  },
  {
    id: 'frost',
    name: 'Kutup Rüzgarı Teması',
    price: 1100,
    description: 'Buz tutmuş kristal kenarlıklar ve dokunulduğunda donma/çatlama efekti veren kış teması.',
    className: 'border-cyan-300 dark:border-sky-300 bg-gradient-to-r from-cyan-950/20 via-sky-950/10 to-cyan-950/20 hover:from-cyan-950/30 hover:to-sky-950/25 shadow-[0_0_18px_rgba(34,211,238,0.25)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-300 border-2',
    textClassName: 'text-cyan-600 dark:text-sky-300 font-black tracking-wide',
    label: 'Kutup',
    badgeClassName: 'bg-gradient-to-r from-cyan-400 to-sky-500 text-white shadow-sm font-black',
    avatarClassName: 'border-2 border-cyan-300 animate-avatar-frost'
  }
];

export const getThemeById = (id: string): CardTheme => {
  return cardThemes.find(t => t.id === id) || cardThemes[0];
};

export interface Badge {
  wins: number;
  image: string;
  name: string;
}

export const badges: Badge[] = [
  { wins: 0, image: '/assets/default.png', name: 'Başlangıç Ligi' },
  { wins: 25, image: '/assets/badge25.png', name: 'Bronz Lig' },
  { wins: 75, image: '/assets/badge75.png', name: 'Gümüş Lig' },
  { wins: 100, image: '/assets/badge100.png', name: 'Altın Lig' },
  { wins: 150, image: '/assets/badge150.png', name: 'Kristal Lig' },
  { wins: 250, image: '/assets/badge250.png', name: 'Usta Ligi' },
  { wins: 500, image: '/assets/badge500.png', name: 'Şampiyonlar Ligi' },
];
