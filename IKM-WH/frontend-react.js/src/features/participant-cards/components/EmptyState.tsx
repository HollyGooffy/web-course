import { Image as ImageIcon } from 'lucide-react';
import style from '../ui/ParticipantCardsDisplay.module.css';

export const EmptyState: React.FC = () => {
  return (
    <div className={style.emptyState}>
      <ImageIcon size={48} />
      <p>Карточки участников не загружены</p>
    </div>
  );
};