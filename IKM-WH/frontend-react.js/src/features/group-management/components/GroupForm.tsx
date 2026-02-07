import { AdminInput } from '@shared/ui/adminPage/AdminInput';
import { AdminSelect } from '@shared/ui/adminPage/AdminSelect';
import { ImageUpload } from '@shared/ui/image-upload';
import { GroupFormProps } from '../model/types';
import { MUSIC_GENRES } from '../config/constants';
import { MembersSection } from './MembersSection';
import style from '../ui/GroupModal.module.css';

export const GroupForm = ({
    formData,
    errors,
    imagePreview,
    imageLoading,
    onFormDataChange,
    onImageChange,
    onRemoveImage
}: GroupFormProps) => {
    return (
        <>
            <div className={style.formGroup}>
                <label htmlFor="name">Название группы *</label>
                <AdminInput
                    type="text"
                    placeholder="Введите название группы"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        onFormDataChange({ name: e.target.value })
                    }
                />
                {errors.name && <span className={style.error}>{errors.name}</span>}
            </div>

            <div className={style.formGroup}>
                <label htmlFor="genre">Жанр *</label>
                <AdminSelect
                    value={formData.genre}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                        onFormDataChange({ genre: e.target.value })
                    }
                >
                    <option value="">Выберите жанр</option>
                    {MUSIC_GENRES.map(genre => (
                        <option key={genre.value} value={genre.value}>
                            {genre.label}
                        </option>
                    ))}
                </AdminSelect>
                {errors.genre && <span className={style.error}>{errors.genre}</span>}
            </div>

            <div className={style.formGroup}>
                <label htmlFor="description">Описание *</label>
                <textarea
                    id="description"
                    className={style.textarea}
                    placeholder="Введите описание группы"
                    value={formData.description}
                    onChange={(e) => onFormDataChange({ description: e.target.value })}
                    rows={4}
                />
                {errors.description && <span className={style.error}>{errors.description}</span>}
            </div>

            <div className={style.formGroup}>
                <label>Изображение группы</label>
                <ImageUpload
                    imagePreview={imagePreview}
                    error={errors.image}
                    isLoading={imageLoading}
                    onImageChange={onImageChange}
                    onRemoveImage={onRemoveImage}
                    placeholder="Загрузить изображение группы"
                    description="PNG, JPG до 10MB (автоматически сжимается)"
                />
            </div>

            <div className={style.formGroup}>
                <label htmlFor="vkLink">Ссылка на VK</label>
                <AdminInput
                    type="text"
                    placeholder="https://vk.com/your_group"
                    value={formData.vkLink}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        onFormDataChange({ vkLink: e.target.value })
                    }
                />
            </div>

            <div className={style.formGroup}>
                <label htmlFor="tgLink">Ссылка на Telegram</label>
                <AdminInput
                    type="text"
                    placeholder="https://t.me/your_channel"
                    value={formData.tgLink}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        onFormDataChange({ tgLink: e.target.value })
                    }
                />
            </div>

            <MembersSection
                members={formData.members}
                error={errors.members}
                onMembersChange={(members) => onFormDataChange({ members })}
            />
        </>
    );
};