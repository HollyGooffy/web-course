import { useState, useEffect } from 'react';
import { eventsApi, Event } from '@shared/api/endpoints/events.endpoints';

/**
 * Хук для публичной стороны - показывает события как есть, без автообновления статусов
 */
export const usePublicUpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUpcomingEvents = async () => {
    try {
      setError(null);
      const response = await eventsApi.getUpcoming();
      
      if (response.success) {
        const upcomingEvents = response.data.filter(event => event.status === 'upcoming');
        const now = new Date();
        
        const validEvents = upcomingEvents.filter(event => {
          const eventDate = new Date(event.date);
          // Устанавливаем время на конец дня события (23:59:59)
          eventDate.setHours(23, 59, 59, 999);
          // Показываем событие до конца дня
          return eventDate >= now;
        });
        
        // Сортируем предстоящие события по дате: от ближайших к дальним
        const sortedEvents = validEvents.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA.getTime() - dateB.getTime();
        });
        
        setEvents(sortedEvents);
      } else {
        console.error('🔍 DEBUG: API returned error:', response);
        setError('Ошибка загрузки событий');
      }
    } catch (err: any) {
      console.error('🔍 DEBUG: Exception occurred:', err);
      setError(err.message || 'Ошибка загрузки событий');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  // Автоматическое обновление каждые 5 минут для проверки новых событий
  useEffect(() => {
    const interval = setInterval(() => {
      fetchUpcomingEvents();
    }, 5 * 60 * 1000); // 5 минут

    return () => clearInterval(interval);
  }, []);

  // Проверка в полночь для обновления списка (когда события могут стать неактуальными)
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Полночь следующего дня
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const midnightTimeout = setTimeout(() => {
      fetchUpcomingEvents();
      
      // Устанавливаем интервал на каждую полночь
      const dailyInterval = setInterval(() => {
        fetchUpcomingEvents();
      }, 24 * 60 * 60 * 1000); // 24 часа
      
      return () => clearInterval(dailyInterval);
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimeout);
  }, []);

  return {
    events,
    loading,
    error,
  };
};

/**
 * Хук для получения всех публичных событий (включая завершенные)
 */
export const usePublicEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await eventsApi.getAll();
        if (response.success) {
          // Сортируем события по дате: от новых к старым
          const sortedEvents = response.data.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
          });
          
          setEvents(sortedEvents);
        } else {
          setError('Ошибка загрузки событий');
        }
      } catch (err: any) {
        setError(err.message || 'Ошибка загрузки событий');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return {
    events,
    loading,
    error,
  };
};