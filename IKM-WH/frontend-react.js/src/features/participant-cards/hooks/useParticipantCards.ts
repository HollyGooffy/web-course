import { useState, useEffect } from 'react';
import { CompressedImage, compressMultipleImages, isImageFile } from '@shared/lib/utils/imageCompression';

export const useParticipantCards = (
  initialCards: CompressedImage[],
  maxCards: number,
  readonly: boolean,
  onCardsChange?: (cards: CompressedImage[]) => void
) => {
  const [cards, setCards] = useState<CompressedImage[]>(initialCards);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState('');
  const [dragOver, setDragOver] = useState(false);

  // Синхронизируем внутреннее состояние с пропсами
  useEffect(() => {
    setCards(initialCards);
  }, [initialCards]);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || readonly) return;

    const imageFiles = Array.from(files).filter(isImageFile);
    const remainingSlots = maxCards - cards.length;
    const filesToProcess = imageFiles.slice(0, remainingSlots);

    if (filesToProcess.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const compressedImages = await compressMultipleImages(
        filesToProcess,
        {
          maxSizeInMB: 1,
          maxWidthOrHeight: 1200,
          quality: 0.85
        },
        (progress, fileName) => {
          setUploadProgress(progress);
          setCurrentFile(fileName);
        }
      );

      const newCards = [...cards, ...compressedImages];
      setCards(newCards);
      onCardsChange?.(newCards);
    } catch (error) {
      console.error('Ошибка при сжатии изображений:', error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setCurrentFile('');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeCard = (index: number) => {
    if (readonly) return;
    
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
    onCardsChange?.(newCards);
  };

  return {
    cards,
    isUploading,
    uploadProgress,
    currentFile,
    dragOver,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    removeCard,
  };
};