import prisma from '../../db/prisma';
import type { Abiturient } from '../../types/types';

class service {
	async getAll(): Promise<Abiturient[]> {
		return prisma.abiturient.findMany({});
	}

	async create(data: Omit<Abiturient, 'id'>): Promise<Abiturient> {
		return prisma.abiturient.create({ data: data });
	}

	async update(id: number, data: Partial<Omit<Abiturient, 'id'>>): Promise<Abiturient> {
		return prisma.abiturient.update({ where: { id }, data: data });
	}

	async delete(id: number): Promise<void> {
		await prisma.abiturient.delete({ where: { id } });
	}
}

export const AbiturientService = new service();
