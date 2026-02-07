import { Users } from 'lucide-react';
import { FestivalInfoProps } from '../model/types';
import { getImageUrl } from '@shared/lib/utils/getImageUrl';
import style from '../ui/FestivalCardsModal.module.css';

export const FestivalInfo = ({ festival, events }: FestivalInfoProps) => {
    return (
        <div className={style.festivalDetails}>
            {festival.image && (
                <div className={style.festivalImage}>
                    <img src={getImageUrl(festival.image) || ''} alt={festival.name} />
                </div>
            )}

            <div className={style.festivalDescription}>
                {festival.description && (
                    <p>{festival.description}</p>
                )}

                {/* Показываем исполнителей */}
                {events.length > 0 && (
                    <div className={style.performers}>
                        <div className={style.performersHeader}>
                            <Users size={18} />
                            <span>Выступают на фестивале:</span>
                        </div>
                        <div className={style.performersList}>
                            {events.map(event =>
                                event.performers.map((performer, index) => (
                                    <span key={`${event.id}-${index}`} className={style.performer}>
                                        {performer}
                                    </span>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};