import { useState, useEffect, useRef } from 'react';
import { Search, X, Menu, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useFamilyStore } from '../../store/familyStore';
import { useTranslation } from '../../i18n';
import { useSearch } from '../../hooks/useSearch';
import { LanguageSwitcher } from './LanguageSwitcher';

function ThemeToggle() {
  const theme = useFamilyStore((s) => s.theme);
  const toggleTheme = useFamilyStore((s) => s.toggleTheme);

  return (
    <button className="theme-toggle" onClick={toggleTheme} title={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export function Header() {
  const { t, lang } = useTranslation();
  const familyData = useFamilyStore((s) => s.familyData);
  const setSearchQuery = useFamilyStore((s) => s.setSearchQuery);
  const selectPerson = useFamilyStore((s) => s.selectPerson);
  const highlightPathTo = useFamilyStore((s) => s.highlightPathTo);
  const mobileMenuOpen = useFamilyStore((s) => s.mobileMenuOpen);
  const setMobileMenuOpen = useFamilyStore((s) => s.setMobileMenuOpen);

  const [localQuery, setLocalQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const results = useSearch(familyData, localQuery);
  const location = useLocation();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [localQuery, setSearchQuery]);

  // Auto-close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, setMobileMenuOpen]);

  const handleSelect = (id: string) => {
    selectPerson(id);
    highlightPathTo(id);
    setShowResults(false);
    setLocalQuery('');
  };

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__logo">
          <span className="header__logo-icon">◆</span>
          <span className="header__logo-text">{t.siteName}</span>
        </Link>
        <span className="header__subtitle">{t.siteSubtitle}</span>
      </div>

      <div className="header__center">
        <div className="header__search">
          <Search size={16} className="header__search-icon" />
          <input
            type="text"
            value={localQuery}
            onChange={(e) => {
              setLocalQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            placeholder={t.searchPlaceholder}
            className="header__search-input"
          />
          {localQuery && (
            <button
              className="header__search-clear"
              onClick={() => {
                setLocalQuery('');
                setShowResults(false);
              }}
            >
              <X size={14} />
            </button>
          )}

          {showResults && results.length > 0 && (
            <div className="header__search-results">
              {results.map((r) => (
                <button
                  key={r.person.id}
                  className="header__search-result"
                  onClick={() => handleSelect(r.person.id)}
                >
                  <span className="header__search-result-name">
                    {lang === 'kk' ? r.person.nameKk : r.person.nameRu}
                  </span>
                  <span className="header__search-result-years">
                    {t.generation} {r.person.generation}
                  </span>
                </button>
              ))}
            </div>
          )}
          {showResults && localQuery.length >= 2 && results.length === 0 && (
            <div className="header__search-results">
              <div className="header__search-empty">{t.noResults}</div>
            </div>
          )}
        </div>
      </div>

      <button
        className="header__hamburger"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={t.menu}
      >
        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div className={`header__right ${mobileMenuOpen ? 'header__right--open' : ''}`}>
        <Link to="/about" className="header__nav-link">
          {t.about}
        </Link>
        <Link to="/add" className="header__nav-link header__nav-link--accent">
          + {t.addPerson}
        </Link>
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
}
