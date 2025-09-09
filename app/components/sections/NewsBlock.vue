<template>
	<section class="container pt-8 md:pt-16">
		<h2 class="h2" v-if="heading">{{ heading }}</h2>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-8 lg:grid-cols-3">
			<MainCard
				v-for="item in items"
				:key="item.alt"
				:img-src="item.img"
				:img-alt="item.alt"
				:href-text="item.title"
				:href="item.href"
			>
				<template #before-title>
					<div class="mb-3 flex flex-wrap items-center gap-2">
						<p class="text-sm text-primary">{{ item.date }}</p>
						<div v-if="item.categories" class="flex items-center gap-2">
							<span class="rounded-full bg-background px-2 py-1 text-xs" v-for="ctg in item.categories" :key="ctg">
								{{ ctg }}
							</span>
						</div>
					</div>
				</template>
				<template #content>
					<div class="mb-4 flex items-start justify-between group-hover:text-primary md:h-[72px]">
						<h3 class="max-w-[calc(100%-40px)] text-base font-bold leading-5 md:line-clamp-3 md:text-lg md:leading-6">
							{{ item.title }}
						</h3>
						<icon-sprite class="mt-[2px] aspect-square min-w-6 max-w-6" name="arrow-right-short" />
					</div>
					<p class="mt-auto text-sm leading-4 text-black/80 md:text-base md:leading-5">{{ item.text }}</p>
				</template>
			</MainCard>
		</div>
	</section>
</template>

<script setup lang="ts">
import IconSprite from '~/components/IconSprite.vue';
import MainCard from '~/components/ui/MainCard.vue';

interface NewItem {
	img: string;
	alt: string;
	date: string;
	title: string;
	text: string;
	href: string;
	categories?: string[];
}

defineProps<{ items: NewItem[]; heading?: string }>();
</script>

<style scoped></style>
