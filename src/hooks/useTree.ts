import { useMemo } from 'react';
import * as d3 from 'd3';
import type { FamilyMember } from '../types/family';

export interface TreeNode {
  x: number;
  y: number;
  data: FamilyMember;
  parent: TreeNode | null;
  children?: TreeNode[];
  depth: number;
}

export interface TreeLink {
  source: { x: number; y: number };
  target: { x: number; y: number };
}

function filterTree(node: FamilyMember, expandedNodes: Set<string>): FamilyMember {
  if (!expandedNodes.has(node.id) || !node.children) {
    return { ...node, children: undefined };
  }
  return {
    ...node,
    children: node.children.map((child) => filterTree(child, expandedNodes)),
  };
}

export function getNodeWidth(generation: number, compact = false): number {
  if (compact) {
    if (generation <= 1) return 200;
    if (generation <= 2) return 185;
    if (generation <= 3) return 175;
    if (generation <= 4) return 165;
    if (generation <= 5) return 160;
    if (generation <= 6) return 155;
    return 150;
  }
  if (generation <= 1) return 260;
  if (generation <= 2) return 240;
  if (generation <= 3) return 220;
  if (generation <= 4) return 210;
  if (generation <= 5) return 200;
  if (generation <= 6) return 190;
  return 180;
}

export function getNodeHeight(generation: number, compact = false): number {
  if (compact) {
    if (generation <= 1) return 68;
    if (generation <= 2) return 62;
    if (generation <= 3) return 58;
    if (generation <= 4) return 54;
    if (generation <= 5) return 52;
    if (generation <= 6) return 50;
    return 48;
  }
  if (generation <= 1) return 90;
  if (generation <= 2) return 82;
  if (generation <= 3) return 76;
  if (generation <= 4) return 72;
  if (generation <= 5) return 68;
  if (generation <= 6) return 64;
  return 62;
}

export function useTree(data: FamilyMember, expandedNodes: Set<string>, compact = false) {
  return useMemo(() => {
    const filteredData = filterTree(data, expandedNodes);

    const root = d3.hierarchy(filteredData);

    const nodeSpacing = compact ? [180, 180] : [250, 250];
    const treeLayout = d3
      .tree<FamilyMember>()
      .nodeSize(nodeSpacing as [number, number])
      .separation((a, b) => (a.parent === b.parent ? 1.2 : 2));

    treeLayout(root);

    const nodes: TreeNode[] = root.descendants().map((d) => ({
      x: d.x!,
      y: d.y!,
      data: d.data,
      parent: d.parent
        ? { x: d.parent.x!, y: d.parent.y!, data: d.parent.data, parent: null, depth: d.parent.depth }
        : null,
      children: d.children as unknown as TreeNode[],
      depth: d.depth,
    }));

    const links: TreeLink[] = root.links().map((l) => {
      const sourceH = getNodeHeight(l.source.data.generation, compact);
      const targetH = getNodeHeight(l.target.data.generation, compact);
      // expand button: center at height/2 + 6, radius 16 (desktop) / 12 (mobile)
      const expandR = compact ? 12 : 16;
      const sourceBottom = sourceH / 2 + 6 + expandR;
      return {
        source: { x: l.source.x!, y: l.source.y! + sourceBottom },
        target: { x: l.target.x!, y: l.target.y! - targetH / 2 },
      };
    });

    return { nodes, links };
  }, [data, expandedNodes, compact]);
}
