import { X, Package } from 'lucide-react';
import style from '../ui/CardModal.module.css';

interface ModalHeaderProps {
  isEditing: boolean;
  onClose: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ isEditing, onClose }) => {
  return (
    <div className={style.modalHeader}>
      <h2>
        <Package size={24} />
        {isEditing ? 'Редактировать набор карточек' : 'Создать набор карточек'}
      </h2>
      <button className={style.closeButton} onClick={onClose}>
        <X size={24} />
      </button>
    </div>
  );
};