<template>
	<div class="container">
		<SiteBreadcrumbs :items="breadcrumbs" />
		<section>
			<h1 class="h1">Новости колледжа</h1>
			<!--TODO: сортировака по категориям	-->
			<NewsList v-if="newsItems" :items="newsItems" tag="h2" />
			<p v-else>Новостей пока нет</p>
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

const { data: newsItems } = await useFetch<NewsItem[]>('/api/news');
</script>
