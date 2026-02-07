import React from 'react';
import { AlertCircle } from 'lucide-react';
import style from './ErrorState.module.css';

interface ErrorStateProps {
  message: string;
  title?: string;
  className?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  message, 
  title = 'Произошла ошибка',
  className = '',
  onRetry 
}) => {
  return (
    <div className={`${style.errorState} ${className}`}>
      <AlertCircle size={48} className={style.icon} />
      <h3 className={style.title}>{title}</h3>
      <p className={style.message}>{message}</p>
      {onRetry && (
        <button className={style.retryButton} onClick={onRetry}>
          Попробовать снова
        </button>
      )}
    </div>
  );
};