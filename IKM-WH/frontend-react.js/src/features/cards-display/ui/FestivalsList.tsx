import React, { useEffect, useState } from 'react';
import { Plus, Calendar } from 'lucide-react';
import { AdminBtn } from '@shared/ui/adminPage';
import { FestivalCard } from './FestivalCard';
import { FestivalsListProps } from '@features/cards-display';
import style from './FestivalsList.module.css';

export const FestivalsList: React.FC<FestivalsListProps> = ({
  festivals,
  cardSets,
  getCardsByFestival,
  onCreateFestival,
  onSelectFestival,
  onEditFestival,
  onDeleteFestival,
  onOpenParticipantCards,
  onDeleteParticipantCards
}) => {
  const [participantCardsCounts, setParticipantCardsCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadParticipantCardsCounts = async () => {
      const counts: Record<string, number> = {};
      
      for (const festival of festivals) {
        try {
          const participantCards = await getCardsByFestival(festival.id);
          counts[festival.id] = participantCards.length;
        } catch (error) {
          console.error('Error loading participant cards count for festival:', festival.id, error);
          counts[festival.id] = 0;
        }
      }
      
      setParticipantCardsCounts(counts);
    };

    if (festivals.length > 0) {
      loadParticipantCardsCounts();
    }
  }, [festivals, getCardsByFestival]);

  const getCardSetsCount = (festival: any) => {
    const regularCards = cardSets.filter(c => {
      if (!c.festivalId) return false;
      const festivalId = typeof c.festivalId === 'object' 
        ? c.festivalId.id 
        : c.festivalId;
      return festivalId === festival.id;
    }).length;
    
    // Добавляем карточки участников из состояния
    const participantCardsCount = participantCardsCounts[festival.id] || 0;
    
    return regularCards + participantCardsCount;
  };

  if (festivals.length === 0) {
    return (
      <div className={style.emptyState}>
        <Calendar size={64} />
        <h3>Нет фестивалей</h3>
        <p>Создайте первый фестиваль для управления карточками</p>
        <AdminBtn variant="primary" onClick={onCreateFestival}>
          <Plus size={16} />
          Создать фестиваль
        </AdminBtn>
      </div>
    );
  }

  return (
    <div className={style.festivalsGrid}>
      {festivals.map((festival, index) => (
        <div key={festival.id} className="cardFadeIn" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
          <FestivalCard
            festival={festival}
            cardSetsCount={getCardSetsCount(festival)}
            onSelect={onSelectFestival}
            onEdit={onEditFestival}
            onDelete={onDeleteFestival}
            onOpenParticipantCards={onOpenParticipantCards}
            onDeleteParticipantCards={onDeleteParticipantCards}
          />
        </div>
      ))}
    </div>
  );
};