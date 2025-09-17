import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { cfg } from '../config';

dotenv.config();

const UPLOAD_DIR = cfg.uploadDir;

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
	filename: (_req, file, cb) => {
		const safe = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
		cb(null, safe);
	},
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
	const ext = path.extname(file.originalname).toLowerCase();
	if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) cb(null, true);
	else cb(new Error('Only image files are allowed'));
};

export const uploadSingle = (field = 'img') => multer({ storage, fileFilter }).single(field);
export const uploadAny = () => multer({ storage, fileFilter }).any();
