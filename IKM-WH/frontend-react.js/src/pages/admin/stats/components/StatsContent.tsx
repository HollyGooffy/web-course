import { Grid } from '@shared/ui/adminPage';
import { useStatsData } from '../hooks/useStatsData';
import { 
    createMainStats, 
    createAdditionalStats, 
    recentActivity, 
    createQuickStats 
} from '../config/statsConfig';
import { StatCard } from './StatCard';
import { ActivityList } from './ActivityList';
import { QuickStats } from './QuickStats';
import { StatsCharts } from './StatsCharts';
import { StatsLegend } from './StatsLegend';
import { StatsInfoBanner } from './StatsInfoBanner';
import style from '../ui/Stats.module.css';

export const StatsContent = () => {
    const { statsData } = useStatsData();
    
    const mainStats = createMainStats(statsData);
    const additionalStats = createAdditionalStats(statsData);
    const quickStats = createQuickStats(statsData);

    return (
        <div className={`${style.statsContent} fadeIn`}>
            <StatsInfoBanner />

            <Grid columns={4} className={`${style.statsGrid} scaleIn`}>
                {mainStats.map((stat, index) => (
                    <StatCard key={index} stat={stat} index={index} />
                ))}
            </Grid>

            <Grid columns={4} className={`${style.statsGrid} slideUp`} style={{animationDelay: '0.2s'}}>
                {additionalStats.map((stat, index) => (
                    <StatCard key={index} stat={stat} index={0.3 + index * 0.1} />
                ))}
            </Grid>

            <StatsCharts />

            <div className={`${style.bottomSection} slideUp`} style={{animationDelay: '0.6s'}}>
                <ActivityList activities={recentActivity} />
                <QuickStats stats={quickStats} />
            </div>

            <StatsLegend />
        </div>
    );
};