import React from 'react';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Event } from '@shared/api/endpoints/events.endpoints';
import { shouldUpdateEventStatus } from '@shared/lib/utils/eventStatusUpdater';
import style from './EventStatusIndicator.module.css';

interface EventStatusIndicatorProps {
  event: Event;
  showAutoUpdate?: boolean;
}

export const EventStatusIndicator: React.FC<EventStatusIndicatorProps> = ({ 
  event, 
  showAutoUpdate = false 
}) => {
  const isAutoUpdated = shouldUpdateEventStatus(event);
  
  const getStatusIcon = () => {
    switch (event.status) {
      case 'upcoming':
        return <Clock size={16} />;
      case 'completed':
        return <CheckCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      default:
        return <Calendar size={16} />;
    }
  };

  const getStatusText = () => {
    switch (event.status) {
      case 'upcoming':
        return 'Предстоящее';
      case 'completed':
        return 'Завершено';
      case 'cancelled':
        return 'Отменено';
      default:
        return event.status;
    }
  };

  const getStatusClass = () => {
    switch (event.status) {
      case 'upcoming':
        return style.upcoming;
      case 'completed':
        return style.completed;
      case 'cancelled':
        return style.cancelled;
      default:
        return style.default;
    }
  };

  return (
    <div className={`${style.statusIndicator} ${getStatusClass()}`}>
      {getStatusIcon()}
      <span>{getStatusText()}</span>
      {showAutoUpdate && isAutoUpdated && (
        <span className={style.autoUpdateBadge} title="Статус автоматически обновлен">
          Авто
        </span>
      )}
    </div>
  );
};