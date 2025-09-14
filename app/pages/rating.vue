<script setup lang="ts">
import Rating from '@/components/sections/Rating.vue';
import SiteBreadcrumbs from '~/components/SiteBreadcrumbs.vue';

const breadcrumbs = [{ label: 'Главная', href: '/' }, { label: 'Рейтинг абитуриентов' }];
</script>

<template>
	<div class="container">
		<SiteBreadcrumbs :items="breadcrumbs" />
		<Rating />
	</div>
</template>

<style scoped>
.container {
	max-width: 1200px;
}
</style>
