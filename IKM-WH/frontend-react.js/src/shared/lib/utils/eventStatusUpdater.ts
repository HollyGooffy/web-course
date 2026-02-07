import { Event } from '@shared/api/endpoints/events.endpoints';

/**
 * Проверяет и обновляет статус события на основе текущей даты
 * Событие считается завершенным только после конца дня
 */
export const updateEventStatus = (event: Event): Event => {
  const now = new Date();
  const eventDate = new Date(event.date);
  
  // Устанавливаем время события на конец дня для корректного сравнения
  eventDate.setHours(23, 59, 59, 999);
  
  // Проверяем когда было создано событие
  const createdAt = new Date(event.createdAt);
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000); // 1 час назад
  
  // Если событие было "upcoming", конец дня прошел И событие создано более часа назад
  if (event.status === 'upcoming' && 
      eventDate < now && 
      createdAt < oneHourAgo) {
    return {
      ...event,
      status: 'completed'
    };
  }
  
  return event;
};

/**
 * Обновляет статусы для массива событий
 */
export const updateEventsStatuses = (events: Event[]): Event[] => {
  return events.map(updateEventStatus);
};

/**
 * Проверяет нужно ли обновить статус события
 * Событие обновляется только после конца дня и через час после создания
 */
export const shouldUpdateEventStatus = (event: Event): boolean => {
  const now = new Date();
  const eventDate = new Date(event.date);
  eventDate.setHours(23, 59, 59, 999); // Конец дня события
  
  // Проверяем когда было создано событие
  const createdAt = new Date(event.createdAt);
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000); // 1 час назад
  
  // Обновляем статус только если:
  // 1. Событие в статусе "upcoming"
  // 2. Конец дня события прошел
  // 3. Событие было создано более часа назад (чтобы не трогать свежие события)
  return event.status === 'upcoming' && 
         eventDate < now && 
         createdAt < oneHourAgo;
};