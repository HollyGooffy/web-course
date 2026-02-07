import { X, Package, Calendar, DollarSign, MapPin } from 'lucide-react';
import style from './CardsModal.module.css';
import { CardSet } from '@shared/api/endpoints/cards.endpoints';
import { getImageUrl } from '@shared/lib/utils/getImageUrl';

interface CardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardSets: CardSet[];
}

interface FestivalGroup {
  festival: {
    id: string;
    name: string;
    date: string;
    venue: string;
  };
  cardSets: CardSet[];
}

export const CardsModal: React.FC<CardsModalProps> = ({ isOpen, onClose, cardSets }) => {
  if (!isOpen) return null;

  const festivalGroups: FestivalGroup[] = [];
  
  cardSets.forEach(cardSet => {
    if (typeof cardSet.festivalId === 'object' && cardSet.festivalId) {
      const existingGroup = festivalGroups.find(group => 
        group.festival.id === (cardSet.festivalId as any).id
      );
      
      if (existingGroup) {
        existingGroup.cardSets.push(cardSet);
      } else {
        festivalGroups.push({
          festival: {
            id: cardSet.festivalId.id,
            name: cardSet.festivalId.name,
            date: cardSet.festivalId.date,
            venue: cardSet.festivalId.venue,
          },
          cardSets: [cardSet]
        });
      }
    }
  });

  festivalGroups.sort((a, b) => new Date(a.festival.date).getTime() - new Date(b.festival.date).getTime());

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={style.modalHeader}>
          <h2>Коллекционные карточки</h2>
          <button className={style.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className={style.modalBody}>
          {festivalGroups.length === 0 ? (
            <div className={style.emptyState}>
              <Package size={48} />
              <h3>Пока нет доступных наборов</h3>
              <p>Следите за обновлениями, скоро появятся новые коллекционные карточки!</p>
            </div>
          ) : (
            <div className={style.festivalsContainer}>
              {festivalGroups.map((group) => (
                <div key={group.festival.id} className={style.festivalGroup}>
                  <div className={style.festivalHeader}>
                    <div className={style.festivalInfo}>
                      <h3>{group.festival.name}</h3>
                      <div className={style.festivalMeta}>
                        <div className={style.metaItem}>
                          <Calendar size={14} />
                          <span>{formatDate(group.festival.date)}</span>
                        </div>
                        <div className={style.metaItem}>
                          <MapPin size={14} />
                          <span>{group.festival.venue}</span>
                        </div>
                      </div>
                    </div>
                    <div className={style.festivalStats}>
                      <span>{group.cardSets.length} наборов</span>
                    </div>
                  </div>

                  <div className={style.cardSetsGrid}>
                    {group.cardSets.map((cardSet) => (
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

                          <button className={style.buyButton}>
                            Купить набор
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};