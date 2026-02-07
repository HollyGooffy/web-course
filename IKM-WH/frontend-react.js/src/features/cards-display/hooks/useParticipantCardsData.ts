import { useState, useEffect } from 'react';
import { useParticipantCards } from '@features/participant-cards/model/hooks/useParticipantCards';
import { ExtendedCardSet } from '@shared/hooks/usePublicCardsWithParticipants';
import { ParticipantCardsData } from '../model/types';

export const useParticipantCardsData = (
    isOpen: boolean,
    cardSets: ExtendedCardSet[],
    festivalId: string
) => {
    const { getCardsByGroup } = useParticipantCards();
    const [participantCardsData, setParticipantCardsData] = useState<ParticipantCardsData>({});

    useEffect(() => {
        const loadParticipantCards = async () => {
            const participantCardSets = cardSets.filter(cardSet => cardSet.isParticipantCards);
            const cardsData: ParticipantCardsData = {};
            
            for (const cardSet of participantCardSets) {
                if (cardSet.participantData) {
                    try {
                        const cards = await getCardsByGroup(
                            festivalId,
                            cardSet.participantData.groupName,
                            cardSet.participantData.eventId
                        );
                        cardsData[cardSet.id] = cards;
                    } catch (error) {
                        console.error('Error loading participant cards for group:', cardSet.participantData.groupName, error);
                        cardsData[cardSet.id] = [];
                    }
                }
            }
            
            setParticipantCardsData(cardsData);
        };
        
        if (isOpen && cardSets.some(cardSet => cardSet.isParticipantCards)) {
            loadParticipantCards();
        }
    }, [isOpen, cardSets, festivalId, getCardsByGroup]);

    return participantCardsData;
};