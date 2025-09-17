export function toIsoDate(date: string): string {
	const [day, month, year] = date.split('.');
	return new Date(+year, +month - 1, +day).toISOString();
}
