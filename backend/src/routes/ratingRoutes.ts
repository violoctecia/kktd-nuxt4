import { Router } from 'express';
import { createRating, deleteRating, getRating, updateRating } from '../controllers/ratingController';

const router = Router();

router.get('/', getRating);
router.post('/', createRating);
router.put('/:id', updateRating);
router.delete('/:id', deleteRating);

export default router;
