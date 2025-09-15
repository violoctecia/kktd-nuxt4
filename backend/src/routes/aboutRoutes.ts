import { Router } from 'express';
import { createAbout, deleteAbout, getAllAbout, updateAbout } from '../controllers/aboutController';
import { uploadSingle } from '../middleware/upload';

const router = Router();

router.get('/', getAllAbout);
router.post('/', uploadSingle('img'), createAbout);
router.put('/:id', uploadSingle('img'), updateAbout);
router.delete('/:id', deleteAbout);

export default router;
