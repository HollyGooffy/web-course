import { Users, Calendar } from 'lucide-react';
import style from './EventsList.module.css';

interface Event {
  id: string;
  name: string;
  date: string;
  stage: string;
  groups: number;
}

interface EventsListProps {
  events: Event[];
}

export const EventsList: React.FC<EventsListProps> = ({ events }) => {
  if (events.length === 0) {
    return (
      <div className={style.emptyState}>
        <Calendar size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
        <p>Нет предстоящих событий</p>
        <p className={style.emptyHint}>
          Создайте первое событие в разделе "Афиша"
        </p>
      </div>
    );
  }

  return (
    <div className={style.eventsList}>
      {events.map(event => (
        <div key={event.id} className={style.eventCard}>
          <div className={style.eventInfo}>
            <h4>{event.name}</h4>
            <span className={style.eventDate}>{event.date}</span>
            <span className={style.eventStage}>{event.stage}</span>
          </div>
          <div className={style.eventStats}>
            <Users size={16} />
            <span>{event.groups} групп</span>
          </div>
        </div>
      ))}
    </div>
  );
};