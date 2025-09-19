import { cfg } from './config';
import prisma from './db/prisma';
import type { Abiturient, AdmissionPlan, FaqItem, NewsItem, Specialty } from './types/types';

async function main() {
	console.log('Seeding database...');

	// --- About ---
	await prisma.about.create({
		data: {
			content:
				'<p>Здание образовательной организации, расположенное на живописном берегу озера Кабан, в историческом центре Казани, является памятником архитектуры. Его фасад украшен классическими элементами, а внутри оборудованы современные учебные кабинеты и лаборатории.</p> <h2>История колледжа</h2> <p>Учебное заведение ведет свою историю с 1920 года. Первоначально оно называлось Казанский кожевенный техникум, готовивший специалистов для промышленности и ремесел. За годы существования колледж подготовил тысячи квалифицированных специалистов, многие из которых внесли значительный вклад в развитие города и республики.</p> <h2>Современное развитие</h2> <p>Сегодня колледж предлагает образовательные программы по различным направлениям: дизайн, технологии, информационные системы и программирование. Образовательный процесс сочетает теорию и практику, а лаборатории оснащены современным оборудованием. Студенты активно участвуют в конкурсах, выставках и проектах, что позволяет им развивать профессиональные навыки и творческое мышление.</p> <h2>Материально-техническая база</h2> <p>Колледж располагает современными лабораториями, мастерскими и компьютерными классами. Каждое направление имеет специализированное оборудование, необходимое для качественного обучения. Также имеется библиотека с обширным фондом учебной литературы и зоной для самостоятельной работы студентов.</p> <h2>Преподавательский состав</h2> <p>Преподаватели колледжа имеют высокую квалификацию, многие из них имеют ученые степени и звания. Они активно внедряют новые методики обучения, используют современные образовательные технологии и поддерживают студентов в их профессиональном развитии.</p> <h2>Студенческая жизнь</h2> <p>В колледже действует множество студенческих объединений, клубов и кружков по интересам. Студенты участвуют в культурных и спортивных мероприятиях, научных проектах и конкурсах, что способствует всестороннему развитию личности и формированию командного духа.</p>',
		},
	});

	// --- Faq ---
	const faqs: FaqItem[] = [
		{
			question: 'Какие специальности есть в ККТД в 2024 году?',
			content:
				'<h3>📚 Актуальные специальности в 2024 году:</h3><ul><li>09.02.07 — Информационные системы и программирование</li><li>29.02.10 — Конструирование, моделирование и технология изготовления изделий легкой промышленности (по видам)</li><li>29.02.05 — Технология кожи и меха</li><li>29.02.05 — Технология текстильных изделий (по видам)</li><li>38.02.01 — Экономика и бухгалтерский учет (по отраслям)</li><li>38.02.05 — Товароведение и экспертиза качества потребительских товаров</li></ul>',
		},
		{ question: 'Как подать заявку?', content: '<p>Вы можете подать заявку онлайн через наш сайт.</p>' },
		{ question: 'Какие формы обучения доступны?', content: '<p>Очная и заочная формы обучения.</p>' },
	];
	await prisma.faq.createMany({
		data: faqs,
		skipDuplicates: true,
	});

	// --- News ---
	const newsItems: NewsItem[] = [
		{
			img: `${cfg.domain}${cfg.uploadDir}/seed/1758105153823-cyber.webp`,
			alt: 'Новость 1',
			date: '17.09.2025',
			title: 'Начало нового учебного года',
			text: 'Учебный год начался успешно.',
			slug: 'new-year-2025',
			iso_date: '2025-09-17T00:00:00.000Z',
			categories: ['Образование', 'Новости'],
			content: '<h2>Подробности начала учебного года..<h2/><p>Текст....</p>',
		},
		{
			img: `${cfg.domain}${cfg.uploadDir}/seed/1758130514964-ecology.webp`,
			alt: 'Новость 2',
			date: '01.08.2025',
			title: 'Новые курсы дизайна',
			text: 'Запущены новые курсы по дизайну.',
			slug: 'design-courses-2025',
			iso_date: '2025-08-01T00:00:00.000Z',
			categories: ['Курсы', 'Новости'],
			content: 'Подробности новых курсов дизайна...',
		},
		{
			img: `${cfg.domain}${cfg.uploadDir}/seed/1758130514964-ecology.webp`,
			alt: 'Новость 2',
			date: '01.08.2025',
			title: 'Новые курсы дизайна 2',
			text: 'Запущены новые курсы по дизайну.',
			slug: 'design-courses-2025',
			iso_date: '2025-08-01T00:00:00.000Z',
			categories: ['Курсы'],
			content: 'Подробности новых курсов дизайна 2...',
		},
	];
	await prisma.news.createMany({
		data: newsItems,
		skipDuplicates: true,
	});

	// --- Specialty ---
	const specialtiesData: Specialty[] = [
		{
			code: '09.02.07',
			name: 'Информационные системы и программирование',
			qualification: 'Программист',
			durationMonths: 4,
			base: 9,
			form: 'Очная',
		},
		{
			code: '09.02.07',
			name: 'Информационные системы и программирование',
			qualification: 'Специалист по информационным системам',
			durationMonths: 4,
			base: 9,
			form: 'Очная',
		},
		{
			code: '29.02.10',
			name: 'Конструирование, моделирование и технология изделий легкой промышленности',
			qualification: 'Швейные изделия',
			durationMonths: 4,
			base: 9,
			form: 'Очная',
		},
	];
	await prisma.specialty.createMany({
		data: specialtiesData,
		skipDuplicates: true,
	});

	const specialties = await prisma.specialty.findMany();

	// --- AdmissionPlan ---
	const admissionPlans: AdmissionPlan[] = specialties.map((s: Specialty) => ({
		specialtyId: s.id,
		year: 2025,
		funding: 'BUDGET',
		price: null,
		places: 20,
	}));
	await prisma.admissionPlan.createMany({
		data: admissionPlans,
		skipDuplicates: true,
	});

	// --- Abiturients ---
	const studentsPerSpecialty = 5;
	const abiturients: Abiturient[] = [];

	const firstNames = ['Алексей', 'Мария', 'Иван', 'Елена', 'Дмитрий', 'Ольга', 'Сергей', 'Анна'];
	const lastNames = ['Иванов', 'Петров', 'Сидоров', 'Кузнецова', 'Смирнов', 'Попова', 'Ковалев', 'Николаева'];
	const middleNames = ['Александрович', 'Андреевна', 'Иванович', 'Петровна', 'Дмитриевич', 'Сергеевна'];

	function getRandomItem<T>(arr: T[]): T {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	specialties.forEach((s: Required<Specialty>) => {
		for (let i = 0; i < studentsPerSpecialty; i++) {
			const fullName = `${getRandomItem(lastNames)} ${getRandomItem(firstNames)} ${getRandomItem(middleNames)}`;

			const score = parseFloat((Math.random() * 2 + 3).toFixed(1));

			abiturients.push({
				specialtyId: s.id,
				full_name: fullName,
				score: score,
				isEnrolled: score >= 4.0,
			});
		}
	});

	await prisma.abiturient.createMany({
		data: abiturients,
		skipDuplicates: true,
	});

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
