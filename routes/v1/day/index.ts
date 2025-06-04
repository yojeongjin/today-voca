import { Router } from 'express';
const router = Router();

// controller
import { list, modify, done } from './dao';
import { jwtMiddleware } from '../../../back/middleware/jwtMiddleware';

router.get('/', jwtMiddleware, list);
router.patch('/', jwtMiddleware, modify);
router.patch('/done', jwtMiddleware, done);

export default router;
