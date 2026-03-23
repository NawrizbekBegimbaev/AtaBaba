import { useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Users, ArrowLeft, Camera } from 'lucide-react';
import { useFamilyStore } from '../store/familyStore';
import { useTranslation } from '../i18n';
import { BreadcrumbPath } from '../components/UI/BreadcrumbPath';
import { updateMemberPhoto } from '../api/client';
import type { FamilyMember } from '../types/family';

function findNode(node: FamilyMember, id: string): FamilyMember | null {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNode(child, id);
      if (found) return found;
    }
  }
  return null;
}

export function PersonPage() {
  const { id } = useParams<{ id: string }>();
  const { t, lang } = useTranslation();
  const familyData = useFamilyStore((s) => s.familyData);
  const loadFromApi = useFamilyStore((s) => s.loadFromApi);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const person = useMemo(() => {
    if (!id) return null;
    return findNode(familyData, id);
  }, [familyData, id]);

  if (!person) {
    return (
      <div className="person-page">
        <div className="person-page__not-found">
          <p>{t.noResults}</p>
          <Link to="/" className="person-page__back">
            <ArrowLeft size={16} /> {t.home}
          </Link>
        </div>
      </div>
    );
  }

  const name = lang === 'kk' ? person.nameKk : person.nameRu;
  const secondaryName = lang === 'kk' ? person.nameRu : person.nameKk;
  const description = lang === 'kk' ? person.description : person.descriptionRu;

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !person) return;
    try {
      await updateMemberPhoto(person.id, file);
      await loadFromApi();
    } catch {
      // silently fail
    }
  };

  return (
    <div className="person-page">
      <div className="person-page__container">
        <Link to="/" className="person-page__back">
          <ArrowLeft size={16} /> {t.home}
        </Link>

        <div className="person-page__breadcrumb">
          <BreadcrumbPath personId={person.id} />
        </div>

        <div className="person-page__card">
          <div
            className={`person-page__avatar ${person.gender === 'female' ? 'person-page__avatar--female' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            title={t.addPhoto}
          >
            {person.photo ? (
              <img src={person.photo} alt={name} className="person-page__avatar-img" />
            ) : (
              <User size={48} />
            )}
            <div className="person-page__avatar-overlay">
              <Camera size={18} />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
          </div>

          <h1 className="person-page__name">{name}</h1>
          <p className="person-page__secondary">{secondaryName}</p>

          <div className="person-page__details">
            <div className="person-page__detail">
              <span>
                {t.generation}: {person.generation}
              </span>
            </div>
          </div>

          {description && (
            <div className="person-page__description">
              <p>{description}</p>
            </div>
          )}

          {person.children && person.children.length > 0 && (
            <div className="person-page__children">
              <h3>
                <Users size={16} /> {t.children} ({person.children.length})
              </h3>
              <div className="person-page__children-list">
                {person.children.map((child) => (
                  <Link
                    key={child.id}
                    to={`/person/${child.id}`}
                    className="person-page__child-card"
                  >
                    {child.photo ? (
                      <img src={child.photo} alt="" className="person-page__child-photo" />
                    ) : (
                      <User size={16} />
                    )}
                    <span>{lang === 'kk' ? child.nameKk : child.nameRu}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
