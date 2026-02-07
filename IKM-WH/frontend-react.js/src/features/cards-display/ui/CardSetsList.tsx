import React from 'react';
import { Package } from 'lucide-react';
import { CardSetCard } from './CardSetCard';
import { CardSetsListProps } from '@features/cards-display';
import style from './CardSetsList.module.css';

export const CardSetsList: React.FC<CardSetsListProps> = ({
  cards,
  onEditCard,
  onDeleteCard
}) => {
  if (cards.length === 0) {
    return (
      <div className={style.emptyState}>
        <Package size={64} />
        <h3>Нет карточек для этого фестиваля</h3>
        <p>Загрузите карточки участников через кнопку "Карточки участников" на странице фестивалей. Карточки будут автоматически сгруппированы по группам участников.</p>
      </div>
    );
  }

  return (
    <div className={style.cardsGrid}>
      {cards.map((card, index) => (
        <div key={card.id} className="cardFadeIn" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
          <CardSetCard
            card={card}
            onEdit={onEditCard}
            onDelete={onDeleteCard}
          />
        </div>
      ))}
    </div>
  );
};