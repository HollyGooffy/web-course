import { apiClient } from './client';
import { API_ENDPOINTS } from './config';
import { 
  LoginCredentials as LoginRequest, 
  RegisterCredentials as RegisterRequest, 
  AuthResponse, 
  User
} from '../../features/auth/model/types/auth.types';

// Для обратной совместимости
interface UpdateProfileRequest {
  name?: string;
  email?: string;
}

export const authApi = {
  // Регистрация пользователя
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
  },

  // Вход в систему
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  // Выход из системы
  logout: async (): Promise<{ message: string }> => {
    return apiClient.post<{ message: string }>(API_ENDPOINTS.AUTH.LOGOUT);
  },

  // Получить профиль пользователя
  getProfile: async (): Promise<User> => {
    return apiClient.get<User>(API_ENDPOINTS.AUTH.PROFILE);
  },

  // Обновить профиль пользователя
  updateProfile: async (data: UpdateProfileRequest): Promise<User> => {
    return apiClient.put<User>(API_ENDPOINTS.AUTH.PROFILE, data);
  },
};