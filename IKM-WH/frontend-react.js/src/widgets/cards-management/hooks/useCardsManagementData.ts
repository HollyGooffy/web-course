import { useAdminFestivals } from '@shared/hooks/useAdminFestivals';
import { useAdminCards } from '@shared/hooks/useAdminCards';
import { useAllParticipantCards } from '@shared/hooks/useAllParticipantCards';
import { CardsManagementData } from '../model/types';

export const useCardsManagementData = (): CardsManagementData => {
    const { festivals, loading: festivalsLoading, error: festivalsError } = useAdminFestivals();
    const { cardSets, loading: cardsLoading, error: cardsError } = useAdminCards();
    const { participantCards } = useAllParticipantCards();

    const loading = festivalsLoading || cardsLoading;
    const error = festivalsError || cardsError;

    return {
        festivals,
        cardSets,
        participantCards,
        loading,
        error,
    };
};