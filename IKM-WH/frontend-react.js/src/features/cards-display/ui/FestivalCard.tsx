import React, { useMemo } from 'react';
import { Calendar, MapPin, CreditCard, UserX } from 'lucide-react';
import { AdminBtn } from '@shared/ui/adminPage';
import { getImageUrl } from '@shared/lib/utils/getImageUrl';
import { FestivalCardProps } from '@features/cards-display';
import { formatDate } from '@features/cards-display/lib/formatters';
import style from './FestivalCard.module.css';

export const FestivalCard = React.memo<FestivalCardProps>(({
  festival,
  cardSetsCount,
  onSelect,
  onOpenParticipantCards,
  onDeleteParticipantCards
}) => {
  const formattedDate = useMemo(() => formatDate(festival.date), [festival.date]);
  const imageUrl = useMemo(() => getImageUrl(festival.image), [festival.image]);
  return (
    <div className={style.festivalCard}>
      <div className={style.festivalCardImage}>
        {festival.image ? (
          <img src={imageUrl || ''} alt={festival.name} />
        ) : (
          <div className={style.noImage}>
            <Calendar size={32} />
          </div>
        )}
      </div>

      <div className={style.festivalCardContent}>
        <h3>{festival.name}</h3>
        
        <div className={style.festivalCardMeta}>
          <div className={style.metaItem}>
            <Calendar size={14} />
            <span>{formattedDate}</span>
          </div>
          <div className={style.metaItem}>
            <MapPin size={14} />
            <span>{festival.venue}</span>
          </div>
        </div>

        <div className={style.cardStats}>
          <span>Наборов карточек: {cardSetsCount}</span>
        </div>

        <div className={style.festivalActions}>
          <div className={style.festivalActionsRow}>
            <AdminBtn variant="secondary" onClick={() => onSelect(festival)}>
              Управлять карточками
            </AdminBtn>
            <AdminBtn variant="primary" onClick={() => onOpenParticipantCards(festival)}>
              <CreditCard size={16} />
              Карточки участников
            </AdminBtn>
          </div>
          {onDeleteParticipantCards && (
            <div className={style.festivalActionsRow}>
              <AdminBtn 
                variant="outline" 
                onClick={() => onDeleteParticipantCards(festival)}
                className={style.deleteParticipantCardsBtn}
              >
                <UserX size={16} />
                Удалить карточки участников
              </AdminBtn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.festival.id === nextProps.festival.id &&
         prevProps.cardSetsCount === nextProps.cardSetsCount &&
         prevProps.onSelect === nextProps.onSelect &&
         prevProps.onOpenParticipantCards === nextProps.onOpenParticipantCards &&
         prevProps.onDeleteParticipantCards === nextProps.onDeleteParticipantCards;
});