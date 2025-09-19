import prisma from '../../db/prisma';
import type { Specialty } from '../../types/types';

class service {
	async getAll(): Promise<Specialty[]> {
		return prisma.specialty.findMany({});
	}

	async create(data: Omit<Specialty, 'id'>): Promise<Specialty> {
		return prisma.specialty.create({ data: data });
	}

	async update(id: number, data: Partial<Omit<Specialty, 'id'>>): Promise<Specialty> {
		return prisma.specialty.update({ where: { id }, data: data });
	}

	async delete(id: number): Promise<void> {
		await prisma.specialty.delete({ where: { id } });
	}
}

export const SpecialtiesService = new service();
