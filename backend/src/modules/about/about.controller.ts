import type { Request, Response } from 'express';

import { AboutService } from './about.service';

const getAll = async (_req: Request, res: Response) => {
	const items = await AboutService.getAll();
	res.json(items);
};

const create = async (req: Request, res: Response) => {
	const newItem = await AboutService.create(req.body);
	res.status(201).json(newItem);
};

const update = async (req: Request, res: Response) => {
	const { id } = req.params;

	const updated = await AboutService.update(Number(id), req.body);
	res.json(updated);
};

const remove = async (req: Request, res: Response) => {
	const { id } = req.params;
	await AboutService.delete(Number(id));
	res.status(204).send();
};

export default { create, getAll, remove, update };
