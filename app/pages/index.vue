<template>
	<div>
		<HeroBlock />
		<NewsBlock :limit="3" h2="Новости и события" />
		<OurPrograms class="mb-12 md:mb-24" />
		<OurAdvantages class="mb-12 md:mb-24" />
		<AboutBlock class="mb-12 md:mb-24" />
		<MapSection />
	</div>
</template>

<script setup lang="ts">
import AboutBlock from '~/components/sections/AboutBlock.vue';
import HeroBlock from '~/components/sections/HeroBlock.vue';
import NewsBlock from '~/components/sections/NewsBlock.vue';
import OurAdvantages from '~/components/sections/OurAdvantages.vue';
import OurPrograms from '~/components/sections/OurPrograms.vue';
import MapSection from '../components/sections/MapSection.vue';

useHead({
	title: 'Казанский Колледж Технологии и Дизайна | Профессиональное образование',
});
</script>
