/**
 * LGS Asistanım - OTA Güncelleme ve APK Hazırlama Otomasyon Betiği
 * 
 * Kullanım:
 *   node scripts/publish-ota.cjs "<sürüm>" "<güncelleme_açıklaması>"
 * Örnek:
 *   node scripts/publish-ota.cjs "2.0.0" "Arayüz iyileştirildi, Barbie teması güncellendi."
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SUPABASE_URL = "https://bzrglrqxjhciaofmgozy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6cmdscnF4amhjaWFvZm1nb3p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MTUxNzgsImV4cCI6MjA3NDI5MTE3OH0.mahbqSSzBvgdwij91Qy9qaEOTNgTkKGVLZAHWF2jmOg";

// Girdi Parametrelerini Al
const targetVersion = process.argv[2];
const changelogText = process.argv[3];

if (!targetVersion || !changelogText) {
  console.error("\x1b[31mHata: Lütfen sürüm ve güncelleme açıklamasını argüman olarak girin.\x1b[0m");
  console.log("Kullanım: node scripts/publish-ota.cjs <sürüm> \"<açıklama>\"");
  process.exit(1);
}

// 1. Sürüm Formatını Doğrula (örn: 2.0.0)
if (!/^\d+\.\d+\.\d+$/.test(targetVersion)) {
  console.error(`\x1b[31mHata: Geçersiz sürüm formatı '${targetVersion}'. Lütfen X.Y.Z formatında girin.\x1b[0m`);
  process.exit(1);
}

console.log(`\x1b[36m=== LGS Asistanım OTA Yayınlama İşlemi Başladı (Sürüm: ${targetVersion}) ===\x1b[0m\n`);

try {
  // 2. Proje Dosyalarındaki Sürümleri Güncelle
  console.log("1. Dosyalardaki sürüm numaraları güncelleniyor...");

  // package.json güncelle
  const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    pkg.version = targetVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2), 'utf8');
    console.log("   [✓] package.json güncellendi.");
  }

  // AppLayout.tsx güncelle
  const appLayoutPath = path.join(PROJECT_ROOT, 'src', 'pages', 'AppLayout.tsx');
  if (fs.existsSync(appLayoutPath)) {
    let content = fs.readFileSync(appLayoutPath, 'utf8');
    content = content.replace(
      /export const CURRENT_VERSION = "[^"]+";/,
      `export const CURRENT_VERSION = "${targetVersion}";`
    );
    fs.writeFileSync(appLayoutPath, content, 'utf8');
    console.log("   [✓] AppLayout.tsx güncellendi.");
  }

  // android/app/build.gradle güncelle (versionName ve versionCode)
  const buildGradlePath = path.join(PROJECT_ROOT, 'android', 'app', 'build.gradle');
  if (fs.existsSync(buildGradlePath)) {
    let content = fs.readFileSync(buildGradlePath, 'utf8');
    
    // versionName değiştir
    content = content.replace(/versionName "[^"]+"/, `versionName "${targetVersion}"`);
    
    // versionCode değerini otomatik bir artır (veya sürüm koduna göre hesapla)
    const match = content.match(/versionCode (\d+)/);
    if (match) {
      const currentCode = parseInt(match[1], 10);
      const newCode = currentCode + 1;
      content = content.replace(/versionCode \d+/, `versionCode ${newCode}`);
      console.log(`   [✓] build.gradle güncellendi. (versionName: ${targetVersion}, versionCode: ${newCode})`);
    } else {
      console.log("   [!] build.gradle içinde versionCode bulunamadı.");
    }
    fs.writeFileSync(buildGradlePath, content, 'utf8');
  }

  // 3. Web Projesini Derle
  console.log("\n2. Web uygulaması derleniyor (npm run build)...");
  execSync('npm run build', { cwd: PROJECT_ROOT, stdio: 'inherit' });
  console.log("   [✓] Web build tamamlandı.");

  // 4. Capacitor Senkronizasyonu
  console.log("\n3. Native dosyalar senkronize ediliyor (npx cap sync)...");
  execSync('npx cap sync', { cwd: PROJECT_ROOT, stdio: 'inherit' });
  console.log("   [✓] Capacitor sync tamamlandı.");

  // 5. Android SDK ve Gradle Kontrolü (APK Derleme)
  console.log("\n4. Android APK derleme ortamı kontrol ediliyor...");
  const localPropertiesPath = path.join(PROJECT_ROOT, 'android', 'local.properties');
  let sdkDir = null;

  if (fs.existsSync(localPropertiesPath)) {
    const props = fs.readFileSync(localPropertiesPath, 'utf8');
    const match = props.match(/sdk\.dir=(.+)/);
    if (match) {
      sdkDir = match[1].replace(/\\:/g, ':').replace(/\\\\/g, '/').trim();
    }
  }

  const hasSdk = sdkDir && fs.existsSync(sdkDir);
  const gradlePath = path.join(process.env.USERPROFILE || 'C:\\Users\\RED', '.gradle', 'wrapper', 'dists');

  if (hasSdk) {
    console.log(`   Android SDK bulundu: ${sdkDir}`);
    // Gradle.bat bul
    let gradleExec = null;
    if (fs.existsSync(gradlePath)) {
      const files = fs.readdirSync(gradlePath);
      // En güncel gradle sürümünü arayalım
      const distDirs = files.filter(f => f.startsWith('gradle-'));
      for (const distDir of distDirs) {
        const fullDistPath = path.join(gradlePath, distDir);
        const subdirs = fs.readdirSync(fullDistPath);
        for (const hashDir of subdirs) {
          const possibleBin = path.join(fullDistPath, hashDir, distDir.replace('-all', '').replace('-bin', ''), 'bin', 'gradle.bat');
          if (fs.existsSync(possibleBin)) {
            gradleExec = possibleBin;
            break;
          }
        }
        if (gradleExec) break;
      }
    }

    if (gradleExec) {
      console.log(`   Gradle çalıştırıcısı bulundu: ${gradleExec}`);
      console.log("   APK derleme başlatılıyor (gradle assembleDebug)...");
      try {
        execSync(`"${gradleExec}" -p android assembleDebug`, { cwd: PROJECT_ROOT, stdio: 'inherit' });
        console.log("   [✓] APK derleme başarıyla tamamlandı.");

        // Oluşan APK'yı kopyala ve yeniden adlandır
        const srcApk = path.join(PROJECT_ROOT, 'android', 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
        const destApk = path.join(PROJECT_ROOT, `LGS_Kocluk_Debug_v${targetVersion}.apk`);

        if (fs.existsSync(srcApk)) {
          fs.copyFileSync(srcApk, destApk);
          console.log(`\n\x1b[32m   [✓] APK dosyası ana dizine kopyalandı:\x1b[0m\n       -> ${destApk}\n`);
        }
      } catch (err) {
        console.error("   [!] Gradle derlemesi sırasında hata oluştu. Lütfen manuel derleyin.", err.message);
      }
    } else {
      console.log("   [!] Sistemde Gradle kurulumu bulunamadı. APK derlenemedi.");
    }
  } else {
    console.log("   [!] Android SDK bulunamadı veya geçersiz SDK yolu tanımlı. APK derleme adımı atlandı.");
    console.log("   [!] Lütfen Android Studio kurulduktan sonra APK'yı manuel derleyin.");
  }

  // 6. Supabase Veritabanı Güncellemesi (OTA)
  console.log("\n5. Supabase app_settings tablosu güncelleniyor (Rest API)...");
  const apkUrl = `https://github.com/Siciho/LGS/releases/download/v${targetVersion}/LGS_Kocluk_Debug_v${targetVersion}.apk`;

  updateDatabase(targetVersion, changelogText, apkUrl);

} catch (e) {
  console.error("\n\x1b[31mİşlem sırasında beklenmeyen bir hata oluştu:\x1b[0m", e);
  process.exit(1);
}

// Supabase REST PATCH isteği
async function updateDatabase(version, changelog, url) {
  try {
    const patchUrl = `${SUPABASE_URL}/rest/v1/app_settings?id=eq.config`;
    const response = await fetch(patchUrl, {
      method: "PATCH",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify({
        latest_version: version,
        changelog: changelog,
        apk_url: url
      })
    });

    if (!response.ok) {
      throw new Error(`Database patch failed: ${response.status} - ${await response.text()}`);
    }

    console.log("\n\x1b[32m=== [✓] OTA Güncelleme Bilgisi Supabase Veritabanına Yazıldı ===\x1b[0m");
    console.log(`   Sürüm: ${version}`);
    console.log(`   Açıklama: ${changelog}`);
    console.log(`   APK URL: ${url}\n`);
    console.log("\x1b[35m[Önemli Hatırlatma]\x1b[0m Lütfen oluşan APK dosyasını GitHub üzerinde v" + version + " etiketiyle bir Release oluşturarak yükleyin.");
  } catch (err) {
    console.error("\x1b[31mVeritabanı güncellenirken hata oluştu:\x1b[0m", err.message);
  }
}
