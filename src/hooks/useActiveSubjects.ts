import { useMemo } from "react";
import { attachCurriculum, filterActiveTopics } from "@/curriculum";

// subjects dizisini alır, dönem/tarih bilgisi ekler ve bugüne göre aktif konuları döner
export function useActiveSubjects(rawSubjects: any[] | undefined, onDate: Date = new Date()) {
  const activeSubjects = useMemo(() => {
    if (!rawSubjects || !Array.isArray(rawSubjects)) return [];
    const withTerm = attachCurriculum(rawSubjects);
    return filterActiveTopics(withTerm, onDate);
  }, [rawSubjects, onDate]);

  return activeSubjects;
}
