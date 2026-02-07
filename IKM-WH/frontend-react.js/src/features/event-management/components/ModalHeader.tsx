import { X } from 'lucide-react';
import { ModalHeaderProps } from '../model/types';
import style from '../ui/EventModal.module.css';

export const ModalHeader = ({ isEdit, onClose }: ModalHeaderProps) => {
    return (
        <div className={style.header}>
            <h2>{isEdit ? 'Редактировать событие' : 'Создать событие'}</h2>
            <button className={style.closeBtn} onClick={onClose}>
                <X size={24} />
            </button>
        </div>
    );
};