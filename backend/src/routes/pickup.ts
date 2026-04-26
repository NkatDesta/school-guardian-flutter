import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { PickupController } from '../controllers/pickupController';

const router = Router();
const pickupController = new PickupController();

router.use(authenticateToken);

// Get all pickup requests
router.get('/', pickupController.getPickupRequests);

// Create a new pickup request
router.post('/', pickupController.createPickupRequest);

// Process a pickup request (approve/reject)
router.post('/:requestId/process', pickupController.processPickupRequest);

export default router;
