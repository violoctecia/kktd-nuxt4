import prisma from '../../db/prisma';
import type { FaqItem } from '../../types/types';

class FaqServiceClass {
	async getAll(): Promise<FaqItem[]> {
		return prisma.faq.findMany();
	}

	async create(data: Omit<FaqItem, 'id'>): Promise<FaqItem> {
		const preparedData = {
			...data,
			order_number: data.order_number ?? null,
		};
		return prisma.faq.create({ data: preparedData });
	}

	async update(id: number, data: Partial<Omit<FaqItem, 'id'>>): Promise<FaqItem> {
		const preparedData = {
			...data,
			order_number: data.order_number ?? undefined,
		};
		return prisma.faq.update({ where: { id }, data: preparedData });
	}

	async delete(id: number): Promise<void> {
		await prisma.faq.delete({ where: { id } });
	}
}

export const FaqService = new FaqServiceClass();
