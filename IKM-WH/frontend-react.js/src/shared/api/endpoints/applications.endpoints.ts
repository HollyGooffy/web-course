import { apiClient } from '../client';

export interface Application {
  id: string;
  groupName: string;
  artistName?: string;
  bandName?: string;
  contactTelegram: string;
  contactPhone: string;
  description?: string;
  socialLinks?: {
    website?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  genre?: string;
  members?: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateApplicationData {
  groupName: string;
  contactTelegram: string;
  contactPhone: string;
  artistName?: string;
  bandName?: string;
  description?: string;
  socialLinks?: {
    website?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  genre?: string;
  members?: string[];
}

export interface UpdateApplicationData {
  status?: 'pending' | 'approved' | 'rejected';
  notes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export const applicationsApi = {
  getAll: async (): Promise<{ success: boolean; data: Application[] }> => {
    return apiClient.get('/applications');
  },

  getById: async (id: string): Promise<{ success: boolean; data: Application }> => {
    return apiClient.get(`/applications/${id}`);
  },

  create: async (data: CreateApplicationData): Promise<{ success: boolean; data: Application }> => {
    return apiClient.post('/applications', data);
  },

  update: async (id: string, data: UpdateApplicationData): Promise<{ success: boolean; data: Application }> => {
    return apiClient.put(`/applications/${id}`, data);
  },

  delete: async (id: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/applications/${id}`);
  },
};