<script setup lang="ts">
import AdmissionPlan from '@/components/sections/AdmissionPlan.vue';
import DocumentSubmission from '@/components/sections/DocumentSubmission.vue';
import SiteBreadcrumbs from '~/components/SiteBreadcrumbs.vue';

const breadcrumbs = [{ label: 'Главная', href: '/' }, { label: 'Абитуриенту' }];
</script>

<template>
	<div class="container">
		<SiteBreadcrumbs :items="breadcrumbs" />
		<h1 class="h1">Информация для абитуриентов</h1>
		<DocumentSubmission class="mb-12" />
		<AdmissionPlan />
	</div>
</template>
