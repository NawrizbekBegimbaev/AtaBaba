import { create } from 'zustand';
import type { FamilyMember, FamilyState, Language } from '../types/family';
import { DEMO_DATA } from '../data/demoData';
import { fetchTree, addMember as apiAddMember } from '../api/client';

function getAllIds(node: FamilyMember): string[] {
  const ids = [node.id];
  if (node.children) {
    for (const child of node.children) {
      ids.push(...getAllIds(child));
    }
  }
  return ids;
}

function findPathTo(node: FamilyMember, id: string, path: string[] = []): string[] | null {
  const currentPath = [...path, node.id];
  if (node.id === id) return currentPath;
  if (node.children) {
    for (const child of node.children) {
      const result = findPathTo(child, id, currentPath);
      if (result) return result;
    }
  }
  return null;
}

function addChildToNode(node: FamilyMember, parentId: string, child: FamilyMember): FamilyMember {
  if (node.id === parentId) {
    return {
      ...node,
      children: [...(node.children || []), child],
    };
  }
  if (node.children) {
    return {
      ...node,
      children: node.children.map((c) => addChildToNode(c, parentId, child)),
    };
  }
  return node;
}

function getInitialExpanded(node: FamilyMember, maxDepth = 3, depth = 1): string[] {
  const ids: string[] = [];
  if (depth <= maxDepth) {
    ids.push(node.id);
    if (node.children) {
      for (const child of node.children) {
        ids.push(...getInitialExpanded(child, maxDepth, depth + 1));
      }
    }
  }
  return ids;
}

export const useFamilyStore = create<FamilyState>((set, get) => ({
  familyData: DEMO_DATA,
  selectedPersonId: null,
  expandedNodes: new Set(getInitialExpanded(DEMO_DATA)),
  language: 'kk' as Language,
  searchQuery: '',
  highlightedPath: [],
  sidebarOpen: false,
  mobileMenuOpen: false,
  loading: false,

  loadFromApi: async () => {
    set({ loading: true });
    try {
      const data = await fetchTree();
      set({
        familyData: data,
        expandedNodes: new Set(getInitialExpanded(data)),
        loading: false,
      });
    } catch {
      // Fallback to demo data if API fails
      set({ loading: false });
    }
  },

  selectPerson: (id) => set({ selectedPersonId: id, sidebarOpen: id !== null }),

  toggleNode: (id) =>
    set((state) => {
      const next = new Set(state.expandedNodes);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return { expandedNodes: next };
    }),

  expandAll: () =>
    set((state) => ({
      expandedNodes: new Set(getAllIds(state.familyData)),
    })),

  collapseAll: () =>
    set((state) => ({
      expandedNodes: new Set([state.familyData.id]),
    })),

  addPerson: async (parentId, person) => {
    try {
      const newPerson = await apiAddMember(parentId, person);
      set((state) => {
        const expanded = new Set(state.expandedNodes);
        expanded.add(parentId);
        return {
          familyData: addChildToNode(state.familyData, parentId, newPerson),
          expandedNodes: expanded,
        };
      });
    } catch {
      // silently fail; the form will handle error display if needed
    }
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  highlightPathTo: (id) =>
    set((state) => {
      const path = findPathTo(state.familyData, id) || [];
      const expanded = new Set(state.expandedNodes);
      for (const nodeId of path) {
        expanded.add(nodeId);
      }
      return { highlightedPath: path, expandedNodes: expanded };
    }),

  clearHighlight: () => set({ highlightedPath: [] }),

  setLanguage: (lang) => set({ language: lang }),

  setSidebarOpen: (open) => set({ sidebarOpen: open, selectedPersonId: open ? get().selectedPersonId : null }),

  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));
