import { Router } from 'express';
import { PosterController } from '../controllers/posterController';
import { authenticate, requireAdmin } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();
const posterController = new PosterController();

router.get('/', posterController.getAllPosters.bind(posterController));
router.get('/:id', posterController.getPosterById.bind(posterController));
router.post('/', authenticate, requireAdmin, upload.single('image'), posterController.createPoster.bind(posterController));
router.put('/:id', authenticate, requireAdmin, upload.single('image'), posterController.updatePoster.bind(posterController));
router.delete('/:id', authenticate, requireAdmin, posterController.deletePoster.bind(posterController));

export default router;


