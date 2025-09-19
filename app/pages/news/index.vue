<template>
	<div class="container">
		<SiteBreadcrumbs :items="breadcrumbs" />
		<section>
			<h1 class="h1">Новости колледжа</h1>
			<!--TODO: сортировака по категориям	-->
			<NewsList v-if="newsItems?.length" :items="newsItems" tag="h2" />
			<p v-if="error">Что-то пошло не так... Попробуйте ещё раз немного позже.</p>
			<p v-else-if="!newsItems?.length">Новостей пока нет</p>
		</section>
	</div>
</template>

<script setup lang="ts">
import type { NewsItem } from '#shared/types';
import SiteBreadcrumbs from '~/components/SiteBreadcrumbs.vue';
import NewsList from '~/components/sections/NewsList.vue';

useHead({
	title: 'Новости | Казанский Колледж Технологии и Дизайна | Профессиональное образование',
});

const breadcrumbs = [{ label: 'Главная', href: '/' }, { label: 'Новости колледжа' }];

const { data: newsItems, error } = await useFetch<NewsItem[]>('/news', {
	baseURL: useRuntimeConfig().public.backendUrl,
});
</script>
