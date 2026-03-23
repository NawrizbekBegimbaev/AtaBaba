import { useMemo } from 'react';
import { useFamilyStore } from '../../store/familyStore';
import { useTranslation } from '../../i18n';
import type { FamilyMember } from '../../types/family';

function countAll(node: FamilyMember): number {
  let count = 1;
  if (node.children) {
    for (const child of node.children) {
      count += countAll(child);
    }
  }
  return count;
}

function maxGeneration(node: FamilyMember): number {
  let max = node.generation;
  if (node.children) {
    for (const child of node.children) {
      max = Math.max(max, maxGeneration(child));
    }
  }
  return max;
}

export function StatsBar() {
  const { t } = useTranslation();
  const familyData = useFamilyStore((s) => s.familyData);

  const totalPeople = useMemo(() => countAll(familyData), [familyData]);
  const generations = useMemo(() => maxGeneration(familyData), [familyData]);

  return (
    <div className="stats-bar">
      <span className="stats-bar__item">
        {t.totalPeople}: <strong>{totalPeople}</strong>
      </span>
      <span className="stats-bar__divider">|</span>
      <span className="stats-bar__item">
        {t.generations}: <strong>{generations}</strong>
      </span>
    </div>
  );
}
