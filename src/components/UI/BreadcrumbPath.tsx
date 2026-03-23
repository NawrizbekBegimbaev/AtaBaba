import { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { useFamilyStore } from '../../store/familyStore';
import { useTranslation } from '../../i18n';
import type { FamilyMember } from '../../types/family';

function findPathTo(node: FamilyMember, id: string, path: FamilyMember[] = []): FamilyMember[] | null {
  const currentPath = [...path, node];
  if (node.id === id) return currentPath;
  if (node.children) {
    for (const child of node.children) {
      const result = findPathTo(child, id, currentPath);
      if (result) return result;
    }
  }
  return null;
}

interface BreadcrumbPathProps {
  personId: string;
}

export function BreadcrumbPath({ personId }: BreadcrumbPathProps) {
  const { lang } = useTranslation();
  const familyData = useFamilyStore((s) => s.familyData);
  const selectPerson = useFamilyStore((s) => s.selectPerson);

  const path = useMemo(() => findPathTo(familyData, personId) || [], [familyData, personId]);

  if (path.length === 0) return null;

  return (
    <div className="breadcrumb">
      {path.map((node, i) => (
        <span key={node.id} className="breadcrumb__item">
          {i > 0 && <ChevronRight size={12} className="breadcrumb__sep" />}
          <button
            className={`breadcrumb__link ${node.id === personId ? 'breadcrumb__link--active' : ''}`}
            onClick={() => selectPerson(node.id)}
          >
            {lang === 'kk' ? node.nameKk : node.nameRu}
          </button>
        </span>
      ))}
    </div>
  );
}
