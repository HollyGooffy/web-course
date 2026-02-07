import { FestivalInfoProps } from '../model/types';
import { getImageUrl } from '@shared/lib/utils/getImageUrl';
import style from '../ui/ParticipantCardsModal.module.css';

export const FestivalInfo = ({ festival }: FestivalInfoProps) => {
    return (
        <>
            {festival.image && (
                <div className={style.festivalImage}>
                    <img src={getImageUrl(festival.image) || ''} alt={festival.name} />
                </div>
            )}

            {festival.description && (
                <div className={style.festivalDescription}>
                    <p>{festival.description}</p>
                </div>
            )}
        </>
    );
};