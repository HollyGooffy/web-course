import React, { useMemo } from 'react';
import { Package, DollarSign } from 'lucide-react';
import { RegularCardSetsProps } from '../model/types';
import { getImageUrl } from '@shared/lib/utils/getImageUrl';
import { formatPrice } from '../lib/formatters';
import style from '../ui/FestivalCardsModal.module.css';

export const RegularCardSets = React.memo<RegularCardSetsProps>(({ cardSets, onBuySet }) => {
    const regularCardSets = useMemo(
        () => cardSets.filter(cardSet => !cardSet.isParticipantCards),
        [cardSets]
    );

    // Если нет обычных карточек, не показываем секцию вообще
    if (regularCardSets.length === 0) {
        return null;
    }

    return (
        <div className={style.cardSetsSection}>
            <h3>Доступные наборы карточек</h3>
            <div className={style.cardSetsGrid}>
                {regularCardSets.map((cardSet) => (
                    <div key={cardSet.id} className={style.cardSetItem}>
                        <div className={style.cardSetImage}>
                            {cardSet.image ? (
                                <img src={getImageUrl(cardSet.image) || ''} alt={cardSet.title} />
                            ) : (
                                <div className={style.noImage}>
                                    <Package size={32} />
                                </div>
                            )}
                        </div>

                        <div className={style.cardSetInfo}>
                            <h4>{cardSet.title}</h4>

                            <div className={style.details}>
                                <div className={style.detail}>
                                    <Package size={16} />
                                    <span>Карточек в наборе: {cardSet.cardsInSet}</span>
                                </div>

                                <div className={style.detail}>
                                    <span className={style.stock}>
                                        Доступно наборов: {cardSet.setsAvailable}
                                    </span>
                                </div>

                                <div className={style.price}>
                                    <DollarSign size={16} />
                                    <span>{formatPrice(cardSet.price)}</span>
                                </div>
                            </div>

                            <button
                                className={style.buyButton}
                                onClick={() => onBuySet(cardSet)}
                                disabled={cardSet.setsAvailable === 0}
                            >
                                {cardSet.setsAvailable > 0 ? 'Купить набор' : 'Нет в наличии'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    return prevProps.cardSets === nextProps.cardSets && 
           prevProps.onBuySet === nextProps.onBuySet;
});