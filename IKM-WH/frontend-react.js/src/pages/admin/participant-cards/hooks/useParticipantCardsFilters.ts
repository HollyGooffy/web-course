import { useState, useMemo } from 'react';
import { Group } from '@shared/api/endpoints/groups.endpoints';
import { CompressedImage } from '@features/participant-cards';

interface GroupWithCards extends Group {
    participantCards: CompressedImage[];
}

export const useParticipantCardsFilters = (groupsWithCards: GroupWithCards[]) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredGroups = useMemo(() => {
        if (!searchTerm.trim()) {
            return groupsWithCards;
        }

        const term = searchTerm.toLowerCase();
        return groupsWithCards.filter(group =>
            group.name.toLowerCase().includes(term) ||
            group.genre.toLowerCase().includes(term)
        );
    }, [groupsWithCards, searchTerm]);

    return {
        searchTerm,
        filteredGroups,
        setSearchTerm
    };
};