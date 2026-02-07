import { Calendar, MapPin, Users, Package, Clock } from 'lucide-react';
import { Festival } from '@shared/api/endpoints/festivals.endpoints';
import { Event } from '@shared/api/endpoints/events.endpoints';
import { ExtendedCardSet } from '@shared/hooks/usePublicCardsWithParticipants';
import { EventStatusIndicator } from '@shared/ui/event-status-indicator';
import { getImageUrl } from '@shared/lib/utils/getImageUrl';
import style from '../ui/FestivalsModal.module.css';

interface FestivalWithCards {
  festival: Festival;
  cardSets: ExtendedCardSet[];
  events: Event[];
}

interface FestivalCardProps {
  festivalGroup: FestivalWithCards;
  onClick: (festivalGroup: FestivalWithCards) => void;
}

export const FestivalCard: React.FC<FestivalCardProps> = ({ festivalGroup, onClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const { festival, cardSets, events } = festivalGroup;

  return (
    <div 
      className={style.festivalCard}
      onClick={() => onClick(festivalGroup)}
    >
      {festival.image && (
        <div 
          className={style.festivalImage}
          style={{ backgroundImage: `url(${getImageUrl(festival.image)})` }}
        />
      )}
      
      <div className={style.festivalContent}>
        <div className={style.festivalHeader}>
          <h4>{festival.name}</h4>
          {festival.id !== 'orphan-cards' && (
            <EventStatusIndicator 
              event={{
                ...festival, 
                title: festival.name, 
                time: festival.time || '',
                address: festival.address || '',
                performers: events.flatMap(event => event.performers) || [],
                status: festival.status === 'ongoing' ? 'upcoming' : festival.status
              }}
              showAutoUpdate={true}
            />
          )}
        </div>

        <div className={style.festivalDetails}>
          {festival.id !== 'orphan-cards' && (
            <>
              <div className={style.detail}>
                <Calendar size={14} />
                <span>{formatDate(festival.date)}</span>
              </div>
              <div className={style.detail}>
                <Clock size={14} />
                <span>{festival.time}</span>
              </div>
              <div className={style.detail}>
                <MapPin size={14} />
                <span>{festival.venue}</span>
              </div>
              {events.length > 0 && (
                <div className={style.detail}>
                  <Users size={14} />
                  <span>{events.flatMap(event => event.performers).length} исполнителей</span>
                </div>
              )}
            </>
          )}
          <div className={style.detail}>
            <Package size={14} />
            <span>
              {cardSets.length > 0 
                ? `${cardSets.length} наборов карточек`
                : 'Карточек пока нет'
              }
            </span>
          </div>
        </div>

        {festival.description && (
          <p className={style.festivalDescription}>{festival.description}</p>
        )}
      </div>
    </div>
  );
};