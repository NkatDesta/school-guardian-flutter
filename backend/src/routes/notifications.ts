import { Router } from 'express';
import { NotificationController } from '../controllers/notificationController';
import { validate, schemas } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';
import { UserRole } from '../types';

const router = Router();
const notificationController = new NotificationController();

// All notification routes require authentication
router.use(authenticateToken);

// GET /api/notifications - Get notifications for logged-in user
router.get('/', notificationController.getNotifications);

// POST /api/notifications - Create notification (Director/Registrar only)
router.post('/', 
  validate(schemas.notification), 
  notificationController.createNotification
);

// PUT /api/notifications/:id/read - Mark notification as read
router.put('/:id/read', notificationController.markAsRead);

// PUT /api/notifications/:id - Update notification (sender or admin only)
router.put('/:id', 
  validate(schemas.notificationUpdate), 
  notificationController.updateNotification
);

// DELETE /api/notifications/:id - Delete notification (sender or admin only)
router.delete('/:id', notificationController.deleteNotification);

export default router;
