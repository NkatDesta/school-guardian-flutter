import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { TeacherController } from '../controllers/teacherController';
import { validate, schemas } from '../middleware/validation';

const router = Router();

// Apply authentication to all teacher routes
router.use(authenticateToken);

// Module 1: Get classes assigned to teacher
router.get('/classes', new TeacherController().getAssignedClasses);

// Module 1: Get students in a specific class
router.get('/classes/:classId/students', new TeacherController().getTeacherStudents);

// Module 1: Get students assigned to teacher (all)
router.get('/students', new TeacherController().getTeacherStudents);

export default router;
