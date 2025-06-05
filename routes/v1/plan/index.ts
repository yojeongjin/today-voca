import { Router } from 'express';
const router = Router();

// controller
import { list, all, add, modify } from './dao';
import { jwtMiddleware } from '../../../back/middleware/jwtMiddleware';

router.get('/', jwtMiddleware, list);
router.get('/all', jwtMiddleware, all);
router.post('/', jwtMiddleware, add);
router.patch('/', jwtMiddleware, modify);

export default router;
