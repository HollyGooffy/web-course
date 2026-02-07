import { Package, DollarSign } from 'lucide-react';
import { CardsFan } from '@features/participant-cards/components/CardsFan';
import { ParticipantCardSetsProps } from '../model/types';
import { formatPrice } from '../lib/formatters';
import style from '../ui/FestivalCardsModal.module.css';

export const ParticipantCardSets = ({ 
    cardSets, 
    participantCardsData, 
    onBuySet 
}: ParticipantCardSetsProps) => {
    const participantCardSets = cardSets.filter(cardSet => cardSet.isParticipantCards);

    if (participantCardSets.length === 0) {
        return null;
    }

    return (
        <div className={style.participantCardsSection}>
            <h3>Карточки участников</h3>
            <div className={style.participantCardsGrid}>
                {participantCardSets.map(cardSet => {
                    if (!cardSet.participantData) return null;
                    
                    const savedCards = participantCardsData[cardSet.id] || [];
                    
                    return (
                        <div key={cardSet.id} className={style.participantCardSet}>
                            <div className={style.participantCardInfo}>
                                <h4>{cardSet.title}</h4>
                                <div className={style.participantDetails}>
                                    <div className={style.participantCardPreview}>
                                        {savedCards.length > 0 ? (
                                            <CardsFan
                                                cards={savedCards}
                                                readonly={true}
                                                previewMode={true}
                                                onRemoveCard={() => {}}
                                            />
                                        ) : (
                                            <div className={style.loadingCards}>
                                                <Package size={48} />
                                                <p>Карточки участников недоступны</p>
                                            </div>
                                        )}
                                    </div>

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
                    );
                })}
            </div>
        </div>
    );
};