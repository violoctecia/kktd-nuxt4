import prisma from '../../db/prisma';
import type { RatingItem } from '../../types/types';

class RatingServiceClass {
	async getAll(): Promise<RatingItem[]> {
		return prisma.rating.findMany();
	}

	async create(data: Omit<RatingItem, 'id'>): Promise<RatingItem> {
		const preparedData = {
			...data,
			extra: data.extra ? JSON.stringify(data.extra) : null,
		};
		return prisma.rating.create({ data: preparedData });
	}

	async update(id: number, data: Partial<Omit<RatingItem, 'id'>>): Promise<RatingItem> {
		const preparedData = {
			...data,
			extra: data.extra ? JSON.stringify(data.extra) : null,
		};
		return prisma.rating.update({ where: { id }, data: preparedData });
	}

	async delete(id: number): Promise<void> {
		await prisma.rating.delete({ where: { id } });
	}
}

export const RatingService = new RatingServiceClass();
