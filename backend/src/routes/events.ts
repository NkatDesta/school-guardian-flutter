import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { EventController } from '../controllers/eventController';

const router = Router();
const eventController = new EventController();

router.use(authenticateToken);

router.get('/', eventController.getEvents);
router.post('/', eventController.createEvent);
router.delete('/:id', eventController.deleteEvent);

export default router;
