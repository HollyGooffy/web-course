import { AdminBtn, SearchInput } from "@shared/ui";
import { FestivalsList } from '@features/cards-display';
import { Festival } from '@shared/api/endpoints/festivals.endpoints';
import style from '../ui/CardsManagementWidget.module.css';

interface FestivalsViewProps {
    festivals: Festival[];
    cardSets: any[];
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onSyncWithEvents: () => void;
    onCreateFestival: () => void;
    onSelectFestival: (festival: Festival) => void;
    onEditFestival: (festival: Festival) => void;
    onDeleteFestival: (id: string) => void;
    onOpenParticipantCards: (festival: Festival) => void;
    onDeleteParticipantCards: (festival: Festival) => void;
    getCardsByFestival: (festivalId: string) => any;
}

export const FestivalsView = ({
    festivals,
    cardSets,
    searchTerm,
    onSearchChange,
    onSyncWithEvents,
    onCreateFestival,
    onSelectFestival,
    onEditFestival,
    onDeleteFestival,
    onOpenParticipantCards,
    onDeleteParticipantCards,
    getCardsByFestival
}: FestivalsViewProps) => {
    const filteredFestivals = festivals.filter(festival =>
        festival.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        festival.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={style.festivalsView}>
            <div className={style.header}>
                <SearchInput
                    value={searchTerm}
                    onChange={onSearchChange}
                    placeholder="Поиск фестивалей..."
                />
                <div className={style.actions}>
                    <AdminBtn variant="black-outline" onClick={onSyncWithEvents}>
                        Синхронизировать
                    </AdminBtn>
                </div>
            </div>

            <FestivalsList
                festivals={filteredFestivals}
                cardSets={cardSets}
                getCardsByFestival={getCardsByFestival}
                onCreateFestival={onCreateFestival}
                onSelectFestival={onSelectFestival}
                onEditFestival={onEditFestival}
                onDeleteFestival={(festival) => onDeleteFestival(festival.id)}
                onOpenParticipantCards={onOpenParticipantCards}
                onDeleteParticipantCards={onDeleteParticipantCards}
            />
        </div>
    );
};