import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@features/auth/lib/hooks/useAuth';
import { LoadingState } from '@shared/ui/loading-state';

interface AuthGuardProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    requireRole?: 'admin' | 'user';
    redirectTo?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
    children,
    requireAuth = true,
    requireRole,
    redirectTo = '/admin-login'
}) => {
    const { isAuthenticated, isLoading, user } = useAuth();
    const location = useLocation();

    // Показываем загрузку пока проверяем аутентификацию
    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <LoadingState message="Проверка доступа..." />
            </div>
        );
    }

    // Если требуется аутентификация
    if (requireAuth) {
        if (!isAuthenticated) {
            // Сохраняем текущий путь для редиректа после логина
            return <Navigate to={redirectTo} state={{ from: location }} replace />;
        }

        // Проверяем роль пользователя
        if (requireRole && user?.role !== requireRole && user?.role !== 'admin') {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    textAlign: 'center',
                    padding: '2rem'
                }}>
                    <h2 style={{ color: '#dc3545', marginBottom: '1rem' }}>
                        Недостаточно прав доступа
                    </h2>
                    <p style={{ color: '#666' }}>
                        У вас нет прав для просмотра этой страницы.
                    </p>
                </div>
            );
        }
    }

    // Если аутентификация НЕ требуется (например, для страницы логина)
    if (!requireAuth && isAuthenticated) {
        // Перенаправляем аутентифицированного пользователя
        const from = location.state?.from?.pathname || '/admin/dashboard';
        return <Navigate to={from} replace />;
    }

    return <>{children}</>;
};
