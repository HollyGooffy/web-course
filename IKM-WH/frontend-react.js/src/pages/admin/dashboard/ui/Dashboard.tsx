import style from './Dashboard.module.css';
import { AdminHeader } from "@shared/ui/adminPage";
import { LoadingState } from '@shared/ui/loading-state';
import { StatsList } from '@features/dashboard-stats';
import { useDashboardData } from '../hooks/useDashboardData';
import { ErrorMessage } from '../components/ErrorMessage';
import { EventsSection } from '../components/EventsSection';
import { ActivitySection } from '../components/ActivitySection';
import { MerchSection } from '../components/MerchSection';
import { CardsSection } from '../components/CardsSection';
import { ComingSoonSection } from '../components/ComingSoonSection';
import '@shared/styles/animations.css';

export const Dashboard = () => {
    const {
        stats,
        statsError,
        recentActivity,
        upcomingEvents,
        merchItems,
        cardSets,
        loading
    } = useDashboardData();

    if (loading.main) {
        return (
            <AdminHeader
                title="Главная панель"
                description="Загрузка данных..."
            >
                <div className={style.dashboardContent}>
                    <LoadingState message="Загрузка статистики..." />
                </div>
            </AdminHeader>
        );
    }

    return (
        <AdminHeader
            title="Главная панель"
            description="Обзор фестиваля и статистика"
        >
            <div className={`${style.dashboardContent} fadeIn`}>
                {statsError && <ErrorMessage error={statsError} />}

                <div className="scaleIn">
                    <StatsList stats={stats} />
                </div>

                <div className={`${style.dashboardGrid} slideUp`}>
                    <EventsSection events={upcomingEvents} />
                    <ActivitySection activities={recentActivity} />
                </div>

                <div className={`${style.dashboardGrid} fadeIn`} style={{animationDelay: '0.2s'}}>
                    <MerchSection items={merchItems} loading={loading.merch} />
                    <CardsSection cardSets={cardSets} loading={loading.cards} />
                </div>

                <ComingSoonSection />
            </div>
        </AdminHeader>
    );
};