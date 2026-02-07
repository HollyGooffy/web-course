import style from '../ui/ParticipantCardsManager.module.css';

export const ParticipantCardsEmptyState = () => {
    return (
        <div className={style.emptyState}>
            <p>Группы не найдены</p>
        </div>
    );
};