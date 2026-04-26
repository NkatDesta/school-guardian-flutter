import { Request, Response } from 'express';
import { Homework } from '../models/Homework';
import { HomeworkView } from '../models/HomeworkView';
import { HomeworkFeedback } from '../models/HomeworkFeedback';
import { UserModel } from '../models/User';
import { UserRole } from '../types';

export class HomeworkController {
  async getHomework(req: any, res: Response): Promise<void> {
    try {
      console.log('Homework request - User:', req.user);
      
      const { teacherId, classId } = req.query;
      const userRole = req.user?.role;
      const userId = req.user?.userId;

      if (!userRole) {
        console.log('No user role found in request');
        res.status(401).json({
          success: false,
          message: 'User not authenticated'
        });
        return;
      }

      let whereClause: any = { isActive: true };

      // Role-based filtering
      if (userRole === UserRole.TEACHER && teacherId) {
        whereClause.teacherId = teacherId;
      } else if (userRole === UserRole.HOMEROOM_TEACHER && classId) {
        whereClause.className = classId;
      } else if (userRole === UserRole.GUARDIAN) {
        // For guardians, show homework for their children
        whereClause = { isActive: true };
      }

      console.log('Homework query - Where clause:', whereClause);

      const homework = await Homework.findAll({
        where: whereClause,
        order: [['createdAt', 'DESC']]
      });

      console.log('Homework found:', homework.length, 'items');

      // Transform data to match HomeworkList.tsx interface
      const transformedHomework = homework.map((h: any) => ({
        homeworkId: h.homeworkId,
        title: h.title,
        description: h.description,
        subject: h.subject,
        className: h.className,
        dueDate: h.dueDate,
        createdAt: h.createdAt,
        isActive: h.isActive,
        teacherName: 'Teacher Name', // Will be populated later
        viewCount: 0, // Will be populated later
        feedbackCount: 0 // Will be populated later
      }));

      res.json({
        success: true,
        data: { homework: transformedHomework }
      });
    } catch (error) {
      console.error('Get homework error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch homework',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async createHomework(req: any, res: Response): Promise<void> {
    try {
      const { title, description, subject, className, dueDate } = req.body;
      const userId = req.user.userId;

      const homework = await Homework.create({
        title,
        description,
        subject,
        className,
        teacherId: userId,
        dueDate: new Date(dueDate),
        isActive: true
      });

      res.status(201).json({
        success: true,
        message: 'Homework created successfully',
        data: { homework }
      });
    } catch (error) {
      console.error('Create homework error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create homework'
      });
    }
  }

  async updateHomework(req: any, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description, dueDate, isActive } = req.body;
      const userId = req.user.userId;

      const homework = await Homework.findByPk(id);
      if (!homework) {
        res.status(404).json({
          success: false,
          message: 'Homework not found'
        });
        return;
      }

      if ((homework as any).teacherId !== userId) {
        res.status(403).json({
          success: false,
          message: 'Access denied: You can only edit your own homework'
        });
        return;
      }

      await homework.update({
        title: title || (homework as any).title,
        description: description || (homework as any).description,
        dueDate: dueDate ? new Date(dueDate) : (homework as any).dueDate,
        isActive: isActive !== undefined ? isActive : (homework as any).isActive
      });

      res.json({
        success: true,
        message: 'Homework updated successfully',
        data: { homework }
      });
    } catch (error) {
      console.error('Update homework error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update homework'
      });
    }
  }

  async deleteHomework(req: any, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      const homework = await Homework.findByPk(id);
      if (!homework) {
        res.status(404).json({
          success: false,
          message: 'Homework not found'
        });
        return;
      }

      if ((homework as any).teacherId !== userId) {
        res.status(403).json({
          success: false,
          message: 'Access denied: You can only delete your own homework'
        });
        return;
      }

      await homework.destroy();

      res.json({
        success: true,
        message: 'Homework deleted successfully'
      });
    } catch (error) {
      console.error('Delete homework error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete homework'
      });
    }
  }

  async viewHomework(req: any, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      const homework = await Homework.findByPk(id);
      if (!homework) {
        res.status(404).json({
          success: false,
          message: 'Homework not found'
        });
        return;
      }

      await HomeworkView.findOrCreate({
        where: {
          homeworkId: id,
          guardianId: userId
        },
        defaults: {
          homeworkId: id,
          guardianId: userId,
          viewedAt: new Date()
        }
      });

      res.json({
        success: true,
        message: 'Homework marked as viewed'
      });
    } catch (error) {
      console.error('View homework error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to mark homework as viewed'
      });
    }
  }

  async addFeedback(req: any, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { feedback } = req.body;
      const userId = req.user.userId;

      const homework = await Homework.findByPk(id);
      if (!homework) {
        res.status(404).json({
          success: false,
          message: 'Homework not found'
        });
        return;
      }

      await HomeworkFeedback.create({
        homeworkId: id,
        guardianId: userId,
        feedback,
        createdAt: new Date()
      });

      res.json({
        success: true,
        message: 'Feedback added successfully'
      });
    } catch (error) {
      console.error('Add feedback error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to add feedback'
      });
    }
  }

  async getHomeworkAnalytics(req: any, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      const homework = await Homework.findByPk(id);
      if (!homework) {
        res.status(404).json({
          success: false,
          message: 'Homework not found'
        });
        return;
      }

      if ((homework as any).teacherId !== userId) {
        res.status(403).json({
          success: false,
          message: 'Access denied'
        });
        return;
      }

      res.json({
        success: true,
        data: {
          analytics: {
            totalViews: 0,
            feedbackCount: 0,
            viewDetails: [],
            feedbackDetails: []
          }
        }
      });
    } catch (error) {
      console.error('Get homework analytics error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch homework analytics'
      });
    }
  }

  async exportHomeworkData(req: any, res: Response): Promise<void> {
    try {
      const { format } = req.query;
      const userRole = req.user.role;
      const userId = req.user.userId;

      let whereClause: any = { isActive: true };

      if (userRole === UserRole.TEACHER) {
        whereClause.teacherId = userId;
      }

      const homework = await Homework.findAll({
        where: whereClause
      });

      let exportData;
      if (format === 'csv') {
        exportData = homework.map((h: any) => ({
          Title: h.title,
          Subject: h.subject,
          Class: h.className,
          DueDate: h.dueDate,
          Teacher: 'Teacher Name',
          Status: h.isActive ? 'Active' : 'Inactive'
        }));
      } else {
        exportData = homework;
      }

      res.json({
        success: true,
        data: { homework: exportData }
      });
    } catch (error) {
      console.error('Export homework error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to export homework data'
      });
    }
  }
}
