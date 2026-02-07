import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { EventDisplayData } from '@entities/event';
import style from '../Poster.module.css';

interface EventDetailsProps {
    event: EventDisplayData;
}

export const EventDetails = ({ event }: EventDetailsProps) => {
    return (
        <div className={style.posterDetails}>
            <div className={style.posterDetail}>
                <Calendar size={18} />
                <span>{event.formattedDate}</span>
            </div>
            
            {event.time && (
                <div className={style.posterDetail}>
                    <Clock size={18} />
                    <span>{event.time}</span>
                </div>
            )}
            
            <div className={style.posterDetail}>
                <MapPin size={18} />
                <span>{event.venueWithAddress}</span>
            </div>
            
            {event.hasPerformers && (
                <div className={style.posterDetail}>
                    <Users size={18} />
                    <span>Сыграют: {event.performers!.join(', ')}</span>
                </div>
            )}
        </div>
    );
};