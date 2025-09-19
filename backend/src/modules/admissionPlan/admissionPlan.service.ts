import prisma from '../../db/prisma';
import type { AdmissionPlan } from '../../types/types';

class AdmissionPlanServiceClass {
	async getAll(filter?: Partial<{ year: number; specialtyId: number }>): Promise<AdmissionPlan[]> {
		return prisma.admissionPlan.findMany({ where: filter });
	}

	async create(data: Omit<AdmissionPlan, 'id'>): Promise<AdmissionPlan> {
		return prisma.admissionPlan.create({ data });
	}

	async update(id: number, data: Partial<Omit<AdmissionPlan, 'id'>>): Promise<AdmissionPlan> {
		return prisma.admissionPlan.update({ where: { id }, data });
	}

	async delete(id: number): Promise<void> {
		await prisma.admissionPlan.delete({ where: { id } });
	}
}

export const AdmissionPlanService = new AdmissionPlanServiceClass();
