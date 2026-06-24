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
    textClassName: 'bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600 bg-clip-text text-transparent font-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]',
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
    textClassName: 'bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-500 bg-clip-text text-transparent font-black tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]',
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
    textClassName: 'bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent font-extrabold drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]',
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
    textClassName: 'text-emerald-500 font-mono font-black tracking-widest drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]',
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
    textClassName: 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-extrabold tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]',
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
    textClassName: 'bg-gradient-to-r from-cyan-400 via-sky-200 to-blue-400 bg-clip-text text-transparent font-black tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]',
    label: 'Kutup',
    badgeClassName: 'bg-gradient-to-r from-cyan-400 to-sky-500 text-white shadow-sm font-black',
    avatarClassName: 'border-2 border-cyan-300 animate-avatar-frost'
  },
  {
    id: 'rainbow',
    name: 'RGB Işıltısı Teması',
    price: 1800,
    description: 'Tüm renk tonlarında dans eden RGB efektli isim ve kart kenarlığı.',
    className: 'border-2 animate-rainbow-border bg-slate-900/60 backdrop-blur-md hover:bg-slate-900/80 shadow-[0_0_18px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.45)] transition-all duration-300',
    textClassName: 'animate-rainbow-text bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent font-black tracking-wide',
    label: 'Eşsiz',
    badgeClassName: 'bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 to-purple-500 text-white shadow-sm font-black',
    avatarClassName: 'border-2 animate-avatar-rainbow'
  },
  {
    id: 'sunset',
    name: 'Gün Batımı Teması',
    price: 750,
    description: 'Sıcak turuncu, altın ve pembe tonlarıyla gökyüzünün en güzel anını yansıtan kart teması.',
    className: 'border-orange-400 dark:border-pink-500 bg-gradient-to-r from-orange-500/10 via-pink-500/5 to-yellow-500/10 hover:from-orange-500/20 hover:to-pink-500/15 shadow-[0_0_15px_rgba(249,115,22,0.15)] hover:shadow-[0_0_20px_rgba(236,72,153,0.25)] transition-all duration-300 border-2',
    textClassName: 'bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent font-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]',
    label: 'Egzotik',
    badgeClassName: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-sm font-black',
    avatarClassName: 'border-2 border-orange-400 animate-avatar-sunset'
  },
  {
    id: 'midnight',
    name: 'Gece Yarısı Teması',
    price: 600,
    description: 'Derin gece karanlığı üzerine parıldayan elektrik mavisi ve mor çizgiler.',
    className: 'border-blue-500 dark:border-indigo-500 bg-gradient-to-r from-slate-950 via-blue-950/10 to-indigo-950/20 hover:from-slate-900 hover:to-blue-900/15 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all duration-300 border-2',
    textClassName: 'bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent font-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]',
    label: 'Gizemli',
    badgeClassName: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm font-black',
    avatarClassName: 'border-2 border-blue-500 animate-avatar-midnight'
  },
  {
    id: 'forest',
    name: 'Zümrüt Ormanı Teması',
    price: 900,
    description: 'Doğanın canlılığını getiren, taze nane ve derin orman yeşili tonları.',
    className: 'border-emerald-400 dark:border-green-500 bg-gradient-to-r from-emerald-950/10 via-green-950/5 to-teal-950/10 hover:from-emerald-950/20 hover:to-green-950/15 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_20px_rgba(34,197,94,0.25)] transition-all duration-300 border-2',
    textClassName: 'bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 bg-clip-text text-transparent font-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]',
    label: 'Doğal',
    badgeClassName: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-sm font-black',
    avatarClassName: 'border-2 border-emerald-400 animate-avatar-forest'
  },
  {
    id: 'bubblegum',
    name: 'Barbie Pembe Teması',
    price: 850,
    description: 'Şeker pembesi ve pamuk helva esintili, kıpır kıpır bir Barbie rüyası.',
    className: 'border-pink-400 dark:border-rose-400 bg-gradient-to-r from-pink-500/10 via-rose-500/5 to-fuchsia-500/10 hover:from-pink-500/20 hover:to-rose-500/15 shadow-[0_0_15px_rgba(236,72,153,0.15)] hover:shadow-[0_0_20px_rgba(244,63,94,0.25)] transition-all duration-300 border-2',
    textClassName: 'bg-gradient-to-r from-pink-400 via-rose-300 to-fuchsia-400 bg-clip-text text-transparent font-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]',
    label: 'Pop',
    badgeClassName: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm font-black',
    avatarClassName: 'border-2 border-pink-400 animate-avatar-bubblegum'
  },
  {
    id: 'music',
    name: 'Müzik Ritmi Teması',
    price: 950,
    description: 'Notaların ve melodilerin dans ettiği, ritim dolu kart ve parlayan ekolayzır tasarımı.',
    className: 'border-rose-500 dark:border-violet-500 bg-gradient-to-r from-rose-950/20 via-slate-900/10 to-violet-950/20 hover:from-rose-950/30 hover:to-violet-950/25 shadow-[0_0_18px_rgba(244,63,94,0.25)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all duration-300 border-2',
    textClassName: 'bg-gradient-to-r from-rose-400 via-pink-300 to-violet-400 bg-clip-text text-transparent font-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]',
    label: 'Melodik',
    badgeClassName: 'bg-gradient-to-r from-rose-500 to-violet-500 text-white shadow-sm font-black',
    avatarClassName: 'border-2 border-rose-500 animate-avatar-music'
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
