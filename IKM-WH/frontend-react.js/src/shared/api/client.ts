import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from './config';

class ApiClient {
  private client: AxiosInstance;
  private publicClient: AxiosInstance;

  constructor() {
    // Защищенный клиент с авторизацией
    this.client = axios.create({
      baseURL: `${API_CONFIG.BASE_URL}${API_CONFIG.API_BASE_PATH}`,
      timeout: API_CONFIG.TIMEOUT,
    });

    // Публичный клиент без авторизации
    this.publicClient = axios.create({
      baseURL: `${API_CONFIG.BASE_URL}${API_CONFIG.API_BASE_PATH}`,
      timeout: API_CONFIG.TIMEOUT,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor для добавления токена (только для защищенного клиента)
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor для обработки ошибок (для обоих клиентов)
    const responseInterceptor = (response: AxiosResponse) => response;
    const errorInterceptor = (error: any) => {
      if (error.response?.status === 401) {
        // Токен истек или недействителен
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        
        // Перенаправляем только если это защищенный маршрут
        const currentPath = window.location.pathname;
        const protectedPaths = ['/dashboard', '/admin'];
        
        if (protectedPaths.some(path => currentPath.startsWith(path))) {
          window.location.href = '/admin-login';
        }
      }
      return Promise.reject(error);
    };

    this.client.interceptors.response.use(responseInterceptor, errorInterceptor);
    this.publicClient.interceptors.response.use(responseInterceptor, errorInterceptor);
  }

  // GET запрос (защищенный)
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  // GET запрос (публичный)
  async getPublic<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.publicClient.get<T>(url, config);
    return response.data;
  }

  // POST запрос
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const isFormData = data instanceof FormData;
    const headers = isFormData 
      ? { ...config?.headers }
      : { 'Content-Type': 'application/json', ...config?.headers };
    
    const response = await this.client.post<T>(url, data, {
      ...config,
      headers,
    });
    return response.data;
  }

  // PUT запрос
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const isFormData = data instanceof FormData;
    const headers = isFormData 
      ? { ...config?.headers }
      : { 'Content-Type': 'application/json', ...config?.headers };
    
    const response = await this.client.put<T>(url, data, {
      ...config,
      headers,
    });
    return response.data;
  }

  // DELETE запрос
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  // PATCH запрос
  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  // Загрузка файлов
  async uploadFile<T>(url: string, file: File, onUploadProgress?: (progress: number) => void): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onUploadProgress(progress);
        }
      },
    });

    return response.data;
  }
}

export const apiClient = new ApiClient();