export default defineEventHandler((event) => {
	if (!event.path.startsWith('/admin')) return;

	const auth = getHeader(event, 'authorization');

	// TODO: move to env
	const user = 'Giocatory';
	const pass = '1988';

	if (!auth || !auth.startsWith('Basic ')) {
		setHeader(event, 'WWW-Authenticate', 'Basic realm="Secure Area"');
		throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
	}

	const credentials = atob(auth.split(' ')[1]!);
	const [login, password] = credentials.split(':');

	if (login !== user || password !== pass) {
		setHeader(event, 'WWW-Authenticate', 'Basic realm="Secure Area"');
		throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
	}
});
