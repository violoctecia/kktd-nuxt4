import type { NextFunction, Request, Response } from 'express';
import { cfg } from '../config';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

	if (!token || token !== cfg.bearerToken) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	next();
};
