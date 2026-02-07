import style from './CardModal.module.css';
import { CardSet } from '@shared/api/endpoints/cards.endpoints';
import { ModalHeader, CardForm, ModalFooter } from '../components';
import { useCardForm } from '../hooks';

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  card?: CardSet | null;
  festivalId?: string;
}

export const CardModal: React.FC<CardModalProps> = ({ isOpen, onClose, card, festivalId }) => {
  const {
    formData,
    loading,
    error,
    imagePreview,
    imageError,
    handleInputChange,
    handleImageChange,
    removeImage,
    handleSubmit,
  } = useCardForm(card, isOpen, festivalId);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(onClose);
  };

  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <ModalHeader isEditing={!!card} onClose={onClose} />

        <form onSubmit={onSubmit} className={style.form}>
          <CardForm
            formData={formData}
            onInputChange={handleInputChange}
            imagePreview={imagePreview}
            imageError={imageError}
            onImageChange={handleImageChange}
            onRemoveImage={removeImage}
          />

          <ModalFooter
            onClose={onClose}
            loading={loading}
            isEditing={!!card}
            error={error}
          />
        </form>
      </div>
    </div>
  );
};