import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@features/auth/lib/hooks/useAuth';
import styles from './LoginForm.module.css';

const loginSchema = z.object({
    email: z.string().email('Введите корректный email'),
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
    rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
    onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const { login, isLoading, error, clearError } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            clearError();
            await login(data);
            onSuccess?.();
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    className={styles.input}
                    {...register('email')}
                    placeholder="admin@example.com"
                    disabled={isLoading}
                />
                {errors.email && (
                    <span className={styles.error}>{errors.email.message}</span>
                )}
            </div>

            <div className={styles.field}>
                <label htmlFor="password" className={styles.label}>
                    Пароль
                </label>
                <div className={styles.passwordField}>
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        className={styles.input}
                        {...register('password')}
                        placeholder="Введите пароль"
                        disabled={isLoading}
                    />
                    <button
                        type="button"
                        className={styles.showPasswordBtn}
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </button>
                </div>
                {errors.password && (
                    <span className={styles.error}>{errors.password.message}</span>
                )}
            </div>

            <div className={styles.field}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        {...register('rememberMe')}
                        className={styles.checkbox}
                        disabled={isLoading}
                    />
                    <span className={styles.checkboxText}>Запомнить меня</span>
                </label>
            </div>

            {error && (
                <div className={styles.errorMessage}>
                    {error}
                </div>
            )}

            <button
                type="submit"
                className={styles.submitBtn}
                disabled={isLoading}
            >
                {isLoading ? 'Вход...' : 'Войти'}
            </button>
        </form>
    );
};
