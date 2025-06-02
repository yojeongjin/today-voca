import { Router } from 'express';
const router = Router();

import join from './join';
import auth from './auth';
import plan from './plan';

router.use('/join', join);
router.use('/auth', auth);
router.use('/plan', plan);

export default router;
