<template>
	<div class="group relative overflow-hidden rounded-lg bg-white/90">
		<div class="aspect-[2/1] overflow-hidden">
			<nuxt-img
				class="w-full transition-all duration-700 group-hover:scale-105"
				:src="imgSrc"
				:alt="imgAlt ? imgAlt : ''"
				loading="lazy"
				:placeholder="[400, 200, 75, 5]"
				width="400"
				height="200"
				format="webp"
			/>
		</div>
		<div class="flex flex-col p-4">
			<slot name="before-title"></slot>
			<div v-if="title" class="mb-4 flex items-start justify-between gap-2 group-hover:text-primary md:h-[72px]">
				<h3 class="text-base font-bold leading-5 md:line-clamp-3 md:text-lg md:leading-6">
					{{ title }}
				</h3>
				<icon-sprite class="mt-[2px] aspect-square min-w-6 max-w-6" name="arrow-right-short" />
			</div>
			<slot name="content"></slot>
		</div>
		<nuxt-link v-if="href && hrefText" :to="href" class="absolute inset-0 z-10" :aria-label="hrefText" :title="hrefText" />
	</div>
</template>

<script setup lang="ts">
import IconSprite from '~/components/IconSprite.vue';

defineProps<{
	href?: string;
	hrefText?: string;
	imgSrc: string;
	imgAlt?: string;
	title?: string;
}>();
</script>

<style scoped></style>
