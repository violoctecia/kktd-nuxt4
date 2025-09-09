<template>
	<main>
		<SiteBreadcrumbs :items="breadcrumbs" />
		<h1 class="container pt-8 text-center text-2xl font-bold md:text-3xl lg:text-5xl">Новости колледжа</h1>
		<NewsBlock :items="newsItems" />
	</main>
</template>

<script setup lang="ts">
import NewsBlock from '~/components/sections/NewsBlock.vue';
import SiteBreadcrumbs from '~/components/SiteBreadcrumbs.vue';

useHead({
	title: 'Новости | Казанский Колледж Технологии и Дизайна | Профессиональное образование',
});

const breadcrumbs = [
	{ label: 'Главная', href: '/' },
	{ label: 'Новости колледжа', href: '/news' },
];
const newsItems = [
	{
		img: '/img/hackathon.webp',
		alt: 'Хакатон',
		date: '15 октября 2023',
		title: 'IT-Хакатон "Код будущего"',
		text: 'Приглашаем студентов принять участие в ежегодном хакатоне с призовым фондом 300 000 рублей.',
		href: '/news',
		categories: ['Мероприятия', 'Поступление'],
	},
	{
		img: '/img/lecture.webp',
		alt: 'Лекция',
		date: '8 октября 2023',
		title: 'Открытая лекция по квантовым вычислениям',
		text: 'Ведущий исследователь компании QTech проведет лекцию о перспективах квантовых технологий.',
		href: '/news',
		categories: ['Поступление'],
	},
	{
		img: '/img/meeting.webp',
		alt: 'Выпускники',
		date: '1 октября 2023',
		title: 'Встреча с успешными выпускниками',
		text: 'Выпускники колледжа поделятся своим опытом построения карьеры в IT-индустрии.',
		href: '/news',
		categories: ['Обучение'],
	},
	{
		img: '/img/lecture.webp',
		alt: 'Лекция',
		date: '8 октября 2023',
		title: 'Открытая лекция по квантовым вычислениям',
		text: 'Ведущий исследователь компании QTech проведет лекцию о перспективах квантовых технологий.',
		href: '/news',
		categories: ['Обучение'],
	},
	{
		img: '/img/meeting.webp',
		alt: 'Выпускники',
		date: '1 октября 2023',
		title: 'Встреча с успешными выпускниками',
		text: 'Выпускники колледжа поделятся своим опытом построения карьеры в IT-индустрии.',
		href: '/news',
		categories: ['Обучение'],
	},
	{
		img: '/img/hackathon.webp',
		alt: 'Хакатон',
		date: '15 октября 2023',
		title: 'IT-Хакатон "Код будущего"',
		text: 'Приглашаем студентов принять участие в ежегодном хакатоне с призовым фондом 300 000 рублей.',
		href: '/news',
		categories: ['Обучение'],
	},
];
</script>

<style scoped></style>
