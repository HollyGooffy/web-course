import { ModalFooterProps } from '../model/types';
import style from '../ui/ParticipantCardsModal.module.css';

export const ModalFooter = ({ loading, onClose, onSaveAll }: ModalFooterProps) => {
    return (
        <div className={style.modalFooter}>
            <button className={style.cancelButton} onClick={onClose}>
                Отмена
            </button>
            <button className={style.saveButton} onClick={onSaveAll} disabled={loading}>
                {loading ? 'Сохранение...' : 'Сохранить все карточки'}
            </button>
        </div>
    );
};