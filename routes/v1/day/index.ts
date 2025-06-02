import { Router } from 'express';
const router = Router();

// controller
import { list } from './dao';
import { jwtMiddleware } from '../../../back/middleware/jwtMiddleware';

router.get('/', jwtMiddleware, list);

export default router;
