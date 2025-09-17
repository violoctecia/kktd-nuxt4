import { Router } from 'express';
import aboutController from './about.controller';

const router = Router();

router.get('/', aboutController.getAll);
router.post('/', aboutController.create);
router.put('/:id', aboutController.update);
router.delete('/:id', aboutController.remove);

export const aboutRoutes = router;
