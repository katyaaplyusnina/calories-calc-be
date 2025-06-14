import { Router } from 'express';
import * as controller from '../controllers/user.controller';

const router = Router();

// todo
router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUserById);
router.post('/', controller.createUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

export default router;
