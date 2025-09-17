import type { Faq } from '@prisma/client';
import prisma from '../../db/prisma';

class service {
	async getAll(): Promise<Faq[]> {
		return prisma.faq.findMany({});
	}

	async create(data: Omit<Faq, 'id'>): Promise<Faq> {
		return prisma.faq.create({
			data,
		});
	}

	async update(id: number, data: Partial<Omit<Faq, 'id'>>): Promise<Faq> {
		return prisma.faq.update({
			where: { id },
			data,
		});
	}

	async delete(id: number): Promise<void> {
		await prisma.faq.delete({
			where: { id },
		});
	}
}

export const FaqService = new service();
