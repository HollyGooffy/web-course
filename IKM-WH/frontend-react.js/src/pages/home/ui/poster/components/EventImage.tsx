import { Calendar } from 'lucide-react';
import style from '../Poster.module.css';

interface EventImageProps {
    imageUrl?: string;
    eventName: string;
}

export const EventImage = ({ imageUrl, eventName }: EventImageProps) => {
    if (imageUrl) {
        return (
            <img 
                src={imageUrl} 
                alt={eventName} 
                className={style.posterImage}
            />
        );
    }

    return (
        <div className={style.posterImagePlaceholder}>
            <Calendar size={64} />
        </div>
    );
};