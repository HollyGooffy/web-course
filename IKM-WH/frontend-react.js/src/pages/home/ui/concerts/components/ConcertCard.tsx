import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { Festival } from '@shared/api/endpoints/festivals.endpoints';
import style from '../Concerts.module.css';

interface ConcertCardProps {
    festival: Festival;
}

export const ConcertCard = ({ festival }: ConcertCardProps) => {
    const navigate = useNavigate();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleClick = () => {
        navigate('/festivals');
    };

    return (
        <div className={style.concertCard} onClick={handleClick}>
            {festival.image && (
                <div className={style.cardImage}>
                    <img 
                        src={`http://localhost:3001${festival.image}`} 
                        alt={festival.name}
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </div>
            )}
            
            <div className={style.cardContent}>
                <h3 className={style.cardTitle}>{festival.name}</h3>
                
                <div className={style.cardDetails}>
                    <div className={style.detail}>
                        <Calendar size={16} />
                        <span>{formatDate(festival.date)}</span>
                    </div>

                    {festival.venue && (
                        <div className={style.detail}>
                            <MapPin size={16} />
                            <span>{festival.venue}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
