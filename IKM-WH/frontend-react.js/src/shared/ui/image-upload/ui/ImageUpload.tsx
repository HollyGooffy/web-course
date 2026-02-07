import React from 'react';
import { Upload, X } from 'lucide-react';
import style from './ImageUpload.module.css';

interface ImageUploadProps {
  imagePreview: string | null;
  error?: string | null;
  isLoading?: boolean;
  onImageChange: (file: File | null) => void;
  onRemoveImage: () => void;
  placeholder?: string;
  description?: string;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  imagePreview,
  error,
  isLoading = false,
  onImageChange,
  onRemoveImage,
  placeholder = 'Загрузить изображение',
  description = 'PNG, JPG до 10MB (автоматически сжимается)',
  className = '',
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onImageChange(file);
  };

  return (
    <div className={`${style.imageUpload} ${className}`}>
      {imagePreview ? (
        <div className={style.imagePreviewContainer}>
          <img src={imagePreview} alt="Preview" className={style.imagePreview} />
          <button
            type="button"
            className={style.removeImage}
            onClick={onRemoveImage}
            disabled={isLoading}
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className={`${style.uploadArea} ${isLoading ? style.loading : ''}`}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={style.fileInput}
            disabled={isLoading}
          />
          {isLoading ? (
            <>
              <div className={style.spinner} />
              <span>Загрузка...</span>
            </>
          ) : (
            <>
              <Upload size={32} />
              <span>{placeholder}</span>
              <small>{description}</small>
            </>
          )}
        </label>
      )}
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
};