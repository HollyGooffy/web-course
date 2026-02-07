import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Edit, Trash2, Package } from 'lucide-react';
import { AdminBtn } from '@shared/ui/adminPage';
import { ParticipantCardsDisplay } from '@features/participant-cards';
import { useParticipantCards } from '@features/participant-cards/model/hooks/useParticipantCards';
import { CompressedImage } from '@shared/lib/utils/imageCompression';
import { getImageUrl } from '@shared/lib/utils/getImageUrl';
import { CardSetCardProps } from '@features/cards-display';
import { formatPrice } from '@features/cards-display/lib/formatters';
import style from './CardSetCard.module.css';

export const CardSetCard = React.memo<CardSetCardProps>(({
  card,
  onEdit,
  onDelete
}) => {
  const { getCardsByGroup } = useParticipantCards();
  const [participantCards, setParticipantCards] = useState<CompressedImage[]>([]);
  const [loadingCards, setLoadingCards] = useState(false);

  // Мемоизируем ключевые значения для предотвращения лишних рендеров
  const cardKey = useMemo(() => {
    if (!card.isParticipantCards) return null;
    const participantData = (card as any).participantData;
    if (!participantData) return null;
    return `${card.festivalId}-${participantData.groupName}-${participantData.eventId}`;
  }, [card]);

  const imageUrl = useMemo(() => {
    return card.image ? getImageUrl(card.image) : null;
  }, [card.image]);

  const formattedPrice = useMemo(() => formatPrice(card.price), [card.price]);

  // Мемоизируем функцию загрузки карточек
  const loadParticipantCards = useCallback(async () => {
    if (!card.isParticipantCards || !cardKey) {
      return;
    }

    const participantData = (card as any).participantData;
    if (!participantData) return;

    setLoadingCards(true);
    try {
      const cards = await getCardsByGroup(
        card.festivalId as string,
        participantData.groupName,
        participantData.eventId
      );
      setParticipantCards(cards);
    } catch (error) {
      console.error('Error loading participant cards:', error);
      setParticipantCards([]);
    } finally {
      setLoadingCards(false);
    }
  }, [cardKey, getCardsByGroup, card.festivalId, card.isParticipantCards]);

  useEffect(() => {
    loadParticipantCards();
  }, [loadParticipantCards]);

  const handleEdit = useCallback(() => {
    onEdit(card);
  }, [onEdit, card]);

  const handleDelete = useCallback(() => {
    onDelete(card);
  }, [onDelete, card]);

  return (
    <div className={style.cardItem}>
      <div className={style.cardImage}>
        {card.isParticipantCards ? (
          <div className={style.participantCardsPreview}>
            {loadingCards ? (
              <div className={style.loading}>Загрузка карточек...</div>
            ) : participantCards.length > 0 ? (
              <ParticipantCardsDisplay
                groupId={`preview-${card.id}`}
                groupName={(card as any).participantData?.groupName || 'Участники'}
                readonly={true}
                maxCards={9}
                initialCards={participantCards}
                previewMode={true}
              />
            ) : (
              <div className={style.noCards}>
                <Package size={32} />
                <span>Нет карточек</span>
              </div>
            )}
          </div>
        ) : card.image ? (
          <img src={imageUrl || ''} alt={card.title} />
        ) : (
          <div className={style.noImage}>
            <Package size={32} />
          </div>
        )}
      </div>

      <div className={style.cardContent}>
        <h3>{card.title}</h3>

        <div className={style.details}>
          <div className={style.detail}>
            <span className={style.label}>Карточек в наборе:</span>
            <span>{card.cardsInSet}</span>
          </div>

          <div className={style.detail}>
            <span className={style.label}>Доступно наборов:</span>
            <span className={card.setsAvailable > 0 ? style.inStock : style.outOfStock}>
              {card.setsAvailable}
            </span>
          </div>

          <div className={style.price}>
            {formattedPrice}
          </div>
        </div>

        <div className={style.actions}>
          <AdminBtn variant="secondary" onClick={handleEdit}>
            <Edit size={16} />
            {card.isParticipantCards ? 'Цена' : 'Редактировать'}
          </AdminBtn>
          <AdminBtn variant="outline" onClick={handleDelete}>
            <Trash2 size={16} />
            Удалить
          </AdminBtn>
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.card.id === nextProps.card.id &&
         prevProps.card.title === nextProps.card.title &&
         prevProps.card.price === nextProps.card.price &&
         prevProps.card.setsAvailable === nextProps.card.setsAvailable &&
         prevProps.onEdit === nextProps.onEdit &&
         prevProps.onDelete === nextProps.onDelete;
});