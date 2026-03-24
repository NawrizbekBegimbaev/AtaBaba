import { useMemo, useRef, useState } from 'react';
import { X, User, Users, ExternalLink, Camera, Trash2, Pencil, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFamilyStore } from '../../store/familyStore';
import { useTranslation } from '../../i18n';
import { BreadcrumbPath } from '../UI/BreadcrumbPath';
import { updateMemberPhoto, updateMemberName } from '../../api/client';
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
  const deletePerson = useFamilyStore((s) => s.deletePerson);
  const loadFromApi = useFamilyStore((s) => s.loadFromApi);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');

  const person = useMemo(() => {
    if (!selectedPersonId) return null;
    return findNode(familyData, selectedPersonId);
  }, [familyData, selectedPersonId]);

  // Reset edit state when switching person
  const prevIdRef = useRef(selectedPersonId);
  if (prevIdRef.current !== selectedPersonId) {
    prevIdRef.current = selectedPersonId;
    if (editing) {
      setEditing(false);
      setEditName('');
    }
  }

  if (!sidebarOpen || !person) return null;

  const name = lang === 'kk' ? person.nameKk : person.nameRu;
  const secondaryName = lang === 'kk' ? person.nameRu : person.nameKk;
  const description = lang === 'kk' ? person.description : person.descriptionRu;
  const childCount = person.children?.length || 0;

  const handleClose = () => {
    setSidebarOpen(false);
    clearHighlight();
  };

  const handleEdit = () => {
    setEditName(person.nameKk);
    setEditing(true);
  };

  const handleSave = async () => {
    if (!editName.trim()) return;
    try {
      await updateMemberName(person.id, editName.trim());
      await loadFromApi();
      setEditing(false);
    } catch {
      // silently fail
    }
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
          <div style={{ flex: 1 }}>
            {editing ? (
              <div className="sidebar__edit-row">
                <input
                  className="sidebar__edit-input"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  autoFocus
                />
                <button className="sidebar__edit-save" onClick={handleSave}>
                  <Check size={16} />
                </button>
                <button className="sidebar__edit-cancel" onClick={() => setEditing(false)}>
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="sidebar__edit-row">
                <h3 className="sidebar__person-name">{name}</h3>
                <button className="sidebar__edit-btn" onClick={handleEdit}>
                  <Pencil size={14} />
                </button>
              </div>
            )}
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

        <button
          className="sidebar__action-btn sidebar__action-btn--delete"
          onClick={() => {
            if (confirm(`${name} — өшіру?`)) {
              deletePerson(person.id);
            }
          }}
        >
          <Trash2 size={14} />
          Өшіру
        </button>
      </div>
    </div>
  );
}
