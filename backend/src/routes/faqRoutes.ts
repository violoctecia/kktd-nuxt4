import { Router } from 'express';
import { createFaq, deleteFaq, getFaq, updateFaq } from '../controllers/faqController';

const router = Router();

router.get('/', getFaq);
router.post('/', createFaq);
router.put('/:id', updateFaq);
router.delete('/:id', deleteFaq);

export default router;
