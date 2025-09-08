<template>
	<main>
		<AboutBlock />
		<OurPrograms />
	</main>
</template>

<script setup lang="ts">
import AboutBlock from '~/components/sections/AboutBlock.vue';
import OurPrograms from '~/components/sections/OurPrograms.vue';

useHead({
	title: 'Казанский Колледж Технологии и Дизайна | Профессиональное образование',
});
</script>
