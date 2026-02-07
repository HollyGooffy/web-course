import React, { useMemo, useCallback } from 'react';
import { Package } from 'lucide-react';
import { CardSetCard } from '@features/cards-display/ui/CardSetCard';
import { AllCardTypes } from '@features/cards-display';
import style from './CardsSettingsList.module.css';

interface CardsSettingsListProps {
  cards: AllCardTypes[];
  onEditCard: (card: AllCardTypes) => void;
  onDeleteCard: (card: AllCardTypes) => void;
}

export const CardsSettingsList = React.memo<CardsSettingsListProps>(({
  cards,
  onEditCard,
  onDeleteCard
}) => {
  // Мемоизируем проверку пустого состояния
  const isEmpty = useMemo(() => cards.length === 0, [cards.length]);

  // Мемоизируем обработчики для предотвращения перерендеров CardSetCard
  const handleEditCard = useCallback((card: AllCardTypes) => {
    onEditCard(card);
  }, [onEditCard]);

  const handleDeleteCard = useCallback((card: AllCardTypes) => {
    onDeleteCard(card);
  }, [onDeleteCard]);

  if (isEmpty) {
    return (
      <div className={style.emptyState}>
        <Package size={64} />
        <h3>Нет карточек для этого фестиваля</h3>
        <p>Карточки для этого фестиваля пока не созданы.</p>
        <p>Вы можете загрузить карточки участников через страницу управления фестивалями.</p>
      </div>
    );
  }

  return (
    <div className={style.cardsGrid}>
      {cards.map((card, index) => (
        <div 
          key={card.id} 
          className="cardFadeIn" 
          style={{ animationDelay: `${0.1 + index * 0.1}s` }}
        >
          <CardSetCard
            card={card}
            onEdit={handleEditCard}
            onDelete={handleDeleteCard}
          />
        </div>
      ))}
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.cards === nextProps.cards &&
         prevProps.onEditCard === nextProps.onEditCard &&
         prevProps.onDeleteCard === nextProps.onDeleteCard;
});