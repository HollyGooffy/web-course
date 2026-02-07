import { apiClient } from '../client';

export interface Festival {
  id: string;
  name: string;
  date: string;
  venue: string;
  description?: string;
  image?: string;
  time?: string;
  address?: string;
  performers?: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface CreateFestivalData {
  name: string;
  date: string;
  venue: string;
  description?: string;
  time?: string;
  address?: string;
  performers?: string[];
  status?: string;
}

export type UpdateFestivalData = Partial<CreateFestivalData>;

export const festivalsApi = {
  // Публичные методы (для пользователей)
  getAll: async (): Promise<{ success: boolean; data: Festival[] }> => {
    return apiClient.getPublic('/festivals/public');
  },

  getById: async (id: string): Promise<{ success: boolean; data: Festival }> => {
    return apiClient.getPublic(`/festivals/public/${id}`);
  },

  getUpcoming: async (): Promise<{ success: boolean; data: Festival[] }> => {
    return apiClient.getPublic('/festivals/upcoming');
  },

  getWithCards: async (): Promise<{ success: boolean; data: Festival[] }> => {
    return apiClient.getPublic('/festivals/with-cards');
  },

  // Админские методы (для администраторов)
  getAllAdmin: async (): Promise<{ success: boolean; data: Festival[] }> => {
    return apiClient.get('/festivals');
  },

  getByIdAdmin: async (id: string): Promise<{ success: boolean; data: Festival }> => {
    return apiClient.get(`/festivals/${id}`);
  },

  create: async (data: CreateFestivalData, imageFile?: File): Promise<{ success: boolean; data: Festival }> => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('date', data.date);
    formData.append('venue', data.venue);
    if (data.description) formData.append('description', data.description);
    if (data.time) formData.append('time', data.time);
    if (data.address) formData.append('address', data.address);
    if (data.performers) formData.append('performers', JSON.stringify(data.performers));
    if (data.status) formData.append('status', data.status);
    if (imageFile) formData.append('image', imageFile);

    return apiClient.post('/festivals', formData);
  },

  update: async (id: string, data: UpdateFestivalData, imageFile?: File): Promise<{ success: boolean; data: Festival }> => {
    const formData = new FormData();
    
    if (data.name) formData.append('name', data.name);
    if (data.date) formData.append('date', data.date);
    if (data.venue) formData.append('venue', data.venue);
    if (data.description !== undefined) formData.append('description', data.description);
    if (data.time !== undefined) formData.append('time', data.time);
    if (data.address !== undefined) formData.append('address', data.address);
    if (data.performers !== undefined) formData.append('performers', JSON.stringify(data.performers));
    if (data.status) formData.append('status', data.status);
    if (imageFile) formData.append('image', imageFile);

    return apiClient.put(`/festivals/${id}`, formData);
  },

  delete: async (id: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/festivals/${id}`);
  },

  syncWithEvents: async (): Promise<{ success: boolean; data: Festival[]; message?: string }> => {
    return apiClient.post('/festivals/sync');
  },
};