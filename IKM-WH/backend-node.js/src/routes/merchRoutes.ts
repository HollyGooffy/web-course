import { Router } from 'express';
import { MerchController } from '../controllers/merchController';
import { authenticate, requireAdmin } from '../middleware/auth';
import { upload } from '../middleware/upload';
import { processImage } from '../middleware/imageProcessor';

const router = Router();
const merchController = new MerchController();

router.get('/', merchController.getAllMerchItems.bind(merchController));
router.get('/:id', merchController.getMerchItemById.bind(merchController));
router.post('/', authenticate, requireAdmin, upload.single('image'), processImage, merchController.createMerchItem.bind(merchController));
router.put('/:id', authenticate, requireAdmin, upload.single('image'), processImage, merchController.updateMerchItem.bind(merchController));
router.patch('/:id/stock', authenticate, requireAdmin, merchController.updateStock.bind(merchController));
router.delete('/:id', authenticate, requireAdmin, merchController.deleteMerchItem.bind(merchController));

export default router;


