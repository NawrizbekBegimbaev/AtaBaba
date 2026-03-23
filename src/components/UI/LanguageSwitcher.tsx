import { useFamilyStore } from '../../store/familyStore';

export function LanguageSwitcher() {
  const language = useFamilyStore((s) => s.language);
  const setLanguage = useFamilyStore((s) => s.setLanguage);

  return (
    <div className="lang-switcher">
      <button
        className={`lang-switcher__btn ${language === 'kk' ? 'lang-switcher__btn--active' : ''}`}
        onClick={() => setLanguage('kk')}
      >
        QQ
      </button>
      <button
        className={`lang-switcher__btn ${language === 'ru' ? 'lang-switcher__btn--active' : ''}`}
        onClick={() => setLanguage('ru')}
      >
        RU
      </button>
    </div>
  );
}
