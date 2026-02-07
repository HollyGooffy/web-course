import { apiClient } from '../client';

export interface MerchItem {
  id: string;
  title: string;
  description?: string;
  price: number;
  image?: string;
  stock: number;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMerchData {
  title: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
}

export type UpdateMerchData = Partial<CreateMerchData>;

export const merchApi = {
  getAll: async (): Promise<{ success: boolean; data: MerchItem[] }> => {
    return apiClient.get('/merch');
  },

  getById: async (id: string): Promise<{ success: boolean; data: MerchItem }> => {
    return apiClient.get(`/merch/${id}`);
  },

  create: async (data: CreateMerchData, imageFile?: File): Promise<{ success: boolean; data: MerchItem }> => {
    const formData = new FormData();
    formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('stock', data.stock.toString());
    if (data.category) formData.append('category', data.category);
    if (imageFile) formData.append('image', imageFile);

    return apiClient.post('/merch', formData);
  },

  update: async (id: string, data: UpdateMerchData, imageFile?: File): Promise<{ success: boolean; data: MerchItem }> => {
    const formData = new FormData();
    
    if (data.title) formData.append('title', data.title);
    if (data.description !== undefined) formData.append('description', data.description);
    if (data.price !== undefined) formData.append('price', data.price.toString());
    if (data.stock !== undefined) formData.append('stock', data.stock.toString());
    if (data.category !== undefined) formData.append('category', data.category);
    if (imageFile) formData.append('image', imageFile);

    return apiClient.put(`/merch/${id}`, formData);
  },

  updateStock: async (id: string, stock: number): Promise<{ success: boolean; data: MerchItem }> => {
    return apiClient.patch(`/merch/${id}/stock`, { stock });
  },

  delete: async (id: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/merch/${id}`);
  },
};