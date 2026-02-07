import { apiClient } from '../client';
import { LoginCredentials, RegisterCredentials, AuthResponse, User } from '@features/auth/model/types/auth.types';

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        return apiClient.post<AuthResponse>('/auth/login', credentials);
    },

    register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
        return apiClient.post<AuthResponse>('/auth/register', credentials);
    },

    logout: async (): Promise<{ success: boolean; message: string }> => {
        return apiClient.post('/auth/logout');
    },

    getProfile: async (): Promise<{ success: boolean; data: { user: User } }> => {
        return apiClient.get('/auth/profile');
    },

    validateToken: async (): Promise<{ success: boolean; data: { user: User } }> => {
        return apiClient.get('/auth/validate');
    },
};
