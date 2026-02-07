import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const QUALITY = 85;

export const processImage = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return next();
  }

  try {
    const file = req.file;
    const filePath = file.path;
    
    // Читаем метаданные изображения
    const metadata = await sharp(filePath).metadata();
    
    // Проверяем, нужно ли сжимать
    const needsResize = metadata.width && metadata.height && 
                        (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT);
    
    if (needsResize || file.size > 1024 * 1024) { // Если больше 1MB или превышает размеры
      const tempPath = filePath + '.temp';
      
      // Определяем формат выходного файла
      let sharpInstance = sharp(filePath)
        .resize(MAX_WIDTH, MAX_HEIGHT, {
          fit: 'inside',
          withoutEnlargement: true
        });

      // Применяем сжатие в зависимости от формата
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext === '.png') {
        sharpInstance = sharpInstance.png({ quality: QUALITY, compressionLevel: 9 });
      } else if (ext === '.webp') {
        sharpInstance = sharpInstance.webp({ quality: QUALITY });
      } else {
        // По умолчанию конвертируем в JPEG
        sharpInstance = sharpInstance.jpeg({ quality: QUALITY, progressive: true });
      }
      
      await sharpInstance.toFile(tempPath);
      
      // Заменяем оригинальный файл обработанным
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);
      
      // Обновляем информацию о файле
      const stats = fs.statSync(filePath);
      const originalSize = file.size;
      req.file.size = stats.size;
    }
    
    next();
  } catch (error) {
    // Если обработка не удалась, продолжаем с оригинальным файлом
    next();
  }
};
