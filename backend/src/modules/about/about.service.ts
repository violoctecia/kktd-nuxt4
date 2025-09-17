import prisma from '../../db/prisma';
import type { AboutItem } from '../../types/types';

class AboutServiceClass {
	async getAll(): Promise<AboutItem[]> {
		return prisma.about.findMany({ orderBy: { id: 'asc' } });
	}

	async create(data: Omit<AboutItem, 'id'>): Promise<AboutItem> {
		const preparedData = {
			...data,
			img: data.img ?? null,
		};
		return prisma.about.create({ data: preparedData });
	}

	async update(id: number, data: Partial<Omit<AboutItem, 'id'>>): Promise<AboutItem> {
		const preparedData = {
			...data,
			img: data.img ?? undefined,
		};
		return prisma.about.update({ where: { id }, data: preparedData });
	}

	async delete(id: number): Promise<void> {
		await prisma.about.delete({ where: { id } });
	}
}

export const AboutService = new AboutServiceClass();
