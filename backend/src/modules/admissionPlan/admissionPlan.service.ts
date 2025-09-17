import prisma from '../../db/prisma';
import type { AdmissionPlanItem } from '../../types/types';

class AdmissionPlanServiceClass {
	async getAll(): Promise<AdmissionPlanItem[]> {
		return prisma.admissionPlan.findMany();
	}

	async create(data: Omit<AdmissionPlanItem, 'id'>): Promise<AdmissionPlanItem> {
		const preparedData = {
			...data,
			budget_places: data.budget_places ?? null,
			paid_places: data.paid_places ?? null,
			cost: data.cost ?? null,
			accreditation: data.accreditation ?? null,
			qualification: data.qualification ?? null,
			extras: data.extras ? JSON.stringify(data.extras) : null,
		};
		return prisma.admissionPlan.create({ data: preparedData });
	}

	async update(id: number, data: Partial<Omit<AdmissionPlanItem, 'id'>>): Promise<AdmissionPlanItem> {
		const preparedData = {
			...data,
			budget_places: data.budget_places ?? undefined,
			paid_places: data.paid_places ?? undefined,
			cost: data.cost ?? undefined,
			accreditation: data.accreditation ?? undefined,
			qualification: data.qualification ?? undefined,
			extras: data.extras ? JSON.stringify(data.extras) : undefined,
		};
		return prisma.admissionPlan.update({ where: { id }, data: preparedData });
	}

	async delete(id: number): Promise<void> {
		await prisma.admissionPlan.delete({ where: { id } });
	}
}

export const AdmissionPlanService = new AdmissionPlanServiceClass();
