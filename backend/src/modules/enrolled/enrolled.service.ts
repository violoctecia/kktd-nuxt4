import prisma from '../../db/prisma';
import type { EnrolledItem } from '../../types/types';

class EnrolledServiceClass {
	async getAll(): Promise<EnrolledItem[]> {
		return prisma.enrolled.findMany({ orderBy: { id: 'asc' } });
	}

	async getById(id: number): Promise<EnrolledItem | null> {
		return prisma.enrolled.findUnique({ where: { id } });
	}

	async create(data: Omit<EnrolledItem, 'id'>): Promise<EnrolledItem> {
		const preparedData = {
			...data,
			status: data.status ?? null,
			documents: data.documents ? JSON.stringify(data.documents) : null,
			group_name: data.group_name ?? null,
			fio: data.fio ?? null,
			birthDate: data.birthDate ?? null,
		};
		return prisma.enrolled.create({ data: preparedData });
	}

	async update(id: number, data: Partial<Omit<EnrolledItem, 'id'>>): Promise<EnrolledItem> {
		const preparedData = {
			...data,
			status: data.status ?? undefined,
			documents: data.documents ? JSON.stringify(data.documents) : undefined,
			group_name: data.group_name ?? undefined,
			fio: data.fio ?? undefined,
			birthDate: data.birthDate ?? undefined,
		};
		return prisma.enrolled.update({ where: { id }, data: preparedData });
	}

	async delete(id: number): Promise<void> {
		await prisma.enrolled.delete({ where: { id } });
	}
}

export const EnrolledService = new EnrolledServiceClass();
