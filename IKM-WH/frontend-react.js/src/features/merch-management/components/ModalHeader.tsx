import { X } from 'lucide-react';
import style from '../ui/MerchModal.module.css';

interface ModalHeaderProps {
  mode: 'create' | 'edit';
  onClose: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ mode, onClose }) => {
  return (
    <div className={style.modalHeader}>
      <h2>{mode === 'create' ? 'Создать товар' : 'Редактировать товар'}</h2>
      <button className={style.closeButton} onClick={onClose}>
        <X size={24} />
      </button>
    </div>
  );
};