import dotenv from 'dotenv';

dotenv.config();

function requireEnv(key: string): string {
	const value = process.env[key];
	if (!value) {
		throw new Error(`Environment variable ${key} must be set`);
	}
	return value;
}

export const cfg = {
	dbUrl: requireEnv('DATABASE_URL'),
	uploadDir: process.env.UPLOAD_DIR || 'uploads',
	port: Number(process.env.PORT) || 3001,
	prefix: process.env.APP_PREFIX || '/api',
	domain: requireEnv('APP_DOMAIN'),
	bearerToken: requireEnv('BEARER_TOKEN'),
};
