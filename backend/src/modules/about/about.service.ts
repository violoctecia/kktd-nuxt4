import type { About } from '@prisma/client';
import prisma from '../../db/prisma';

class service {
	async getAll(): Promise<About[]> {
		return prisma.about.findMany({
			orderBy: { id: 'asc' },
		});
	}

	async create(data: Omit<About, 'id'>): Promise<About> {
		return prisma.about.create({
			data,
		});
	}

	async update(id: number, data: Partial<Omit<About, 'id'>>): Promise<About> {
		return prisma.about.update({
			where: { id },
			data,
		});
	}

	async delete(id: number): Promise<void> {
		await prisma.about.delete({
			where: { id },
		});
	}
}

export const AboutService = new service();
