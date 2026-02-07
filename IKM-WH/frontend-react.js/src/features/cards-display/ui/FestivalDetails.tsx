import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { getImageUrl } from '@shared/lib/utils/getImageUrl';
import { FestivalDetailsProps } from '@features/cards-display';
import { formatDate } from '@features/cards-display/lib/formatters';
import style from './FestivalDetails.module.css';

export const FestivalDetails: React.FC<FestivalDetailsProps> = ({ festival }) => {
  return (
    <div className={style.festivalInfo}>
      <div className={style.festivalHeader}>
        {festival.image && (
          <img 
            src={getImageUrl(festival.image) || ''} 
            alt={festival.name}
            className={style.festivalImage}
          />
        )}
        <div className={style.festivalDetails}>
          <h2>{festival.name}</h2>
          <div className={style.festivalMeta}>
            <div className={style.metaItem}>
              <Calendar size={16} />
              <span>{formatDate(festival.date)}</span>
            </div>
            <div className={style.metaItem}>
              <MapPin size={16} />
              <span>{festival.venue}</span>
            </div>
          </div>
          {festival.description && (
            <p className={style.festivalDescription}>{festival.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};