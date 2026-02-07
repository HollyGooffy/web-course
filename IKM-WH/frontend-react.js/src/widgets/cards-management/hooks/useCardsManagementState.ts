import { useState } from 'react';
import { Festival } from '@shared/api/endpoints/festivals.endpoints';
import { AllCardTypes, ParticipantCardSet } from '@features/cards-display';
import { CardsManagementState, CardsManagementActions } from '../model/types';

export const useCardsManagementState = (): CardsManagementState & CardsManagementActions => {
    const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
    const [isFestivalModalOpen, setIsFestivalModalOpen] = useState(false);
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [isParticipantCardsModalOpen, setIsParticipantCardsModalOpen] = useState(false);
    const [isParticipantCardsSettingsModalOpen, setIsParticipantCardsSettingsModalOpen] = useState(false);
    const [editingFestival, setEditingFestival] = useState<Festival | null>(null);
    const [editingCard, setEditingCard] = useState<AllCardTypes | null>(null);
    const [editingParticipantCardSet, setEditingParticipantCardSet] = useState<ParticipantCardSet | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    return {
        selectedFestival,
        isFestivalModalOpen,
        isCardModalOpen,
        isParticipantCardsModalOpen,
        isParticipantCardsSettingsModalOpen,
        editingFestival,
        editingCard,
        editingParticipantCardSet,
        searchTerm,
        setSelectedFestival,
        setIsFestivalModalOpen,
        setIsCardModalOpen,
        setIsParticipantCardsModalOpen,
        setIsParticipantCardsSettingsModalOpen,
        setEditingFestival,
        setEditingCard,
        setEditingParticipantCardSet,
        setSearchTerm,
    };
};