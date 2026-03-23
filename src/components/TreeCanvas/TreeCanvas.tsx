import { useRef, useState, useEffect } from 'react';
import { useFamilyStore } from '../../store/familyStore';
import { useTree } from '../../hooks/useTree';
import { useZoom } from '../../hooks/useZoom';
import { TreeNode } from './TreeNode';
import { TreeEdge } from './TreeEdge';
import { TreeControls } from './TreeControls';
import type { FamilyMember } from '../../types/family';

function hasOriginalChildren(data: FamilyMember, id: string): boolean {
  if (data.id === id) return !!(data.children && data.children.length > 0);
  if (data.children) {
    for (const child of data.children) {
      const result = hasOriginalChildren(child, id);
      if (result) return true;
    }
  }
  return false;
}

export function TreeCanvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  const familyData = useFamilyStore((s) => s.familyData);
  const expandedNodes = useFamilyStore((s) => s.expandedNodes);
  const selectedPersonId = useFamilyStore((s) => s.selectedPersonId);
  const highlightedPath = useFamilyStore((s) => s.highlightedPath);
  const expandAll = useFamilyStore((s) => s.expandAll);
  const collapseAll = useFamilyStore((s) => s.collapseAll);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { nodes, links } = useTree(familyData, expandedNodes, isMobile);
  const { zoomIn, zoomOut, resetView } = useZoom(svgRef);

  const highlightSet = new Set(highlightedPath);

  return (
    <div className="tree-canvas-wrapper">
      <svg ref={svgRef} className="tree-canvas">
        <g className="tree-container">
          {links.map((link, i) => {
            const sourceId = nodes.find(
              (n) => n.x === link.source.x && n.y === link.source.y
            )?.data.id;
            const targetId = nodes.find(
              (n) => n.x === link.target.x && n.y === link.target.y
            )?.data.id;
            const highlighted = !!(sourceId && targetId && highlightSet.has(sourceId) && highlightSet.has(targetId));
            return <TreeEdge key={i} link={link} highlighted={highlighted} />;
          })}

          {nodes.map((node) => (
            <TreeNode
              key={node.data.id}
              node={node}
              isSelected={selectedPersonId === node.data.id}
              isHighlighted={highlightSet.has(node.data.id)}
              hasChildren={hasOriginalChildren(familyData, node.data.id)}
              isExpanded={expandedNodes.has(node.data.id)}
              compact={isMobile}
            />
          ))}
        </g>
      </svg>

      <TreeControls
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onResetView={resetView}
        onExpandAll={expandAll}
        onCollapseAll={collapseAll}
      />
    </div>
  );
}
