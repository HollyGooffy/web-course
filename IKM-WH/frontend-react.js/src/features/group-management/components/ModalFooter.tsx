import { AdminBtn } from '@shared/ui/adminPage';
import { ModalFooterProps } from '../model/types';
import style from '../ui/GroupModal.module.css';

export const ModalFooter = ({ mode, isSubmitting, submitError, onClose }: ModalFooterProps) => {
    return (
        <div className={style.modalFooter}>
            {submitError && <span className={style.error}>{submitError}</span>}
            <AdminBtn
                type="submit"
                variant="primary"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Сохранение...' : mode === 'create' ? 'Создать' : 'Сохранить'}
            </AdminBtn>
            <AdminBtn
                type="button"
                variant="black-outline"
                onClick={onClose}
                disabled={isSubmitting}
            >
                Отмена
            </AdminBtn>
        </div>
    );
};