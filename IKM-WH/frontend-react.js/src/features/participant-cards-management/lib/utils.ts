import { GroupWithCards, GroupStats } from '../model/types';

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const calculateGroupStats = (groupsWithCards: GroupWithCards[]): GroupStats => {
    const totalCards = groupsWithCards.reduce((total, group) => total + group.cards.length, 0);
    
    const totalSize = groupsWithCards.reduce((total, group) => 
        total + group.cards.reduce((groupTotal, card) => groupTotal + card.compressedSize, 0), 0
    );
    
    const totalAvailableSlots = groupsWithCards.reduce((total, group) => total + (9 - group.cards.length), 0);

    return {
        totalCards,
        totalSize,
        totalAvailableSlots
    };
};