import { AdminInput } from '@shared/ui/adminPage/AdminInput';
import { AdminSelect } from '@shared/ui/adminPage/AdminSelect';
import { ImageUpload } from '@shared/ui/image-upload';
import { CreateMerchData } from '@shared/api/endpoints/merch.endpoints';
import style from '../ui/MerchModal.module.css';

interface MerchFormProps {
  formData: CreateMerchData;
  errors: Record<string, string>;
  imagePreview: string | null;
  imageLoading: boolean;
  onFormDataChange: (data: Partial<CreateMerchData>) => void;
  onImageChange: (file: File | null) => void;
  onRemoveImage: () => void;
}

export const MerchForm: React.FC<MerchFormProps> = ({
  formData,
  errors,
  imagePreview,
  imageLoading,
  onFormDataChange,
  onImageChange,
  onRemoveImage,
}) => {
  return (
    <>
      <div className={style.formGroup}>
        <label htmlFor="title">Название товара *</label>
        <AdminInput
          type="text"
          placeholder="Введите название товара"
          value={formData.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            onFormDataChange({ title: e.target.value })
          }
        />
        {errors.title && <span className={style.error}>{errors.title}</span>}
      </div>

      <div className={style.formGroup}>
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          className={style.textarea}
          placeholder="Введите описание товара"
          value={formData.description}
          onChange={(e) => onFormDataChange({ description: e.target.value })}
          rows={4}
        />
      </div>

      <div className={style.formRow}>
        <div className={style.formGroup}>
          <label htmlFor="price">Цена *</label>
          <AdminInput
            type="number"
            placeholder="Введите цену"
            value={formData.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              onFormDataChange({ price: e.target.value as any })
            }
            min="0"
            step="0.01"
          />
          {errors.price && <span className={style.error}>{errors.price}</span>}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="stock">Количество *</label>
          <AdminInput
            type="number"
            placeholder="Введите количество"
            value={formData.stock}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              onFormDataChange({ stock: e.target.value as any })
            }
            min="0"
          />
          {errors.stock && <span className={style.error}>{errors.stock}</span>}
        </div>
      </div>

      <div className={style.formGroup}>
        <label htmlFor="category">Категория</label>
        <AdminSelect
          value={formData.category}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
            onFormDataChange({ category: e.target.value })
          }
        >
          <option value="">Выберите категорию</option>
          <option value="Одежда">Одежда</option>
          <option value="Аксессуары">Аксессуары</option>
          <option value="Музыка">Музыка</option>
          <option value="Сувениры">Сувениры</option>
          <option value="Другое">Другое</option>
        </AdminSelect>
      </div>

      <div className={style.formGroup}>
        <label>Изображение товара</label>
        <ImageUpload
          imagePreview={imagePreview}
          error={errors.image}
          isLoading={imageLoading}
          onImageChange={onImageChange}
          onRemoveImage={onRemoveImage}
          placeholder="Загрузить изображение товара"
          description="PNG, JPG до 10MB (автоматически сжимается)"
        />
      </div>
    </>
  );
};