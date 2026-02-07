import { Router } from 'express';
import { ApplicationController } from '../controllers/applicationController';
import { validateApplication } from '../middleware/validator';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();
const applicationController = new ApplicationController();

router.post('/', validateApplication, applicationController.createApplication.bind(applicationController));
router.get('/', authenticate, requireAdmin, applicationController.getAllApplications.bind(applicationController));
router.get('/:id', authenticate, requireAdmin, applicationController.getApplicationById.bind(applicationController));
router.put('/:id/status', authenticate, requireAdmin, applicationController.updateApplicationStatus.bind(applicationController));
router.put('/:id', authenticate, requireAdmin, applicationController.updateApplication.bind(applicationController));
router.delete('/:id', authenticate, requireAdmin, applicationController.deleteApplication.bind(applicationController));

export default router;


