import { Router } from 'express';
import { eventController } from '../controllers/eventController';
import { authenticate } from '../middleware/auth';
import { upload } from '../middleware/upload';
import { processImage } from '../middleware/imageProcessor';

const router = Router();

// Публичные роуты
router.get('/public', eventController.getAllEvents); // Публичный доступ ко всем событиям
router.get('/upcoming', eventController.getUpcomingEvents);
router.get('/:id', eventController.getEventById);

// Защищенные роуты (требуют аутентификации)
router.get('/', authenticate, eventController.getAllEvents);
router.post('/', authenticate, upload.single('image'), processImage, eventController.createEvent);
router.put('/:id', authenticate, upload.single('image'), processImage, eventController.updateEvent);
router.delete('/:id', authenticate, eventController.deleteEvent);

export default router;

