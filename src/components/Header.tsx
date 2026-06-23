import { Button } from "@/components/ui/button";
import { Moon, Sun, Trophy, Flame, Target, Star, Volume2, VolumeX, ShoppingCart, Settings, Snowflake, Download } from "lucide-react"; // Snowflake ikonu eklendi
import { Link } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { avatars } from "@/data/avatars";
import { cn } from "@/lib/utils";
import { getLevelInfo } from "@/utils/level";
import { getThemeById } from "@/data/themes";
import Avatar from "@/components/Avatar";

interface HeaderProps {
  userName: string | null;
  totalQuestions: number;
  streak: number;
  streakFreezes: number; // --- DEĞİŞİKLİK 1: Yeni prop eklendi ---
  unlockedAchievements: number;
  totalPoints: number;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currentAvatarId: string;
  isMuted: boolean;
  toggleMute: () => void;
  isHomePage: boolean;
  userRole: string | null;
  lifetimePoints?: number;
  activeTheme?: string; // ✅ Yeni prop eklendi
  latestApkUrl?: string;
}

export default function Header({
  userName,
  totalQuestions,
  streak,
  streakFreezes, // --- DEĞİŞİKLİK 2: Destructure edildi ---
  unlockedAchievements,
  totalPoints,
  theme,
  toggleTheme,
  currentAvatarId,
  isMuted,
  toggleMute,
  isHomePage,
  userRole,
  lifetimePoints = 0,
  activeTheme = 'default', // ✅ Yeni parametre
  latestApkUrl
}: HeaderProps) {

  const currentAvatar = avatars.find(a => a.id === currentAvatarId) || avatars[0];
  const firstName = userName ? userName.split(' ')[0] : 'Misafir';
  const lvlInfo = getLevelInfo(lifetimePoints);
  const userTheme = getThemeById(activeTheme);

  const renderHeaderContent = () => (
    <div className={cn(
      "flex items-center justify-between p-3 md:p-4 rounded-xl",
      "bg-card backdrop-blur-sm border border-border" 
    )}>
      <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
        <Avatar
          src={currentAvatar.image}
          alt="Kullanıcı Avatarı"
          themeId={activeTheme}
          size="md"
          className="hover:scale-105 transition-transform duration-300"
          interactive={true}
        />
        <Link to="/profile" className="flex-1 min-w-0 group hover:opacity-90 transition-opacity">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl md:text-2xl font-bold text-foreground truncate group-hover:text-primary transition-colors">
              Hey, {firstName}!
            </h1>
            {userRole !== 'koç' && userRole !== 'admin' && userRole !== 'hoca' && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm shrink-0">
                LVL {lvlInfo.level}
              </span>
            )}
          </div>
          {isHomePage && userRole !== 'koç' && (
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
              Bugünkü hedeflerine ulaşmaya hazır mısın?
            </p>
          )}
        </Link>
      </div>

      <div className="flex items-center gap-1 md:gap-2">
        {userRole !== 'koç' && (
          <Link to="/market" title="Market" className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors h-8 w-8 md:h-9 md:w-9 hover:bg-accent hover:text-accent-foreground">
            <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
          </Link>
        )}
        <Link to="/settings" title="Ayarlar" className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors h-8 w-8 md:h-9 md:w-9 hover:bg-accent hover:text-accent-foreground">
          <Settings className="h-4 w-4 md:h-5 md:w-5" />
        </Link>
        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 md:h-9 md:w-9" onClick={toggleMute} title={isMuted ? "Sesi Aç" : "Sesi Kapat"}>
          {isMuted ? <VolumeX className="h-4 w-4 md:h-5 md:w-5" /> : <Volume2 className="h-4 w-4 md:h-5 md:w-5" />}
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 md:h-9 md:w-9" onClick={toggleTheme} title="Temayı Değiştir">
          {theme === 'light' ? <Moon className="h-4 w-4 md:h-5 md:w-5" /> : <Sun className="h-4 w-4 md:h-5 md:w-5" />}
        </Button> 
      </div>
    </div>
  );

  const renderStatsCards = () => {
    const isWeb = !Capacitor.isNativePlatform() || Capacitor.getPlatform() === 'web';

    return (
      <div className={cn(
        "grid gap-2 md:gap-4",
        isWeb && latestApkUrl 
          ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-6" 
          : "grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
      )}>
        <div className="bg-card backdrop-blur-sm p-3 md:p-4 rounded-lg border border-border transition-all duration-300">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-primary/10 p-1.5 md:p-2 rounded-lg"><Target className="h-4 w-4 md:h-5 md:w-5 text-primary" /></div>
            <div>
              <p className="text-lg md:text-2xl font-bold text-foreground">{totalQuestions}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Soru</p>
            </div>
          </div>
        </div>
        <div className="bg-card backdrop-blur-sm p-3 md:p-4 rounded-lg border border-border transition-all duration-300">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-sky-500/10 p-1.5 md:p-2 rounded-lg"><Star className="h-4 w-4 md:h-5 md:w-5 text-sky-500" /></div>
            <div>
              <p className="text-lg md:text-2xl font-bold text-foreground">{totalPoints}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Puan</p>
            </div>
          </div>
        </div>
        <div className="bg-card backdrop-blur-sm p-3 md:p-4 rounded-lg border border-border transition-all duration-300">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-amber-500/10 p-1.5 md:p-2 rounded-lg"><Flame className="h-4 w-4 md:h-5 md:w-5 text-amber-500" /></div>
            <div>
              <p className="text-lg md:text-2xl font-bold text-foreground">{streak}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Seri</p>
            </div>
          </div>
        </div>
        
        {/* --- DEĞİŞİKLİK 4: Yeni 'Seri Dondurma' kartı eklendi --- */}
        <div className="bg-card backdrop-blur-sm p-3 md:p-4 rounded-lg border border-border transition-all duration-300">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-blue-400/10 p-1.5 md:p-2 rounded-lg"><Snowflake className="h-4 w-4 md:h-5 md:w-5 text-blue-400" /></div>
            <div>
              <p className="text-lg md:text-2xl font-bold text-foreground">{streakFreezes}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Dondurma</p>
            </div>
          </div>
        </div>
        {/* --- DEĞİŞİKLİK 4 SONU --- */}

        <div className="bg-card backdrop-blur-sm p-3 md:p-4 rounded-lg border border-border transition-all duration-300">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-emerald-500/10 p-1.5 md:p-2 rounded-lg"><Trophy className="h-4 w-4 md:h-5 md:w-5 text-emerald-500" /></div>
            <div>
              <p className="text-lg md:text-2xl font-bold text-foreground">{unlockedAchievements}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Başarım</p>
            </div>
          </div>
        </div>

        {isWeb && latestApkUrl && (
          <a
            href={latestApkUrl}
            download="LGS_Kocluk.apk"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-card hover:bg-emerald-500/5 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-border hover:border-emerald-500/30 transition-all duration-300 flex items-center cursor-pointer"
          >
            <div className="flex items-center gap-2 md:gap-3 w-full justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="bg-emerald-500/10 p-1.5 md:p-2 rounded-lg text-emerald-500">
                  <Download className="h-4 w-4 md:h-5 md:w-5 animate-bounce-slow" />
                </div>
                <div className="text-left">
                  <p className="text-xs md:text-sm font-bold text-emerald-400 leading-none">Android</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-1 whitespace-nowrap">Uygulamayı İndir</p>
                </div>
              </div>
              <img 
                src="/store.png" 
                alt="Store" 
                className="h-8 md:h-10 w-auto object-contain rounded transition-transform group-hover:scale-105"
              />
            </div>
          </a>
        )}
      </div>
    );
  };

  return (
    <header className="space-y-4 md:space-y-6 mb-4 md:mb-6 animate-slide-up">
      {renderHeaderContent()}
      {isHomePage && userRole !== 'koç' && renderStatsCards()}
    </header>
  );
}