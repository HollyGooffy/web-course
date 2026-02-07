import { TrendingUp, Clock } from 'lucide-react';
import { StatItem } from '../model/types';
import style from '../ui/Stats.module.css';

interface StatCardProps {
    stat: StatItem;
    index: number;
}

export const StatCard = ({ stat, index }: StatCardProps) => {
    return (
        <div 
            className={`${style.statCard} ${!stat.isReal ? style.comingSoon : ''} fadeInStagger`} 
            style={{animationDelay: `${index * 0.1}s`}}
        >
            <div className={style.statIcon}>
                {stat.icon}
            </div>
            <div className={style.statContent}>
                <h3 className={!stat.isReal ? style.comingSoonValue : ''}>{stat.value}</h3>
                <p>{stat.label}</p>
                <span className={stat.isReal ? style.changePositive : style.comingSoonChange}>
                    {stat.isReal ? <TrendingUp size={14} /> : <Clock size={14} />}
                    {stat.change}
                </span>
            </div>
        </div>
    );
};