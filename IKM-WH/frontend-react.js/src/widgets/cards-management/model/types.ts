import { Festival } from '@shared/api/endpoints/festivals.endpoints';
import { AllCardTypes, ParticipantCardSet } from '@features/cards-display';

export interface CardsManagementState {
    selectedFestival: Festival | null;
    isFestivalModalOpen: boolean;
    isCardModalOpen: boolean;
    isParticipantCardsModalOpen: boolean;
    isParticipantCardsSettingsModalOpen: boolean;
    editingFestival: Festival | null;
    editingCard: AllCardTypes | null;
    editingParticipantCardSet: ParticipantCardSet | null;
    searchTerm: string;
}

export interface CardsManagementActions {
    setSelectedFestival: (festival: Festival | null) => void;
    setIsFestivalModalOpen: (open: boolean) => void;
    setIsCardModalOpen: (open: boolean) => void;
    setIsParticipantCardsModalOpen: (open: boolean) => void;
    setIsParticipantCardsSettingsModalOpen: (open: boolean) => void;
    setEditingFestival: (festival: Festival | null) => void;
    setEditingCard: (card: AllCardTypes | null) => void;
    setEditingParticipantCardSet: (cardSet: ParticipantCardSet | null) => void;
    setSearchTerm: (term: string) => void;
}

export interface CardsManagementData {
    festivals: Festival[];
    cardSets: any[];
    participantCards: any[];
    loading: boolean;
    error: string | null;
}