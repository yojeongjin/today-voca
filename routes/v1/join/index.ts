import { Router } from 'express';
const router = Router();

// controller
import { list } from './dao';

router.get('/', list);

export default router;
