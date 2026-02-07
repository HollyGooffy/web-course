import { AdminHeader } from '@shared/ui/adminPage';
import { LoadingState } from '@shared/ui/loading-state';
import { useStatsData } from '../hooks/useStatsData';
import { StatsContent } from '../components/StatsContent';
import { StatsPeriodSelector } from '../components/StatsPeriodSelector';
import '@shared/styles/animations.css';

export const Stats = () => {
    const { loading } = useStatsData();

    if (loading) {
        return (
            <AdminHeader
                title="Статистика платформы"
                description="Загрузка данных..."
            >
                <LoadingState message="Загрузка статистики..." />
            </AdminHeader>
        );
    }

    return (
        <AdminHeader
            title="Статистика платформы"
            description="Обзор ключевых метрик и активности"
            actions={<StatsPeriodSelector />}
        >
            <StatsContent />
        </AdminHeader>
    );
};