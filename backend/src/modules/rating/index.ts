import { Router } from 'express';
import { createRating, deleteRating, getRating, updateRating } from './rating.controller';

import { authMiddleware } from '../../middleware/auth';

const router = Router();

router.get('/', getRating);
router.post('/', authMiddleware, createRating);
router.put('/:id', authMiddleware, updateRating);
router.delete('/:id', authMiddleware, deleteRating);

export const ratingRoutes = router;
