import { useDashboardStats } from '@shared/hooks/useStats';
import { useEvents } from '@shared/hooks/useEvents';
import { useMerch } from '@shared/hooks/useMerch';
import { usePublicCards } from '@shared/hooks/usePublicCards';

export const useDashboardData = () => {
    const { stats, loading: statsLoading, error: statsError } = useDashboardStats();
    const { events, loading: eventsLoading } = useEvents();
    const { items: merchItems, loading: merchLoading } = useMerch();
    const { cardSets, loading: cardsLoading } = usePublicCards();

    const loading = statsLoading || eventsLoading;

    const recentActivity = stats?.recentActivity && stats.recentActivity.length > 0 
        ? stats.recentActivity.slice(0, 5)
        : [];

    const upcomingEvents = events && events.length > 0
        ? events.slice(0, 3).map(event => ({
            id: event.id,
            name: event.title,
            date: new Date(event.date).toLocaleDateString('ru-RU', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
            }),
            stage: event.venue || 'Главная сцена',
            groups: event.performers?.length || 0
        }))
        : [];

    return {
        stats,
        statsError,
        recentActivity,
        upcomingEvents,
        merchItems,
        cardSets,
        loading: {
            main: loading,
            merch: merchLoading,
            cards: cardsLoading
        }
    };
};