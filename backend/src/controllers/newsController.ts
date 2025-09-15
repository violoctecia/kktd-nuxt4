import type { Request, Response } from 'express';
import { NewsService } from '../services/newsService';

export const getAllNews = async (_req: Request, res: Response) => {
	const items = await NewsService.getAll();
	res.json(items);
};

export const createNews = async (req: Request, res: Response) => {
	const newItem = await NewsService.create(req.body);
	res.status(201).json(newItem);
};

export const updateNews = async (req: Request, res: Response) => {
	const { id } = req.params;
	const updated = await NewsService.update(Number(id), req.body);
	res.json(updated);
};

export const deleteNews = async (req: Request, res: Response) => {
	const { id } = req.params;
	await NewsService.delete(Number(id));
	res.status(204).send();
};

export const getNewsById = async (req: Request, res: Response) => {
	const { id } = req.params;
	const item = await NewsService.getById(Number(id));
	if (!item) {
		return res.status(404).json({ message: 'News not found' });
	}
	res.json(item);
};
