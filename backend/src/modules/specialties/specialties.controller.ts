import type { Request, Response } from 'express';
import { SpecialtiesService } from './specialties.service';

export const getAll = async (_req: Request, res: Response) => {
	const items = await SpecialtiesService.getAll();
	res.json(items);
};

export const create = async (req: Request, res: Response) => {
	const newItem = await SpecialtiesService.create(req.body);
	res.status(201).json(newItem);
};

export const update = async (req: Request, res: Response) => {
	const { id } = req.params;

	const updated = await SpecialtiesService.update(Number(id), req.body);
	res.json(updated);
};

export const remove = async (req: Request, res: Response) => {
	const { id } = req.params;
	await SpecialtiesService.delete(Number(id));
	res.status(204).send();
};
