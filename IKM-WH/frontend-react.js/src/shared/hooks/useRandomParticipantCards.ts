import { useState, useEffect, useCallback, useMemo } from 'react';
import { getParticipantCardImageUrl } from '@shared/api/endpoints/participantCards.endpoints';

interface RandomCard {
  src: string;
  alt: string;
  groupName: string;
}

// Кэш для предотвращения повторных запросов
let cachedRandomCards: RandomCard[] = [];
let cachedGroupName: string | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

export const useRandomParticipantCards = () => {
  const [randomCards, setRandomCards] = useState<RandomCard[]>([]);
  const [randomGroupName, setRandomGroupName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Функция для получения случайных карточек из API
  const fetchRandomCards = useCallback(async () => {
    try {
      setLoading(true);
      
      // Проверяем кэш
      const now = Date.now();
      if (cachedRandomCards.length > 0 && (now - cacheTimestamp) < CACHE_DURATION) {
        setRandomCards(cachedRandomCards);
        setRandomGroupName(cachedGroupName);
        setLoading(false);
        return;
      }

      // Делаем ОДИН запрос к специальному эндпоинту для случайных карточек
      const response = await fetch('/api/participant-cards/random?limit=9');
      
      if (!response.ok) {
        throw new Error('Failed to fetch random cards');
      }

      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        const cardsForDisplay: RandomCard[] = data.data.map((card: any, index: number) => ({
          src: getParticipantCardImageUrl(card.filename),
          alt: `${card.groupName} - участник ${index + 1}`,
          groupName: card.groupName
        }));

        // Кэшируем результат
        cachedRandomCards = cardsForDisplay;
        cachedGroupName = data.data[0]?.groupName || null;
        cacheTimestamp = now;

        setRandomCards(cardsForDisplay);
        setRandomGroupName(cachedGroupName);
      } else {
        setRandomCards([]);
        setRandomGroupName(null);
      }
    } catch (error) {
      console.error('Error fetching random participant cards:', error);
      setRandomCards([]);
      setRandomGroupName(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandomCards();
  }, [fetchRandomCards]);

  // Мемоизируем функцию обновления
  const refreshRandomCards = useCallback(() => {
    // Сбрасываем кэш при принудительном обновлении
    cacheTimestamp = 0;
    fetchRandomCards();
  }, [fetchRandomCards]);

  // Мемоизируем результат
  const hasCards = useMemo(() => randomCards.length > 0, [randomCards.length]);

  return {
    randomCards,
    randomGroupName,
    loading,
    refreshRandomCards,
    hasCards
  };
};