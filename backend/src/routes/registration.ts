import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { authenticateToken, checkRole } from '../middleware/auth';
import { UserRole } from '../types';
import {
  validateRegistration,
  verifyOTP,
  completeRegistration,
  resendOTP,
  getRegistrationStatus,
  updateRegistration
} from '../controllers/guardianRegistrationController';
import {
  getPendingRegistrations,
  getRegistrationDetails,
  approveRegistration,
  rejectRegistration,
  getRegistrationStats,
  searchStudents
} from '../controllers/registrarController';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/documents/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and PDF are allowed.'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter
});

// Public routes - no authentication required
router.post('/validate', validateRegistration);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.get('/status', getRegistrationStatus);

// Document upload route
router.post(
  '/complete',
  upload.fields([
    { name: 'certificate', maxCount: 1 },
    { name: 'idFront', maxCount: 1 },
    { name: 'idBack', maxCount: 1 }
  ]),
  completeRegistration
);

// Correction route - update documents
router.put(
  '/:registrationId/correct',
  upload.fields([
    { name: 'certificate', maxCount: 1 },
    { name: 'idFront', maxCount: 1 },
    { name: 'idBack', maxCount: 1 }
  ]),
  updateRegistration
);

// Registrar routes - authentication required
router.get(
  '/registrar/pending',
  authenticateToken,
  checkRole([UserRole.REGISTRAR, UserRole.DIRECTOR]),
  getPendingRegistrations
);

router.get(
  '/registrar/stats',
  authenticateToken,
  checkRole([UserRole.REGISTRAR, UserRole.DIRECTOR]),
  getRegistrationStats
);

router.get(
  '/registrar/:registrationId',
  authenticateToken,
  checkRole([UserRole.REGISTRAR, UserRole.DIRECTOR]),
  getRegistrationDetails
);

router.get(
  '/registrar/students/search',
  authenticateToken,
  checkRole([UserRole.REGISTRAR]),
  searchStudents
);

router.post(
  '/registrar/:registrationId/approve',
  authenticateToken,
  checkRole([UserRole.REGISTRAR]),
  approveRegistration
);

router.post(
  '/registrar/:registrationId/reject',
  authenticateToken,
  checkRole([UserRole.REGISTRAR]),
  rejectRegistration
);

export default router;
