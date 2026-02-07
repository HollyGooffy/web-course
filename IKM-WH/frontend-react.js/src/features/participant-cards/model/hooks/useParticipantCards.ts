import { useState, useCallback } from 'react';
import { 
  ParticipantCard,
  ParticipantCardSettings,
  getParticipantCardsByFestival,
  getParticipantCardsByGroup,
  saveParticipantCardsForGroup,
  deleteParticipantCardsForGroup,
  deleteAllParticipantCardsForFestival,
  updateParticipantCardSettings,
  getParticipantCardImageUrl
} from '@shared/api/endpoints/participantCards.endpoints';
import { CompressedImage } from '@shared/lib/utils/imageCompression';

// Функция для конвертации файлов в CompressedImage для совместимости
const convertParticipantCardToCompressedImages = (participantCard: ParticipantCard): CompressedImage[] => {
  return participantCard.cards.map(card => ({
    file: new File([], card.originalName, { type: card.mimetype }),
    dataUrl: getParticipantCardImageUrl(card.filename),
    originalSize: card.size,
    compressedSize: card.compressedSize,
    compressionRatio: card.compressionRatio
  }));
};

// Функция для конвертации CompressedImage в File для загрузки
const convertCompressedImageToFile = async (compressedImage: CompressedImage): Promise<File> => {
  if (compressedImage.file.size > 0) {
    return compressedImage.file;
  }
  
  // Если файл пустой, создаем из dataUrl
  const response = await fetch(compressedImage.dataUrl);
  const blob = await response.blob();
  return new File([blob], `participant-card-${Date.now()}.jpg`, { type: 'image/jpeg' });
};

export const useParticipantCards = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Получение карточек для конкретного фестиваля
  const getCardsByFestival = useCallback(async (festivalId: string): Promise<ParticipantCard[]> => {
    try {
      const cards = await getParticipantCardsByFestival(festivalId);
      return cards;
    } catch (err: any) {
      // 404 ошибка означает, что карточек для этого фестиваля еще нет - это нормально
      if (err.response?.status === 404) {
        return [];
      }
      console.error('Error fetching participant cards by festival:', err);
      return [];
    }
  }, []);

  // Получение карточек для конкретной группы (возвращает CompressedImage[] для совместимости)
  const getCardsByGroup = useCallback(async (
    festivalId: string, 
    groupName: string, 
    eventId: string
  ): Promise<CompressedImage[]> => {
    try {
      const participantCard = await getParticipantCardsByGroup(festivalId, groupName, eventId);
      return convertParticipantCardToCompressedImages(participantCard);
    } catch (err: any) {
      // 404 ошибка означает, что карточек для этой группы еще нет - это нормально
      if (err.response?.status === 404) {
        return [];
      }
      console.error('Error fetching participant cards by group:', err);
      return [];
    }
  }, []);

  // Сохранение карточек для группы
  const saveCardsForGroup = useCallback(async (
    festivalId: string,
    groupName: string,
    eventId: string,
    cards: CompressedImage[],
    settings?: Partial<ParticipantCardSettings>
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // Конвертируем CompressedImage в File
      const files: File[] = [];
      for (const card of cards) {
        const file = await convertCompressedImageToFile(card);
        files.push(file);
      }

      await saveParticipantCardsForGroup(
        festivalId,
        groupName,
        eventId,
        files,
        settings
      );
    } catch (err) {
      console.error('Error saving participant cards:', err);
      setError('Ошибка сохранения карточек участников');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Удаление карточек группы
  const deleteCardsForGroup = useCallback(async (
    festivalId: string,
    groupName: string,
    eventId: string
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await deleteParticipantCardsForGroup(festivalId, groupName, eventId);
    } catch (err) {
      console.error('Error deleting participant cards:', err);
      setError('Ошибка удаления карточек участников');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Удаление всех карточек фестиваля
  const deleteAllCardsForFestival = useCallback(async (festivalId: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await deleteAllParticipantCardsForFestival(festivalId);
    } catch (err) {
      console.error('Error deleting all festival participant cards:', err);
      setError('Ошибка удаления карточек участников');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Обновление настроек карточек участников
  const updateCardSettings = useCallback(async (
    festivalId: string,
    groupName: string,
    eventId: string,
    settings: Partial<ParticipantCardSettings>
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await updateParticipantCardSettings(festivalId, groupName, eventId, settings);
    } catch (err) {
      console.error('Error updating participant card settings:', err);
      setError('Ошибка обновления настроек карточек участников');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getCardsByFestival,
    getCardsByGroup,
    saveCardsForGroup,
    deleteCardsForGroup,
    deleteAllCardsForFestival,
    updateCardSettings
  };
};