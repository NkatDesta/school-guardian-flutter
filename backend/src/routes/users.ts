import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

// Placeholder routes - to be implemented
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: { users: [] },
    timestamp: new Date().toISOString(),
  });
});

export default router;
