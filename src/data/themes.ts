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
  }
];

export const getThemeById = (id: string): CardTheme => {
  return cardThemes.find(t => t.id === id) || cardThemes[0];
};
