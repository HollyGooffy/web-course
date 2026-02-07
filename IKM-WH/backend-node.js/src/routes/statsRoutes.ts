import { Router } from 'express';
import { StatsController } from '../controllers/statsController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();
const statsController = new StatsController();

router.get('/', authenticate, requireAdmin, statsController.getStats.bind(statsController));
router.get('/dashboard', authenticate, requireAdmin, statsController.getDashboardStats.bind(statsController));
router.get('/activity', authenticate, requireAdmin, statsController.getActivity.bind(statsController));

export default router;


