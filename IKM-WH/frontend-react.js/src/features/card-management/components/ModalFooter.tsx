import style from '../ui/CardModal.module.css';

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
        <button
          type="button"
          className={style.cancelButton}
          onClick={onClose}
          disabled={loading}
        >
          Отмена
        </button>
        <button
          type="submit"
          className={style.saveButton}
          disabled={loading}
        >
          {loading ? 'Сохранение...' : (isEditing ? 'Сохранить' : 'Создать')}
        </button>
      </div>
    </>
  );
};