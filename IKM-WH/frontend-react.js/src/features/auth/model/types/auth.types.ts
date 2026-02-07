export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
    lastLogin?: string;
    createdAt?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegisterCredentials {
    email: string;
    password: string;
    name: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data?: {
        user: User;
        token: string;
    };
}

export interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => void;
    clearError: () => void;
    getProfile: () => Promise<void>;
    validateToken: () => Promise<boolean>;
}