import { useState, useEffect } from 'react';
import { cardsApi, CardSet } from '@shared/api/endpoints/cards.endpoints';

/**
 * Хук для получения публичных карточек
 * Использует отдельный публичный API endpoint и возвращает все карточки
 */
export const usePublicCards = () => {
  const [cardSets, setCardSets] = useState<CardSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPublicCards = async () => {
    try {
      setLoading(true);
      setError(null);
      // Используем публичный эндпоинт
      const response = await cardsApi.getPublic();
      
      // Временное логирование для диагностики

      if (response.data && response.data.length > 0) {
        response.data.forEach((_card, _i) => {
          
        });
      }
      
      if (response.success) {
        setCardSets(response.data);
      } else {
        setError('Ошибка загрузки карточек');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки карточек');
      console.error('Error fetching public cards:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicCards();
  }, []);

  return {
    cardSets,
    loading,
    error,
    refetch: fetchPublicCards,
  };
};
