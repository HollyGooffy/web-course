import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useParticipantCards } from '@features/participant-cards/model/hooks/useParticipantCards';
import { useCardsManagementState } from '../hooks/useCardsManagementState';
import { useCardsManagementActions } from '../hooks/useCardsManagementActions';
import { CardsManagementData } from '../model/types';
import { FestivalsView } from './FestivalsView';
import { CardsManagementModals } from './CardsManagementModals';

interface CardsManagementContentProps {
    data: CardsManagementData;
    refetchCards: () => void;
}

export const CardsManagementContent = ({ data, refetchCards }: CardsManagementContentProps) => {
    const navigate = useNavigate();
    const state = useCardsManagementState();
    const actions = useCardsManagementActions();
    const { getCardsByFestival } = useParticipantCards();

    const handleSelectFestival = useCallback((festival: any) => {
        navigate(`/admin/cards/settings/${festival.id}`);
    }, [navigate]);

    const handleEditFestival = useCallback((festival: any) => {
        state.setEditingFestival(festival);
        state.setIsFestivalModalOpen(true);
    }, [state]);

    const handleOpenParticipantCards = useCallback((festival: any) => {
        state.setSelectedFestival(festival);
        state.setIsParticipantCardsModalOpen(true);
    }, [state]);

    const handleCloseFestivalModal = useCallback(() => {
        state.setIsFestivalModalOpen(false);
        state.setEditingFestival(null);
    }, [state]);

    const handleCloseParticipantCardsModal = useCallback(() => {
        state.setIsParticipantCardsModalOpen(false);
        state.setSelectedFestival(null);
    }, [state]);

    const handleCreateFestival = useCallback(() => {
        state.setIsFestivalModalOpen(true);
    }, [state]);

    const handleCloseCardModal = useCallback(() => {
        // Empty callback for now
    }, []);

    return (
        <>
            <FestivalsView
                festivals={data.festivals}
                cardSets={data.cardSets}
                searchTerm={state.searchTerm}
                onSearchChange={state.setSearchTerm}
                onSyncWithEvents={actions.handleSyncWithEvents}
                onCreateFestival={handleCreateFestival}
                onSelectFestival={handleSelectFestival}
                onEditFestival={handleEditFestival}
                onDeleteFestival={actions.handleDeleteFestival}
                onOpenParticipantCards={handleOpenParticipantCards}
                onDeleteParticipantCards={actions.handleDeleteParticipantCards}
                getCardsByFestival={getCardsByFestival}
            />

            <CardsManagementModals
                isFestivalModalOpen={state.isFestivalModalOpen}
                editingFestival={state.editingFestival}
                onCloseFestivalModal={handleCloseFestivalModal}
                isCardModalOpen={false}
                editingCard={null}
                selectedFestival={state.selectedFestival}
                onCloseCardModal={handleCloseCardModal}
                refetchCards={refetchCards}
                isParticipantCardsModalOpen={state.isParticipantCardsModalOpen}
                onCloseParticipantCardsModal={handleCloseParticipantCardsModal}
                isParticipantCardsSettingsModalOpen={false}
                editingParticipantCardSet={null}
                onCloseParticipantCardsSettingsModal={() => {}}
            />
        </>
    );
};