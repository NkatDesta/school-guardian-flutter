import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { GuardianController } from '../controllers/guardianController';

const router = Router();

router.use(authenticateToken);

// Get guardian's linked students (my children)
router.get('/my-children', new GuardianController().getMyChildren);

export default router;
