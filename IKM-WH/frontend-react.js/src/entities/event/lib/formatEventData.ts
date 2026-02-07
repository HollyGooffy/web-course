import { Event, EventDisplayData } from '../model/types';
import { getImageUrl } from '@shared/lib/utils/getImageUrl';

export const formatEventData = (event: Event): EventDisplayData => {
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return {
        ...event,
        formattedDate,
        imageUrl: getImageUrl(event.image) || '',
        hasPerformers: Boolean(event.performers && event.performers.length > 0),
        venueWithAddress: event.venue + (event.address ? `, ${event.address}` : '')
    };
};