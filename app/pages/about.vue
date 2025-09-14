<script setup lang="ts">
import ContactInfo from '@/components/sections/ContactInfo.vue';
import SiteBreadcrumbs from '~/components/SiteBreadcrumbs.vue';

interface AboutSection {
	title?: string;
	text: string;
}

const breadcrumbs = [
	{ label: 'Главная', href: '/' },
	{ label: 'О нас', href: '/about' },
];

const { data: fetchedAbout, error } = await useFetch<AboutSection[]>('/api/about');
</script>

<template>
	<main class="container mx-auto px-4 py-12">
		<SiteBreadcrumbs :items="breadcrumbs" />
		<h1 class="mb-8 text-3xl font-bold">О нас</h1>

		<div class="flex flex-col gap-6">
			<div v-for="(section, index) in fetchedAbout" :key="index">
				<h2 v-if="section.title" class="mb-2 text-xl font-semibold">{{ section.title }}</h2>
				<p class="leading-relaxed text-gray-700" v-html="section.text"></p>
			</div>
		</div>

		<ContactInfo class="mt-12" />

		<div v-if="error" class="mt-6 text-red-500">Ошибка загрузки информации: {{ error.message }}</div>
	</main>
</template>
