export interface FamilyMember {
  id: string;
  nameKk: string;
  nameRu: string;
  gender: 'male' | 'female';
  photo?: string;
  description?: string;
  descriptionRu?: string;
  children?: FamilyMember[];
  generation: number;
}

export type Language = 'kk' | 'ru';
export type Theme = 'dark' | 'light';

export interface FamilyState {
  familyData: FamilyMember;
  selectedPersonId: string | null;
  expandedNodes: Set<string>;
  language: Language;
  searchQuery: string;
  highlightedPath: string[];
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  theme: Theme;
  loading: boolean;

  loadFromApi: () => Promise<void>;
  selectPerson: (id: string | null) => void;
  toggleNode: (id: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  addPerson: (parentId: string, person: {
    nameKk: string;
    nameRu: string;
    gender: 'male' | 'female';
    description?: string;
    photo?: File;
  }) => Promise<void>;
  deletePerson: (id: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  highlightPathTo: (id: string) => void;
  clearHighlight: () => void;
  setLanguage: (lang: Language) => void;
  setSidebarOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleTheme: () => void;
}
