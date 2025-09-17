import type { News } from '@prisma/client';
import prisma from '../../db/prisma';
import { slugify } from '../../utils/slugify';
import { toIsoDate } from '../../utils/toIsoDate';

class NewsServiceClass {
	async getAll(): Promise<News[]> {
		return prisma.news.findMany();
	}

	async getById(id: number): Promise<News | null> {
		return prisma.news.findUnique({
			where: { id },
		});
	}

	async create(data: Omit<News, 'id' | 'slug' | 'iso_date'>): Promise<News> {
		const slug = slugify(data.title);
		const isoDate = toIsoDate(data.date);

		return prisma.news.create({
			data: {
				...data,
				slug,
				iso_date: isoDate,
			},
		});
	}

	async update(id: number, data: Partial<Omit<News, 'id' | 'slug' | 'iso_date'>>): Promise<News> {
		const updateData: Partial<Omit<News, 'id'>> = { ...data };

		if (data.date) {
			updateData.iso_date = toIsoDate(data.date);
		}

		if (data.title) {
			updateData.slug = slugify(data.title);
		}

		return prisma.news.update({
			where: { id },
			data: updateData,
		});
	}

	async delete(id: number): Promise<void> {
		await prisma.news.delete({
			where: { id },
		});
	}
}

export const NewsService = new NewsServiceClass();
