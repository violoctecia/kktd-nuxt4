import pool from '../db/prisma';
import type { AdmissionPlanItem } from '../types/types';

export class AdmissionPlanServiceClass {
	async getAll(): Promise<AdmissionPlanItem[]> {
		const result = await pool.query('SELECT * FROM admission_plan ORDER BY id ASC');
		return result.rows;
	}

	async create(data: AdmissionPlanItem): Promise<AdmissionPlanItem> {
		const result = await pool.query(
			`INSERT INTO admission_plan
                 (speciality, form, duration, budget_places, paid_places, extras)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
			[
				data.speciality,
				data.form,
				data.duration,
				data.budget_places || null,
				data.paid_places || null,
				data.extras ? JSON.stringify(data.extras) : null,
			],
		);
		return result.rows[0];
	}

	async update(id: number, data: AdmissionPlanItem): Promise<AdmissionPlanItem> {
		const result = await pool.query(
			`UPDATE admission_plan
             SET speciality=$1,
                 form=$2,
                 duration=$3,
                 budget_places=$4,
                 paid_places=$5,
                 extras=$6
             WHERE id = $7 RETURNING *`,
			[
				data.speciality,
				data.form,
				data.duration,
				data.budget_places || null,
				data.paid_places || null,
				data.extras ? JSON.stringify(data.extras) : null,
				id,
			],
		);
		return result.rows[0];
	}

	async delete(id: number): Promise<void> {
		await pool.query('DELETE FROM admission_plan WHERE id=$1', [id]);
	}
}

export const AdmissionPlanService = new AdmissionPlanServiceClass();
