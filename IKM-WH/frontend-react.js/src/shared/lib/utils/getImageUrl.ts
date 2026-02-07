import { API_CONFIG } from '@shared/api/config';

export const getImageUrl = (imagePath?: string): string | undefined => {
  if (!imagePath) return undefined;
  
  // Если это уже полный URL (начинается с http:// или https://)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Если это относительный путь, добавляем базовый URL
  return `${API_CONFIG.BASE_URL}${imagePath}`;
};
