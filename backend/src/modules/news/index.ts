import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth';
import { uploadSingle } from '../../middleware/upload';
import { create, getAll, getBySlug, remove, update } from './news.controller';

const router = Router();

router.get('/', getAll);
router.get('/:slug', getBySlug);
router.post('/', authMiddleware, uploadSingle('img'), create);
router.put('/:id', authMiddleware, uploadSingle('img'), update);
router.delete('/:id', authMiddleware, remove);

export const newsRoutes = router;
