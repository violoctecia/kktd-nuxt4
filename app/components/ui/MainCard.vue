<template>
	<article class="group relative overflow-hidden rounded-lg bg-[#f6f6f6]" itemscope itemtype="https://schema.org/NewsArticle">
		<div class="aspect-[2/1] overflow-hidden">
			<nuxt-img
				class="w-full transition-all duration-700 group-hover:scale-105"
				:src="imgSrc"
				:alt="imgAlt"
				loading="lazy"
				:placeholder="[400, 200, 75, 5]"
				width="400"
				height="200"
				format="webp"
				itemprop="image"
			/>
		</div>
		<div class="flex flex-col p-4">
			<slot name="before-title"></slot>

			<div class="mb-4 flex cursor-pointer items-start justify-between gap-2 group-hover:text-primary md:h-[72px]">
				<component
					:is="cardTitleTag"
					class="relative z-20 text-base font-medium leading-5 md:line-clamp-3 md:text-lg md:leading-6"
					:title="hrefText"
				>
					<nuxt-link :to="href">{{ title }}</nuxt-link>
				</component>

				<icon-sprite class="mt-[2px] aspect-square min-w-6 max-w-6" name="arrow-right-short" />
			</div>

			<slot name="content"></slot>
		</div>
		<nuxt-link v-if="!disableLink" :to="href" class="absolute inset-0 z-10" :aria-label="hrefText" />
	</article>
</template>

<script setup lang="ts">
import type { titleTag } from '#shared/types';
import IconSprite from '~/components/IconSprite.vue';

defineProps<{
	href: string;
	hrefText: string;
	imgSrc: string;
	imgAlt: string;
	title: string;
	cardTitleTag: titleTag;
	disableLink?: boolean;
}>();
</script>
