import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validate, schemas } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const authController = new AuthController();

// Public routes
router.post('/register', validate(schemas.registration), authController.register);
router.post('/login', validate(schemas.login), authController.login);

// Protected routes
router.post('/logout', authenticateToken, authController.logout);

export default router;
