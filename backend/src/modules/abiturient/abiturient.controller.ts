import type { Request, Response } from 'express';
import { AbiturientService } from './abiturient.service';

export const getAll = async (_req: Request, res: Response) => {
	const items = await AbiturientService.getAll();
	res.json(items);
};

export const create = async (req: Request, res: Response) => {
	const newItem = await AbiturientService.create(req.body);
	res.status(201).json(newItem);
};

export const update = async (req: Request, res: Response) => {
	const { id } = req.params;

	const updated = await AbiturientService.update(Number(id), req.body);
	res.json(updated);
};

export const remove = async (req: Request, res: Response) => {
	const { id } = req.params;
	await AbiturientService.delete(Number(id));
	res.status(204).send();
};
