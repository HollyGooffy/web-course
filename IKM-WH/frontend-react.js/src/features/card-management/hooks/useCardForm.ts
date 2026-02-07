import { useState, useEffect, useCallback, useMemo } from 'react';
import { CardSet, CreateCardSetData } from '@shared/api/endpoints/cards.endpoints';
import { useAdminCards } from '@shared/hooks/useAdminCards';
import { useImageUpload } from '@shared/hooks/useImageUpload';
import { getImageUrl } from '@shared/lib/utils/getImageUrl';

interface CardFormData {
  title: string;
  cardsInSet: string | number;
  setsAvailable: string | number;
  price: string | number;
}

const initialFormData: CardFormData = {
  title: '',
  cardsInSet: '' as any,
  setsAvailable: '' as any,
  price: '' as any,
};

export const useCardForm = (card: CardSet | null | undefined, isOpen: boolean, festivalId?: string) => {
  const { createCardSet, updateCardSet } = useAdminCards();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CardFormData>(initialFormData);

  const {
    imageFile,
    imagePreview,
    error: imageError,
    handleImageChange,
    removeImage,
    setImagePreview,
  } = useImageUpload();

  // Мемоизируем ключ карточки для предотвращения лишних эффектов
  const cardKey = useMemo(() => card?.id || null, [card?.id]);

  useEffect(() => {
    if (card) {
      setFormData({
        title: card.title,
        cardsInSet: card.cardsInSet,
        setsAvailable: card.setsAvailable,
        price: card.price,
      });
      if (card.image) {
        setImagePreview(getImageUrl(card.image) || '');
      }
    } else {
      setFormData(initialFormData);
      removeImage();
    }
    setError(null);
  }, [cardKey, isOpen, removeImage, setImagePreview]);

  // Мемоизируем функцию изменения полей
  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Мемоизируем функцию валидации
  const validateForm = useCallback((): boolean => {
    if (!formData.title.trim()) {
      setError('Название набора обязательно');
      return false;
    }

    const cardsInSet = typeof formData.cardsInSet === 'string' ? parseInt(formData.cardsInSet) : formData.cardsInSet;
    if (!cardsInSet || cardsInSet < 1) {
      setError('Количество карточек в наборе должно быть больше 0');
      return false;
    }

    const setsAvailable = typeof formData.setsAvailable === 'string' ? parseInt(formData.setsAvailable) : formData.setsAvailable;
    if (setsAvailable === undefined || setsAvailable === null || setsAvailable < 0) {
      setError('Количество доступных наборов не может быть отрицательным');
      return false;
    }

    const price = typeof formData.price === 'string' ? parseFloat(formData.price) : formData.price;
    if (!price || price <= 0) {
      setError('Цена должна быть больше 0');
      return false;
    }

    return true;
  }, [formData]);

  // Мемоизируем функцию отправки
  const handleSubmit = useCallback(async (onClose: () => void) => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cardsInSet = typeof formData.cardsInSet === 'string' ? parseInt(formData.cardsInSet) : formData.cardsInSet;
      const setsAvailable = typeof formData.setsAvailable === 'string' ? parseInt(formData.setsAvailable) : formData.setsAvailable;
      const price = typeof formData.price === 'string' ? parseFloat(formData.price) : formData.price;

      const dataToSubmit: CreateCardSetData = {
        title: formData.title,
        festivalId: festivalId!,
        cardsInSet,
        setsAvailable,
        price,
      };

      if (card) {
        await updateCardSet(card.id, dataToSubmit, imageFile || undefined);
      } else {
        await createCardSet(dataToSubmit, imageFile || undefined);
      }

      onClose();
    } catch (err: any) {
      setError(err.message || 'Ошибка сохранения набора карточек');
    } finally {
      setLoading(false);
    }
  }, [validateForm, formData, festivalId, card, imageFile, createCardSet, updateCardSet]);

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
    handleImageChange: handleFileChange,
    removeImage,
    handleSubmit,
  };
};
