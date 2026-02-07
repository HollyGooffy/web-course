import { FestivalModal } from '@features/festival-management/ui/FestivalModal';
import { CardModal } from '@features/card-management/ui/CardModal';
import { ParticipantCardsModal } from '@features/participant-cards-management';
import { ParticipantCardsSettingsModal } from '@features/participant-cards-settings';
import { Festival } from '@shared/api/endpoints/festivals.endpoints';
import { AllCardTypes, ParticipantCardSet } from '@features/cards-display';

interface CardsManagementModalsProps {
    // Festival Modal
    isFestivalModalOpen: boolean;
    editingFestival: Festival | null;
    onCloseFestivalModal: () => void;

    // Card Modal
    isCardModalOpen: boolean;
    editingCard: AllCardTypes | null;
    selectedFestival: Festival | null;
    onCloseCardModal: () => void;
    refetchCards: () => void;

    // Participant Cards Modal
    isParticipantCardsModalOpen: boolean;
    onCloseParticipantCardsModal: () => void;

    // Participant Cards Settings Modal
    isParticipantCardsSettingsModalOpen: boolean;
    editingParticipantCardSet: ParticipantCardSet | null;
    onCloseParticipantCardsSettingsModal: () => void;
}

export const CardsManagementModals = ({
    isFestivalModalOpen,
    editingFestival,
    onCloseFestivalModal,
    isCardModalOpen,
    editingCard,
    selectedFestival,
    onCloseCardModal,
    refetchCards,
    isParticipantCardsModalOpen,
    onCloseParticipantCardsModal,
    isParticipantCardsSettingsModalOpen,
    editingParticipantCardSet,
    onCloseParticipantCardsSettingsModal
}: CardsManagementModalsProps) => {
    return (
        <>
            {isFestivalModalOpen && (
                <FestivalModal
                    isOpen={isFestivalModalOpen}
                    festival={editingFestival}
                    onClose={onCloseFestivalModal}
                />
            )}

            {isCardModalOpen && (
                <CardModal
                    isOpen={isCardModalOpen}
                    card={editingCard && !('isParticipantCards' in editingCard) ? editingCard : null}
                    festivalId={selectedFestival?.id}
                    onClose={() => {
                        onCloseCardModal();
                        refetchCards();
                    }}
                />
            )}

            {isParticipantCardsModalOpen && selectedFestival && (
                <ParticipantCardsModal
                    isOpen={isParticipantCardsModalOpen}
                    festival={selectedFestival}
                    onClose={onCloseParticipantCardsModal}
                />
            )}

            {isParticipantCardsSettingsModalOpen && (
                <ParticipantCardsSettingsModal
                    isOpen={isParticipantCardsSettingsModalOpen}
                    cardSet={editingParticipantCardSet}
                    onClose={() => {
                        onCloseParticipantCardsSettingsModal();
                        window.location.reload();
                    }}
                />
            )}
        </>
    );
};