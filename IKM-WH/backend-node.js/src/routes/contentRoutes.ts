import { Router } from 'express';
import { ContentController } from '../controllers/contentController';
import { validateContent } from '../middleware/validator';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();
const contentController = new ContentController();

router.get('/', contentController.getAllContent.bind(contentController));
router.get('/key/:key', contentController.getContentByKey.bind(contentController));
router.post('/', authenticate, requireAdmin, validateContent, contentController.createContent.bind(contentController));
router.put('/:id', authenticate, requireAdmin, contentController.updateContent.bind(contentController));
router.post('/upsert/:key', authenticate, requireAdmin, contentController.upsertContentByKey.bind(contentController));
router.delete('/:id', authenticate, requireAdmin, contentController.deleteContent.bind(contentController));

export default router;


