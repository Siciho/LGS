// src/curriculum.ts

// Akademik takvim tarihleri (TR) - Bunlar genel çerçeve için kalabilir.
export const SCHOOL_START_DATE = new Date("2025-09-08");
export const TERM_1_END = new Date("2026-01-23");
export const TERM_2_START = new Date("2026-02-09");
export const SCHOOL_END_DATE = new Date("2026-06-12"); // Tahmini bitiş

// --- YENİ YAPI: Konuların açılma tarihleri (YYYY-MM-DD) ---
// Not: Bu tarihler MEB örnek soruları ve genel müfredat akışına göre
// mantıklı varsayımlardır. Kesin tarihler okuldan okula değişebilir.

const MAT_TOPIC_DATES = new Map<string, string>([
  // Eylül (Okul Başlangıcı)
  ["Çarpanlar ve Katlar", "2025-09-08"],
  // Ekim
  ["Üslü İfadeler", "2025-10-06"],
  ["Kareköklü İfadeler", "2025-10-20"],
  // Kasım
  ["Veri Analizi", "2025-11-10"],
  ["Basit Olayların Olma Olasılığı", "2025-11-24"], // 'Olasılık' yerine subjects.ts'deki isim
  // Aralık
  ["Cebirsel İfadeler ve Özdeşlikler", "2025-12-08"], // 'Cebirsel İfadeler' yerine subjects.ts'deki isim
  // Ocak
  // (1. Dönem sonu tekrarı veya hafif konular varsayılır)
  // Şubat (2. Dönem Başlangıcı)
  ["Doğrusal Denklemler", "2026-02-09"],
  ["Eşitsizlikler", "2026-02-23"], // subjects.ts'de 'Basit Eşitsizlikler'
  // Mart
  ["Üçgenler", "2026-03-09"],
  ["Eşlik ve Benzerlik", "2026-03-23"], // subjects.ts'de yok, Üçgenler içinde varsayılır
  // Nisan
  ["Dönüşüm Geometrisi", "2026-04-06"],
  // Mayıs
  ["Geometrik Cisimler", "2026-05-04"],
]);

const SCI_TOPIC_DATES = new Map<string, string>([
  // Eylül
  ["Mevsimler ve İklimler", "2025-09-08"], // subjects.ts'de 'Mevsimler ve İklimler'
  // Ekim
  ["DNA ve Genetik Kod", "2025-10-06"], // subjects.ts'de 'DNA ve Genetik Kod'
  // Kasım
  ["Basınç", "2025-11-03"], // subjects.ts'de 'Basınç'
  // Aralık
  ["Madde ve Endüstri", "2025-12-01"], // subjects.ts'de 'Madde ve Endüstri'
  // Ocak
  ["Periyodik Sistem", "2026-01-05"],
  ["Fiziksel ve Kimyasal Değişimler", "2026-01-12"],
  ["Asitler ve Bazlar", "2026-01-19"],
  // Şubat
  ["Basit Makineler", "2026-02-09"],
  // Mart
  ["Canlılar ve Enerji İlişkileri", "2026-03-02"], // subjects.ts'de 'Canlılar ve Enerji İlişkileri'
  // Nisan
  ["Enerji Dönüşümleri ve Çevre Bilimi", "2026-04-06"],
  // Mayıs
  ["Elektrik Yükleri ve Elektrik Enerjisi", "2026-05-04"],
]);

const TRK_TOPIC_DATES = new Map<string, string>([
  // Eylül (Dil bilgisi ve Anlam iç içe gider)
  ["Sözcükte Anlam", "2025-09-08"],
  ["Cümlede Anlam", "2025-09-15"],
  ["Okuma Anlama", "2025-09-08"], // subjects.ts'den
  ["Fiilimsiler", "2025-09-22"], // Genellikle ilk konulardan
  // Ekim
  ["Paragrafta Anlam", "2025-10-06"],
  ["Cümlenin Öğeleri", "2025-10-20"], // subjects.ts'de 'Cümle Ögeleri'
  // Kasım
  ["Yazım Kuralları", "2025-11-17"],
  ["Sözcük Türleri", "2025-11-24"],
  // Aralık
  ["Noktalama İşaretleri", "2025-12-01"],
  ["Ses Bilgisi", "2025-12-15"],
  // Ocak
  // (Tekrar)
  // Şubat
  ["Cümle Türleri", "2026-02-09"],
  ["Fiilde Çatı", "2026-02-23"],
  // Mart
  ["Fiilde Kip", "2026-03-16"],
  ["Fiilde Zaman", "2026-03-23"],
  // Diğer konular (Deyimler, Söz Sanatları vb.) Anlam konuları içinde varsayılır
]);

