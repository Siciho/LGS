import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.student.app',
  appName: 'LGS Asistanım',
  webDir: 'dist',
  // YENİ EKLENEN BÖLÜM
  plugins: {
    SplashScreen: {
      launchShowDuration: 5000, // Açılış ekranı 5 saniye görünecek
      launchAutoHide: true,
      backgroundColor: "#1e1b4b", // Görsel yüklenemezse görünecek arkaplan rengi
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false, // Yükleniyor animasyonunu gizle
    }
  }
};

export default config;