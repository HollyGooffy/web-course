import { useState, useEffect, useCallback } from 'react';
import { festivalsApi, Festival } from '@shared/api/endpoints/festivals.endpoints';

// Кэши для разных типов фестивалей
let cachedFestivals: Festival[] = [];
let cachedFestivalsWithCards: Festival[] = [];
let cachedUpcomingFestivals: Festival[] = [];
let cacheTimestamps = {
  festivals: 0,
  festivalsWithCards: 0,
  upcomingFestivals: 0
};
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

/**
 * Публичный хук для получения фестивалей (без авторизации)
 */
export const useFestivals = () => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFestivals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Проверяем кэш
      const now = Date.now();
      if (cachedFestivals.length > 0 && (now - cacheTimestamps.festivals) < CACHE_DURATION) {
        setFestivals(cachedFestivals);
        setLoading(false);
        return;
      }

      const response = await festivalsApi.getAll();
      if (response.success) {
        // Кэшируем результат
        cachedFestivals = response.data;
        cacheTimestamps.festivals = now;
        
        setFestivals(response.data);
      } else {
        setError('Ошибка загрузки фестивалей');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки фестивалей');
      console.error('Error fetching festivals:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFestivals();
  }, [fetchFestivals]);

  return {
    festivals,
    loading,
    error,
    refetch: fetchFestivals,
  };
};

export const useFestivalsWithCards = () => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFestivalsWithCards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Проверяем кэш
      const now = Date.now();
      if (cachedFestivalsWithCards.length > 0 && (now - cacheTimestamps.festivalsWithCards) < CACHE_DURATION) {
        setFestivals(cachedFestivalsWithCards);
        setLoading(false);
        return;
      }
      setError(null);
      const response = await festivalsApi.getWithCards();
      if (response.success) {
        // Кэшируем результат
        cachedFestivalsWithCards = response.data;
        cacheTimestamps.festivalsWithCards = now;
        
        setFestivals(response.data);
      } else {
        setError('Ошибка загрузки фестивалей с карточками');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки фестивалей с карточками');
      console.error('Error fetching festivals with cards:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFestivalsWithCards();
  }, [fetchFestivalsWithCards]);

  return {
    festivals,
    loading,
    error,
    refetch: fetchFestivalsWithCards,
  };
};

export const useUpcomingFestivals = () => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUpcomingFestivals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Проверяем кэш
      const now = Date.now();
      if (cachedUpcomingFestivals.length > 0 && (now - cacheTimestamps.upcomingFestivals) < CACHE_DURATION) {
        setFestivals(cachedUpcomingFestivals);
        setLoading(false);
        return;
      }

      const response = await festivalsApi.getUpcoming();
      if (response.success) {
        // Кэшируем результат
        cachedUpcomingFestivals = response.data;
        cacheTimestamps.upcomingFestivals = now;
        
        setFestivals(response.data);
      } else {
        setError('Ошибка загрузки предстоящих фестивалей');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки предстоящих фестивалей');
      console.error('Error fetching upcoming festivals:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUpcomingFestivals();
  }, [fetchUpcomingFestivals]);

  return {
    festivals,
    loading,
    error,
    refetch: fetchUpcomingFestivals,
  };
};