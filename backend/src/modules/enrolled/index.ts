import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth';
import { create, getAll, getById, remove, update } from './enrolled.controller';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', authMiddleware, create);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, remove);

export const enrolledRoutes = router;