const ENG_TOPIC_DATES = new Map<string, string>([
  ["Friendship", "2025-09-08"], // Ünite 1
  ["Teen Life", "2025-10-06"],  // Ünite 2
  ["In the Kitchen", "2025-11-03"], // Ünite 3
  ["On the Phone", "2025-12-01"], // Ünite 4
  ["The Internet", "2026-01-05"],  // Ünite 5
  ["Adventures", "2026-02-09"],   // Ünite 6
  ["Tourism", "2026-03-02"],     // Ünite 7
  ["Chores", "2026-03-30"],      // Ünite 8
  ["Science", "2026-04-20"],      // Ünite 9
  ["Natural Forces", "2026-05-11"], // Ünite 10
]);

const REV_TOPIC_DATES = new Map<string, string>([
  // Eylül
  ["Bir Kahraman Doğuyor", "2025-09-08"],
  // Ekim-Kasım
  ["Milli Uyanış: Bağımsızlık Yolunda Atılan Adımlar", "2025-10-13"], // Amasya, Erzurum, Sivas
  // Aralık-Ocak
  ["Milli Bir Destan; Ya İstiklal Ya Ölüm", "2025-12-08"], // Cepheler
  // Şubat
  ["Atatürkçülük", "2026-02-09"], // subjects.ts'deki 'Atatürkçülük'
  ["Çağdaş Türkiye Yolunda Adımlar", "2026-02-16"], // subjects.ts'deki 'Çağdaş Türkiye Yolunda Adımlar'
  // Mart
  ["Demokratikleşme Çabaları", "2026-03-09"],
  // Nisan
  ["Atatürk Dönemi Türk Dış Politikası ve Atatürk’ün Ölümü", "2026-04-06"],
  // Mayıs
  ["İkinci Dünya Savaşı Ve Sonrası", "2026-05-04"],
]);

const REL_TOPIC_DATES = new Map<string, string>([
  // Eylül
  ["KADER İNANCI", "2025-09-08"],
  // Ekim/Kasım
  ["ZEKÂT VE SADAKA", "2025-10-13"],
  // Aralık/Ocak
  ["DİN VE HAYAT", "2025-12-01"],
  // Şubat/Mart
  ["HZ. MUHAMMED VE ÖRNEKLİĞİ", "2026-02-16"],
  // Nisan/Mayıs
  ["KUR’AN-I KERİM VE ÖZELLİKLERİ", "2026-04-13"],
]);

// Tüm derslerin Map'lerini tek bir yerde toplayalım
const ALL_TOPIC_DATES = {
  math: MAT_TOPIC_DATES,
  science: SCI_TOPIC_DATES,
  turkish: TRK_TOPIC_DATES,
  english: ENG_TOPIC_DATES,
  revolution: REV_TOPIC_DATES,
  religion: REL_TOPIC_DATES,
};

// --- GÜNCELLENEN FONKSİYONLAR ---

// Konu başlığını normalize et
const normalizeTopic = (topic: string): string => {
  if (!topic) return "";
  return topic.trim();
};

// Hangi dersteki hangi başlığın "açılma tarihini" (YYYY-MM-DD) verir?
export function getAvailableFromISO(subjectName: string, topicTitle: string): string | null {
  const normalizedTopic = normalizeTopic(topicTitle);
  if (!normalizedTopic) return null; // Boş konu başlığını doğrudan reddet

  let subjectMap: Map<string, string> | undefined;

  // Ders ismine göre doğru Map'i bul
  const lowerSubjectName = subjectName.toLowerCase();
  if (lowerSubjectName.includes("matematik")) subjectMap = ALL_TOPIC_DATES.math;
  else if (lowerSubjectName.includes("fen")) subjectMap = ALL_TOPIC_DATES.science;
  else if (lowerSubjectName.includes("türkçe")) subjectMap = ALL_TOPIC_DATES.turkish;
  else if (lowerSubjectName.includes("ingilizce")) subjectMap = ALL_TOPIC_DATES.english;
  else if (lowerSubjectName.includes("inkılap") || lowerSubjectName.includes("inkilap")) subjectMap = ALL_TOPIC_DATES.revolution;
  else if (lowerSubjectName.includes("din kültürü")) subjectMap = ALL_TOPIC_DATES.religion;

  if (subjectMap) {
    // Önce normalize edilmiş başlıkla tam eşleşme ara
    if (subjectMap.has(normalizedTopic)) {
      return subjectMap.get(normalizedTopic)!;
    }
    // Eşleşme yoksa, subjects.ts'deki bazı birleşik konuları ara
    // (Örn: 'Madde ve Endüstri / Madde ve Doğası' gibi)
    for (const [key, value] of subjectMap.entries()) {
      if (key.includes(normalizedTopic)) {
        return value;
      }
    }
  }

  // Eğer konu Map içinde bulunamazsa, varsayılan olarak okulun başlangıç tarihini döndür
  console.warn(`Uyarı: "${subjectName}" dersi için "${topicTitle}" konusu müfredat tarihlerinde bulunamadı. Okul başlangıç tarihi varsayılıyor.`);
  return SCHOOL_START_DATE.toISOString().slice(0, 10);
}

