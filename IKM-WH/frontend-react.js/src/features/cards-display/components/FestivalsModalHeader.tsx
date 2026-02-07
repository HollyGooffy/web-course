import { X } from 'lucide-react';
import style from '../ui/FestivalsModal.module.css';

interface FestivalsModalHeaderProps {
  onClose: () => void;
}

export const FestivalsModalHeader: React.FC<FestivalsModalHeaderProps> = ({ onClose }) => {
  return (
    <div className={style.modalHeader}>
      <h2>Коллекционные карточки по фестивалям</h2>
      <button className={style.closeButton} onClick={onClose}>
        <X size={24} />
      </button>
    </div>
  );
};