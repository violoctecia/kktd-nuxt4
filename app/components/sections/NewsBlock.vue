<template>
	<section class="container py-16 md:py-24">
		<div class="mb-8 flex items-start justify-between md:mb-12">
			<h2 class="h2 !m-0">{{ h2 }}</h2>
			<nuxt-link to="/news" class="hidden h-full items-center gap-2 pt-1 text-black/50 hover:text-primary sm:flex">
				<span class="text-base">Все новости</span>
				<IconSprite name="arrow-right" class="h-6 w-6" />
			</nuxt-link>
		</div>
		<template v-if="newsItems">
			<NewsList :items="newsItems" tag="h3" />
		</template>
		<p v-else>Новостей пока нет</p>
		<MainButton href="/news" class="mx-auto mt-8 w-fit sm:!hidden">
			Все новости
			<IconSprite name="arrow-right" class="h-6 w-6" />
		</MainButton>
	</section>
</template>

<script setup lang="ts">
import type { NewsItem } from '#shared/types';
import IconSprite from '~/components/IconSprite.vue';
import NewsList from '~/components/sections/NewsList.vue';
import MainButton from '~/components/ui/MainButton.vue';

const props = defineProps<{
	limit: number;
	h2: string;
}>();

const { data } = await useFetch<NewsItem[]>(`/news`, {
	baseURL: useRuntimeConfig().public.backendUrl,
});
// лимит вынести на бэк
const newsItems = data.value?.slice(0, props.limit);
</script>

<style scoped></style>
