import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../i18n';

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <div className="about-page__container">
        <Link to="/" className="about-page__back">
          <ArrowLeft size={16} /> {t.home}
        </Link>

        <h1 className="about-page__title">{t.aboutTitle}</h1>

        <div className="about-page__content">
          <p className="about-page__text">{t.aboutText}</p>

          <div className="about-page__section">
            <h2>{t.aboutJetiAta}</h2>
            <p>{t.aboutJetiAtaText}</p>
          </div>

          <div className="about-page__ornament">
            <svg viewBox="0 0 200 60" className="about-page__ornament-svg">
              <path
                d="M20 30 Q40 10 60 30 Q80 50 100 30 Q120 10 140 30 Q160 50 180 30"
                fill="none"
                stroke="var(--accent-gold)"
                strokeWidth="2"
                opacity="0.5"
              />
              <path
                d="M10 30 Q30 5 50 30 Q70 55 90 30 Q110 5 130 30 Q150 55 170 30 Q190 5 200 30"
                fill="none"
                stroke="var(--accent-gold)"
                strokeWidth="1"
                opacity="0.3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
