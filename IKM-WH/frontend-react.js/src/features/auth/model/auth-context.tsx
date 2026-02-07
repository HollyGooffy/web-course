import React, { createContext, useEffect, useState } from "react";
import { AuthProviderProps } from "@features/auth/model/authProvider-props";
import { AuthState, AuthContextType, LoginCredentials, RegisterCredentials } from "@features/auth/model/types/auth.types";
import { authApi } from "@shared/api/endpoints/auth.endpoints";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true, // Начинаем с true для проверки токена
        error: null,
    });

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem("authToken");

            if (token) {
                const response = await authApi.validateToken();

                if (response.success) {
                    setState(prev => ({
                        ...prev,
                        user: response.data.user,
                        isAuthenticated: true,
                        isLoading: false
                    }));
                } else {
                    
                    localStorage.removeItem("authToken");
                    setState(prev => ({ ...prev, isLoading: false }));
                }
            } else {
                setState(prev => ({ ...prev, isLoading: false }));
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem("authToken");
            setState(prev => ({ ...prev, isLoading: false }));
        }
    };

    const login = async (credentials: LoginCredentials) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            const response = await authApi.login(credentials);

            if (response.success && response.data) {
                const { user, token } = response.data;

                localStorage.setItem('authToken', token);
                setState(prev => ({
                    ...prev,
                    user,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                }));
            } else {
                const errorMsg = response.message || 'Неверный email или пароль';
                setState(prev => ({
                    ...prev,
                    error: errorMsg,
                    isLoading: false
                }));
                throw new Error(errorMsg);
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || error.message || 'Ошибка входа. Проверьте данные.';
            setState(prev => ({
                ...prev,
                error: errorMessage,
                isLoading: false
            }));
            throw error;
        }
    };

    const register = async (credentials: RegisterCredentials) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            const response = await authApi.register(credentials);

            if (response.success && response.data) {
                const { user, token } = response.data;

                localStorage.setItem('authToken', token);
                setState(prev => ({
                    ...prev,
                    user,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                }));
            } else {
                const errorMsg = response.message || 'Ошибка регистрации';
                setState(prev => ({
                    ...prev,
                    error: errorMsg,
                    isLoading: false
                }));
                throw new Error(errorMsg);
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || error.message || 'Ошибка регистрации. Проверьте данные.';
            setState(prev => ({
                ...prev,
                error: errorMessage,
                isLoading: false
            }));
            throw error;
        }
    };

    const logout = async () => {
        try {
            // Вызываем API logout (опционально)
            await authApi.logout();
        } catch (error) {
            console.error('Logout API call failed:', error);
            // Продолжаем с локальным logout даже если API не сработал
        } finally {
            // Очищаем локальное состояние
            localStorage.removeItem('authToken');
            setState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            });
        }
    };

    const clearError = () => {
        setState(prev => ({ ...prev, error: null }));
    };

    const getProfile = async () => {
        try {
            const response = await authApi.getProfile();
            if (response.success) {
                setState(prev => ({
                    ...prev,
                    user: response.data.user,
                }));
            }
        } catch (error) {
            console.error('Failed to get profile:', error);
            throw error;
        }
    };

    const validateToken = async (): Promise<boolean> => {
        try {
            const response = await authApi.validateToken();
            return response.success;
        } catch (_error) {
            return false;
        }
    };

    const value: AuthContextType = {
        ...state,
        login,
        register,
        logout,
        clearError,
        getProfile,
        validateToken,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
