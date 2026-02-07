import { ExtendedCardSet } from '@shared/hooks/usePublicCardsWithParticipants';
import { Festival } from '@shared/api/endpoints/festivals.endpoints';
import { Event } from '@shared/api/endpoints/events.endpoints';

export interface FestivalWithCards {
  festival: Festival;
  cardSets: ExtendedCardSet[];
  events: Event[];
}

export const useFestivalsData = (
  cardSets: ExtendedCardSet[],
  festivals: Festival[],
  events: Event[]
) => {
  // Группируем карточки по фестивалям и добавляем события
  const festivalGroups: FestivalWithCards[] = [];

  // Если есть фестивали, показываем их все
  if (festivals.length > 0) {
    festivals.forEach(festival => {
      const festivalCards = cardSets.filter(cardSet => {
        // Проверяем различные форматы festivalId
        if (!cardSet.festivalId) return false;
        
        const match1 = typeof cardSet.festivalId === 'object' && cardSet.festivalId && cardSet.festivalId.id === festival.id;
        const match2 = cardSet.festivalId === festival.id;
        const match3 = typeof cardSet.festivalId === 'string' && cardSet.festivalId === festival.id;
        
        return match1 || match2 || match3;
      });
      
      // Находим события для этого фестиваля (по дате и месту)
      const festivalEvents = events.filter(event => {
        const eventDate = new Date(event.date).toDateString();
        const festivalDate = new Date(festival.date).toDateString();
        return eventDate === festivalDate && 
               (event.venue === festival.venue || event.address?.includes(festival.venue));
      });

      // Добавляем фестиваль в любом случае (с карточками или без)
      festivalGroups.push({
        festival,
        cardSets: festivalCards, // Может быть пустым массивом
        events: festivalEvents
      });
    });
  }

  // Обрабатываем карточки без привязки к фестивалю (festivalId: null)
  const orphanCards = cardSets.filter(cardSet => 
    !cardSet.festivalId || 
    cardSet.festivalId === null || 
    cardSet.festivalId === 'null' ||
    cardSet.festivalId === undefined
  );

  // Если нет фестивалей, но есть карточки, показываем все карточки как "общие"
  if (festivals.length === 0 && cardSets.length > 0) {
    const allCardsAsFestival: Festival = {
      id: 'all-cards',
      name: 'Все доступные карточки',
      date: new Date().toISOString(),
      venue: '',
      description: 'Все доступные наборы карточек',
      image: '',
      performers: [],
      status: 'upcoming',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    festivalGroups.push({
      festival: allCardsAsFestival,
      cardSets: cardSets, // Все карточки
      events: []
    });
  } else if (orphanCards.length > 0) {
    // Создаем виртуальный фестиваль для карточек без привязки (только если есть фестивали)
    const orphanFestival: Festival = {
      id: 'orphan-cards',
      name: 'Общие наборы карточек',
      date: new Date().toISOString(),
      venue: '',
      description: 'Наборы карточек без привязки к конкретному фестивалю',
      image: '',
      performers: [],
      status: 'upcoming',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    festivalGroups.push({
      festival: orphanFestival,
      cardSets: orphanCards,
      events: []
    });
  }

  // Сортируем группы: сначала реальные фестивали по дате (от новых к старым), потом виртуальные
  festivalGroups.sort((a, b) => {
    // Виртуальные фестивали в конец
    if (a.festival.id === 'orphan-cards') return 1;
    if (b.festival.id === 'orphan-cards') return -1;
    
    // Реальные фестивали по дате
    return new Date(b.festival.date).getTime() - new Date(a.festival.date).getTime();
  });

  return festivalGroups;
};