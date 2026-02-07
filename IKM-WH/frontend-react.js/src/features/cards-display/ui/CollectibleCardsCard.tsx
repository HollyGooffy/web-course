import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import style from './CollectibleCardsCard.module.css';
import { ExtendedCardSet } from '@shared/hooks/usePublicCardsWithParticipants';
import { FestivalsModal } from './FestivalsModal';
import { useFestivals } from '@shared/hooks/useFestivals';
import { useEvents } from '@shared/hooks/useEvents';

interface CollectibleCardsCardProps {
  cardSets: ExtendedCardSet[];
}

export const CollectibleCardsCard = React.memo<CollectibleCardsCardProps>(({ cardSets }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { festivals, refetch: refetchFestivals } = useFestivals();
  const { events } = useEvents();

  const handleClick = useCallback((e: React.MouseEvent) => {
    // Если клик по кнопке, переходим на страницу фестивалей
    if ((e.target as HTMLElement).closest('button')) {
      e.stopPropagation();
      navigate('/festivals');
      return;
    }
    
    // Иначе открываем модалку с карточками
    refetchFestivals();
    setIsModalOpen(true);
  }, [refetchFestivals, navigate]);

  const totalSets = useMemo(
    () => cardSets.reduce((sum, set) => sum + set.setsAvailable, 0),
    [cardSets]
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div className={style.collectibleCard} onClick={handleClick}>
        <div className={style.cardImage}>
          <Package size={64} />
        </div>
        <div className={style.cardContent}>
          <h3>Коллекционные карточки</h3>
          <p className={style.description}>
            {festivals?.length > 0 
              ? `${festivals.length} фестивалей с карточками`
              : 'Загрузка фестивалей...'
            }
          </p>
          <div className={style.stats}>
            <span>Всего наборов: {totalSets}</span>
          </div>
          <button className={style.viewButton}>
            Посмотреть фестивали
          </button>
        </div>
      </div>

      <FestivalsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        cardSets={cardSets}
        festivals={festivals}
        events={events}
      />
    </>
  );
}, (prevProps, nextProps) => {
  return prevProps.cardSets === nextProps.cardSets;
});