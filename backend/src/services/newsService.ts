import type { NewsItem } from '../models/types';
import pool from '../utils/db';

export class NewsServiceClass {
	async getAll(): Promise<NewsItem[]> {
		const result = await pool.query('SELECT * FROM news ORDER BY id ASC');
		return result.rows;
	}

	async getById(id: number): Promise<NewsItem> {
		const result = await pool.query('SELECT * FROM news WHERE id=$1', [id]);
		return result.rows[0];
	}

	async create(data: NewsItem): Promise<NewsItem> {
		const result = await pool.query(
			`INSERT INTO news (img, alt, date, title, text, slug, isoDate, categories, content)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
			[
				data.img || null,
				data.alt || null,
				data.date,
				data.title,
				data.text,
				data.slug,
				data.isoDate,
				JSON.stringify(data.categories || []),
				data.content,
			],
		);
		return result.rows[0];
	}

	async update(id: number, data: NewsItem): Promise<NewsItem> {
		const result = await pool.query(
			`UPDATE news SET img=$1, alt=$2, date=$3, title=$4, text=$5, slug=$6, isoDate=$7, categories=$8, content=$9
       WHERE id=$10 RETURNING *`,
			[
				data.img || null,
				data.alt || null,
				data.date,
				data.title,
				data.text,
				data.slug,
				data.isoDate,
				JSON.stringify(data.categories || []),
				data.content,
				id,
			],
		);
		return result.rows[0];
	}

	async delete(id: number): Promise<void> {
		await pool.query('DELETE FROM news WHERE id=$1', [id]);
	}
}

export const NewsService = new NewsServiceClass();
