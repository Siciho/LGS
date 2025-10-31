// src/hooks/useActiveSubjects.ts

import { useMemo } from "react";
// --- DEĞİŞİKLİK: 'attachCurriculum' kaldırıldı, sadece 'filterActiveTopics'e ihtiyacımız var ---
import { filterActiveTopics } from "@/curriculum";

// subjects dizisini alır ve bugüne göre aktif konuları döner
export function useActiveSubjects(rawSubjects: any[] | undefined, onDate: Date = new Date()) {
  const activeSubjects = useMemo(() => {
    if (!rawSubjects || !Array.isArray(rawSubjects)) return [];
    
    // --- DEĞİŞİKLİK ---
    // 'attachCurriculum' fonksiyonunu çağırmayı bırakıyoruz.
    // 'rawSubjects' (ki 'topics' alanı string[] içerir) doğrudan 'filterActiveTopics'e gönderilir.
    // Güncellenmiş 'filterActiveTopics' (curriculum.ts içinde) string[] ile nasıl çalışacağını bilir.
    // const withTerm = attachCurriculum(rawSubjects); // <-- Bu satır kaldırıldı
    return filterActiveTopics(rawSubjects, onDate); // <-- 'withTerm' yerine 'rawSubjects' kullanıldı
  }, [rawSubjects, onDate]);

  return activeSubjects;
}