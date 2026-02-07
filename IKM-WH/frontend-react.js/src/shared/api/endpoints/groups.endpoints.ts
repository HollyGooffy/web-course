import { apiClient } from '../client';

export interface Group {
  id: string;
  name: string;
  description: string;
  genre: string;
  members: string[];
  image?: string;
  vkLink?: string;
  tgLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGroupData {
  name: string;
  description: string;
  genre: string;
  members: string[];
  vkLink?: string;
  tgLink?: string;
}

export type UpdateGroupData = Partial<CreateGroupData>;

export const groupsApi = {
  getAll: async (): Promise<{ success: boolean; data: Group[] }> => {
    return apiClient.get('/groups');
  },

  getById: async (id: string): Promise<{ success: boolean; data: Group }> => {
    return apiClient.get(`/groups/${id}`);
  },

  create: async (data: CreateGroupData, imageFile?: File): Promise<{ success: boolean; data: Group }> => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('genre', data.genre);
    formData.append('members', JSON.stringify(data.members));
    if (data.vkLink) formData.append('vkLink', data.vkLink);
    if (data.tgLink) formData.append('tgLink', data.tgLink);
    if (imageFile) formData.append('image', imageFile);

    return apiClient.post('/groups', formData);
  },

  update: async (id: string, data: UpdateGroupData, imageFile?: File): Promise<{ success: boolean; data: Group }> => {
    const formData = new FormData();
    
    // Добавляем только непустые поля
    if (data.name) formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    if (data.genre) formData.append('genre', data.genre);
    if (data.members && data.members.length > 0) {
      formData.append('members', JSON.stringify(data.members));
    }
    if (data.vkLink !== undefined) formData.append('vkLink', data.vkLink);
    if (data.tgLink !== undefined) formData.append('tgLink', data.tgLink);
    if (imageFile) formData.append('image', imageFile);

    return apiClient.put(`/groups/${id}`, formData);
  },

  delete: async (id: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/groups/${id}`);
  },
};