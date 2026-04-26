import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { GuardianController } from '../controllers/guardianController';

const router = Router();

// Apply authentication to all student routes
router.use(authenticateToken);

// Get guardian's linked students (my children) - accessible by guardians
router.get('/my-children', new GuardianController().getMyChildren);

export default router;
