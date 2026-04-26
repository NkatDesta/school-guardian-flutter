import { Request, Response, NextFunction } from 'express';
import { NotificationModel } from '../models/Notification';
import { UserModel } from '../models/User';
import { SystemLogModel } from '../models/SystemLog';
import { UserRole } from '../types/index';
import { logger } from '../utils/logger';
import { Op } from 'sequelize';

export class NotificationController {
  async createNotification(req: any, res: Response): Promise<void> {
    try {
      const { title, content, recipientGroup, priority = 'normal' } = req.body;
      const senderId = req.user.userId;

      // Validate sender role (only Director or Registrar can create school-wide notifications)
      if (req.user.role !== UserRole.DIRECTOR && req.user.role !== UserRole.REGISTRAR) {
        res.status(403).json({
          success: false,
          error: {
            code: 'ACCESS_DENIED',
            message: 'Only Director or Registrar can create notifications'
          }
        });
        return;
      }

      const notification = await NotificationModel.create({
        title,
        content,
        recipientGroup,
        priority,
        senderId,
        deliveryStatus: 'sent',
        sentAt: new Date()
      });

      // Audit Log
      await SystemLogModel.create({
        userId: senderId,
        action: priority === 'emergency' ? 'BROADCAST_EMERGENCY' : 'SEND_NOTIFICATION',
        tableName: 'Notifications',
        recordId: notification.notificationId,
        newValues: { title, priority, recipientGroup }
      });

      res.status(201).json({
        success: true,
        message: 'Notification created successfully',
        data: notification
      });
    } catch (error) {
      logger.error('Create notification error:', error);
      res.status(500).json({
        success: false,
        error: {
          code: 'CREATE_NOTIFICATION_FAILED',
          message: 'Failed to create notification'
        }
      });
    }
  }

  async getNotifications(req: any, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 20 } = req.query;
      const userRole = req.user.role;

      const offset = (Number(page) - 1) * Number(limit);

      // All users see all notifications as per requirements
      let whereClause: any = {};

      const { rows: notifications, count } = await NotificationModel.findAndCountAll({
        where: whereClause,
        include: [{
          model: UserModel,
          as: 'sender',
          attributes: ['fullName', 'role']
        }],
        order: [['createdAt', 'DESC']],
        limit: Number(limit),
        offset: offset
      });

      res.json({
        success: true,
        data: {
          notifications,
          total: count,
          page: Number(page),
          totalPages: Math.ceil(count / Number(limit))
        }
      });
    } catch (error) {
      logger.error('Get notifications error:', error);
      res.status(500).json({
        success: false,
        error: {
          code: 'GET_NOTIFICATIONS_FAILED',
          message: 'Failed to fetch notifications'
        }
      });
    }
  }

  async markAsRead(req: any, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      res.json({
        success: true,
        message: 'Notification marked as read'
      });
    } catch (error) {
      logger.error('Mark as read error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to mark notification as read'
      });
    }
  }

  async updateNotification(req: any, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, content, priority, recipientGroup } = req.body;

      const notification = await NotificationModel.findByPk(id);

      if (!notification) {
        res.status(404).json({
          success: false,
          message: 'Notification not found'
        });
        return;
      }

      // Only the explicit sender can update their notification (Registrars cannot edit Director's notifications and vice versa)
      if (notification.senderId !== req.user.userId) {
        res.status(403).json({
          success: false,
          message: 'Not authorized to update this notification. You can only update notifications you explicitly sent.'
        });
        return;
      }

      await notification.update({
        title: title || notification.title,
        content: content || notification.content,
        priority: priority || notification.priority,
        recipientGroup: recipientGroup || notification.recipientGroup,
        sentAt: new Date() // Updates timestamp so it bumps up 
      });

      // Audit Log
      await SystemLogModel.create({
        userId: req.user.userId,
        action: 'UPDATE_NOTIFICATION',
        tableName: 'Notifications',
        recordId: notification.notificationId,
        newValues: { title, content, priority, recipientGroup }
      });

      res.json({
        success: true,
        message: 'Notification updated successfully',
        data: notification
      });
    } catch (error) {
      logger.error('Update notification error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update notification'
      });
    }
  }

  async deleteNotification(req: any, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const notification = await NotificationModel.findByPk(id);

      if (!notification) {
        res.status(404).json({
          success: false,
          message: 'Notification not found'
        });
        return;
      }

      // Only the explicit sender can delete their notification (Registrars cannot delete Director's notifications and vice versa)
      if (notification.senderId !== req.user.userId) {
        res.status(403).json({
          success: false,
          message: 'Not authorized to delete this notification. You can only delete notifications you explicitly sent.'
        });
        return;
      }

      await notification.destroy();

      res.json({
        success: true,
        message: 'Notification deleted successfully'
      });
    } catch (error) {
      logger.error('Delete notification error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete notification'
      });
    }
  }
}

export const notificationController = new NotificationController();
