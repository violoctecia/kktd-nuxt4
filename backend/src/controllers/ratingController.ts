import type { Request, Response } from 'express';
import { RatingService } from '../services/ratingService';

export const getRating = async (_req: Request, res: Response) => {
	const items = await RatingService.getAll();
	res.json(items);
};

export const createRating = async (req: Request, res: Response) => {
	const newItem = await RatingService.create(req.body);
	res.status(201).json(newItem);
};

export const updateRating = async (req: Request, res: Response) => {
	const { id } = req.params;
	const updated = await RatingService.update(Number(id), req.body);
	res.json(updated);
};

export const deleteRating = async (req: Request, res: Response) => {
	const { id } = req.params;
	await RatingService.delete(Number(id));
	res.status(204).send();
};
