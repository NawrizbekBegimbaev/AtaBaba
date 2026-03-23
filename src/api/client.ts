import type { FamilyMember } from '../types/family';

const API_BASE = '/api';

interface ApiMember {
  id: number;
  name_kk: string;
  name_ru: string;
  gender: 'male' | 'female';
  photo: string | null;
  description: string;
  description_ru: string;
  generation: number;
  children?: ApiMember[];
  parent?: number | null;
}

function transformMember(m: ApiMember): FamilyMember {
  return {
    id: String(m.id),
    nameKk: m.name_kk,
    nameRu: m.name_ru,
    gender: m.gender,
    photo: m.photo ?? undefined,
    description: m.description || undefined,
    descriptionRu: m.description_ru || undefined,
    generation: m.generation,
    children: m.children?.map(transformMember),
  };
}

export async function fetchTree(): Promise<FamilyMember> {
  const res = await fetch(`${API_BASE}/tree/`);
  if (!res.ok) throw new Error('Failed to fetch tree');
  const data: ApiMember = await res.json();
  return transformMember(data);
}

export async function fetchStats(): Promise<{ totalPeople: number; generations: number }> {
  const res = await fetch(`${API_BASE}/stats/`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  const data = await res.json();
  return {
    totalPeople: data.total_people,
    generations: data.generations,
  };
}

export async function addMember(
  parentId: string,
  person: {
    nameKk: string;
    nameRu: string;
    gender: 'male' | 'female';
    description?: string;
    photo?: File;
  }
): Promise<FamilyMember> {
  const formData = new FormData();
  formData.append('name_kk', person.nameKk);
  formData.append('name_ru', person.nameRu);
  formData.append('gender', person.gender);
  formData.append('parent', parentId);
  if (person.description) formData.append('description', person.description);
  if (person.photo) formData.append('photo', person.photo);

  // Calculate generation from parent
  const parentRes = await fetch(`${API_BASE}/members/${parentId}/`);
  if (parentRes.ok) {
    const parentData = await parentRes.json();
    formData.append('generation', String(parentData.generation + 1));
  }

  const res = await fetch(`${API_BASE}/members/`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to add member');
  const data: ApiMember = await res.json();
  return transformMember(data);
}

export async function updateMemberPhoto(memberId: string, photo: File): Promise<string> {
  const formData = new FormData();
  formData.append('photo', photo);

  const res = await fetch(`${API_BASE}/members/${memberId}/`, {
    method: 'PATCH',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to update photo');
  const data = await res.json();
  return data.photo;
}
