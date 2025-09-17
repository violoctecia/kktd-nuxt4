import { Router } from 'express';
import { uploadSingle } from '../../middleware/upload';
import newsController from './news.controller';

const router = Router();

router.get('/', newsController.getAll);
router.get('/:id', newsController.getById);
router.post('/', uploadSingle('img'), newsController.create);
router.put('/:id', uploadSingle('img'), newsController.update);
router.delete('/:id', newsController.remove);

export const newsRoutes = router;
