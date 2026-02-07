import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@features/auth/lib/hooks/useAuth';
import { LoginCredentials } from '@features/auth/model/types/auth.types';
import style from './LoginForm.module.css';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Заполните все поля');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await login(formData as LoginCredentials);
      onSuccess?.();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка входа в систему');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.loginForm}>
      {error && (
        <div className={style.errorMessage}>
          {error}
        </div>
      )}

      <div className={style.formGroup}>
        <label htmlFor="email" className={style.label}>
          Email
        </label>
        <div className={style.inputWrapper}>
          <Mail size={20} className={style.inputIcon} />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Введите ваш email"
            className={style.input}
          />
        </div>
      </div>

      <div className={style.formGroup}>
        <label htmlFor="password" className={style.label}>
          Пароль
        </label>
        <div className={style.inputWrapper}>
          <Lock size={20} className={style.inputIcon} />
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Введите пароль"
            className={style.input}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={style.passwordToggle}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={style.submitButton}
      >
        {isSubmitting ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
};