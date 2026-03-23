import { useMemo } from 'react';
import type { FamilyMember } from '../types/family';

export interface SearchResult {
  person: FamilyMember;
  path: string[];
}

function searchTree(
  node: FamilyMember,
  query: string,
  path: string[] = []
): SearchResult[] {
  const results: SearchResult[] = [];
  const currentPath = [...path, node.id];
  const q = query.toLowerCase();

  if (
    node.nameKk.toLowerCase().includes(q) ||
    node.nameRu.toLowerCase().includes(q)
  ) {
    results.push({ person: node, path: currentPath });
  }

  if (node.children) {
    for (const child of node.children) {
      results.push(...searchTree(child, query, currentPath));
    }
  }

  return results;
}

export function useSearch(data: FamilyMember, query: string): SearchResult[] {
  return useMemo(() => {
    if (!query || query.length < 2) return [];
    return searchTree(data, query);
  }, [data, query]);
}
