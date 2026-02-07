import { useState, useEffect } from 'react';
import { Group } from '@shared/api/endpoints/groups.endpoints';
import { CompressedImage } from '@features/participant-cards';

export interface GroupWithCards extends Group {
    participantCards: CompressedImage[];
}

export const useGroupsWithCards = (groups: Group[]) => {
    const [groupsWithCards, setGroupsWithCards] = useState<GroupWithCards[]>([]);

    useEffect(() => {
        const initialGroups: GroupWithCards[] = groups.map(group => ({
            ...group,
            participantCards: []
        }));
        setGroupsWithCards(initialGroups);
    }, [groups]);

    const handleCardsChange = (groupId: string, cards: CompressedImage[]) => {
        setGroupsWithCards(prev => 
            prev.map(group => 
                group.id === groupId 
                    ? { ...group, participantCards: cards }
                    : group
            )
        );
    };

    return {
        groupsWithCards,
        handleCardsChange
    };
};