import { ModalFooterProps } from '../model/types';
import style from '../ui/EventModal.module.css';

export const ModalFooter = ({ isEdit, loading, submitError, onClose }: ModalFooterProps) => {
    return (
        <div className={style.actions}>
            {submitError && <span className={style.error}>{submitError}</span>}
            <button
                type="button"
                className={style.btnCancel}
                onClick={onClose}
                disabled={loading}
            >
                Отмена
            </button>
            <button
                type="submit"
                className={style.btnSave}
                disabled={loading}
            >
                {loading ? 'Сохранение...' : isEdit ? 'Сохранить' : 'Создать'}
            </button>
        </div>
    );
};