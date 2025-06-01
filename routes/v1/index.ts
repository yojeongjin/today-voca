import { Router } from 'express';
const router = Router();

import join from './join';
import signin from './signin';

router.use('/join', join);
router.use('/signin', signin);

export default router;
