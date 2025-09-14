import fs from 'fs';
import { defineEventHandler, readBody } from 'h3';
import path from 'path';

const dataDir = path.resolve('./server/data');

export default defineEventHandler(async (event) => {
	const file = event.context?.params?.file;
	if (!file) return { error: 'Файл не указан' };

	const filePath = path.join(dataDir, `${file}.json`);

	try {
		const body = await readBody(event);
		fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf-8');
		return { success: true };
	} catch (e) {
		return { error: 'Не удалось сохранить файл', details: String(e) };
	}
});
