import type { Request, Response } from 'express';
import { EnrolledService } from '../services/enrolledService';

export const getEnrolled = async (_req: Request, res: Response) => {
	const items = await EnrolledService.getAll();
	res.json(items);
};

export const createEnrolled = async (req: Request, res: Response) => {
	const newItem = await EnrolledService.create(req.body);
	res.status(201).json(newItem);
};

export const getEnrolledById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const data = await EnrolledService.getById(Number(id));
		if (!data) {
			return res.status(404).json({ error: 'Запись не найдена' });
		}
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
};

export const updateEnrolled = async (req: Request, res: Response) => {
	const { id } = req.params;
	const updated = await EnrolledService.update(Number(id), req.body);
	res.json(updated);
};

export const deleteEnrolled = async (req: Request, res: Response) => {
	const { id } = req.params;
	await EnrolledService.delete(Number(id));
	res.status(204).send();
};
