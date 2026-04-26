import { Router } from 'express';
import { authenticateToken, checkRole } from '../middleware/auth';
import { UserRole } from '../types';

import {
  getDirectorStats,
  getRecentActivity,
  getClassPerformance,
  getRegistrationTrends,
  getPendingReportCards,
  approveReportCard,
  requestReportCardRevision,
  getAllUsers,
  updateUserStatus,
  getAuditLogs
} from '../controllers/directorController';

const router = Router();

// All director routes require authentication and director role
router.use(authenticateToken);
router.use(checkRole([UserRole.DIRECTOR]));

// Dashboard statistics
router.get('/stats', getDirectorStats);

// Activity feed (audit logs)
router.get('/activity', getRecentActivity);

// Analytics
router.get('/analytics/performance', getClassPerformance);
router.get('/analytics/trends', getRegistrationTrends);

// Report card management
router.get('/report-cards/pending', getPendingReportCards);
router.post('/report-cards/:id/approve', approveReportCard);
router.post('/report-cards/:id/revision', requestReportCardRevision);

// User management
router.get('/users', getAllUsers);
router.put('/users/:id/status', updateUserStatus);

// Audit logs
router.get('/audit-logs', getAuditLogs);

export default router;
