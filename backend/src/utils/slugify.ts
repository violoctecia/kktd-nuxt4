import _slugify from '@sindresorhus/slugify';

export function slugify(input: unknown) {
	const str = String(input);
	return _slugify(str);
}
