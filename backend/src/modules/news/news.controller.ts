import type { Request, Response } from 'express';
import { cfg } from '../../config';
import { NewsService } from './news.service';

export const getBySlug = async (req: Request, res: Response) => {
	const { slug } = req.params;
	const item = await NewsService.getBySlug(slug);
	if (!item) {
		return res.status(404).json({ message: 'New not found' });
	}
	res.json(item);
};

export const getAll = async (_req: Request, res: Response) => {
	const items = await NewsService.getAll();
	res.json(items);
};

export const create = async (req: Request, res: Response) => {
	const imgPath = req.file?.path;
	if (!imgPath) {
		return res.status(404).json({ message: 'Image is required' });
	}

	const newItem = await NewsService.create({
		...req.body,
		img: `${cfg.domain}${imgPath}`,
	});
	res.status(201).json(newItem);
};

export const update = async (req: Request, res: Response) => {
	const { id } = req.params;

	const dataToUpdate = {
		...req.body,
		...(req.file && { img: `${cfg.domain}${req.file.path}` }),
	};

	const updated = await NewsService.update(Number(id), dataToUpdate);
	res.json(updated);
};

export const remove = async (req: Request, res: Response) => {
	const { id } = req.params;
	await NewsService.delete(Number(id));
	res.status(204).send();
};
