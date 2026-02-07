import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParticipantCards } from '@features/participant-cards/model/hooks/useParticipantCards';
import { useFestivals } from './useFestivals';
import { ParticipantCard } from '@shared/api/endpoints/participantCards.endpoints';

export const useAllParticipantCards = () => {
  const { getCardsByFestival } = useParticipantCards();
  const { festivals, loading: festivalsLoading } = useFestivals();
  const [participantCards, setParticipantCards] = useState<ParticipantCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Мемоизируем функцию загрузки для предотвращения циклических зависимостей
  const loadAllCards = useCallback(async () => {
    if (festivalsLoading || festivals.length === 0) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const allCards: ParticipantCard[] = [];
      
      // Используем Promise.allSettled для параллельной загрузки
      const results = await Promise.allSettled(
        festivals.map(festival => getCardsByFestival(festival.id))
      );

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          allCards.push(...result.value);
        }
        // Игнорируем rejected промисы
      });
      
      setParticipantCards(allCards);
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки карточек участников');
      console.error('Error loading all participant cards:', err);
    } finally {
      setLoading(false);
    }
  }, [festivals, getCardsByFestival, festivalsLoading]);

  // Мемоизируем ключ для useEffect
  const festivalsKey = useMemo(() => 
    festivals.map(f => f.id).join(','), 
    [festivals]
  );

  useEffect(() => {
    if (!festivalsLoading && festivals.length > 0) {
      loadAllCards();
    }
  }, [festivalsLoading, festivalsKey]); // Используем festivalsKey вместо festivals

  // Мемоизируем итоговое состояние загрузки
  const isLoading = useMemo(() => 
    loading || festivalsLoading, 
    [loading, festivalsLoading]
  );

  return {
    participantCards,
    loading: isLoading,
    error,
    refetch: loadAllCards
  };
};