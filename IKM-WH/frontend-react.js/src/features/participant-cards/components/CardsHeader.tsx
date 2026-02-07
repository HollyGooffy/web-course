import style from '../ui/ParticipantCardsDisplay.module.css';

interface CardsHeaderProps {
  groupName: string;
  cardsCount: number;
  maxCards: number;
}

export const CardsHeader: React.FC<CardsHeaderProps> = ({ groupName, cardsCount, maxCards }) => {
  return (
    <div className={style.header}>
      <h3>Карточки участников - {groupName}</h3>
      <span className={style.counter}>
        {cardsCount} / {maxCards}
      </span>
    </div>
  );
};