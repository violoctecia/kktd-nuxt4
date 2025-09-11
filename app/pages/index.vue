<template>
	<main>
		<HeroBlock />
		<NewsBlock :limit="3" h2="Новости и события" />
		<AboutBlock />
		<OurAdvantages />
		<OurPrograms />
		<!-- TODO: блок с контактами + карта -->
	</main>
</template>

<script setup lang="ts">
import AboutBlock from '~/components/sections/AboutBlock.vue';
import HeroBlock from '~/components/sections/HeroBlock.vue';
import NewsBlock from '~/components/sections/NewsBlock.vue';
import OurAdvantages from '~/components/sections/OurAdvantages.vue';
import OurPrograms from '~/components/sections/OurPrograms.vue';

useHead({
	title: 'Казанский Колледж Технологии и Дизайна | Профессиональное образование',
});
</script>
