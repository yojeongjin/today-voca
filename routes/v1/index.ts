import { Router } from 'express';
const router = Router();

import join from './join';
import auth from './auth';

router.use('/join', join);
router.use('/auth', auth);

export default router;
