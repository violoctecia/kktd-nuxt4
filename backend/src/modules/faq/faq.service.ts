import prisma from '../../db/prisma';
import type { FaqItem } from '../../types/types';

class FaqServiceClass {
	async getAll(): Promise<FaqItem[]> {
		return prisma.faq.findMany();
	}

	async create(data: Omit<FaqItem, 'id'>): Promise<FaqItem> {
		return prisma.faq.create({ data: data });
	}

	async update(id: number, data: Partial<Omit<FaqItem, 'id'>>): Promise<FaqItem> {
		return prisma.faq.update({ where: { id }, data: data });
	}

	async delete(id: number): Promise<void> {
		await prisma.faq.delete({ where: { id } });
	}
}

export const FaqService = new FaqServiceClass();
