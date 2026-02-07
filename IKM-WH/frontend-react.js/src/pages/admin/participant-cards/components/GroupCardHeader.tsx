import { Trash2, Save } from 'lucide-react';
import { GroupWithCards } from '../hooks/useGroupsWithCards';
import { CompressedImage } from '@features/participant-cards';
import style from '../ui/ParticipantCardsManager.module.css';

interface GroupCardHeaderProps {
    group: GroupWithCards;
    onSaveCards: (groupId: string) => Promise<void>;
    onDeleteAllCards: (groupId: string) => void;
    getTotalSize: (cards: CompressedImage[]) => number;
    formatFileSize: (bytes: number) => string;
}

export const GroupCardHeader = ({
    group,
    onSaveCards,
    onDeleteAllCards,
    getTotalSize,
    formatFileSize
}: GroupCardHeaderProps) => {
    return (
        <div className={style.groupHeader}>
            <div className={style.groupInfo}>
                <h3>{group.name}</h3>
                <span className={style.genre}>{group.genre}</span>
                <div className={style.stats}>
                    <span>Карточек: {group.participantCards.length}/9</span>
                    <span>Размер: {formatFileSize(getTotalSize(group.participantCards))}</span>
                </div>
            </div>
            
            <div className={style.actions}>
                <button
                    className={`${style.actionButton} ${style.save}`}
                    onClick={() => onSaveCards(group.id)}
                    title="Сохранить карточки"
                >
                    <Save size={16} />
                </button>
                {group.participantCards.length > 0 && (
                    <button
                        className={`${style.actionButton} ${style.delete}`}
                        onClick={() => onDeleteAllCards(group.id)}
                        title="Удалить все карточки"
                    >
                        <Trash2 size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};