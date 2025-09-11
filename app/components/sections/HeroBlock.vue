<template>
	<section class="relative h-[80vh] min-h-[500px] overflow-hidden">
		<div class="bg-primary-dark/70 absolute inset-0 z-0"></div>

		<div
			v-for="(slide, index) in slides"
			:key="index"
			class="absolute inset-0 transition-opacity duration-1000"
			:class="index === currentSlide ? 'z-10 opacity-100' : 'z-0 opacity-0'"
			:style="{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
		></div>

		<div class="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center text-white">
			<h1 class="mb-4 text-3xl font-bold md:text-5xl">{{ slides[currentSlide]?.title }}</h1>
			<p class="mb-6 max-w-xl text-lg md:text-xl">{{ slides[currentSlide]?.subtitle }}</p>

			<MainButton href="/#programs">Узнать больше</MainButton>
		</div>

		<button
			@click="prevSlide"
			class="absolute left-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-white/30 text-white hover:bg-white/70"
		>
			‹
		</button>
		<button
			@click="nextSlide"
			class="absolute right-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-white/30 text-white hover:bg-white/70"
		>
			›
		</button>

		<div class="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 transform gap-2">
			<span
				v-for="(slide, index) in slides"
				:key="index"
				@click="goToSlide(index)"
				:class="index === currentSlide ? 'h-4 w-4 rounded-full bg-white' : 'h-3 w-3 cursor-pointer rounded-full bg-white/50'"
			></span>
		</div>
	</section>
</template>

<script lang="ts" setup>
import MainButton from '~/components/ui/MainButton.vue';

interface Slide {
	image: string;
	title: string;
	subtitle: string;
}

const slides = ref<Slide[]>([
	{
		image: '/img/programmer.webp',
		title: 'Стань востребованным специалистом',
		subtitle: 'Практико-ориентированное обучение современным технологиям и отраслям мануфактуры',
	},
	{
		image: '/img/collage.webp',
		title: 'Развивай свои навыки',
		subtitle: 'Учись у экспертов и создавай реальные проекты',
	},
]);

const currentSlide = ref(0);
let intervalId: number | undefined;

const nextSlide = () => {
	if (!slides.value.length) return;
	currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

const prevSlide = () => {
	if (!slides.value.length) return;
	currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
};

const goToSlide = (index: number) => {
	if (!slides.value.length) return;
	currentSlide.value = index;
};

onMounted(() => {
	intervalId = window.setInterval(nextSlide, 5000);
});

onUnmounted(() => {
	clearInterval(intervalId);
});
</script>
