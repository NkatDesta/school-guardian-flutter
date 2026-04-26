import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';

import { 
  getDashboardStats, 
  getPendingReportCards, 
  approveReportCard,
  getPendingRegistrations,
  approveRegistration,
  searchUsers
} from '../controllers/adminController';

const router = Router();

router.use(authenticateToken);

router.get('/dashboard-stats', getDashboardStats);
router.get('/report-cards/pending', getPendingReportCards);
router.put('/report-cards/:id/approve', approveReportCard);
router.get('/registrations/pending', getPendingRegistrations);
router.put('/registrations/:id/approve', approveRegistration);
router.get('/users/search', searchUsers);

export default router;
