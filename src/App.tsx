// src/App.tsx

import { Routes, Route, Navigate } from "react-router-dom";
// --- DEĞİŞİKLİK: Gereksiz importlar kaldırıldı (useState, useEffect, ui bileşenleri vb.) ---
import { useAuthContext } from "./contexts/AuthContext";

// --- DEĞİŞİKLİK: Yeni LoginPage import edildi ---
import LoginPage from "./pages/LoginPage";

import AppLayout, { useAppContext } from "./pages/AppLayout";
import Index from "./pages/Index";
import ProgramimSayfasi from "./pages/ProgramimSayfasi";
import NotFound from "./pages/NotFound";
import Statistics from "@/components/Statistics";
import AchievementsList from "@/components/AchievementsList";
import PracticePage from "./pages/PracticePage";
import { MarketPage } from "./pages/MarketPage";
import ProfilePage from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";
import GecmisKayitlarSayfasi from "./pages/GecmisKayitlarSayfasi";
import StudentDetailPage from "./pages/StudentDetailPage";
import SchedulePage from "./pages/SchedulePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import WordQuizPage from "./pages/WordQuizPage";
import AdminPage from "./pages/AdminPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import DenemeKayitlarimPage from "./pages/DenemeKayitlarimPage";
import DailyScramblePage from "./pages/DailyScramblePage";

// Bu küçük bileşenler burada kalabilir
const StatisticsPage = () => {
  const context = useAppContext();
  if (!context) return null;
  return <Statistics subjects={context.subjects} sessions={context.sessions} />;
};
const AchievementsPage = () => {
  const context = useAppContext();
  if (!context) return null;
  return <AchievementsList achievements={context.achievements} />;
};

// --- DEĞİŞİKLİK: Kocaman LoginPage bileşeni buradan kaldırıldı ---

// ProtectedRoute aynı kalıyor
const ProtectedRoute = () => {
    const { session, profile, authLoading } = useAuthContext();
    if (authLoading) {
        return <div className="fixed inset-0 flex items-center justify-center bg-background"><p>Yükleniyor...</p></div>;
    }
    if (!session) {
        return <Navigate to="/login" replace />;
    }
    if (!profile) {
        return <div className="fixed inset-0 flex items-center justify-center bg-background"><p>Profil bilgileri alınıyor...</p></div>;
    }
    return <AppLayout />;
};

// App fonksiyonu artık çok daha temiz
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<PracticePage />} />
        <Route path="derslerim" element={<Index />} />
        <Route path="program" element={<ProgramimSayfasi />} />
        <Route path="practice" element={<PracticePage />} />
        <Route path="statistics" element={<StatisticsPage />} />
        <Route path="achievements" element={<AchievementsPage />} />
        <Route path="market" element={<MarketPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="gecmis" element={<GecmisKayitlarSayfasi />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="word-quiz/:unitId" element={<WordQuizPage />} />
        <Route path="student/:studentId" element={<StudentDetailPage />} />
        <Route path="deneme-kayitlarim" element={<DenemeKayitlarimPage />} />
        <Route path="daily-scramble" element={<DailyScramblePage />} />
        <Route path="coach" element={<SchedulePage />} />
        <Route path="admin/reset-password" element={<AdminPage />} />
        <Route path="update-password" element={<UpdatePasswordPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;