import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth';
import { create, getAll, remove, update } from './abiturient.controller';

const router = Router();

router.get('/', getAll);
router.post('/', authMiddleware, create);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, remove);

export const abiturientRoutes = router;
