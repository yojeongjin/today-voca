import { Router } from 'express';
const router = Router();

// controller
import { list, modify } from './dao';
import { jwtMiddleware } from '../../../back/middleware/jwtMiddleware';

router.get('/', jwtMiddleware, list);
router.get('/', jwtMiddleware, modify);

export default router;
