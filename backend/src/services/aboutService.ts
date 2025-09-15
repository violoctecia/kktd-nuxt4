import type { AboutItem } from '../models/types';
import pool from '../utils/db';
export class AboutServiceClass {
	async getAll(): Promise<AboutItem[]> {
		const result = await pool.query('SELECT * FROM about ORDER BY id ASC');
		return result.rows;
	}

	async create(data: AboutItem): Promise<AboutItem> {
		const result = await pool.query('INSERT INTO about (title, text, img) VALUES ($1,$2,$3) RETURNING *', [
			data.title,
			data.text,
			data.img || null,
		]);
		return result.rows[0];
	}

	async update(id: number, data: AboutItem): Promise<AboutItem> {
		const result = await pool.query('UPDATE about SET title=$1, text=$2, img=$3 WHERE id=$4 RETURNING *', [
			data.title,
			data.text,
			data.img || null,
			id,
		]);
		return result.rows[0];
	}

	async delete(id: number): Promise<void> {
		await pool.query('DELETE FROM about WHERE id=$1', [id]);
	}
}

export const AboutService = new AboutServiceClass();
