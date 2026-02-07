import { Bell } from 'lucide-react';
import style from './ActivityList.module.css';
import { ActivityItem } from '@shared/api/endpoints/stats.endpoints';

interface ActivityListProps {
  activities: ActivityItem[];
}

const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) {
    return 'только что';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} мин назад`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} ${hours === 1 ? 'час' : hours < 5 ? 'часа' : 'часов'} назад`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'} назад`;
  }
};

export const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  if (activities.length === 0) {
    return (
      <div className={style.emptyState}>
        <Bell size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
        <p>Нет недавней активности</p>
        <p className={style.emptyHint}>
          Активность появится после первых действий
        </p>
      </div>
    );
  }

  return (
    <div className={style.activityList}>
      {activities.map(activity => (
        <div key={activity.id} className={style.activityItem}>
          <div className={style.activityContent}>
            <div className={style.activityText}>
              <strong>{activity.action}</strong> - {activity.target}
            </div>
            <div className={style.activityMeta}>
              <span>{formatTimeAgo(activity.timestamp)}</span>
              <span>•</span>
              <span>{activity.user}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};