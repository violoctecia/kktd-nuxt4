<template>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-8 lg:grid-cols-3">
		<MainCard
			v-for="item in items"
			:key="item.alt"
			:img-src="item.img"
			:img-alt="item.alt"
			:href-text="item.title"
			:href="item.href"
			:title="item.title"
			:card-title-tag="tag"
		>
			<template #before-title>
				<div class="mb-3 flex flex-wrap items-center gap-2">
					<time class="text-sm text-primary" :datetime="toISODate(item.date)" itemprop="datePublished">
						{{ item.date }}
					</time>
					<div v-if="item.categories" class="flex items-center gap-2">
						<span class="rounded-full bg-background px-2 py-1 text-xs" v-for="ctg in item.categories" :key="ctg">
							{{ ctg }}
						</span>
					</div>
				</div>
			</template>
			<template #content>
				<p class="mt-auto text-sm leading-4 text-black/80 md:text-base md:leading-5" itemprop="description">
					{{ item.text }}
				</p>
			</template>
		</MainCard>
	</div>
</template>

<script setup lang="ts">
import type { titleTag } from '#shared/types';
import MainCard from '~/components/ui/MainCard.vue';
import { toISODate } from '~/utils/toISODate';

interface NewItem {
	img: string;
	alt: string;
	date: string;
	title: string;
	text: string;
	href: string;
	categories?: string[];
}

defineProps<{ items: NewItem[]; tag: titleTag }>();
</script>

<style scoped></style>
