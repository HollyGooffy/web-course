import { useMemo, useCallback } from 'react';
import { CardSet } from '@shared/api/endpoints/cards.endpoints';
import { Festival } from '@shared/api/endpoints/festivals.endpoints';
import { ParticipantCard } from '@shared/api/endpoints/participantCards.endpoints';

interface ParticipantCardSet {
  id: string;
  title: string;
  description: string;
  price: number;
  cardsInSet: number;
  setsAvailable: number;
  festivalId: string;
  image: string | null;
  isParticipantCards: true;
  participantData: ParticipantCard;
  settings: any;
}

type AllCardTypes = (CardSet & { isParticipantCards: false }) | ParticipantCardSet;

interface UseCardSetsCalculationsProps {
  selectedFestival: Festival | null;
  cardSets: CardSet[];
  participantCards: ParticipantCard[] | undefined;
}

export const useCardSetsCalculations = ({
  selectedFestival,
  cardSets,
  participantCards
}: UseCardSetsCalculationsProps) => {
  
  const selectedFestivalCards = useMemo(() => {
    if (!selectedFestival) return [];
    
    return cardSets.filter(card => {
      if (!card.festivalId) return false;
      const festivalId = typeof card.festivalId === 'object' 
        ? card.festivalId.id 
        : card.festivalId;
      return festivalId === selectedFestival.id;
    });
  }, [selectedFestival, cardSets]);

  const selectedFestivalParticipantCards = useMemo(() => {
    if (!selectedFestival || !participantCards) return [];
    return participantCards.filter(card => card.festivalId === selectedFestival.id);
  }, [selectedFestival, participantCards]);

  const participantCardSets = useMemo((): ParticipantCardSet[] => {
    if (!selectedFestival) return [];

    // Получаем уникальные группы для выбранного фестиваля
    // Используем Map для гарантии уникальности по комбинации groupName + eventId
    const uniqueGroups = new Map<string, {
      groupName: string;
      eventId: string;
      festivalId: string;
      participantCard: ParticipantCard;
    }>();

    selectedFestivalParticipantCards.forEach(participantCard => {
      // Убеждаемся, что карточка принадлежит именно выбранному фестивалю
      if (participantCard.festivalId !== selectedFestival.id) {
        console.warn(`⚠️ Карточка группы ${participantCard.groupName} не принадлежит фестивалю ${selectedFestival.name}`);
        return;
      }

      const groupKey = `${participantCard.groupName}-${participantCard.eventId}`;
      
      if (!uniqueGroups.has(groupKey)) {
        uniqueGroups.set(groupKey, {
          groupName: participantCard.groupName,
          eventId: participantCard.eventId,
          festivalId: participantCard.festivalId,
          participantCard: participantCard
        });
      }
    });

    // ВАЖНО: Создаем карточки только для групп, которые реально существуют в базе данных
    const result = Array.from(uniqueGroups.values()).map(group => {
      // Используем только настройки из базы данных
      const dbSettings = group.participantCard.settings;

      return {
        id: `participant-group-${group.groupName}-${group.eventId}-${group.festivalId}`,
        title: group.groupName,
        description: `Набор карточек участников группы ${group.groupName}`,
        price: dbSettings?.price || 0,
        cardsInSet: group.participantCard.cards.length,
        setsAvailable: dbSettings?.setsAvailable || 0,
        festivalId: selectedFestival.id,
        image: null,
        isParticipantCards: true as const,
        participantData: group.participantCard,
        settings: dbSettings
      };
    });

    return result;
  }, [selectedFestivalParticipantCards, selectedFestival]);

  const allFestivalCards = useMemo((): AllCardTypes[] => {
    const regularCards = selectedFestivalCards.map(card => ({ ...card, isParticipantCards: false as const }));
    const result = [
      ...regularCards,
      ...participantCardSets
    ];

    return result;
  }, [selectedFestivalCards, participantCardSets]);

  // Мемоизируем функцию подсчета карточек отдельно
  const getCardSetsCount = useCallback((festival: Festival): number => {
    const regularCards = cardSets.filter(c => {
      if (!c.festivalId) return false;
      const festivalId = typeof c.festivalId === 'object' 
        ? c.festivalId.id 
        : c.festivalId;
      return festivalId === festival.id;
    }).length;
    
    const participantGroups = participantCards ? 
      new Set(
        participantCards
          .filter(card => card.festivalId === festival.id)
          .map(card => `${card.groupName}-${card.eventId}`)
      ).size : 0;
    
    return regularCards + participantGroups;
  }, [cardSets, participantCards]);

  return {
    selectedFestivalCards,
    selectedFestivalParticipantCards,
    participantCardSets,
    allFestivalCards,
    getCardSetsCount
  };
};
