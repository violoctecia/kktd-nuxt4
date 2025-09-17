import { Router } from 'express';
import { uploadSingle } from '../../middleware/upload';
import aboutController from './about.controller';

const router = Router();

router.get('/', aboutController.getAll);
router.post('/', uploadSingle('img'), aboutController.create);
router.put('/:id', uploadSingle('img'), aboutController.update);
router.delete('/:id', aboutController.remove);

export const aboutRoutes = router;
