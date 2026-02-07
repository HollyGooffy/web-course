import axios, { AxiosInstance, AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Добавляем токен к каждому запросу
        this.client.interceptors.request.use((config) => {
            const token = localStorage.getItem('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        // Обработка ответов и ошибок
        this.client.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error) => {
                if (error.response?.status === 401) {
                    // Токен истек или недействителен
                    localStorage.removeItem('authToken');
                    // Перенаправляем только если мы не на публичной странице и не на странице логина
                    const currentPath = window.location.pathname;
                    const publicPaths = ['/', '/admin-login'];
                    const isPublicPath = publicPaths.some(path => currentPath === path || currentPath.startsWith('/admin-login'));
                    
                    if (!isPublicPath) {
                        window.location.href = '/admin-login';
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    get clientInstance(): AxiosInstance {
        return this.client;
    }

    async get<T>(url: string, params?: any): Promise<T> {
        const response = await this.client.get(url, { params });
        return response.data;
    }

    async post<T>(url: string, data?: any): Promise<T> {
        const response = await this.client.post(url, data);
        return response.data;
    }

    async put<T>(url: string, data?: any): Promise<T> {
        const response = await this.client.put(url, data);
        return response.data;
    }

    async delete<T>(url: string): Promise<T> {
        const response = await this.client.delete(url);
        return response.data;
    }
}

export const apiClient = new ApiClient();
