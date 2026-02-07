import React, { useState, useEffect } from 'react';
import { X, RefreshCw } from 'lucide-react';
import style from './AutoUpdateNotification.module.css';

interface AutoUpdateNotificationProps {
  updatedEventsCount: number;
  onDismiss: () => void;
}

export const AutoUpdateNotification: React.FC<AutoUpdateNotificationProps> = ({
  updatedEventsCount,
  onDismiss
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300); // Ждем завершения анимации
    }, 5000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 300);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`${style.notification} ${isVisible ? style.visible : style.hidden}`}>
      <div className={style.content}>
        <div className={style.icon}>
          <RefreshCw size={20} />
        </div>
        <div className={style.message}>
          <h4>Статусы событий обновлены</h4>
          <p>
            {updatedEventsCount} {updatedEventsCount === 1 ? 'событие' : 'событий'} 
            {' '}автоматически переведено в статус "Завершено"
          </p>
        </div>
        <button className={style.dismissButton} onClick={handleDismiss}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
};