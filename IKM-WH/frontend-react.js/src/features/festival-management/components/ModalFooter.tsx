import { AdminBtn } from "@shared/ui";
import style from '../ui/FestivalModal.module.css';

interface ModalFooterProps {
  onClose: () => void;
  loading: boolean;
  isEditing: boolean;
  error?: string | null;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  onClose,
  loading,
  isEditing,
  error,
}) => {
  return (
    <>
      {error && (
        <div className={style.error}>
          {error}
        </div>
      )}

      <div className={style.formActions}>
        <AdminBtn
          type="button"
          variant="black-outline"
          onClick={onClose}
          disabled={loading}
        >
          Отмена
        </AdminBtn>
        <AdminBtn
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? 'Сохранение...' : (isEditing ? 'Сохранить' : 'Создать')}
        </AdminBtn>
      </div>
    </>
  );
};