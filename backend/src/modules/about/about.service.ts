import prisma from '../../db/prisma';
import type { AboutItem } from '../../types/types';

class AboutServiceClass {
	async getAll(): Promise<AboutItem[]> {
		return prisma.about.findMany({ orderBy: { id: 'asc' } });
	}

	async create(data: Omit<AboutItem, 'id'>): Promise<AboutItem> {
		return prisma.about.create({ data: { content: data.content } });
	}

	async update(id: number, data: Partial<Omit<AboutItem, 'id'>>): Promise<AboutItem> {
		return prisma.about.update({ where: { id }, data: data });
	}

	async delete(id: number): Promise<void> {
		await prisma.about.delete({ where: { id } });
	}
}

export const AboutService = new AboutServiceClass();
