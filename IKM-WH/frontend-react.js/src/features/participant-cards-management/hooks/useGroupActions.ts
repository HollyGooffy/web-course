import { useCallback } from 'react';
import { useParticipantCards } from '@features/participant-cards/model/hooks/useParticipantCards';
import { Festival } from '@shared/api/endpoints/festivals.endpoints';
import { CompressedImage } from '@shared/lib/utils/imageCompression';
import { GroupWithCards } from '../model/types';

interface UseGroupActionsProps {
    festival: Festival | null;
    groupsWithCards: GroupWithCards[];
    setGroupsWithCards: React.Dispatch<React.SetStateAction<GroupWithCards[]>>;
    onClose: () => void;
}

export const useGroupActions = ({ 
    festival, 
    groupsWithCards, 
    setGroupsWithCards, 
    onClose 
}: UseGroupActionsProps) => {
    const { saveCardsForGroup, deleteCardsForGroup } = useParticipantCards();

    const handleCardsChange = useCallback((groupName: string, eventId: string, cards: CompressedImage[]) => {
        setGroupsWithCards(prev => 
            prev.map(group => 
                group.groupName === groupName && group.eventId === eventId
                    ? { ...group, cards }
                    : group
            )
        );
    }, [setGroupsWithCards]);

    const handleSaveGroup = useCallback(async (groupName: string, eventId: string) => {
        if (!festival) return;

        const group = groupsWithCards.find(g => g.groupName === groupName && g.eventId === eventId);
        if (!group) return;

        try {
            await saveCardsForGroup(festival.id, groupName, eventId, group.cards);
            alert(`Карточки группы "${groupName}" успешно сохранены!`);
        } catch (error) {
            console.error('Ошибка сохранения карточек группы:', error);
            alert('Ошибка при сохранении карточек группы');
        }
    }, [festival, groupsWithCards, saveCardsForGroup]);

    const handleDeleteGroup = useCallback(async (groupName: string, eventId: string) => {
        if (!festival) return;

        const group = groupsWithCards.find(g => g.groupName === groupName && g.eventId === eventId);
        if (!group || group.cards.length === 0) return;

        const confirmed = confirm(
            `Вы уверены, что хотите удалить все ${group.cards.length} карточек группы "${groupName}"? Это действие нельзя отменить.`
        );

        if (!confirmed) return;

        try {
            await deleteCardsForGroup(festival.id, groupName, eventId);
            
            setGroupsWithCards(prev =>
                prev.map(g => 
                    g.groupName === groupName && g.eventId === eventId
                        ? { ...g, cards: [] }
                        : g
                )
            );

            alert(`Карточки группы "${groupName}" успешно удалены!`);
        } catch (error) {
            console.error('Ошибка удаления карточек группы:', error);
            alert('Ошибка при удалении карточек группы');
        }
    }, [festival, groupsWithCards, deleteCardsForGroup, setGroupsWithCards]);

    const handleSaveAllCards = useCallback(async () => {
        if (!festival) return;

        try {
            for (const group of groupsWithCards) {
                if (group.cards.length > 0) {
                    await saveCardsForGroup(festival.id, group.groupName, group.eventId, group.cards);
                }
            }
            alert('Все карточки участников успешно сохранены!');
            onClose();
        } catch (error) {
            console.error('Ошибка сохранения карточек:', error);
            alert('Ошибка при сохранении карточек');
        }
    }, [festival, groupsWithCards, saveCardsForGroup, onClose]);

    return {
        handleCardsChange,
        handleSaveGroup,
        handleDeleteGroup,
        handleSaveAllCards
    };
};