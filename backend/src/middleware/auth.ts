import type { NextFunction, Request, Response } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

	if (!token || token !== process.env.API_KEY) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	next();
};
