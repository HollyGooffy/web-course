import { useState } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Festival } from '@shared/api/endpoints/festivals.endpoints';
import { FestivalCardsModal } from '@features/cards-display/ui/FestivalCardsModal';
import { usePublicCardsWithParticipants } from '@shared/hooks/usePublicCardsWithParticipants';
import style from '../FestivalsPage.module.css';

interface FestivalCardProps {
    festival: Festival;
}

export const FestivalCard = ({ festival }: FestivalCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { cardSets } = usePublicCardsWithParticipants();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleViewCards = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Фильтруем карточки для этого фестиваля
    const festivalCards = cardSets.filter(card => card.festivalId === festival.id);

    return (
        <>
            <div className={style.festivalCard}>
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
                    
                    {festival.description && (
                        <p className={style.cardDescription}>{festival.description}</p>
                    )}

                    <div className={style.cardDetails}>
                        <div className={style.detail}>
                            <Calendar size={18} />
                            <span>{formatDate(festival.date)}</span>
                        </div>

                        {festival.time && (
                            <div className={style.detail}>
                                <Clock size={18} />
                                <span>{festival.time}</span>
                            </div>
                        )}

                        {festival.venue && (
                            <div className={style.detail}>
                                <MapPin size={18} />
                                <span>{festival.venue}</span>
                            </div>
                        )}
                    </div>

                    {festival.performers && festival.performers.length > 0 && (
                        <div className={style.performers}>
                            <strong>Участники:</strong>
                            <p>{festival.performers.join(', ')}</p>
                        </div>
                    )}

                    <button 
                        className={style.buyButton}
                        onClick={handleViewCards}
                    >
                        Посмотреть карточки
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <FestivalCardsModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    festival={festival}
                    cardSets={festivalCards}
                />
            )}
        </>
    );
};
