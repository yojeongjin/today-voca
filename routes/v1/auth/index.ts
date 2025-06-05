import { Router } from 'express';
const router = Router();

// controller
import { signin, refreshAccessToken, getUser, logout } from './dao';
import { jwtMiddleware } from '../../../back/middleware/jwtMiddleware';

router.get('/refresh-token', refreshAccessToken);
router.post('/signin', signin);
router.get('/user', jwtMiddleware, getUser);
router.post('/logout', logout);

export default router;
