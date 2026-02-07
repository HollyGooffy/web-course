import { AdminInput } from '@shared/ui/adminPage/AdminInput';
import { AdminSelect } from '@shared/ui/adminPage/AdminSelect';
import { ImageUpload } from '@shared/ui/image-upload';
import { EventFormProps, EventStatus } from '../model/types';
import { EVENT_STATUSES } from '../config/constants';
import style from '../ui/EventModal.module.css';

export const EventForm = ({
    formData,
    errors,
    imagePreview,
    imageLoading,
    onFormDataChange,
    onImageChange,
    onRemoveImage
}: EventFormProps) => {
    return (
        <>
            <div className={style.formGroup}>
                <label>Название события *</label>
                <AdminInput
                    type="text"
                    placeholder="Введите название события"
                    value={formData.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        onFormDataChange({ title: e.target.value })
                    }
                />
                {errors.title && <span className={style.error}>{errors.title}</span>}
            </div>

            <div className={style.formGroup}>
                <label>Описание</label>
                <textarea
                    className={style.textarea}
                    placeholder="Введите описание события"
                    value={formData.description}
                    onChange={(e) => onFormDataChange({ description: e.target.value })}
                    rows={4}
                />
            </div>

            <div className={style.formRow}>
                <div className={style.formGroup}>
                    <label>Дата *</label>
                    <AdminInput
                        type="date"
                        value={formData.date}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            onFormDataChange({ date: e.target.value })
                        }
                    />
                    {errors.date && <span className={style.error}>{errors.date}</span>}
                </div>

                <div className={style.formGroup}>
                    <label>Время *</label>
                    <AdminInput
                        type="time"
                        value={formData.time}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            onFormDataChange({ time: e.target.value })
                        }
                    />
                    {errors.time && <span className={style.error}>{errors.time}</span>}
                </div>
            </div>

            <div className={style.formGroup}>
                <label>Место проведения *</label>
                <AdminInput
                    type="text"
                    placeholder="Название клуба/бара"
                    value={formData.venue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        onFormDataChange({ venue: e.target.value })
                    }
                />
                {errors.venue && <span className={style.error}>{errors.venue}</span>}
            </div>

            <div className={style.formGroup}>
                <label>Адрес *</label>
                <AdminInput
                    type="text"
                    placeholder="Адрес места проведения"
                    value={formData.address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        onFormDataChange({ address: e.target.value })
                    }
                />
                {errors.address && <span className={style.error}>{errors.address}</span>}
            </div>

            <div className={style.formGroup}>
                <label>Изображение афиши</label>
                <ImageUpload
                    imagePreview={imagePreview}
                    error={errors.image}
                    isLoading={imageLoading}
                    onImageChange={onImageChange}
                    onRemoveImage={onRemoveImage}
                    placeholder="Загрузить изображение афиши"
                    description="PNG, JPG до 10MB (автоматически сжимается)"
                />
            </div>

            <div className={style.formGroup}>
                <label>Статус</label>
                <AdminSelect
                    value={formData.status}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                        onFormDataChange({ status: e.target.value as EventStatus })
                    }
                >
                    {EVENT_STATUSES.map(status => (
                        <option key={status.value} value={status.value}>
                            {status.label}
                        </option>
                    ))}
                </AdminSelect>
            </div>
        </>
    );
};