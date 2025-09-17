import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL must be set');
}

export const cfg = {
	dbUrl: process.env.DATABASE_URL,
	uploadDir: process.env.UPLOAD_DIR,
	port: process.env.PORT,
	prefix: process.env.APP_PREFIX,
	domain: process.env.APP_DOMAIN,
};
