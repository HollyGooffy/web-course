import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import ParticipantCard, { IParticipantCard, IParticipantCardFile, IParticipantCardSettings } from '../models/ParticipantCard';

// Расширяем интерфейс Request для типизации файлов
interface MulterRequest extends Request {
  files?: Express.Multer.File[];
}

// Интерфейс для тела запроса сохранения карточек
interface SaveParticipantCardsBody {
  festivalId: string;
  groupName: string;
  eventId: string;
  settings?: string; // JSON строка с настройками
}

// Интерфейс для результата сжатия изображения
interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
}

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads/participant-cards');
    try {
      await fs.mkdir(uploadPath, { recursive: true });
      cb(null, uploadPath);
    } catch (error) {
      cb(error as Error, '');
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `participant-card-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 9 // максимум 9 карточек на группу
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

// Сжатие изображения
const compressImage = async (inputPath: string, outputPath: string): Promise<CompressionResult> => {
  const stats = await fs.stat(inputPath);
  const originalSize = stats.size;

  await sharp(inputPath)
    .resize(1200, 1200, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .jpeg({
      quality: 85,
      progressive: true
    })
    .toFile(outputPath);

  const compressedStats = await fs.stat(outputPath);
  const compressedSize = compressedStats.size;
  const compressionRatio = Math.round(((originalSize - compressedSize) / originalSize) * 100);

  return {
    originalSize,
    compressedSize,
    compressionRatio
  };
};

// Получить все карточки участников для фестиваля
export const getParticipantCardsByFestival = async (req: Request, res: Response): Promise<void> => {
  try {
    const { festivalId } = req.params;

    const participantCards = await ParticipantCard.find({ festivalId })
      .sort({ createdAt: -1 });

    res.json(participantCards);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка получения карточек участников' });
  }
};

// Получить карточки участников для конкретной группы
// Функция для удаления эмодзи из строки
const removeEmojis = (str: string): string => {
  // Используем более точную регулярку только для эмодзи
  return str
    .replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Emoticons
    .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') // Misc Symbols and Pictographs
    .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Transport and Map
    .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '') // Regional indicator
    .replace(/[\u{2600}-\u{26FF}]/gu, '')   // Misc symbols (включает ❤️, ❗️)
    .replace(/[\u{2700}-\u{27BF}]/gu, '')   // Dingbats
    .replace(/[\u{FE00}-\u{FE0F}]/gu, '')   // Variation Selectors (для ❤️ и других)
    .replace(/[\u{1F900}-\u{1F9FF}]/gu, '') // Supplemental Symbols and Pictographs
    .replace(/\u200d/gu, '')                // Zero Width Joiner
    .trim();
};

export const getParticipantCardsByGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { festivalId, groupName, eventId } = req.params;

    // Убираем эмодзи из названия группы (Express уже декодировал параметр)
    const cleanGroupName = removeEmojis(groupName);

    const participantCard = await ParticipantCard.findOne({
      festivalId,
      groupName: cleanGroupName,
      eventId
    });

    if (!participantCard) {
      res.status(404).json({ error: 'Карточки участников не найдены' });
      return;
    }

    res.json(participantCard);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка получения карточек участников группы' });
  }
};

// Сохранить карточки участников для группы
export const saveParticipantCardsForGroup = async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    const { festivalId, groupName, eventId, settings: settingsString } = req.body as SaveParticipantCardsBody;

    if (!festivalId || !groupName || !eventId) {
      res.status(400).json({ error: 'Отсутствуют обязательные поля' });
      return;
    }

    // Убираем эмодзи из названия группы
    const cleanGroupName = removeEmojis(groupName);

    // Парсим настройки если они переданы
    let settings: Partial<IParticipantCardSettings> = {};
    if (settingsString) {
      try {
        settings = JSON.parse(settingsString);
      } catch (error) {
        // Error parsing settings
      }
    }

    // Обработка загруженных файлов
    const processedCards: IParticipantCardFile[] = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const compressedPath = file.path.replace(path.extname(file.path), '-compressed.jpg');

        try {
          const compressionResult = await compressImage(file.path, compressedPath);

          processedCards.push({
            originalName: file.originalname,
            filename: path.basename(compressedPath),
            mimetype: 'image/jpeg',
            size: file.size,
            compressedSize: compressionResult.compressedSize,
            compressionRatio: compressionResult.compressionRatio,
            uploadedAt: new Date()
          });

          // Удаляем оригинальный файл, оставляем только сжатый
          await fs.unlink(file.path);
        } catch (compressionError) {
          // Если сжатие не удалось, используем оригинал
          processedCards.push({
            originalName: file.originalname,
            filename: file.filename,
            mimetype: file.mimetype,
            size: file.size,
            compressedSize: file.size,
            compressionRatio: 0,
            uploadedAt: new Date()
          });
        }
      }
    }

    // Найти существующую запись или создать новую
    let participantCard = await ParticipantCard.findOne({
      festivalId,
      groupName: cleanGroupName,
      eventId
    });

    if (participantCard) {
      // Удаляем старые файлы
      for (const card of participantCard.cards) {
        const oldFilePath = path.join(__dirname, '../../uploads/participant-cards', card.filename);
        try {
          await fs.unlink(oldFilePath);
        } catch (error) {
          // Old file not found or already deleted
        }
      }

      // Обновляем карточки
      participantCard.cards = processedCards;
      participantCard.settings = {
        ...participantCard.settings,
        ...settings
      };
    } else {
      // Создаем новую запись
      participantCard = new ParticipantCard({
        festivalId,
        groupName: cleanGroupName,
        eventId,
        cards: processedCards,
        settings: settings
      });
    }

    await participantCard.save();

    res.json({
      message: 'Карточки участников успешно сохранены',
      participantCard,
      cardsCount: processedCards.length,
      totalSize: processedCards.reduce((sum, card) => sum + card.compressedSize, 0)
    });

  } catch (error) {
    res.status(500).json({ error: 'Ошибка сохранения карточек участников' });
  }
};

// Удалить карточки участников группы
export const deleteParticipantCardsForGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { festivalId, groupName, eventId } = req.params;

    // Убираем эмодзи из названия группы (Express уже декодировал параметр)
    const cleanGroupName = removeEmojis(groupName);

    const participantCard = await ParticipantCard.findOne({
      festivalId,
      groupName: cleanGroupName,
      eventId
    });

    if (!participantCard) {
      res.status(404).json({ error: 'Карточки участников не найдены' });
      return;
    }

    // Удаляем файлы
    for (const card of participantCard.cards) {
      const filePath = path.join(__dirname, '../../uploads/participant-cards', card.filename);
      try {
        await fs.unlink(filePath);
      } catch (error) {
        // File not found or already deleted
      }
    }

    // Удаляем запись из базы данных
    await ParticipantCard.deleteOne({ _id: participantCard._id });

    res.json({
      message: `Карточки участников группы "${cleanGroupName}" успешно удалены`,
      deletedCount: participantCard.cards.length
    });

  } catch (error) {
    res.status(500).json({ error: 'Ошибка удаления карточек участников группы' });
  }
};

// Удалить все карточки участников фестиваля
export const deleteAllParticipantCardsForFestival = async (req: Request, res: Response): Promise<void> => {
  try {
    const { festivalId } = req.params;

    const participantCards = await ParticipantCard.find({ festivalId });

    if (participantCards.length === 0) {
      res.status(404).json({ error: 'Карточки участников не найдены' });
      return;
    }

    let totalDeleted = 0;

    // Удаляем файлы для всех групп
    for (const participantCard of participantCards) {
      for (const card of participantCard.cards) {
        const filePath = path.join(__dirname, '../../uploads/participant-cards', card.filename);
        try {
          await fs.unlink(filePath);
          totalDeleted++;
        } catch (error) {
          // File not found or already deleted
        }
      }
    }

    // Удаляем все записи из базы данных
    const deleteResult = await ParticipantCard.deleteMany({ festivalId });

    res.json({
      message: `Все карточки участников фестиваля успешно удалены`,
      deletedGroups: deleteResult.deletedCount,
      deletedFiles: totalDeleted
    });

  } catch (error) {
    res.status(500).json({ error: 'Ошибка удаления всех карточек участников фестиваля' });
  }
};

// Обновить настройки карточек участников
export const updateParticipantCardSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { festivalId, groupName, eventId } = req.params;
    const { settings } = req.body as { settings: Partial<IParticipantCardSettings> };

    // Убираем эмодзи из названия группы (Express уже декодировал параметр)
    const cleanGroupName = removeEmojis(groupName);

    const participantCard = await ParticipantCard.findOneAndUpdate(
      { festivalId, groupName: cleanGroupName, eventId },
      { $set: { settings } },
      { new: true }
    );

    if (!participantCard) {
      res.status(404).json({ error: 'Карточки участников не найдены' });
      return;
    }

    res.json({
      message: 'Настройки карточек участников обновлены',
      participantCard
    });

  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления настроек карточек участников' });
  }
};

// Middleware для загрузки файлов
export const uploadMiddleware = upload.array('cards', 9);

// Получить случайные карточки участников для главной страницы
export const getRandomParticipantCards = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 9;
    
    // Получаем случайную группу с карточками
    const randomCards = await ParticipantCard.aggregate([
      // Фильтруем только активные карточки с настройками
      { 
        $match: { 
          'settings.isActive': true,
          'cards.0': { $exists: true } // Убеждаемся, что есть хотя бы одна карточка
        } 
      },
      // Выбираем случайную группу
      { $sample: { size: 1 } },
      // Ограничиваем количество карточек
      {
        $project: {
          festivalId: 1,
          groupName: 1,
          eventId: 1,
          cards: { $slice: ['$cards', limit] },
          settings: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]);

    if (randomCards.length === 0) {
      res.status(200).json({
        success: true,
        data: [],
        message: 'No participant cards found'
      });
      return;
    }

    const randomGroup = randomCards[0];
    
    // Форматируем данные для фронтенда
    const formattedCards = randomGroup.cards.map((card: IParticipantCardFile) => ({
      filename: card.filename,
      originalName: card.originalName,
      groupName: randomGroup.groupName,
      eventId: randomGroup.eventId,
      festivalId: randomGroup.festivalId
    }));

    res.status(200).json({
      success: true,
      data: formattedCards,
      groupName: randomGroup.groupName,
      totalCards: formattedCards.length
    });

  } catch (error) {
    console.error('Error getting random participant cards:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};