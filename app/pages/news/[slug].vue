<template>
	<main v-if="currentArticle">
		<SiteBreadcrumbs :items="breadcrumbs" />
		<article class="container__sm overflow-hidden" itemscope itemtype="https://schema.org/Article">
			<div class="flex flex-wrap items-center gap-x-4 gap-y-2">
				<time class="text-sm text-primary" :datetime="currentArticle.isoDate" itemprop="datePublished">
					{{ currentArticle.date }}
				</time>
				<meta itemprop="dateModified" :content="currentArticle.isoDate" />
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
				<div itemscope itemtype="https://schema.org/ImageObject" itemprop="image">
					<meta itemprop="url" :content="currentArticle.img" />
					<meta itemprop="width" content="1500" />
					<meta itemprop="height" content="750" />
					<nuxt-img
						:src="currentArticle.img"
						:alt="currentArticle.alt"
						preload
						width="1500"
						height="750"
						class="mb-2 aspect-[2/1] rounded-lg"
						format="webp"
					/>
				</div>

				<div class="news-content" v-html="currentArticle.content"></div>
				<meta itemprop="author" content="Казанский Колледж Технологии и Дизайна" />
				<meta itemprop="publisher" content="Казанский Колледж Технологии и Дизайна" />
			</div>
		</article>
		<NewsBlock class="mt-8 md:mt-16" :limit="3" h2="Другие новости" />
	</main>
</template>

<script setup lang="ts">
import type { NewsItem } from '#shared/types';
import SiteBreadcrumbs from '~/components/SiteBreadcrumbs.vue';
import NewsBlock from '~/components/sections/NewsBlock.vue';

const route = useRoute();
const { slug } = route.params as { slug: string };

const { data: currentArticle, error } = await useFetch<Omit<NewsItem, 'text'>>(`/api/news/${slug}`);
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

<style lang="scss">
.news-content {
	@apply flex flex-col;
	h2 {
		@apply mb-4 mt-8 text-2xl font-medium md:text-3xl;
	}

	h3 {
		@apply mb-4 mt-8 text-xl font-medium md:text-2xl;
	}

	h4 {
		@apply mb-4 mt-8 text-lg font-medium md:text-xl;
	}

	h5 {
		@apply mb-4 mt-8 text-base font-medium md:text-lg;
	}

	p {
		@apply mb-2 text-base;
	}
}
</style>
