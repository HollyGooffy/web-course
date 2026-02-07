import { GroupWithCards } from '../hooks/useGroupsWithCards';
import { CompressedImage } from '@features/participant-cards';
import { ParticipantCardsErrorMessage } from './ParticipantCardsErrorMessage';
import { GroupCardsList } from './GroupCardsList';
import style from '../ui/ParticipantCardsManager.module.css';

// Временно встроим компонент ParticipantCardsControls
import { SearchInput } from '@shared/ui';

interface ParticipantCardsControlsProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

const ParticipantCardsControls = ({
    searchTerm,
    onSearchChange
}: ParticipantCardsControlsProps) => {
    return (
        <div className={style.controls}>
            <SearchInput
                value={searchTerm}
                onChange={onSearchChange}
                placeholder="Поиск по названию группы или жанру..."
            />
        </div>
    );
};

interface ParticipantCardsContentProps {
    error?: string;
    filteredGroups: GroupWithCards[];
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onCardsChange: (groupId: string, cards: CompressedImage[]) => void;
    onSaveCards: (groupId: string) => Promise<void>;
    onDeleteAllCards: (groupId: string) => void;
    getTotalSize: (cards: CompressedImage[]) => number;
    formatFileSize: (bytes: number) => string;
}

export const ParticipantCardsContent = ({
    error,
    filteredGroups,
    searchTerm,
    onSearchChange,
    onCardsChange,
    onSaveCards,
    onDeleteAllCards,
    getTotalSize,
    formatFileSize
}: ParticipantCardsContentProps) => {
    return (
        <div className={`${style.container} fadeIn`}>
            {error && <ParticipantCardsErrorMessage error={error} />}

            <div className="slideUp" style={{ animationDelay: '0.2s' }}>
                <ParticipantCardsControls
                    searchTerm={searchTerm}
                    onSearchChange={onSearchChange}
                />
            </div>

            <div className="slideUp" style={{ animationDelay: '0.3s' }}>
                <GroupCardsList
                    groups={filteredGroups}
                    onCardsChange={onCardsChange}
                    onSaveCards={onSaveCards}
                    onDeleteAllCards={onDeleteAllCards}
                    getTotalSize={getTotalSize}
                    formatFileSize={formatFileSize}
                />
            </div>
        </div>
    );
};