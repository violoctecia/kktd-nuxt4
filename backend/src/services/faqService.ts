import type { FaqItem } from '../models/types';
import pool from '../utils/db';

export class FaqServiceClass {
	async getAll(): Promise<FaqItem[]> {
		const result = await pool.query('SELECT * FROM faq ORDER BY order_number ASC');
		return result.rows;
	}

	async create(data: FaqItem): Promise<FaqItem> {
		const result = await pool.query('INSERT INTO faq (question, answer, order_number) VALUES ($1,$2,$3) RETURNING *', [
			data.question,
			data.answer,
			data.order_number || null,
		]);
		return result.rows[0];
	}

	async update(id: number, data: FaqItem): Promise<FaqItem> {
		const result = await pool.query('UPDATE faq SET question=$1, answer=$2, order_number=$3 WHERE id=$4 RETURNING *', [
			data.question,
			data.answer,
			data.order_number || null,
			id,
		]);
		return result.rows[0];
	}

	async delete(id: number): Promise<void> {
		await pool.query('DELETE FROM faq WHERE id=$1', [id]);
	}
}

export const FaqService = new FaqServiceClass();
