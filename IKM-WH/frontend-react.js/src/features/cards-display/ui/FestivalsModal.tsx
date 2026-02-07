import { useState } from 'react';
import style from './FestivalsModal.module.css';
import { ExtendedCardSet } from '@shared/hooks/usePublicCardsWithParticipants';
import { Festival } from '@shared/api/endpoints/festivals.endpoints';
import { Event } from '@shared/api/endpoints/events.endpoints';
import { FestivalCardsModal } from './FestivalCardsModal';
import { Portal } from '@shared/ui/portal/Portal';
import { 
  FestivalsModalHeader, 
  FestivalCard, 
  FestivalsEmptyState 
} from '../components';
import { useFestivalsData } from '../hooks';

interface FestivalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardSets: ExtendedCardSet[];
  festivals: Festival[];
  events: Event[];
}

interface FestivalWithCards {
  festival: Festival;
  cardSets: ExtendedCardSet[];
  events: Event[];
}

export const FestivalsModal: React.FC<FestivalsModalProps> = ({ 
  isOpen, 
  onClose, 
  cardSets, 
  festivals, 
  events 
}) => {
  const [selectedFestival, setSelectedFestival] = useState<FestivalWithCards | null>(null);
  const [noCardsMessage, setNoCardsMessage] = useState<string | null>(null);
  const festivalGroups = useFestivalsData(cardSets, festivals, events);

  if (!isOpen) return null;

  const handleFestivalClick = (festivalGroup: FestivalWithCards) => {
    if (festivalGroup.cardSets.length === 0) {
      setNoCardsMessage(`У фестиваля "${festivalGroup.festival.name}" пока нет карточек`);
      setTimeout(() => setNoCardsMessage(null), 3000);
      return;
    }
    setSelectedFestival(festivalGroup);
  };

  const handleCloseFestivalModal = () => {
    setSelectedFestival(null);
  };

  return (
    <>
      {isOpen && (
        <Portal containerId="festivals-modal-portal">
          <div className={style.modalOverlay} onClick={onClose}>
            <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
              <FestivalsModalHeader onClose={onClose} />

              <div className={style.modalBody}>
                {festivalGroups.length === 0 ? (
                  <FestivalsEmptyState />
                ) : (
                  <div className={style.festivalsContainer}>
                    {festivalGroups.map((group) => (
                      <FestivalCard
                        key={group.festival.id}
                        festivalGroup={group}
                        onClick={handleFestivalClick}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Уведомление об отсутствии карточек */}
              {noCardsMessage && (
                <div className={style.noCardsToast}>
                  {noCardsMessage}
                </div>
              )}
            </div>
          </div>
        </Portal>
      )}

      {/* Модальное окно для конкретного фестиваля */}
      {selectedFestival && selectedFestival.cardSets.length > 0 && (
        <Portal containerId="festival-cards-modal-portal">
          <FestivalCardsModal
            isOpen={!!selectedFestival}
            onClose={handleCloseFestivalModal}
            festival={selectedFestival.festival}
            cardSets={selectedFestival.cardSets}
            events={selectedFestival.events}
          />
        </Portal>
      )}
    </>
  );
};