import { useNavigate } from 'react-router-dom';
import { EventDisplayData } from '@entities/event';
import { EventImage } from './EventImage';
import { EventDetails } from './EventDetails';
import style from '../Poster.module.css';

interface EventCardProps {
    event: EventDisplayData;
}

export const EventCard = ({ event }: EventCardProps) => {
    const navigate = useNavigate();

    const handleBuyTicket = () => {
        navigate('/buy-ticket');
    };

    return (
        <div className={style.poster}>
            <EventImage 
                imageUrl={event.imageUrl} 
                eventName={event.name} 
            />
            
            <div className={style.posterContent}>
                <h3 className={style.posterTitle}>{event.name}</h3>
                
                <EventDetails event={event} />
                
                {event.description && (
                    <p className={style.posterDescription}>{event.description}</p>
                )}
                
                <button onClick={handleBuyTicket} className={`btn btn--primary`}>
                    Купить билет
                </button>
            </div>
        </div>
    );
};