import enrolled from '~~/server/data/enrolled.json';

export default defineEventHandler(() => {
	return enrolled;
});
