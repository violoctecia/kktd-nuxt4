import type { NewsItem } from '#shared/types';
import newsJson from '~~/server/data/news.json';

export default defineEventHandler((event) => {
	const data: NewsItem[] = newsJson;
	const query = getQuery(event);
	const limit = query.limit ? Number(query.limit) : undefined;

	if (limit) {
		return data.slice(0, limit);
	}

	return data;
});
