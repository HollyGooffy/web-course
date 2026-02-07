import { AdminInput } from '@shared/ui/adminPage/AdminInput';
import { AdminSelect } from '@shared/ui/adminPage/AdminSelect';
import { ImageUpload } from '@shared/ui/image-upload';
import style from '../ui/FestivalModal.module.css';

interface FestivalFormData {
  name: string;
  date: string;
  venue: string;
  description: string;
  time: string;
  address: string;
  performers: string[];
  status: string;
}

interface FestivalFormProps {
  formData: FestivalFormData;
  onInputChange: (field: string, value: string) => void;
  onPerformersChange: (value: string) => void;
  imagePreview: string | null;
  imageError: string | null;
  onImageChange: (file: File | null) => void;
  onRemoveImage: () => void;
}

export const FestivalForm: React.FC<FestivalFormProps> = ({
  formData,
  onInputChange,
  onPerformersChange,
  imagePreview,
  imageError,
  onImageChange,
  onRemoveImage,
}) => {
  return (
    <>
      <div className={style.formGroup}>
        <label>Название фестиваля *</label>
        <AdminInput
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          placeholder="Введите название фестиваля"
          required
        />
      </div>

      <div className={style.formGroup}>
        <label>Дата проведения *</label>
        <AdminInput
          type="date"
          value={formData.date}
          onChange={(e) => onInputChange('date', e.target.value)}
          required
        />
      </div>

      <div className={style.formGroup}>
        <label>Место проведения *</label>
        <AdminInput
          value={formData.venue}
          onChange={(e) => onInputChange('venue', e.target.value)}
          placeholder="Введите место проведения"
          required
        />
      </div>

      <div className={style.formGroup}>
        <label>Время начала</label>
        <AdminInput
          type="time"
          value={formData.time}
          onChange={(e) => onInputChange('time', e.target.value)}
          placeholder="Время начала"
        />
      </div>

      <div className={style.formGroup}>
        <label>Адрес</label>
        <AdminInput
          value={formData.address}
          onChange={(e) => onInputChange('address', e.target.value)}
          placeholder="Полный адрес места проведения"
        />
      </div>

      <div className={style.formGroup}>
        <label>Статус</label>
        <AdminSelect
          value={formData.status}
          onChange={(e) => onInputChange('status', e.target.value)}
        >
          <option value="upcoming">Предстоящий</option>
          <option value="completed">Завершен</option>
          <option value="cancelled">Отменен</option>
        </AdminSelect>
      </div>

      <div className={style.formGroup}>
        <label>Описание</label>
        <textarea
          className={style.textarea}
          value={formData.description}
          onChange={(e) => onInputChange('description', e.target.value)}
          placeholder="Описание фестиваля"
          rows={3}
        />
      </div>

      <div className={style.formGroup}>
        <label>Участники</label>
        <textarea
          className={style.textarea}
          value={formData.performers.join('\n')}
          onChange={(e) => onPerformersChange(e.target.value)}
          placeholder="Введите участников, каждого с новой строки"
          rows={4}
        />
        <small className={style.hint}>Каждый участник с новой строки</small>
      </div>

      <div className={style.imageSection}>
        <label className={style.imageLabel}>Изображение фестиваля</label>
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