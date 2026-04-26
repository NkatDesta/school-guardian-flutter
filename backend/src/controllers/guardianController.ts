import { Request, Response } from 'express';
import { StudentModel } from '../models/Student';
import { UserModel } from '../models/User';

export class GuardianController {
  // Get guardian's linked students (my children)
  async getMyChildren(req: any, res: Response): Promise<void> {
    try {
      const userId = req.user.userId;
      const userRole = req.user.role;

      // Only guardians can access their children
      if (userRole !== 'guardian') {
        res.status(403).json({
          success: false,
          message: 'Access denied: Only guardians can view their children'
        });
        return;
      }

      // Find students linked to this guardian
      const students = await StudentModel.findAll({
        where: { guardianId: userId },
        attributes: ['studentId', 'fullName', 'classId', 'dob', 'emergencyContact'],
        order: [['fullName', 'ASC']]
      });

      res.status(200).json({
        success: true,
        data: students
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch children',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}
