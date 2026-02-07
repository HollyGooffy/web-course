import { AdminInput } from '@shared/ui/adminPage/AdminInput';
import { ImageUpload } from '@shared/ui/image-upload';
import style from '../ui/CardModal.module.css';

interface CardFormData {
  title: string;
  cardsInSet: string | number;
  setsAvailable: string | number;
  price: string | number;
}

interface CardFormProps {
  formData: CardFormData;
  onInputChange: (field: string, value: string) => void;
  imagePreview: string | null;
  imageError: string | null;
  onImageChange: (file: File | null) => void;
  onRemoveImage: () => void;
}

export const CardForm: React.FC<CardFormProps> = ({
  formData,
  onInputChange,
  imagePreview,
  imageError,
  onImageChange,
  onRemoveImage,
}) => {
  return (
    <>
      <div className={style.formGrid}>
        <div className={style.leftColumn}>
          <div className={style.formGroup}>
            <label>Название набора *</label>
            <AdminInput
              value={formData.title}
              onChange={(e) => onInputChange('title', e.target.value)}
              placeholder="Введите название набора"
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>Карточек в наборе *</label>
            <AdminInput
              type="number"
              value={formData.cardsInSet}
              onChange={(e) => onInputChange('cardsInSet', e.target.value)}
              placeholder="Количество карточек"
              min="1"
              required
            />
          </div>
        </div>

        <div className={style.rightColumn}>
          <div className={style.formGroup}>
            <label>Доступно наборов *</label>
            <AdminInput
              type="number"
              value={formData.setsAvailable}
              onChange={(e) => onInputChange('setsAvailable', e.target.value)}
              placeholder="Количество наборов"
              min="0"
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>Цена (₽) *</label>
            <AdminInput
              type="number"
              value={formData.price}
              onChange={(e) => onInputChange('price', e.target.value)}
              placeholder="Цена набора"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
      </div>

      <div className={style.imageSection}>
        <label className={style.imageLabel}>Изображение набора</label>
        <ImageUpload
          onImageChange={onImageChange}
          onRemoveImage={onRemoveImage}
          imagePreview={imagePreview}
          error={imageError}
        />
      </div>
    </>
  );
};