// Belirtilen tarihe göre bu başlık aktif mi?
export function isTopicActive(subjectName: string, topicTitle: string, onDate: Date = new Date()): boolean {
  const availableFromISO = getAvailableFromISO(subjectName, topicTitle);

  if (!availableFromISO) {
    // Eğer konu için bir tarih bulunamadıysa (boş "" metni gibi)
    // konuyu aktif sayma.
    return false;
  }

  // Konunun açılma tarihini Date objesine çevir (saat farkı sorununu önlemek için UTC varsayalım)
  const availableDate = new Date(availableFromISO + 'T00:00:00Z');

  // Karşılaştırılacak tarihi de günün başlangıcına ayarla
  const checkDate = new Date(onDate);
  checkDate.setUTCHours(0, 0, 0, 0);


  // Eğer kontrol tarihi, konunun açılma tarihinden büyük veya eşitse, konu aktiftir.
  return checkDate >= availableDate;
}

// --- BU FONKSİYONLAR HATA İÇİN DÜZELTİLDİ ---

// subjects dizisini alır, topic'lere availableFrom alanını ekler
export function attachCurriculum(subjects: Array<any>) {
  return subjects.map((subj) => ({
    ...subj,
    topics: Array.isArray(subj.topics)
      ? subj.topics.map((t: any) => {
          // --- HATA DÜZELTMESİ ---
          // t bir nesne değil, bir string. Doğrudan t'yi kullan.
          const topicTitle = t ?? ""; // t.title ?? t.name ?? ""; YERİNE
          const subjectName = subj.name ?? subj.title ?? "";
          
          // --- YENİ YAPI ---
          // Konu başlığı artık bir nesne değil, string'in kendisi.
          // Orijinal 'topics' dizisi string[] olduğu için yeni bir nesne döndürmemiz GEREKMEZ.
          // Ancak 'useActiveSubjects' hook'u 'topics' dizisini filtreleyeceği için,
          // burada sadece string'leri döndürmek yeterlidir.
          // Eğer 'SubjectCard' gibi yerlerin 'topic.title' gibi bir şeye ihtiyacı varsa,
          // 'subjects.ts' dosyasının yapısını değiştirmek gerekir.
          // Şimdilik 'subjects.ts'nin string[] olduğunu varsayarak devam ediyoruz.
          // 'attachCurriculum' fonksiyonu 'filterActiveTopics' tarafından kullanılmak üzere
          // string[] döndürmeli veya 'filterActiveTopics'i de değiştirmeliyiz.
          
          // 'filterActiveTopics'in beklentisine (string) uyum sağlayalım.
          // 'attachCurriculum' fonksiyonu aslında 'useActiveSubjects' hook'u içinde
          // 'filterActiveTopics'ten önce çağrılıyor.
          // 'filterActiveTopics'in 't'yi (string) kullanması için onu düzeltmek en iyisi.
          
          // attachCurriculum'u 'filterActiveTopics'in beklentisine göre düzeltelim:
          // 'subjects' içindeki 'topics' string[] dizisini değiştirmeyelim,
          // 'attachCurriculum' fonksiyonu sadece tarih eklemesi YAPIYORMUŞ GİBİ görünmeli
          // ama 'filterActiveTopics' asıl işi yapmalı.
          
          // Orijinal 'attachCurriculum' fonksiyonunun mantığına geri dönelim
          // ve 'topicTitle'ı doğru okuyalım.
          return {
            title: topicTitle, // 't' string'ini 'title' alanına koyalım
            name: topicTitle,  // ve 'name' alanına
            originalString: t, // orijinal string'i de tutalım (isteğe bağlı)
            availableFrom: getAvailableFromISO(subjectName, topicTitle),
          };
        })
      : subj.topics,
  }));
}

// Sadece aktif konuları filtrelemek için yardımcı:
export function filterActiveTopics(subjects: Array<any>, onDate: Date = new Date()) {
  return subjects.map((subj) => {
    const subjectName = subj.name ?? subj.title ?? "";
    return {
      ...subj,
      topics: Array.isArray(subj.topics)
        ? subj.topics.filter((t: any) => {
            // --- HATA DÜZELTMESİ ---
            // t bir nesne değil, bir string. Doğrudan t'yi kullan.
            const topicTitle = t ?? ""; // t.title ?? t.name ?? ""; YERİNE
            return isTopicActive(subjectName, topicTitle, onDate);
          })
        : subj.topics,
    };
  });
}