import { useState, useEffect } from 'react';
import { useEvents } from '@shared/hooks/useEvents';
import { useParticipantCards } from '@features/participant-cards/model/hooks/useParticipantCards';
import { Festival } from '@shared/api/endpoints/festivals.endpoints';
import { GroupWithCards } from '../model/types';

export const useGroupsData = (festival: Festival | null, isOpen: boolean) => {
    const { events } = useEvents();
    const { getCardsByGroup } = useParticipantCards();
    const [groupsWithCards, setGroupsWithCards] = useState<GroupWithCards[]>([]);

    useEffect(() => {
        if (!festival || !isOpen) return;

        const loadParticipantCards = async () => {
            // Находим события для этого фестиваля
            const festivalEvents = events.filter(event => {
                const eventDate = new Date(event.date).toDateString();
                const festivalDate = new Date(festival.date).toDateString();
                return eventDate === festivalDate && 
                       (event.venue === festival.venue || event.address.includes(festival.venue));
            });

            // Создаем группы из исполнителей событий и загружаем сохраненные карточки
            const groups: GroupWithCards[] = [];
            
            for (const event of festivalEvents) {
                for (const performer of event.performers) {
                    const savedCards = await getCardsByGroup(festival.id, performer, event.id);
                    groups.push({
                        groupName: performer,
                        eventId: event.id,
                        cards: savedCards
                    });
                }
            }

            setGroupsWithCards(groups);
        };

        loadParticipantCards();
    }, [festival, events, isOpen, getCardsByGroup]);

    return {
        groupsWithCards,
        setGroupsWithCards
    };
};