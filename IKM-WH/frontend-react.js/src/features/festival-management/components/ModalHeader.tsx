import { X, Calendar } from 'lucide-react';
import style from '../ui/FestivalModal.module.css';

interface ModalHeaderProps {
  isEditing: boolean;
  onClose: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ isEditing, onClose }) => {
  return (
    <div className={style.modalHeader}>
      <h2>
        <Calendar size={24} />
        {isEditing ? 'Редактировать фестиваль' : 'Создать фестиваль'}
      </h2>
      <button className={style.closeButton} onClick={onClose}>
        <X size={24} />
      </button>
    </div>
  );
};