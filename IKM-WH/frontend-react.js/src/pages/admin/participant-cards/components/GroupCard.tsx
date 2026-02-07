import { GroupWithCards } from '../hooks/useGroupsWithCards';
import { CompressedImage, ParticipantCardsDisplay } from '@features/participant-cards';
import { GroupCardHeader } from './GroupCardHeader';
import style from '../ui/ParticipantCardsManager.module.css';

interface GroupCardProps {
    group: GroupWithCards;
    onCardsChange: (groupId: string, cards: CompressedImage[]) => void;
    onSaveCards: (groupId: string) => Promise<void>;
    onDeleteAllCards: (groupId: string) => void;
    getTotalSize: (cards: CompressedImage[]) => number;
    formatFileSize: (bytes: number) => string;
}

export const GroupCard = ({
    group,
    onCardsChange,
    onSaveCards,
    onDeleteAllCards,
    getTotalSize,
    formatFileSize
}: GroupCardProps) => {
    return (
        <div className={style.groupCard}>
            <GroupCardHeader
                group={group}
                onSaveCards={onSaveCards}
                onDeleteAllCards={onDeleteAllCards}
                getTotalSize={getTotalSize}
                formatFileSize={formatFileSize}
            />

            <div className={style.cardsSection}>
                <ParticipantCardsDisplay
                    groupId={group.id}
                    groupName={group.name}
                    onCardsChange={(cards) => onCardsChange(group.id, cards)}
                    maxCards={9}
                    readonly={false}
                    initialCards={group.participantCards}
                />
            </div>
        </div>
    );
};