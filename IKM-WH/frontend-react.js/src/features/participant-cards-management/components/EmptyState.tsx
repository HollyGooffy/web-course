import { Users } from 'lucide-react';
import style from '../ui/ParticipantCardsModal.module.css';

export const EmptyState = () => {
    return (
        <div className={style.emptyState}>
            <Users size={48} />
            <h3>Нет групп для этого фестиваля</h3>
            <p>Убедитесь, что в афише есть события для этого фестиваля с указанными исполнителями</p>
        </div>
    );
};