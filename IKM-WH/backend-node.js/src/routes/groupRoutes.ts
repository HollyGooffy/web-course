import { Router } from 'express';
import { GroupController } from '../controllers/groupController';
import { validateGroup } from '../middleware/validator';
import { authenticate, requireAdmin } from '../middleware/auth';
import { upload } from '../middleware/upload';
import { processImage } from '../middleware/imageProcessor';

const router = Router();
const groupController = new GroupController();

router.get('/', groupController.getAllGroups.bind(groupController));
router.get('/:id', groupController.getGroupById.bind(groupController));
router.post('/', authenticate, requireAdmin, upload.single('image'), processImage, groupController.createGroup.bind(groupController));
router.put('/:id', authenticate, requireAdmin, upload.single('image'), processImage, groupController.updateGroup.bind(groupController));
router.delete('/:id', authenticate, requireAdmin, groupController.deleteGroup.bind(groupController));

export default router;


