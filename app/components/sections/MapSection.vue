<script setup lang="ts"></script>

<template>
	<section class="map-section container mx-auto px-4 py-12">
		<h2 class="section-title mb-8 text-center text-2xl font-bold">Мы находимся</h2>

		<div class="map-container relative h-[450px] w-full overflow-hidden rounded-xl shadow-lg">
			<iframe
				src="https://yandex.ru/map-widget/v1/?um=constructor%3A3797feff6d0d8a47c67a802f2b41ef696b66772ef27260be78aa07e559af3395&amp;source=constructor"
				width="100%"
				height="100%"
				frameborder="0"
				allowfullscreen
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
				title="Карта расположения Казанского Колледжа Технологии и Дизайна"
				class="absolute inset-0 h-full w-full"
			></iframe>
		</div>
	</section>
</template>

<style scoped>
.map-container iframe {
	border: none;
}
</style>
