<script setup lang="ts">
import type { Faq } from '#shared/types';
import ContactInfo from '@/components/sections/ContactInfo.vue';
import SiteBreadcrumbs from '~/components/SiteBreadcrumbs.vue';

const breadcrumbs = [
	{ label: 'Главная', href: '/' },
	{ label: 'FAQ', href: '/faq' },
];

const { data, error } = useFetch<Faq[]>('/faq', {
	baseURL: useRuntimeConfig().public.backendUrl,
});
</script>

<template>
	<div class="container mx-auto px-4 py-12">
		<SiteBreadcrumbs :items="breadcrumbs" />

		<h1 class="h1">Часто задаваемые вопросы</h1>

		<div class="flex flex-col gap-6" v-if="data">
			<div class="rounded-xl border-l-4 border-primary bg-gray-100 p-8 shadow-lg" v-for="i in data" :key="i.id">
				<h2 class="text-primary-dark mb-8 text-2xl font-medium">{{ i.question }}</h2>
				<div class="html-content" v-html="i.content"></div>
			</div>
		</div>

		<ContactInfo class="mt-12" />

		<div v-if="error" class="mt-6 text-red-500">Ошибка загрузки FAQ: {{ error.message }}</div>
	</div>
</template>
