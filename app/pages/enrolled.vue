<script setup lang="ts">
import Enrolled from '@/components/sections/Enrolled.vue';
import SiteBreadcrumbs from '~/components/SiteBreadcrumbs.vue';

const breadcrumbs = [{ label: 'Главная', href: '/' }, { label: 'Зачисленные студенты' }];
</script>

<template>
	<div class="container">
		<SiteBreadcrumbs :items="breadcrumbs" />
		<Enrolled />
	</div>
</template>
