/**
 * Утилита для сжатия изображений до максимального размера 1MB
 */

export interface CompressionOptions {
  maxSizeInMB: number;
  maxWidthOrHeight: number;
  useWebWorker?: boolean;
  quality?: number;
}

export interface CompressedImage {
  file: File;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  dataUrl: string;
}

/**
 * Сжимает изображение до указанного размера
 */
export const compressImage = async (
  file: File,
  options: CompressionOptions = {
    maxSizeInMB: 1,
    maxWidthOrHeight: 1920,
    quality: 0.8
  }
): Promise<CompressedImage> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Вычисляем новые размеры с сохранением пропорций
      const { width, height } = calculateNewDimensions(
        img.width,
        img.height,
        options.maxWidthOrHeight
      );

      canvas.width = width;
      canvas.height = height;

      if (!ctx) {
        reject(new Error('Не удалось получить контекст canvas'));
        return;
      }

      // Рисуем изображение на canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Начинаем с указанного качества и уменьшаем при необходимости
      let quality = options.quality || 0.8;
      const maxSizeBytes = options.maxSizeInMB * 1024 * 1024;

      const tryCompress = () => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Не удалось создать blob'));
              return;
            }

            // Если размер подходит или качество уже минимальное
            if (blob.size <= maxSizeBytes || quality <= 0.1) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              });

              // Создаем data URL для предварительного просмотра
              const reader = new FileReader();
              reader.onload = () => {
                resolve({
                  file: compressedFile,
                  originalSize: file.size,
                  compressedSize: blob.size,
                  compressionRatio: Math.round((1 - blob.size / file.size) * 100),
                  dataUrl: reader.result as string
                });
              };
              reader.readAsDataURL(blob);
            } else {
              // Уменьшаем качество и пробуем снова
              quality -= 0.1;
              tryCompress();
            }
          },
          'image/jpeg',
          quality
        );
      };

      tryCompress();
    };

    img.onerror = () => {
      reject(new Error('Не удалось загрузить изображение'));
    };

    // Создаем URL для изображения
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

/**
 * Вычисляет новые размеры изображения с сохранением пропорций
 */
const calculateNewDimensions = (
  originalWidth: number,
  originalHeight: number,
  maxSize: number
): { width: number; height: number } => {
  if (originalWidth <= maxSize && originalHeight <= maxSize) {
    return { width: originalWidth, height: originalHeight };
  }

  const aspectRatio = originalWidth / originalHeight;

  if (originalWidth > originalHeight) {
    return {
      width: maxSize,
      height: Math.round(maxSize / aspectRatio)
    };
  } else {
    return {
      width: Math.round(maxSize * aspectRatio),
      height: maxSize
    };
  }
};

/**
 * Сжимает массив изображений
 */
export const compressMultipleImages = async (
  files: File[],
  options?: CompressionOptions,
  onProgress?: (progress: number, currentFile: string) => void
): Promise<CompressedImage[]> => {
  const results: CompressedImage[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    if (onProgress) {
      onProgress(Math.round((i / files.length) * 100), file.name);
    }
    
    try {
      const compressed = await compressImage(file, options);
      results.push(compressed);
    } catch (error) {
      console.error(`Ошибка сжатия файла ${file.name}:`, error);
      // Можно добавить обработку ошибок или пропустить файл
    }
  }
  
  if (onProgress) {
    onProgress(100, 'Завершено');
  }
  
  return results;
};

/**
 * Проверяет, является ли файл изображением
 */
export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

/**
 * Форматирует размер файла в читаемый вид
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};