import { GroupWithCards } from '../hooks/useGroupsWithCards';
import { CompressedImage } from '@features/participant-cards';
import { GroupCard } from './GroupCard';
import { ParticipantCardsEmptyState } from './ParticipantCardsEmptyState';
import style from '../ui/ParticipantCardsManager.module.css';

interface GroupCardsListProps {
    groups: GroupWithCards[];
    onCardsChange: (groupId: string, cards: CompressedImage[]) => void;
    onSaveCards: (groupId: string) => Promise<void>;
    onDeleteAllCards: (groupId: string) => void;
    getTotalSize: (cards: CompressedImage[]) => number;
    formatFileSize: (bytes: number) => string;
}

export const GroupCardsList = ({
    groups,
    onCardsChange,
    onSaveCards,
    onDeleteAllCards,
    getTotalSize,
    formatFileSize
}: GroupCardsListProps) => {
    if (groups.length === 0) {
        return <ParticipantCardsEmptyState />;
    }

    return (
        <div className={style.groupsList}>
            {groups.map((group) => (
                <GroupCard
                    key={group.id}
                    group={group}
                    onCardsChange={onCardsChange}
                    onSaveCards={onSaveCards}
                    onDeleteAllCards={onDeleteAllCards}
                    getTotalSize={getTotalSize}
                    formatFileSize={formatFileSize}
                />
            ))}
        </div>
    );
};