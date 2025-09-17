import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth';
import { createAdmissionPlan, deleteAdmissionPlan, getAdmissionPlan, updateAdmissionPlan } from './admissionPlan.controller';

const router = Router();

router.get('/', getAdmissionPlan);
router.post('/', authMiddleware, createAdmissionPlan);
router.put('/:id', authMiddleware, updateAdmissionPlan);
router.delete('/:id', authMiddleware, deleteAdmissionPlan);

export const planRoutes = router;
