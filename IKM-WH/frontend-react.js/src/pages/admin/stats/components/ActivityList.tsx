import { ActivityItem } from '../model/types';
import style from '../ui/Stats.module.css';

interface ActivityListProps {
    activities: ActivityItem[];
}

export const ActivityList = ({ activities }: ActivityListProps) => {
    return (
        <div className={style.recentActivity}>
            <h3>Последняя активность</h3>
            <div className={style.activityList}>
                {activities.map((activity, index) => (
                    <div 
                        key={index} 
                        className={`${style.activityItem} ${!activity.isReal ? style.comingSoonActivity : ''} fadeInStagger`} 
                        style={{animationDelay: `${0.7 + index * 0.1}s`}}
                    >
                        <div className={`${style.activityDot} ${!activity.isReal ? style.comingSoonDot : ''}`}></div>
                        <div className={style.activityContent}>
                            <p>{activity.action}</p>
                            <span className={!activity.isReal ? style.comingSoonTime : ''}>{activity.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};