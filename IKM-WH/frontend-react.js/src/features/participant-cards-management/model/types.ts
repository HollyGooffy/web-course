import { Festival } from '@shared/api/endpoints/festivals.endpoints';
import { CompressedImage } from '@shared/lib/utils/imageCompression';

export interface ParticipantCardsModalProps {
    isOpen: boolean;
    onClose: () => void;
    festival: Festival | null;
}

export interface GroupWithCards {
    groupName: string;
    eventId: string;
    cards: CompressedImage[];
}

export interface ModalHeaderProps {
    festival: Festival;
    groupsWithCards: GroupWithCards[];
    onClose: () => void;
}

export interface FestivalInfoProps {
    festival: Festival;
}

export interface GroupCardProps {
    group: GroupWithCards;
    loading: boolean;
    onCardsChange: (groupName: string, eventId: string, cards: CompressedImage[]) => void;
    onSaveGroup: (groupName: string, eventId: string) => void;
    onDeleteGroup: (groupName: string, eventId: string) => void;
}

export interface ModalFooterProps {
    loading: boolean;
    onClose: () => void;
    onSaveAll: () => void;
}

export interface GroupStats {
    totalCards: number;
    totalSize: number;
    totalAvailableSlots: number;
}