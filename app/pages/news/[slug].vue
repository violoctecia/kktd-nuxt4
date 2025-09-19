<template>
	<div v-if="currentArticle">
		<div class="container">
			<SiteBreadcrumbs :items="breadcrumbs" />
		</div>
		<article class="container__sm overflow-hidden" itemscope itemtype="https://schema.org/Article">
			<div class="flex flex-wrap items-center gap-x-4 gap-y-2">
				<time class="text-sm text-primary" :datetime="currentArticle.iso_date" itemprop="datePublished">
					{{ currentArticle.date }}
				</time>
				<meta itemprop="dateModified" :content="currentArticle.iso_date" />
				<ul v-if="currentArticle.categories" class="flex items-center gap-2">
					<li
						class="rounded-full bg-primary/70 px-2 py-1 text-xs text-background"
						v-for="ctg in currentArticle.categories"
						:key="ctg"
					>
						{{ ctg }}
					</li>
				</ul>
			</div>
			<header class="mt-6">
				<meta itemprop="headline" :content="currentArticle.title" />
				<h1 class="h1">{{ currentArticle.title }}</h1>
			</header>
			<div itemprop="articleBody">
				<div
					class="mb-4 aspect-[2/1] overflow-hidden rounded-md"
					itemscope
					itemtype="https://schema.org/ImageObject"
					itemprop="image"
				>
					<meta itemprop="url" :content="currentArticle.img" />
					<meta itemprop="width" content="1500" />
					<meta itemprop="height" content="750" />
					<nuxt-img :src="currentArticle.img" :alt="currentArticle.alt" preload width="1500" height="750" format="webp" />
				</div>

				<div class="html-content" v-html="currentArticle.content"></div>
				<meta itemprop="author" content="Казанский Колледж Технологии и Дизайна" />
				<meta itemprop="publisher" content="Казанский Колледж Технологии и Дизайна" />
			</div>
		</article>
		<div class="container">
			<NewsBlock class="mt-8 md:mt-12" :limit="3" h2="Другие новости" />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { NewsItem } from '#shared/types';
import SiteBreadcrumbs from '~/components/SiteBreadcrumbs.vue';
import NewsBlock from '~/components/sections/NewsBlock.vue';

const route = useRoute();
const { slug } = route.params as { slug: string };

const { data: currentArticle, error } = await useFetch<Omit<NewsItem, 'text'>>(`/news/${slug}`, {
	baseURL: useRuntimeConfig().public.backendUrl,
});
if (error.value) {
	throw createError({});
}

const breadcrumbs = [
	{ label: 'Главная', href: '/' },
	{
		label: 'Новости колледжа',
		href: '/news',
	},
	{ label: currentArticle.value!.title },
];

useHead({
	title: 'Новости | Казанский Колледж Технологии и Дизайна | Профессиональное образование',
});
</script>
