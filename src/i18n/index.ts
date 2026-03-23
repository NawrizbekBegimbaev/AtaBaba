import { kk } from './kk';
import { ru } from './ru';
import { useFamilyStore } from '../store/familyStore';
import type { Language } from '../types/family';

const translations: Record<Language, typeof kk> = { kk, ru };

export function useTranslation() {
  const language = useFamilyStore((s) => s.language);
  return {
    t: translations[language],
    lang: language,
  };
}
