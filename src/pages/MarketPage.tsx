import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, CheckCircle, Lock, Award, Snowflake, Flame, Palette, UserRound } from "lucide-react"; 
import { useAppContext } from "./AppLayout";
import { avatars as allAvatars } from "@/data/avatars";
import { achievements as initialAchievementsData } from "@/data/achievements";
import { cardThemes } from "@/data/themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const MarketPage = () => {
  const { totalPoints, streakFreezes, userAvatars, unlockedThemes, handleBuyStreakFreeze, handleBuyAvatar, handleBuyTheme } = useAppContext();
  const freezePrice = 200;

  const purchasableAvatars = allAvatars.filter(a => a.unlockMethod === 'purchase');
  const achievementAvatars = allAvatars.filter(a => a.unlockMethod === 'achievement');

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Üst Bilgi Kartı */}
      <Card className="shadow-card border border-border/50 dark:border-white/10 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <CardHeader className="flex-row items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-white" />
            <CardTitle className="text-white">Market</CardTitle>
          </div>
          <div className="flex items-center gap-2 font-bold text-white/90 text-lg">
            <Star className="h-5 w-5 fill-white/20" /> {totalPoints} Puan
          </div>
        </CardHeader>
      </Card>
      
      {/* Sekmeli Market Yapısı */}
      <Tabs defaultValue="boosters" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="boosters" className="flex items-center gap-2">
            <Snowflake className="h-4 w-4" />
            <span>Güçlendiriciler</span>
          </TabsTrigger>
          <TabsTrigger value="avatars" className="flex items-center gap-2">
            <UserRound className="h-4 w-4" />
            <span>Avatarlar</span>
          </TabsTrigger>
          <TabsTrigger value="themes" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span>Kart Temaları</span>
          </TabsTrigger>
        </TabsList>

        {/* 1. SEKME: GÜÇLENDİRİCİLER */}
        <TabsContent value="boosters" className="space-y-6">
          <Card className="shadow-card border-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Snowflake className="h-32 w-32 text-blue-500" />
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-xl text-blue-600 dark:text-blue-400">
                <Snowflake className="h-6 w-6" /> Seri Dondurma
              </CardTitle>
              <CardDescription className="text-foreground/80">
                Günlük serini korumak için hayati önem taşır. Bir gün girmesen bile serin bozulmaz.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-blue-100 dark:border-blue-800 shadow-sm gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                   <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full shrink-0">
                      <Flame className="h-8 w-8 text-blue-500" />
                   </div>
                   <div>
                      <p className="font-bold text-lg">Mevcut Hakkın: <span className="text-blue-600 dark:text-blue-400 text-2xl">{streakFreezes}</span></p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground font-medium">
                        <Star className="h-3 w-3 text-yellow-500" />
                        Fiyat: {freezePrice} Puan
                      </div>
                   </div>
                </div>
                
                <Button 
                    onClick={handleBuyStreakFreeze} 
                    disabled={totalPoints < freezePrice}
                    size="lg"
                    className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-md hover:shadow-lg transition-all"
                >
                    {totalPoints < freezePrice ? "Yetersiz Puan" : "Hemen Satın Al"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2. SEKME: AVATARLAR */}
        <TabsContent value="avatars" className="space-y-6">
          <Card className="shadow-card border border-border/50 dark:border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" /> Puanla Alınabilir Avatarlar
              </CardTitle>
              <CardDescription>Kazandığın puanlarla bu avatarlara sahip olabilirsin.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {purchasableAvatars.map(avatar => {
                const isUnlocked = (userAvatars?.unlocked || []).includes(avatar.id);
                const canAfford = totalPoints >= (avatar.price || 0);
                return (
                  <div key={avatar.id} className="flex flex-col items-center gap-2 p-4 bg-muted/30 rounded-lg animate-fade-in">
                    <img src={avatar.image} alt={avatar.name} className="w-20 h-20 rounded-full border-2 border-border object-cover" />
                    <h4 className="font-semibold text-sm text-center">{avatar.name}</h4>
                    {isUnlocked ? (
                      <Button variant="outline" disabled className="w-full">
                        <CheckCircle className="h-4 w-4 mr-2 text-success" /> Sahipsin
                      </Button>
                    ) : (
                      <Button className="w-full" disabled={!canAfford} onClick={() => handleBuyAvatar(avatar.id)}>
                        <Star className="h-4 w-4 mr-2" /> {avatar.price}
                      </Button>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="shadow-card border border-border/50 dark:border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" /> Başarımla Açılan Avatarlar
              </CardTitle>
              <CardDescription>Bu avatarları özel başarımları tamamlayarak kazanabilirsin.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievementAvatars.map(avatar => {
                const isUnlocked = (userAvatars?.unlocked || []).includes(avatar.id);
                const achievement = initialAchievementsData.find(a => a.id === avatar.achievementId);
                return (
                  <div key={avatar.id} className="flex flex-col items-center gap-2 p-4 bg-muted/30 rounded-lg animate-fade-in">
                    <img src={avatar.image} alt={avatar.name} className={`w-20 h-20 rounded-full border-2 border-border object-cover ${!isUnlocked ? 'filter grayscale opacity-50' : ''}`} />
                    <h4 className="font-semibold text-sm text-center">{avatar.name}</h4>
                    {achievement && (
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        {achievement.requirement}
                      </p>
                    )}
                    {!achievement && (
                        <p className="text-xs text-muted-foreground text-center mt-1">
                           Gereksinim: Başarım verisi bulunamadı.
                        </p>
                    )}
                    {isUnlocked ? (
                      <Button variant="outline" disabled className="w-full">
                        <CheckCircle className="h-4 w-4 mr-2 text-success" /> Sahipsin
                      </Button>
                    ) : (
                      <Button variant="outline" disabled className="w-full">
                        <Lock className="h-4 w-4 mr-2" /> Başarımla Açılır
                      </Button>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. SEKME: KART TEMALARI */}
        <TabsContent value="themes" className="space-y-6">
          <Card className="shadow-card border border-border/50 dark:border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-indigo-500" /> Liderlik Tablosu Kart Temaları
              </CardTitle>
              <CardDescription>Kazandığın puanlarla liderlik tablosundaki satırını özelleştirebilirsin.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cardThemes.map(theme => {
                const isUnlocked = (unlockedThemes || []).includes(theme.id);
                const canAfford = totalPoints >= theme.price;
                return (
                  <div 
                    key={theme.id} 
                    className={`flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl border transition-all ${theme.className}`}
                  >
                    <div className="flex flex-col gap-1 w-full md:w-2/3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className={`font-black text-sm md:text-base ${theme.textClassName}`}>{theme.name}</h4>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] uppercase font-black ${theme.badgeClassName}`}>
                          {theme.label}
                        </span>
                      </div>
                      <p className="text-xs text-foreground/80 leading-relaxed mt-1">{theme.description}</p>
                    </div>
                    <div className="w-full md:w-auto shrink-0 flex items-center justify-center">
                      {theme.price === 0 ? (
                        <Button variant="outline" disabled className="w-full md:w-auto bg-background/50">
                          <CheckCircle className="h-4 w-4 mr-2" /> Varsayılan
                        </Button>
                      ) : isUnlocked ? (
                        <Button variant="outline" disabled className="w-full md:w-auto bg-background/50">
                          <CheckCircle className="h-4 w-4 mr-2" /> Sahipsin
                        </Button>
                      ) : (
                        <Button 
                          className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-sm" 
                          disabled={!canAfford} 
                          onClick={() => handleBuyTheme(theme.id)}
                        >
                          <Star className="h-4 w-4 mr-2" /> {theme.price} Puan
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};