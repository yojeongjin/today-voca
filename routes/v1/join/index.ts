import { Router } from 'express';
const router = Router();

// controller
import { list, add } from './dao';

router.get('/', list);
router.post('/', add);

export default router;
