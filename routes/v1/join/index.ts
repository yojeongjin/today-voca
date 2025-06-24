import { Router } from 'express';
const router = Router();

// controller
import { list, verify, add } from './dao';

router.get('/', list);
router.post('/verify', verify);
router.post('/', add);

export default router;
