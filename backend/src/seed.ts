import prisma from './db/prisma';

async function main() {
	console.log('Seeding database...');

	// --- About ---
	const abouts = [
		{ content: 'Наш колледж предлагает лучшие программы обучения.' },
		{ content: 'Мы гордимся своими выпускниками и преподавателями.' },
	];
	for (const about of abouts) {
		await prisma.about.create({ data: about });
	}

	// --- Faq ---
	const faqs = [
		{ question: 'Как подать заявку?', content: 'Вы можете подать заявку онлайн через наш сайт.' },
		{ question: 'Какие формы обучения доступны?', content: 'Очная и заочная формы обучения.' },
	];
	for (const faq of faqs) {
		await prisma.faq.create({ data: faq });
	}

	// --- News ---
	const newsItems = [
		{
			img: 'news1.jpg',
			alt: 'Новость 1',
			date: '2025-09-17',
			title: 'Начало нового учебного года',
			text: 'Учебный год начался успешно.',
			slug: 'new-year-2025',
			iso_date: '2025-09-17T00:00:00.000Z',
			categories: ['Образование', 'Новости'],
			content: 'Подробности начала учебного года...',
		},
		{
			img: 'news2.jpg',
			alt: 'Новость 2',
			date: '2025-08-01',
			title: 'Новые курсы дизайна',
			text: 'Запущены новые курсы по дизайну.',
			slug: 'design-courses-2025',
			iso_date: '2025-08-01T00:00:00.000Z',
			categories: ['Курсы', 'Новости'],
			content: 'Подробности новых курсов дизайна...',
		},
	];
	for (const news of newsItems) {
		await prisma.news.create({ data: news });
	}

	// --- Enrolled ---
	const enrolledStudents = [
		{ full_name: 'Иван Иванов', specialty: 'Программирование', group_name: 'ПР-101' },
		{ full_name: 'Мария Петрова', specialty: 'Дизайн', group_name: 'ДИ-102' },
		{ full_name: 'Алексей Сидоров', specialty: 'Программирование', group_name: 'ПР-103' },
	];
	for (const student of enrolledStudents) {
		await prisma.enrolled.create({ data: student });
	}

	// --- Rating ---
	const ratings = [
		{ full_name: 'Иван Иванов', specialty: 'Программирование', score: 95 },
		{ full_name: 'Мария Петрова', specialty: 'Дизайн', score: 88 },
		{ full_name: 'Алексей Сидоров', specialty: 'Программирование', score: 78 },
	];
	for (const rating of ratings) {
		await prisma.rating.create({ data: rating });
	}

	// --- AdmissionPlan ---
	const plans = [
		{
			specialty: 'Программирование',
			qualification: 'Бакалавр',
			form: 'Очная',
			duration: '4 года',
			budget_places: 10,
			paid_places: 20,
			cost: 120000,
			accreditation: true,
		},
		{
			specialty: 'Дизайн',
			qualification: 'Бакалавр',
			form: 'Заочная',
			duration: '4 года',
			budget_places: 5,
			paid_places: 15,
			cost: 100000,
			accreditation: true,
		},
	];
	for (const plan of plans) {
		await prisma.admissionPlan.create({ data: plan });
	}

	console.log('Seeding finished.');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
