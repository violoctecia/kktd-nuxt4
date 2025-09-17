import type { Request, Response } from 'express';
import { EnrolledService } from './enrolled.service';

export const getAll = async (_req: Request, res: Response) => {
	const items = await EnrolledService.getAll();
	res.json(items);
};

export const getById = async (req: Request, res: Response) => {
	const { id } = req.params;
	const item = await EnrolledService.getById(Number(id));
	if (!item) return res.status(404).json({ error: 'Запись не найдена' });
	res.json(item);
};

export const create = async (req: Request, res: Response) => {
	const newItem = await EnrolledService.create(req.body);
	res.status(201).json(newItem);
};

export const update = async (req: Request, res: Response) => {
	const { id } = req.params;
	const updated = await EnrolledService.update(Number(id), req.body);
	res.json(updated);
};

export const remove = async (req: Request, res: Response) => {
	const { id } = req.params;
	await EnrolledService.delete(Number(id));
	res.status(204).send();
};
