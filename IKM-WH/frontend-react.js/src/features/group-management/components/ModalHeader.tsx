import { X } from 'lucide-react';
import { ModalHeaderProps } from '../model/types';
import style from '../ui/GroupModal.module.css';

export const ModalHeader = ({ mode, onClose }: ModalHeaderProps) => {
    return (
        <div className={style.modalHeader}>
            <h2>{mode === 'create' ? 'Создать группу' : 'Редактировать группу'}</h2>
            <button className={style.closeButton} onClick={onClose}>
                <X size={24} />
            </button>
        </div>
    );
};