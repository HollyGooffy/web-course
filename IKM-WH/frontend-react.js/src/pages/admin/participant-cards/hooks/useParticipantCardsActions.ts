import { CompressedImage } from '@features/participant-cards';
import { GroupWithCards } from './useGroupsWithCards';

interface UseParticipantCardsActionsProps {
    groupsWithCards: GroupWithCards[];
    onCardsChange: (groupId: string, cards: CompressedImage[]) => void;
}

export const useParticipantCardsActions = ({ 
    groupsWithCards, 
    onCardsChange 
}: UseParticipantCardsActionsProps) => {
    
    const handleSaveCards = async (groupId: string) => {
        const group = groupsWithCards.find(g => g.id === groupId);
        if (!group) return;

        try {
            // Здесь будет API вызов для сохранения карточек
            
            // Имитация API вызова
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Показать уведомление об успехе
            alert('Карточки успешно сохранены!');
        } catch (error) {
            console.error('Ошибка сохранения карточек:', error);
            alert('Ошибка при сохранении карточек');
        }
    };

    const handleDeleteAllCards = (groupId: string) => {
        if (window.confirm('Вы уверены, что хотите удалить все карточки этой группы?')) {
            onCardsChange(groupId, []);
        }
    };

    const getTotalSize = (cards: CompressedImage[]) => {
        return cards.reduce((total, card) => total + card.compressedSize, 0);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return {
        handleSaveCards,
        handleDeleteAllCards,
        getTotalSize,
        formatFileSize
    };
};