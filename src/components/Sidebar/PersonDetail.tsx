import { useMemo, useRef } from 'react';
import { X, User, Users, ExternalLink, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFamilyStore } from '../../store/familyStore';
import { useTranslation } from '../../i18n';
import { BreadcrumbPath } from '../UI/BreadcrumbPath';
import { updateMemberPhoto } from '../../api/client';
import type { FamilyMember } from '../../types/family';

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

export function PersonDetail() {
  const { t, lang } = useTranslation();
  const familyData = useFamilyStore((s) => s.familyData);
  const selectedPersonId = useFamilyStore((s) => s.selectedPersonId);
  const sidebarOpen = useFamilyStore((s) => s.sidebarOpen);
  const setSidebarOpen = useFamilyStore((s) => s.setSidebarOpen);
  const highlightPathTo = useFamilyStore((s) => s.highlightPathTo);
  const clearHighlight = useFamilyStore((s) => s.clearHighlight);
  const loadFromApi = useFamilyStore((s) => s.loadFromApi);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const person = useMemo(() => {
    if (!selectedPersonId) return null;
    return findNode(familyData, selectedPersonId);
  }, [familyData, selectedPersonId]);

  if (!sidebarOpen || !person) return null;

  const name = lang === 'kk' ? person.nameKk : person.nameRu;
  const secondaryName = lang === 'kk' ? person.nameRu : person.nameKk;
  const description = lang === 'kk' ? person.description : person.descriptionRu;
  const childCount = person.children?.length || 0;

  const handleClose = () => {
    setSidebarOpen(false);
    clearHighlight();
  };

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
    <div className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar__header">
        <h2 className="sidebar__title">{t.personDetail}</h2>
        <button className="sidebar__close" onClick={handleClose}>
          <X size={20} />
        </button>
      </div>

      <div className="sidebar__content">
        <div className="sidebar__person-header">
          <div
            className={`sidebar__avatar ${person.gender === 'female' ? 'sidebar__avatar--female' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            title={t.addPhoto}
          >
            {person.photo ? (
              <img src={person.photo} alt={name} className="sidebar__avatar-img" />
            ) : (
              <User size={32} />
            )}
            <div className="sidebar__avatar-overlay">
              <Camera size={14} />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
          </div>
          <div>
            <h3 className="sidebar__person-name">{name}</h3>
            <p className="sidebar__person-secondary">{secondaryName}</p>
          </div>
        </div>

        <div className="sidebar__breadcrumb">
          <BreadcrumbPath personId={person.id} />
        </div>

        <div className="sidebar__details">
          <div className="sidebar__detail">
            <span>
              {t.generation}: {person.generation}
            </span>
          </div>
          <div className="sidebar__detail">
            <Users size={14} />
            <span>
              {t.children}: {childCount > 0 ? childCount : t.noChildren}
            </span>
          </div>
        </div>

        {description && (
          <div className="sidebar__description">
            <p>{description}</p>
          </div>
        )}

        <div className="sidebar__actions">
          <button
            className="sidebar__action-btn"
            onClick={() => highlightPathTo(person.id)}
          >
            {t.breadcrumb}
          </button>
          <Link
            to={`/person/${person.id}`}
            className="sidebar__action-btn sidebar__action-btn--primary"
          >
            <ExternalLink size={14} />
            {t.viewProfile}
          </Link>
        </div>
      </div>
    </div>
  );
}
