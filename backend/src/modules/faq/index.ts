import { Router } from 'express';
import faqController from './faq.controller';

const router = Router();

router.get('/', faqController.getAll);
router.post('/', faqController.create);
router.put('/:id', faqController.update);
router.delete('/:id', faqController.remove);

export const faqRoutes = router;
