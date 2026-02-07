import { AdminBtn } from '@shared/ui/adminPage';
import style from '../ui/MerchModal.module.css';

interface ModalFooterProps {
  mode: 'create' | 'edit';
  isSubmitting: boolean;
  submitError?: string;
  onClose: () => void;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  mode,
  isSubmitting,
  submitError,
  onClose,
}) => {
  return (
    <div className={style.modalFooter}>
      {submitError && <span className={style.error}>{submitError}</span>}
      <AdminBtn
        type="button"
        variant="black-outline"
        onClick={onClose}
        disabled={isSubmitting}
      >
        Отмена
      </AdminBtn>
      <AdminBtn
        type="submit"
        variant="primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Сохранение...' : mode === 'create' ? 'Создать' : 'Сохранить'}
      </AdminBtn>
    </div>
  );
};