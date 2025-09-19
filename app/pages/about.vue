<script setup lang="ts">
import type { About } from '#shared/types';
import ContactInfo from '@/components/sections/ContactInfo.vue';
import SiteBreadcrumbs from '~/components/SiteBreadcrumbs.vue';

const breadcrumbs = [
	{ label: 'Главная', href: '/' },
	{ label: 'О нас', href: '/about' },
];

const { data, error } = await useFetch<About[]>(`/about`, {
	baseURL: useRuntimeConfig().public.backendUrl,
});
</script>

<template>
	<div>
		<div class="container">
			<SiteBreadcrumbs :items="breadcrumbs" />
		</div>
		<div class="container__sm">
			<h1 class="h1">О нас</h1>

			<div class="html-content" v-if="data?.[0]" v-html="data[0].content"></div>
			<p v-if="error">Что-то пошло не так... Попробуйте ещё раз немного позже.</p>
			<ContactInfo class="mt-12" />
		</div>
	</div>
</template>
