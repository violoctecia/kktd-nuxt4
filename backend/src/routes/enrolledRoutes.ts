import { Router } from 'express';
import { createEnrolled, deleteEnrolled, getEnrolled, getEnrolledById, updateEnrolled } from '../controllers/enrolledController';

const router = Router();

// Получить список всех абитуриентов
router.get('/', getEnrolled);

// Получить конкретного абитуриента по id
router.get('/:id', getEnrolledById);

// Создать нового абитуриента
router.post('/', createEnrolled);

// Обновить абитуриента по id
router.put('/:id', updateEnrolled);

// Удалить абитуриента по id
router.delete('/:id', deleteEnrolled);

export default router;
