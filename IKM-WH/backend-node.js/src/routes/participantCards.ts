import express from 'express';
import rateLimit from 'express-rate-limit';
import * as participantCardsController from '../controllers/participantCardsController';

const router = express.Router();

// Rate limiter для загрузки файлов
const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // увеличиваем до 500 загрузок за 15 минут
  message: {
    success: false,
    error: 'Too many file uploads, please try again later.',
  },
});

// Получить случайные карточки участников (для главной страницы)
router.get('/random', participantCardsController.getRandomParticipantCards);

// Получить все карточки участников для фестиваля
router.get('/festival/:festivalId', participantCardsController.getParticipantCardsByFestival);

// Получить карточки участников для конкретной группы
router.get('/festival/:festivalId/group/:groupName/event/:eventId', participantCardsController.getParticipantCardsByGroup);

// Сохранить карточки участников для группы (с загрузкой файлов)
router.post('/festival/:festivalId/group/:groupName/event/:eventId',
  uploadLimiter,
  participantCardsController.uploadMiddleware,
  participantCardsController.saveParticipantCardsForGroup as any
);

// Обновить настройки карточек участников
router.put('/festival/:festivalId/group/:groupName/event/:eventId/settings', 
  participantCardsController.updateParticipantCardSettings
);

// Удалить карточки участников группы
router.delete('/festival/:festivalId/group/:groupName/event/:eventId', 
  participantCardsController.deleteParticipantCardsForGroup
);

// Удалить все карточки участников фестиваля
router.delete('/festival/:festivalId', 
  participantCardsController.deleteAllParticipantCardsForFestival
);

export default router;