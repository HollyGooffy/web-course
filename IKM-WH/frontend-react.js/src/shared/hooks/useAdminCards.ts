import { useState, useEffect } from 'react';
import { cardsApi, CardSet, CreateCardSetData, UpdateCardSetData } from '@shared/api/endpoints/cards.endpoints';

export const useAdminCards = () => {
  const [cardSets, setCardSets] = useState<CardSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCardSets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await cardsApi.getAll();
      
      // Временное логирование для диагностики

      if (response.data && response.data.length > 0) {
        response.data.forEach((_card, _i) => {
          
        });
      }
      
      if (response.success) {
        // В админке показываем все карточки без фильтрации
        setCardSets(response.data);
      } else {
        setError('Ошибка загрузки наборов карточек');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки наборов карточек');
      console.error('Error fetching card sets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardSets();
  }, []);

  const createCardSet = async (data: CreateCardSetData, imageFile?: File) => {
    try {

      const response = await cardsApi.create(data, imageFile);

      if (response.success) {
        
        setCardSets(prev => {
          const newState = [...prev, response.data];
          
          return newState;
        });
        return response.data;
      }
      throw new Error('Ошибка создания набора карточек');
    } catch (err: any) {
      
      setError(err.message || 'Ошибка создания набора карточек');
      throw err;
    }
  };

  const updateCardSet = async (id: string, data: UpdateCardSetData, imageFile?: File) => {
    try {

      const response = await cardsApi.update(id, data, imageFile);

      if (response.success) {
        
        setCardSets(prev => {
          const newState = prev.map(cardSet => 
            cardSet.id === id ? response.data : cardSet
          );
          
          return newState;
        });
        return response.data;
      }
      throw new Error('Ошибка обновления набора карточек');
    } catch (err: any) {
      
      setError(err.message || 'Ошибка обновления набора карточек');
      throw err;
    }
  };

  const deleteCardSet = async (id: string) => {
    try {
      setError(null);
      const response = await cardsApi.delete(id);
      if (response.success) {
        setCardSets(prev => prev.filter(cardSet => cardSet.id !== id));
        return true;
      } else {
        throw new Error('Ошибка удаления набора карточек');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Ошибка удаления набора карточек';
      setError(errorMessage);
      console.error('Error deleting card set:', err);
      throw err;
    }
  };

  return {
    cardSets,
    loading,
    error,
    refetch: fetchCardSets,
    createCardSet,
    updateCardSet,
    deleteCardSet,
  };
};
