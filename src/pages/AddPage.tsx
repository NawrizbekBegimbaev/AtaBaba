import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { useTranslation } from '../i18n';
import { AddPersonForm } from '../components/Forms/AddPersonForm';

export function AddPage() {
  const { t } = useTranslation();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="add-page">
      <div className="add-page__container">
        <Link to="/" className="add-page__back">
          <ArrowLeft size={16} /> {t.home}
        </Link>

        <h1 className="add-page__title">{t.addPersonTitle}</h1>

        {showSuccess && (
          <div className="add-page__success">
            <Check size={16} /> {t.submit}!
          </div>
        )}

        <AddPersonForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
