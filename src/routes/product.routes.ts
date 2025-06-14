import { Router } from 'express';
import * as controller from '../controllers/product.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authMiddleware, controller.getAllProducts);
router.post('/', authMiddleware, controller.createProduct);
router.put('/:id', authMiddleware, controller.updateProduct);
router.delete('/:id', authMiddleware, controller.deleteProduct);

export default router;
