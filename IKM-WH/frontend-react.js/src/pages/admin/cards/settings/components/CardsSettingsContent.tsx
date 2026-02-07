import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ChevronLeft } from 'lucide-react';
import { AdminBtn } from "@shared/ui";
import { useAdminCards } from '@shared/hooks/useAdminCards';
import { useAllParticipantCards } from '@shared/hooks/useAllParticipantCards';
import { useParticipantCards } from '@features/participant-cards/model/hooks/useParticipantCards';
import { useCardSetsCalculations, AllCardTypes, ParticipantCardSet } from '@features/cards-display';
import { CardModal } from '@features/card-management/ui/CardModal';
import { ParticipantCardsSettingsModal } from '@features/participant-cards-settings';
import { formatDate } from '@features/cards-display/lib/formatters';
import { CardsSettingsList } from './CardsSettingsList';
import { Festival } from '@shared/api/endpoints/festivals.endpoints';
import style from '../ui/CardsSettings.module.css';

interface CardsSettingsContentProps {
  festival: Festival;
}

export const CardsSettingsContent: React.FC<CardsSettingsContentProps> = ({ festival }) => {
  const navigate = useNavigate();
  const { cardSets, refetch: refetchCards, deleteCardSet } = useAdminCards();
  const { participantCards, refetch: refetchParticipantCards } = useAllParticipantCards();
  const { deleteCardsForGroup } = useParticipantCards();
  
  // Состояние модальных окон
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<AllCardTypes | null>(null);
  const [isParticipantCardsSettingsModalOpen, setIsParticipantCardsSettingsModalOpen] = useState(false);
  const [editingParticipantCardSet, setEditingParticipantCardSet] = useState<ParticipantCardSet | null>(null);

  const { allFestivalCards } = useCardSetsCalculations({
    selectedFestival: festival,
    cardSets,
    participantCards
  });

  const handleEditCard = (card: AllCardTypes) => {
    if ('isParticipantCards' in card && card.isParticipantCards) {
      setEditingParticipantCardSet(card as ParticipantCardSet);
      setIsParticipantCardsSettingsModalOpen(true);
    } else {
      setEditingCard(card);
      setIsCardModalOpen(true);
    }
  };

  const handleDeleteCard = async (card: AllCardTypes) => {

    if (confirm(`Вы уверены, что хотите удалить "${card.title}"?`)) {
      try {
        if ('isParticipantCards' in card && card.isParticipantCards) {

          await deleteCardsForGroup(
            card.participantData.festivalId,
            card.participantData.groupName,
            card.participantData.eventId
          );

          // Обновляем данные карточек участников
          refetchParticipantCards();
          
        } else {

          await deleteCardSet(card.id);

          // Данные обновятся автоматически через useAdminCards
        }

      } catch (error) {
        console.error('❌ Ошибка удаления карточки:', error);
        alert('Ошибка при удалении карточки');
      }
    }
  };

  const handleCloseCardModal = () => {
    setIsCardModalOpen(false);
    setEditingCard(null);
    refetchCards();
  };

  const handleCloseParticipantCardsSettingsModal = () => {
    setIsParticipantCardsSettingsModalOpen(false);
    setEditingParticipantCardSet(null);
  };

  const handleParticipantSettingsSaved = () => {
    
    // Обновляем данные карточек участников из базы данных
    refetchParticipantCards();
  };

  return (
    <>
      {/* Кнопка назад */}
      <div style={{ marginBottom: '24px' }}>
        <AdminBtn 
          variant="black-outline"
          onClick={() => navigate('/admin/cards')}
        >
          <ChevronLeft size={16} />
          Назад к фестивалям
        </AdminBtn>
      </div>

      {/* Информация о фестивале */}
      <div className={style.festivalInfo}>
        <div className={style.festivalHeader}>
          <Calendar size={24} />
          <h2>{festival.name}</h2>
        </div>
        <div className={style.festivalMeta}>
          <div className={style.metaItem}>
            <Calendar size={16} />
            <span>{formatDate(festival.date)}</span>
          </div>
          <div className={style.metaItem}>
            <MapPin size={16} />
            <span>{festival.venue}</span>
          </div>
        </div>
        {festival.description && (
          <p style={{ margin: 0, color: '#6b7280' }}>{festival.description}</p>
        )}
      </div>

      {/* Секция карточек */}
      <div className={style.cardsSection}>
        <div className={style.sectionHeader}>
          <h3>Наборы карточек</h3>
        </div>

        <CardsSettingsList
          cards={allFestivalCards}
          onEditCard={handleEditCard}
          onDeleteCard={handleDeleteCard}
        />
      </div>

      {/* Модальные окна */}
      {isCardModalOpen && (
        <CardModal
          isOpen={isCardModalOpen}
          card={editingCard && !('isParticipantCards' in editingCard) ? editingCard : null}
          festivalId={festival.id}
          onClose={handleCloseCardModal}
        />
      )}

      {isParticipantCardsSettingsModalOpen && (
        <ParticipantCardsSettingsModal
          isOpen={isParticipantCardsSettingsModalOpen}
          cardSet={editingParticipantCardSet}
          onClose={handleCloseParticipantCardsSettingsModal}
          onSettingsSaved={handleParticipantSettingsSaved}
        />
      )}
    </>
  );
};
