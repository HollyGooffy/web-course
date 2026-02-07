import { Router } from 'express';
import { FestivalController } from '../controllers/festivalController';
import { authenticate, requireAdmin } from '../middleware/auth';
import { upload } from '../middleware/upload';
import { processImage } from '../middleware/imageProcessor';

const router = Router();
const festivalController = new FestivalController();

// Публичные маршруты
router.get('/public', festivalController.getAllFestivals.bind(festivalController));
router.get('/upcoming', festivalController.getUpcomingFestivals.bind(festivalController));
router.get('/with-cards', festivalController.getFestivalsWithCards.bind(festivalController));
router.get('/public/:id', festivalController.getFestivalById.bind(festivalController));

// Защищенные маршруты (для админки)
router.get('/', authenticate, requireAdmin, festivalController.getAllFestivals.bind(festivalController));
router.post('/sync', authenticate, requireAdmin, festivalController.syncWithEvents.bind(festivalController));
router.get('/:id', authenticate, requireAdmin, festivalController.getFestivalById.bind(festivalController));
router.post('/', authenticate, requireAdmin, upload.single('image'), processImage, festivalController.createFestival.bind(festivalController));
router.put('/:id', authenticate, requireAdmin, upload.single('image'), processImage, festivalController.updateFestival.bind(festivalController));
router.delete('/:id', authenticate, requireAdmin, festivalController.deleteFestival.bind(festivalController));

export default router;