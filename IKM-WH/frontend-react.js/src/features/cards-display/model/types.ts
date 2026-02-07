import { ExtendedCardSet } from '@shared/hooks/usePublicCardsWithParticipants';
import { Festival } from '@shared/api/endpoints/festivals.endpoints';
import { Event } from '@shared/api/endpoints/events.endpoints';
import { CompressedImage } from '@shared/lib/utils/imageCompression';
import { CardSet } from '@shared/api/endpoints/cards.endpoints';
import { ParticipantCard } from '@shared/api/endpoints/participantCards.endpoints';

export interface FestivalCardsModalProps {
    isOpen: boolean;
    onClose: () => void;
    festival: Festival;
    cardSets: ExtendedCardSet[];
    events: Event[];
}

export interface ParticipantCardsData {
    [cardSetId: string]: CompressedImage[];
}

export interface FestivalInfoProps {
    festival: Festival;
    events: Event[];
}

export interface RegularCardSetsProps {
    cardSets: ExtendedCardSet[];
    onBuySet: (cardSet: ExtendedCardSet) => void;
}

export interface ParticipantCardSetsProps {
    cardSets: ExtendedCardSet[];
    participantCardsData: ParticipantCardsData;
    onBuySet: (cardSet: ExtendedCardSet) => void;
}

export interface ModalHeaderProps {
    festival: Festival;
    onClose: () => void;
}

// Типы для карточек
export interface ParticipantCardSet {
  id: string;
  title: string;
  description: string;
  price: number;
  cardsInSet: number;
  setsAvailable: number;
  festivalId: string;
  image: string | null;
  isParticipantCards: true;
  participantData: ParticipantCard;
  settings: any;
}

export type AllCardTypes = (CardSet & { isParticipantCards: false }) | ParticipantCardSet;

// Props типы для UI компонентов
export interface CardSetCardProps {
  card: AllCardTypes;
  onEdit: (card: AllCardTypes) => void;
  onDelete: (card: AllCardTypes) => void;
}

export interface CardSetsListProps {
  cards: AllCardTypes[];
  onEditCard: (card: AllCardTypes) => void;
  onDeleteCard: (card: AllCardTypes) => void;
}

export interface FestivalCardProps {
  festival: Festival;
  cardSetsCount: number;
  onSelect: (festival: Festival) => void;
  onOpenParticipantCards: (festival: Festival) => void;
  onDeleteParticipantCards?: (festival: Festival) => void;
  onEdit?: (festival: Festival) => void;
  onDelete?: (festival: Festival) => void;
}

export interface FestivalDetailsProps {
  festival: Festival;
}

export interface FestivalsListProps {
  festivals: Festival[];
  cardSets: any[];
  getCardsByFestival: (festivalId: string) => Promise<any[]>;
  onCreateFestival: () => void;
  onSelectFestival: (festival: Festival) => void;
  onEditFestival: (festival: Festival) => void;
  onDeleteFestival: (festival: Festival) => void;
  onOpenParticipantCards: (festival: Festival) => void;
  onDeleteParticipantCards?: (festival: Festival) => void;
}