import React from 'react';
import style from './Spinner.module.css';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'medium', 
  color = 'primary',
  className = '' 
}) => {
  return (
    <div 
      className={`${style.spinner} ${style[size]} ${style[color]} ${className}`}
      role="status"
      aria-label="Загрузка"
    />
  );
};