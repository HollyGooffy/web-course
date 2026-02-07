import { Grid } from '@shared/ui/adminPage';
import { QuickStatItem } from '../model/types';
import style from '../ui/Stats.module.css';

interface QuickStatsProps {
    stats: QuickStatItem[];
}

export const QuickStats = ({ stats }: QuickStatsProps) => {
    return (
        <div className={style.quickStats}>
            <h3>Быстрая статистика</h3>
            <Grid columns={1}>
                {stats.map((item, index) => (
                    <div 
                        key={index} 
                        className={`${style.quickStat} ${!item.isReal ? style.comingSoon : ''} fadeInStagger`} 
                        style={{animationDelay: `${0.8 + index * 0.1}s`}}
                    >
                        <item.icon size={20} />
                        <div>
                            <strong className={!item.isReal ? style.comingSoonValue : ''}>{item.value}</strong>
                            <span>{item.label}</span>
                        </div>
                    </div>
                ))}
            </Grid>
        </div>
    );
};