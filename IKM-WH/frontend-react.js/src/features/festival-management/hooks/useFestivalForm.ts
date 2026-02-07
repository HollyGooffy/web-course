import { useState, useEffect, useCallback } from 'react';
import { Festival } from '@shared/api/endpoints/festivals.endpoints';
import { useImageUpload } from '@shared/hooks/useImageUpload';
import { getImageUrl } from '@shared/lib/utils/getImageUrl';
import { useAdminFestivals } from '@shared/hooks/useAdminFestivals';

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

const initialFormData: FestivalFormData = {
  name: '',
  date: '',
  venue: '',
  description: '',
  time: '',
  address: '',
  performers: [],
  status: 'upcoming',
};

export const useFestivalForm = (festival: Festival | null | undefined, isOpen: boolean) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FestivalFormData>(initialFormData);

  const { createFestival, updateFestival } = useAdminFestivals();

  const {
    imageFile,
    imagePreview,
    error: imageError,
    handleImageChange,
    removeImage,
    setImagePreview,
  } = useImageUpload();

  useEffect(() => {
    if (festival) {
      setFormData({
        name: festival.name,
        date: festival.date.split('T')[0],
        venue: festival.venue,
        description: festival.description || '',
        time: festival.time || '',
        address: festival.address || '',
        performers: festival.performers || [],
        status: festival.status,
      });
      if (festival.image) {
        setImagePreview(getImageUrl(festival.image) || '');
      }
    } else {
      setFormData(initialFormData);
      removeImage();
    }
    setError(null);
  }, [festival, isOpen, removeImage, setImagePreview]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePerformersChange = (value: string) => {
    const performers = value.split('\n').map(p => p.trim()).filter(p => p.length > 0);
    setFormData(prev => ({
      ...prev,
      performers
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Название фестиваля обязательно');
      return false;
    }

    if (!formData.date) {
      setError('Дата фестиваля обязательна');
      return false;
    }

    if (!formData.venue.trim()) {
      setError('Место проведения обязательно');
      return false;
    }

    return true;
  };

  const handleSubmit = async (onClose: () => void) => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const festivalData = {
        name: formData.name.trim(),
        date: formData.date,
        venue: formData.venue.trim(),
        description: formData.description.trim() || undefined,
        time: formData.time.trim() || undefined,
        address: formData.address.trim() || undefined,
        performers: formData.performers.length > 0 ? formData.performers : undefined,
        status: formData.status,
      };

      if (festival) {
        // Обновление существующего фестиваля
        await updateFestival(festival.id, festivalData, imageFile || undefined);
      } else {
        // Создание нового фестиваля
        await createFestival(festivalData, imageFile || undefined);
      }
      
      onClose();
    } catch (err: any) {
      setError(err.message || 'Ошибка сохранения фестиваля');
    } finally {
      setLoading(false);
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
    loading,
    error,
    imagePreview,
    imageError,
    handleInputChange,
    handlePerformersChange,
    handleImageChange: handleFileChange,
    removeImage,
    handleSubmit,
  };
};