import { useState, useEffect } from 'react';
import { eventsApi, Event, CreateEventData, UpdateEventData } from '@shared/api/endpoints/events.endpoints';
import { updateEventsStatuses, shouldUpdateEventStatus } from '@shared/lib/utils/eventStatusUpdater';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedEventsCount, setUpdatedEventsCount] = useState(0);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventsApi.getAll();
      if (response.success) {
        const updatedEvents = updateEventsStatuses(response.data);
        
        const eventsToUpdate = updatedEvents.filter((_event, index) => {
          const originalEvent = response.data[index];
          return originalEvent && shouldUpdateEventStatus(originalEvent);
        });
        
        if (eventsToUpdate.length > 0) {
          setUpdatedEventsCount(eventsToUpdate.length);
          
          eventsToUpdate.forEach(async (eventToUpdate) => {
            try {
              await eventsApi.update(eventToUpdate.id, { status: 'completed' });
            } catch (err) {
              console.error('Error updating event status:', err);
            }
          });
        }
        
        setEvents(updatedEvents);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents(prevEvents => {
        const updatedEvents = updateEventsStatuses(prevEvents);
        const changedEvents = updatedEvents.filter((event, index) =>
          event.status !== prevEvents[index]?.status
        );
        
        if (changedEvents.length > 0) {
          setUpdatedEventsCount(changedEvents.length);
          changedEvents.forEach(async (changedEvent) => {
            try {
              await eventsApi.update(changedEvent.id, { status: changedEvent.status });
            } catch (err) {
              console.error('Error updating event status:', err);
            }
          });
          
          return updatedEvents;
        }
        
        return prevEvents;
      });
    }, 15 * 60 * 1000); // 15 минут

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);

  const createEvent = async (data: CreateEventData, imageFile?: File) => {
    try {
      const response = await eventsApi.create(data, imageFile);
      if (response.success) {
        setEvents(prev => [...prev, response.data]);
        return response.data;
      }
      throw new Error('Ошибка создания события');
    } catch (err: any) {
      setError(err.message || 'Ошибка создания события');
      throw err;
    }
  };

  const updateEvent = async (id: string, data: UpdateEventData, imageFile?: File) => {
    try {
      const response = await eventsApi.update(id, data, imageFile);
      if (response.success) {
        setEvents(prev => prev.map(event => 
          event.id === id ? response.data : event
        ));
        return response.data;
      }
      throw new Error('Ошибка обновления события');
    } catch (err: any) {
      setError(err.message || 'Ошибка обновления события');
      throw err;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const response = await eventsApi.delete(id);
      if (response.success) {
        setEvents(prev => prev.filter(event => event.id !== id));
      } else {
        throw new Error('Ошибка удаления события');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка удаления события');
      throw err;
    }
  };

  const clearUpdatedEventsCount = () => {
    setUpdatedEventsCount(0);
  };

  return {
    events,
    loading,
    error,
    updatedEventsCount,
    refetch: fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    clearUpdatedEventsCount,
  };
};

export const useUpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await eventsApi.getUpcoming();
        if (response.success) {
          const upcomingEvents = response.data.filter(event => event.status === 'upcoming');
          
          const sortedEvents = upcomingEvents.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
          });
          
          setEvents(sortedEvents);
        } else {
          setError('Ошибка загрузки событий');
        }
      } catch (err: any) {
        setError(err.message || 'Ошибка загрузки событий');
        console.error('Error fetching upcoming events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return {
    events,
    loading,
    error,
  };
};
