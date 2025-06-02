import { Router } from 'express';
const router = Router();

// controller
import { list, add } from './dao';
import { jwtMiddleware } from '../../../back/middleware/jwtMiddleware';

router.get('/', jwtMiddleware, list);
router.post('/', jwtMiddleware, add);

export default router;
