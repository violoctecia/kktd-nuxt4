import type { EnrolledItem } from '../models/types';
import pool from '../utils/db';

export class EnrolledServiceClass {
	// Получить всех абитуриентов
	async getAll(): Promise<EnrolledItem[]> {
		const result = await pool.query('SELECT * FROM enrolled ORDER BY id ASC');
		return result.rows;
	}

	// Получить одного абитуриента по ID
	async getById(id: number): Promise<EnrolledItem | null> {
		const result = await pool.query('SELECT * FROM enrolled WHERE id = $1', [id]);
		return result.rows[0] || null;
	}

	// Создать нового абитуриента
	async create(data: EnrolledItem): Promise<EnrolledItem> {
		const result = await pool.query(
			'INSERT INTO enrolled (fio, full_name, speciality, status, documents) VALUES ($1,$2,$3,$4,$5) RETURNING *',
			[data.fio, data.full_name, data.speciality, data.status || null, data.documents ? JSON.stringify(data.documents) : null],
		);
		return result.rows[0];
	}

	// Обновить абитуриента по ID
	async update(id: number, data: EnrolledItem): Promise<EnrolledItem> {
		const result = await pool.query(
			'UPDATE enrolled SET fio=$1, full_name=$2, speciality=$3, status=$4, documents=$5 WHERE id=$6 RETURNING *',
			[data.fio, data.full_name, data.speciality, data.status || null, data.documents ? JSON.stringify(data.documents) : null, id],
		);
		return result.rows[0];
	}

	// Удалить абитуриента по ID
	async delete(id: number): Promise<void> {
		await pool.query('DELETE FROM enrolled WHERE id=$1', [id]);
	}
}

export const EnrolledService = new EnrolledServiceClass();
