import style from './MerchModal.module.css';
import { MerchItem, CreateMerchData } from '@shared/api/endpoints/merch.endpoints';
import { ModalHeader, MerchForm, ModalFooter } from '../components';
import { useMerchForm } from '../hooks';

interface MerchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateMerchData, imageFile?: File) => Promise<void>;
  item?: MerchItem | null;
  mode: 'create' | 'edit';
}

export const MerchModal: React.FC<MerchModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  item,
  mode
}) => {
  const {
    formData,
    errors,
    isSubmitting,
    imagePreview,
    imageLoading,
    handleFormDataChange,
    handleImageChange,
    removeImage,
    handleSubmit,
  } = useMerchForm(item, mode, isOpen);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(onSubmit, onClose);
  };

  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <ModalHeader mode={mode} onClose={onClose} />

        <form onSubmit={onFormSubmit} className={style.modalBody}>
          <MerchForm
            formData={formData}
            errors={errors}
            imagePreview={imagePreview}
            imageLoading={imageLoading}
            onFormDataChange={handleFormDataChange}
            onImageChange={handleImageChange}
            onRemoveImage={removeImage}
          />

          <ModalFooter
            mode={mode}
            isSubmitting={isSubmitting}
            submitError={errors.submit}
            onClose={onClose}
          />
        </form>
      </div>
    </div>
  );
};