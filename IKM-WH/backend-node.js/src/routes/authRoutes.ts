import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authValidators } from '../middleware/advancedValidator';
import { authenticate } from '../middleware/auth';

const router = Router();
const authController = new AuthController();

// Публичные роуты
router.post('/register', authValidators.register, authController.register.bind(authController));
router.post('/login', authValidators.login, authController.login.bind(authController));
router.post('/logout', authController.logout.bind(authController));

// Защищенные роуты
router.get('/profile', authenticate, authController.getProfile.bind(authController));
router.put('/profile', authenticate, authValidators.updateProfile, authController.updateProfile.bind(authController));
router.post('/change-password', authenticate, authValidators.changePassword, authController.changePassword.bind(authController));
router.get('/validate', authenticate, authController.validateToken.bind(authController));
router.get('/stats', authenticate, authController.getUserStats.bind(authController));

export default router;


