import { Trash } from 'lucide-react';
import { ParticipantCardsDisplay } from '@features/participant-cards';
import { GroupCardProps } from '../model/types';
import style from '../ui/ParticipantCardsModal.module.css';

export const GroupCard = ({ 
    group, 
    loading, 
    onCardsChange, 
    onSaveGroup, 
    onDeleteGroup 
}: GroupCardProps) => {
    return (
        <div className={style.groupCard}>
            <div className={style.groupHeader}>
                <h4>{group.groupName}</h4>
                <div className={style.groupActions}>
                    <button 
                        className={style.deleteGroupButton}
                        onClick={() => onDeleteGroup(group.groupName, group.eventId)}
                        disabled={loading || group.cards.length === 0}
                        title={group.cards.length === 0 ? 'Нет карточек для удаления' : `Удалить ${group.cards.length} карточек`}
                    >
                        <Trash size={16} />
                        Удалить ({group.cards.length})
                    </button>
                    <button 
                        className={style.saveGroupButton}
                        onClick={() => onSaveGroup(group.groupName, group.eventId)}
                        disabled={loading || group.cards.length === 0}
                    >
                        {loading ? 'Сохранение...' : `Сохранить (${group.cards.length})`}
                    </button>
                </div>
            </div>
            <ParticipantCardsDisplay
                key={`${group.eventId}-${group.groupName}-${group.cards.length}`}
                groupId={`${group.eventId}-${group.groupName}`}
                groupName={group.groupName}
                onCardsChange={(cards) => onCardsChange(group.groupName, group.eventId, cards)}
                maxCards={9}
                readonly={false}
                initialCards={group.cards}
            />
        </div>
    );
};