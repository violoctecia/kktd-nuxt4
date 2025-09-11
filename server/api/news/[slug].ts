import type { NewsItem } from '#shared/types';
import { getRouterParams } from 'h3';
import newsJson from '~~/server/data/news.json';

export default defineEventHandler((event) => {
	const { slug } = getRouterParams(event) as { slug: string };

	const newsItem = (newsJson as NewsItem[]).find((item) => item.slug === slug);

	if (!newsItem) {
		event.res.statusCode = 404;
		return { error: 'News not found' };
	}

	return newsItem;
});
