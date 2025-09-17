import pool from '../db/prisma';
import type { RatingItem } from '../types/types';

class RatingServiceClass {
	async getAll(): Promise<RatingItem[]> {
		const result = await pool.query('SELECT * FROM rating ORDER BY id ASC');
		return result.rows;
	}

	async create(data: RatingItem): Promise<RatingItem> {
		const result = await pool.query('INSERT INTO rating (fio, speciality, score, year, extra) VALUES ($1,$2,$3,$4,$5) RETURNING *', [
			data.fio,
			data.speciality,
			data.score,
			data.year,
			data.extra ? JSON.stringify(data.extra) : null,
		]);
		return result.rows[0];
	}

	async update(id: number, data: RatingItem): Promise<RatingItem> {
		const result = await pool.query('UPDATE rating SET fio=$1, speciality=$2, score=$3, year=$4, extra=$5 WHERE id=$6 RETURNING *', [
			data.fio,
			data.speciality,
			data.score,
			data.year,
			data.extra ? JSON.stringify(data.extra) : null,
			id,
		]);
		return result.rows[0];
	}

	async delete(id: number): Promise<void> {
		await pool.query('DELETE FROM rating WHERE id=$1', [id]);
	}
}

export const RatingService = new RatingServiceClass();
