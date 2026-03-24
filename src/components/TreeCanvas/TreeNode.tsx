import { useRef, useCallback } from 'react';
import { ChevronDown, ChevronRight, User } from 'lucide-react';
import type { FamilyMember } from '../../types/family';
import { getNodeWidth, getNodeHeight } from '../../hooks/useTree';
import { useFamilyStore } from '../../store/familyStore';
import { useTranslation } from '../../i18n';

interface TreeNodeProps {
  node: {
    x: number;
    y: number;
    data: FamilyMember;
    children?: unknown[];
  };
  isSelected: boolean;
  isHighlighted: boolean;
  hasChildren: boolean;
  isExpanded: boolean;
  compact?: boolean;
}

export function TreeNode({ node, isSelected, isHighlighted, hasChildren, isExpanded, compact = false }: TreeNodeProps) {
  const { data } = node;
  const width = getNodeWidth(data.generation, compact);
  const height = getNodeHeight(data.generation, compact);
  const selectPerson = useFamilyStore((s) => s.selectPerson);
  const toggleNode = useFamilyStore((s) => s.toggleNode);
  const { lang } = useTranslation();

  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPress = useRef(false);
  const pressStart = useRef<number>(0);

  const startPress = useCallback(() => {
    didLongPress.current = false;
    pressStart.current = Date.now();
    longPressTimer.current = setTimeout(() => {
      didLongPress.current = true;
      selectPerson(data.id);
    }, 1000);
  }, [data.id, selectPerson]);

  const endPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const name = lang === 'kk' ? data.nameKk : data.nameRu;
  const secondaryName = lang === 'kk' ? data.nameRu : data.nameKk;

  const isRoot = data.generation === 1;
  const isFemale = data.gender === 'female';

  const fontSize = compact
    ? (isRoot ? 12 : data.generation <= 3 ? 11 : 10)
    : (isRoot ? 15 : data.generation <= 3 ? 13 : 12);
  const secondaryFontSize = compact ? (isRoot ? 9 : 8) : (isRoot ? 11 : 10);
  const photoSize = height - 2;
  const expandRadius = compact ? 12 : 16;

  return (
    <g transform={`translate(${node.x}, ${node.y})`}>
      <foreignObject
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        style={{ overflow: 'visible' }}
      >
        <div
          className={`tree-node ${isSelected ? 'tree-node--selected' : ''} ${isHighlighted ? 'tree-node--highlighted' : ''} ${isFemale ? 'tree-node--female' : ''}`}
          style={{
            width,
            height,
            borderRadius: isRoot ? 10 : 8,
            cursor: 'pointer',
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            startPress();
          }}
          onPointerUp={(e) => {
            e.stopPropagation();
            endPress();
          }}
          onPointerLeave={endPress}
          onPointerCancel={endPress}
          onClick={(e) => {
            e.stopPropagation();
            if (didLongPress.current) {
              didLongPress.current = false;
              return;
            }
            if (hasChildren) {
              toggleNode(data.id);
            }
          }}
        >
          <div className="tree-node__card">
            <div className="tree-node__photo-side" style={{ width: photoSize, height: photoSize }}>
              {data.photo ? (
                <img
                  src={data.photo}
                  alt={name}
                  className="tree-node__photo-img"
                />
              ) : (
                <div className={`tree-node__photo-placeholder ${isFemale ? 'tree-node__photo-placeholder--female' : ''}`}>
                  <User size={photoSize * 0.4} />
                </div>
              )}
            </div>
            <div className="tree-node__info">
              <div className="tree-node__name" style={{ fontSize }}>
                {name}
              </div>
              {!compact && (
                <div className="tree-node__secondary" style={{ fontSize: secondaryFontSize }}>
                  {secondaryName}
                </div>
              )}
            </div>
          </div>
        </div>
      </foreignObject>

      {hasChildren && (
        <g
          transform={`translate(0, ${height / 2 + 6})`}
          onClick={(e) => {
            e.stopPropagation();
            toggleNode(data.id);
          }}
          style={{ cursor: 'pointer' }}
        >
          <circle r={expandRadius} fill="var(--bg-card)" stroke="var(--accent-gold)" strokeWidth={1.5} />
          <foreignObject x={-8} y={-8} width={16} height={16}>
            {isExpanded ? (
              <ChevronDown size={16} color="var(--accent-gold)" />
            ) : (
              <ChevronRight size={16} color="var(--accent-gold)" />
            )}
          </foreignObject>
        </g>
      )}
    </g>
  );
}
