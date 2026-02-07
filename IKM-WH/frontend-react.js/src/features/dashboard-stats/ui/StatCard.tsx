import { LucideIcon } from 'lucide-react';
import style from './StatCard.module.css';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color }) => {
  const isComingSoon = value === 'Coming Soon';
  
  return (
    <div className={`${style.statCard} ${isComingSoon ? style.comingSoon : ''}`}>
      <div className={style.statHeader}>
        <div className={style.statInfo}>
          <h3 className={isComingSoon ? style.comingSoonValue : ''}>{value}</h3>
          <span>{title}</span>
        </div>
        <div 
          className={style.statIcon} 
          style={{ 
            backgroundColor: isComingSoon ? '#e2e8f0' : color,
            opacity: isComingSoon ? 0.7 : 1
          }}
        >
          <Icon size={24} color={isComingSoon ? '#64748b' : 'white'} />
        </div>
      </div>
      <div className={`${style.statChange} ${isComingSoon ? style.comingSoonChange : ''}`}>
        {change}
      </div>
    </div>
  );
};