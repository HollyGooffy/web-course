import { useState, useMemo } from 'react';
import { usePublicCards } from './usePublicCards';
import { useAllParticipantCards } from './useAllParticipantCards';
import { ParticipantCard } from '@shared/api/endpoints/participantCards.endpoints';
import { CardSet } from '@shared/api/endpoints/cards.endpoints';

export interface ExtendedCardSet extends CardSet {
  description?: string;
  isParticipantCards?: boolean;
  participantData?: {
    groupName: string;
    eventId: string;
    cardsCount: number;
    participantCardId: string;
  };
}

export const usePublicCardsWithParticipants = () => {
  const [error, setError] = useState<string | null>(null);
  
  const { participantCards, loading: participantLoading } = useAllParticipantCards();
  const { cardSets: publicCardSets, loading: cardsLoading, error: cardsError } = usePublicCards();

  // Мемоизируем обработку карточек участников
  const participantCardSets = useMemo(() => {
    if (!participantCards || participantCards.length === 0) {
      return [];
    }

    const cardSets: ExtendedCardSet[] = [];
    
    participantCards.forEach((participantCard: ParticipantCard) => {
      const cardSettings = participantCard.settings;

      if (!participantCard.festivalId || !participantCard.eventId || !participantCard.groupName) {
        return;
      }

      if (cardSettings && cardSettings.isActive && cardSettings.setsAvailable > 0) {
        const uniqueId = `participant-${participantCard._id}`;
        
        cardSets.push({
          id: uniqueId,
          title: `${participantCard.groupName}`,
          price: cardSettings.price,
          cardsInSet: participantCard.cards.length,
          setsAvailable: cardSettings.setsAvailable,
          festivalId: participantCard.festivalId,
          image: undefined,
          isParticipantCards: true,
          participantData: {
            groupName: participantCard.groupName,
            eventId: participantCard.eventId,
            cardsCount: participantCard.cards.length,
            participantCardId: participantCard._id
          },
          createdAt: participantCard.createdAt,
          updatedAt: participantCard.updatedAt
        });
      }
    });

    return cardSets;
  }, [participantCards]);

  // Мемоизируем объединение всех карточек
  const allCardSets = useMemo(() => {
    const regularCards = publicCardSets || [];
    
    return [
      ...regularCards.map(card => ({ ...card, isParticipantCards: false })),
      ...participantCardSets
    ];
  }, [publicCardSets, participantCardSets]);

  const loading = participantLoading || cardsLoading;
  const combinedError = error || cardsError;

  // Функция для принудительного обновления
  const refetch = useMemo(() => {
    return () => {
      setError(null);
      // Здесь можно добавить логику для принудительного обновления
    };
  }, []);

  return {
    cardSets: allCardSets,
    loading,
    error: combinedError,
    refetch,
  };
};