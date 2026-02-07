import { useUpcomingFestivals } from '@shared/hooks/useFestivals';
import { formatEventData } from '../lib/formatEventData';
import { EventDisplayData } from '../model/types';

export const useUpcomingEvent = () => {
    const { festivals, loading, error } = useUpcomingFestivals();
    
    const nextEvent = festivals.length > 0 ? festivals[0] : null;
    const formattedEvent: EventDisplayData | null = nextEvent ? formatEventData(nextEvent) : null;

    return {
        event: formattedEvent,
        loading,
        error,
        hasEvent: Boolean(nextEvent)
    };
};