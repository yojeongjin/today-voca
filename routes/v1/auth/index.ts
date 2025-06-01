import { Router } from 'express';
const router = Router();

// controller
import { signin, refreshAccessToken, getUser } from './dao';
import { jwtMiddleware } from '../../../back/middleware/jwtMiddleware';

router.get('/refresh-token', refreshAccessToken);
router.post('/signin', signin);
router.get('/user', jwtMiddleware, getUser);

export default router;
