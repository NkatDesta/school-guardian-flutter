import { Router } from 'express';
import multer from 'multer';
import { authenticateToken, checkRole } from '../middleware/auth';
import { UserRole } from '../types';
import {
  validateRegistration,
  verifyOTP,
  completeRegistration,
  resendOTP,
  getRegistrationStatus,
  updateRegistration,
  simpleDirectRegistration
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
const storage = multer.memoryStorage();

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  const fileExtension = file.originalname.toLowerCase().split('.').pop();
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
  
  if (allowedTypes.includes(file.mimetype) || allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and PDF are allowed.'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter
});

// ==================== PUBLIC ROUTES (No Auth) ====================

// OTP Flow Routes
router.post('/validate', validateRegistration);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.get('/status', getRegistrationStatus);

// ✅ SIMPLE REGISTRATION - NO OTP (For Flutter)
router.post(
  '/simple-register',
  upload.fields([
    { name: 'certificate', maxCount: 1 },
    { name: 'idFront', maxCount: 1 },
    { name: 'idBack', maxCount: 1 }
  ]),
  simpleDirectRegistration
);

// Complete Registration with OTP
router.post(
  '/complete',
  upload.fields([
    { name: 'certificate', maxCount: 1 },
    { name: 'idFront', maxCount: 1 },
    { name: 'idBack', maxCount: 1 }
  ]),
  completeRegistration
);

// Correction route
router.put(
  '/:registrationId/correct',
  upload.fields([
    { name: 'certificate', maxCount: 1 },
    { name: 'idFront', maxCount: 1 },
    { name: 'idBack', maxCount: 1 }
  ]),
  updateRegistration
);

// ==================== REGISTRAR ROUTES (Auth Required) ====================

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
  '/registrar/students/search',
  authenticateToken,
  checkRole([UserRole.REGISTRAR]),
  searchStudents
);

router.get(
  '/registrar/:registrationId',
  authenticateToken,
  checkRole([UserRole.REGISTRAR, UserRole.DIRECTOR]),
  getRegistrationDetails
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