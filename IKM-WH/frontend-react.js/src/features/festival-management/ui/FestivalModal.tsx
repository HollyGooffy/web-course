import { useEffect } from 'react';
import style from './FestivalModal.module.css';
import { Festival } from '@shared/api/endpoints/festivals.endpoints';
import { Portal } from "@shared/ui";
import { ModalHeader, FestivalForm, ModalFooter } from '../components';
import { useFestivalForm } from '../hooks';

interface FestivalModalProps {
  isOpen: boolean;
  onClose: () => void;
  festival?: Festival | null;
}

export const FestivalModal: React.FC<FestivalModalProps> = ({ isOpen, onClose, festival }) => {
  const {
    formData,
    loading,
    error,
    imagePreview,
    imageError,
    handleInputChange,
    handlePerformersChange,
    handleImageChange,
    removeImage,
    handleSubmit,
  } = useFestivalForm(festival, isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(onClose);
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div className={style.modalOverlay} onClick={onClose}>
        <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
          <ModalHeader isEditing={!!festival} onClose={onClose} />

          <form onSubmit={onSubmit} className={style.form}>
            <FestivalForm
              formData={formData}
              onInputChange={handleInputChange}
              onPerformersChange={handlePerformersChange}
              imagePreview={imagePreview}
              imageError={imageError}
              onImageChange={handleImageChange}
              onRemoveImage={removeImage}
            />

            <ModalFooter
              onClose={onClose}
              loading={loading}
              isEditing={!!festival}
              error={error}
            />
          </form>
        </div>
      </div>
    </Portal>
  );
};