import { Router } from 'express';
import { createAdmissionPlan, deleteAdmissionPlan, getAdmissionPlan, updateAdmissionPlan } from '../controllers/admissionPlanController';

const router = Router();

router.get('/', getAdmissionPlan);
router.post('/', createAdmissionPlan);
router.put('/:id', updateAdmissionPlan);
router.delete('/:id', deleteAdmissionPlan);

export default router;
