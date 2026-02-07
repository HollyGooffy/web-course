import { useCallback } from 'react';
import { useParticipantCards } from '@features/participant-cards/model/hooks/useParticipantCards';
import { useCardsManagement, useFestivalsManagement } from '@features/cards-display';
import { AllCardTypes } from '@features/cards-display';
import { Festival } from '@shared/api/endpoints/festivals.endpoints';

export const useCardsManagementActions = () => {
    const { getCardsByFestival, deleteAllCardsForFestival, deleteCardsForGroup } = useParticipantCards();
    const { handleDeleteFestival, handleSyncWithEvents } = useFestivalsManagement();
    const { handleDeleteCard: deleteCard } = useCardsManagement();

    const handleDeleteCard = useCallback(async (card: AllCardTypes) => {
        if ('isParticipantCards' in card && card.isParticipantCards) {
            const { participantData } = card;
            const confirmed = confirm(
                `Вы уверены, что хотите удалить все карточки участников группы "${participantData.groupName}"? Это действие нельзя отменить.`
            );
            
            if (!confirmed) return;
            
            try {
                await deleteCardsForGroup(
                    participantData.festivalId, 
                    participantData.groupName, 
                    participantData.eventId
                );
                alert(`Все карточки участников группы "${participantData.groupName}" успешно удалены!`);
                window.location.reload();
            } catch (error) {
                console.error('Ошибка удаления карточек участников:', error);
                alert('Ошибка при удалении карточек участников');
            }
            return;
        }
        
        await deleteCard(card.id);
    }, [deleteCard, deleteCardsForGroup]);

    const handleDeleteParticipantCards = useCallback(async (festival: Festival) => {
        try {
            const participantCards = await getCardsByFestival(festival.id);
            const participantCardsCount = participantCards.length;
            
            if (participantCardsCount === 0) {
                alert('У этого фестиваля нет карточек участников для удаления');
                return;
            }

            const confirmed = confirm(
                `Вы уверены, что хотите удалить все ${participantCardsCount} наборов карточек участников фестиваля "${festival.name}"? Это действие нельзя отменить.`
            );

            if (!confirmed) return;

            await deleteAllCardsForFestival(festival.id);
            alert(`Все карточки участников фестиваля "${festival.name}" успешно удалены!`);
        } catch (error) {
            console.error('Ошибка удаления карточек участников:', error);
            alert('Ошибка при удалении карточек участников');
        }
    }, [getCardsByFestival, deleteAllCardsForFestival]);

    return {
        handleDeleteCard,
        handleDeleteParticipantCards,
        handleDeleteFestival,
        handleSyncWithEvents,
    };
};