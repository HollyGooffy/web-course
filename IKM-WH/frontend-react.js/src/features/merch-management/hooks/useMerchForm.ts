import { useState, useEffect, useCallback } from 'react';
import { MerchItem, CreateMerchData } from '@shared/api/endpoints/merch.endpoints';
import { getImageUrl } from '@shared/lib/utils/getImageUrl';
import { useImageUpload } from '@shared/hooks/useImageUpload';

const initialFormData: CreateMerchData = {
  title: '',
  description: '',
  price: '' as any,
  stock: '' as any,
  category: ''
};

export const useMerchForm = (item: MerchItem | null | undefined, mode: 'create' | 'edit', isOpen: boolean) => {
  const [formData, setFormData] = useState<CreateMerchData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const {
    imageFile,
    imagePreview,
    error: imageError,
    isLoading: imageLoading,
    handleImageChange,
    removeImage,
    setImagePreview,
  } = useImageUpload();

  useEffect(() => {
    if (item && mode === 'edit') {
      setFormData({
        title: item.title,
        description: item.description || '',
        price: item.price as any,
        stock: item.stock as any,
        category: item.category || ''
      });
      if (item.image) {
        setImagePreview(getImageUrl(item.image) || '');
      }
    } else {
      setFormData(initialFormData);
      removeImage();
    }
    setErrors({});
  }, [item, mode, isOpen, removeImage, setImagePreview]);

  const handleFormDataChange = (data: Partial<CreateMerchData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Название товара обязательно';
    }

    const price = typeof formData.price === 'string' ? parseFloat(formData.price) : formData.price;
    if (!price || price <= 0) {
      newErrors.price = 'Цена должна быть больше 0';
    }

    const stock = typeof formData.stock === 'string' ? parseInt(formData.stock) : formData.stock;
    if (stock === undefined || stock === null || stock < 0) {
      newErrors.stock = 'Количество не может быть отрицательным';
    }

    if (imageError) {
      newErrors.image = imageError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    onSubmit: (data: CreateMerchData, imageFile?: File) => Promise<void>,
    onClose: () => void
  ) => {
    if (!validate() || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      const dataToSubmit = {
        ...formData,
        price: typeof formData.price === 'string' ? parseFloat(formData.price) : formData.price,
        stock: typeof formData.stock === 'string' ? parseInt(formData.stock) : formData.stock,
      };
      await onSubmit(dataToSubmit, imageFile || undefined);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error instanceof Error) {
        setErrors({ ...errors, submit: error.message });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = useCallback((file: File | null) => {
    if (file) {
      // Создаем фейковый event для handleImageChange
      const fakeEvent = {
        target: {
          files: [file]
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleImageChange(fakeEvent);
    } else {
      removeImage();
    }
  }, [handleImageChange, removeImage]);

  return {
    formData,
    errors,
    isSubmitting,
    imagePreview,
    imageLoading,
    handleFormDataChange,
    handleImageChange: handleFileChange,
    removeImage,
    handleSubmit,
  };
};