import { X } from 'lucide-react';
import { CompressedImage, formatFileSize } from '@shared/lib/utils/imageCompression';
import style from '../ui/ParticipantCardsDisplay.module.css';

interface CardsFanProps {
  cards: CompressedImage[];
  readonly: boolean;
  previewMode: boolean;
  onRemoveCard: (index: number) => void;
}

export const CardsFan: React.FC<CardsFanProps> = ({
  cards,
  readonly,
  previewMode,
  onRemoveCard,
}) => {
  const getCardStyle = (index: number, total: number) => {
    if (total === 1) {
      return { transform: 'rotate(0deg)', zIndex: 1 };
    }

    const maxAngle = Math.min(60, total * 8);
    const angleStep = total > 1 ? maxAngle / (total - 1) : 0;
    const startAngle = -maxAngle / 2;
    const rotation = startAngle + (index * angleStep);

    const verticalOffset = Math.abs(rotation) * 0.5;

    return {
      transform: `rotate(${rotation}deg) translateY(${verticalOffset}px)`,
      zIndex: total - Math.abs(index - Math.floor(total / 2)),
      transformOrigin: 'center bottom'
    };
  };

  return (
    <div className={style.cardsContainer}>
      <div className={style.fanContainer}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={style.card}
            style={getCardStyle(index, cards.length)}
          >
            <img
              src={card.dataUrl}
              alt={`Карточка участника ${index + 1}`}
              className={style.cardImage}
            />
            
            {!readonly && !previewMode && (
              <button
                className={style.removeButton}
                onClick={() => onRemoveCard(index)}
                title="Удалить карточку"
              >
                <X size={16} />
              </button>
            )}

            {!previewMode && (
              <div className={style.cardInfo}>
                <span className={style.fileSize}>
                  {formatFileSize(card.compressedSize)}
                </span>
                {card.compressionRatio > 0 && (
                  <span className={style.compression}>
                    -{card.compressionRatio}%
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};