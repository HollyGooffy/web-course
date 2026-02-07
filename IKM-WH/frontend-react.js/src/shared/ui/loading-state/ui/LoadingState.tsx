import React from 'react';
import { Spinner } from '@shared/ui/spinner';
import style from './LoadingState.module.css';

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Загрузка...', 
  size = 'medium',
  className = '' 
}) => {
  return (
    <div className={`${style.loadingState} ${className}`}>
      <Spinner size={size} />
      <p className={style.message}>{message}</p>
    </div>
  );
};