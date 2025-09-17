import prisma from '../../db/prisma';
import type { NewsItem } from '../../types/types';
import { slugify } from '../../utils/slugify';
import { toIsoDate } from '../../utils/toIsoDate';

class NewsServiceClass {
	async getAll(): Promise<NewsItem[]> {
		return prisma.news.findMany();
	}

	async getById(id: number): Promise<NewsItem | null> {
		return prisma.news.findUnique({ where: { id } });
	}

	async create(data: Omit<NewsItem, 'id' | 'slug' | 'isoDate'>): Promise<NewsItem> {
		const preparedData = {
			...data,
			slug: slugify(data.title),
			isoDate: toIsoDate(data.date),
			img: data.img ?? null,
			alt: data.alt ?? null,
		};
		return prisma.news.create({ data: preparedData });
	}

	async update(id: number, data: Partial<Omit<NewsItem, 'id' | 'slug' | 'isoDate'>>): Promise<NewsItem> {
		const preparedData: Partial<NewsItem> = { ...data };
		if (data.date) preparedData.isoDate = toIsoDate(data.date);
		if (data.title) preparedData.slug = slugify(data.title);
		if (data.img === undefined) delete preparedData.img;
		if (data.alt === undefined) delete preparedData.alt;
		return prisma.news.update({ where: { id }, data: preparedData });
	}

	async delete(id: number): Promise<void> {
		await prisma.news.delete({ where: { id } });
	}
}

export const NewsService = new NewsServiceClass();
