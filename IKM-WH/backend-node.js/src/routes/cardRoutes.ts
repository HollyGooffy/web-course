import { Router } from 'express';
import { CardController } from '../controllers/cardController';
import { authenticate, requireAdmin } from '../middleware/auth';
import { upload } from '../middleware/upload';
import { processImage } from '../middleware/imageProcessor';

const router = Router();
const cardController = new CardController();

// Публичные роуты (без авторизации)
router.get('/public', cardController.getPublicCardSets.bind(cardController));
router.get('/public/festival/:festivalId', cardController.getPublicCardSetsByFestival.bind(cardController));
router.get('/public/:id', cardController.getCardSetById.bind(cardController));

// Админские роуты (с авторизацией)
router.get('/', authenticate, requireAdmin, cardController.getAllCardSets.bind(cardController));
router.get('/festival/:festivalId', authenticate, requireAdmin, cardController.getCardSetsByFestival.bind(cardController));
router.get('/:id', authenticate, requireAdmin, cardController.getCardSetById.bind(cardController));
router.post('/', authenticate, requireAdmin, upload.single('image'), processImage, cardController.createCardSet.bind(cardController));
router.put('/:id', authenticate, requireAdmin, upload.single('image'), processImage, cardController.updateCardSet.bind(cardController));
router.delete('/:id', authenticate, requireAdmin, cardController.deleteCardSet.bind(cardController));

export default router;


