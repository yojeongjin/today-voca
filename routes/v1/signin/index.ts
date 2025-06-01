import { Router } from 'express';
const router = Router();

// controller
import { signin } from './dao';

router.post('/', signin);

export default router;
