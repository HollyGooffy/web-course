import { useState, useCallback } from 'react';

interface UseImageUploadOptions {
  maxSize?: number; // в байтах, по умолчанию 10MB
  allowedTypes?: string[]; // по умолчанию ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
}

interface UseImageUploadReturn {
  imageFile: File | null;
  imagePreview: string;
  error: string;
  isLoading: boolean;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: () => void;
  setImagePreview: (preview: string) => void;
  setImageFile: (file: File | null) => void;
}

export const useImageUpload = (options: UseImageUploadOptions = {}): UseImageUploadReturn => {
  const {
    maxSize = 10 * 1024 * 1024, // 10MB
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  } = options;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      return;
    }

    setError('');
    setIsLoading(true);

    // Проверка размера файла
    if (file.size > maxSize) {
      setError(`Размер файла не должен превышать ${Math.round(maxSize / (1024 * 1024))}MB`);
      setIsLoading(false);
      return;
    }

    // Проверка типа файла
    if (!allowedTypes.includes(file.type)) {
      setError('Можно загружать только изображения (JPG, PNG, GIF, WebP)');
      setIsLoading(false);
      return;
    }

    setImageFile(file);

    // Создание превью
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setIsLoading(false);
    };
    reader.onerror = () => {
      setError('Ошибка при чтении файла');
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  }, [maxSize, allowedTypes]);

  const removeImage = useCallback(() => {
    setImageFile(null);
    setImagePreview('');
    setError('');
  }, []);

  return {
    imageFile,
    imagePreview,
    error,
    isLoading,
    handleImageChange,
    removeImage,
    setImagePreview,
    setImageFile,
  };
};