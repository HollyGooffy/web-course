import { useEvents } from '@shared/hooks/useEvents';
import { useGroups } from '@shared/hooks/useGroups';
import { useMerch } from '@shared/hooks/useMerch';
import { useApplications } from '@shared/hooks/useApplications';
import { usePublicCards } from '@shared/hooks/usePublicCards';
import { StatsData } from '../model/types';

export const useStatsData = () => {
    const { events, loading: eventsLoading } = useEvents();
    const { groups, loading: groupsLoading } = useGroups();
    const { items: merchItems, loading: merchLoading } = useMerch();
    const { applications, loading: applicationsLoading } = useApplications();
    const { cardSets, loading: cardsLoading } = usePublicCards();

    const loading = eventsLoading || groupsLoading || merchLoading || applicationsLoading || cardsLoading;

    const statsData: StatsData = {
        totalGroups: groups.length,
        totalEvents: events.length,
        totalApplications: applications.length,
        totalMerch: merchItems.length,
        totalCardSets: cardSets.length,
        pendingApplications: applications.filter(app => app.status === 'pending').length,
    };

    return {
        statsData,
        loading,
        rawData: {
            events,
            groups,
            merchItems,
            applications,
            cardSets
        }
    };
};