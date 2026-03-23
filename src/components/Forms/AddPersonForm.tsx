import { useState, useMemo, useRef } from 'react';
import { Upload } from 'lucide-react';
import { useFamilyStore } from '../../store/familyStore';
import { useTranslation } from '../../i18n';
import type { FamilyMember } from '../../types/family';

function flattenTree(node: FamilyMember): { id: string; nameKk: string; nameRu: string }[] {
  const list = [{ id: node.id, nameKk: node.nameKk, nameRu: node.nameRu }];
  if (node.children) {
    for (const child of node.children) {
      list.push(...flattenTree(child));
    }
  }
  return list;
}

interface AddPersonFormProps {
  onSuccess?: () => void;
}

export function AddPersonForm({ onSuccess }: AddPersonFormProps) {
  const { t, lang } = useTranslation();
  const familyData = useFamilyStore((s) => s.familyData);
  const addPerson = useFamilyStore((s) => s.addPerson);

  const [nameKk, setNameKk] = useState('');
  const [nameRu, setNameRu] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [parentId, setParentId] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allPeople = useMemo(() => flattenTree(familyData), [familyData]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameKk || !parentId || submitting) return;

    setSubmitting(true);
    try {
      await addPerson(parentId, {
        nameKk,
        nameRu: nameRu || nameKk,
        gender,
        description: description || undefined,
        photo: photo || undefined,
      });

      setNameKk('');
      setNameRu('');
      setGender('male');
      setParentId('');
      setDescription('');
      setPhoto(null);
      setPhotoPreview(null);
      onSuccess?.();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="add-form__photo-section">
        <div
          className="add-form__photo-preview"
          onClick={() => fileInputRef.current?.click()}
        >
          {photoPreview ? (
            <img src={photoPreview} alt="Preview" />
          ) : (
            <div className="add-form__photo-placeholder">
              <Upload size={24} />
              <span>{t.addPhoto}</span>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          style={{ display: 'none' }}
        />
      </div>

      <div className="add-form__field">
        <label>{t.nameKk} *</label>
        <input
          type="text"
          value={nameKk}
          onChange={(e) => setNameKk(e.target.value)}
          required
        />
      </div>

      <div className="add-form__field">
        <label>{t.nameRu}</label>
        <input
          type="text"
          value={nameRu}
          onChange={(e) => setNameRu(e.target.value)}
        />
      </div>

      <div className="add-form__field">
        <label>{t.gender}</label>
        <div className="add-form__radio-group">
          <label className="add-form__radio">
            <input
              type="radio"
              checked={gender === 'male'}
              onChange={() => setGender('male')}
            />
            {t.male}
          </label>
          <label className="add-form__radio">
            <input
              type="radio"
              checked={gender === 'female'}
              onChange={() => setGender('female')}
            />
            {t.female}
          </label>
        </div>
      </div>

      <div className="add-form__field">
        <label>{t.parent} *</label>
        <select
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          required
        >
          <option value="">{t.selectParent}</option>
          {allPeople.map((p) => (
            <option key={p.id} value={p.id}>
              {lang === 'kk' ? p.nameKk : p.nameRu}
            </option>
          ))}
        </select>
      </div>

      <div className="add-form__field">
        <label>{t.description}</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="add-form__actions">
        <button type="submit" className="add-form__submit" disabled={submitting}>
          {submitting ? '...' : t.submit}
        </button>
      </div>
    </form>
  );
}
