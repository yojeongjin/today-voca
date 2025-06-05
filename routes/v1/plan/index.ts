import { Router } from 'express';
const router = Router();

// controller
import { list, add, modify } from './dao';
import { jwtMiddleware } from '../../../back/middleware/jwtMiddleware';

router.get('/', jwtMiddleware, list);
router.post('/', jwtMiddleware, add);
router.patch('/', jwtMiddleware, modify);

export default router;
