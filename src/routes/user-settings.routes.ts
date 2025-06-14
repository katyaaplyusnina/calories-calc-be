import { Router } from 'express';
import * as controller from '../controllers/user-settings.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/:id', authMiddleware, controller.getById);
router.put('/:id', authMiddleware, controller.update);

export default router;
