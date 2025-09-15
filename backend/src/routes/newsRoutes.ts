import { Router } from 'express';
import { createNews, deleteNews, getAllNews, getNewsById, updateNews } from '../controllers/newsController';
import { uploadSingle } from '../middleware/upload';

const router = Router();

router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.post('/', uploadSingle('img'), createNews);
router.put('/:id', uploadSingle('img'), updateNews);
router.delete('/:id', deleteNews);

export default router;
