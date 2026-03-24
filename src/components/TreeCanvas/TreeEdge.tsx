import type { TreeLink } from '../../hooks/useTree';

interface TreeEdgeProps {
  link: TreeLink;
  highlighted: boolean;
}

export function TreeEdge({ link, highlighted }: TreeEdgeProps) {
  const { source, target } = link;
  const midY = (source.y + target.y) / 2;

  // Orthogonal (L-shaped) line: down from parent, horizontal, down to child
  const d = `M ${source.x} ${source.y}
    L ${source.x} ${midY}
    L ${target.x} ${midY}
    L ${target.x} ${target.y}`;

  return (
    <path
      d={d}
      fill="none"
      stroke={highlighted ? 'var(--accent-gold-light)' : 'var(--node-line)'}
      strokeWidth={highlighted ? 2.5 : 1.5}
      strokeOpacity={highlighted ? 1 : 0.5}
      className="tree-edge"
    />
  );
}
