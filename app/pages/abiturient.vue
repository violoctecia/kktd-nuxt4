<script setup lang="ts">
import AdmissionPlan from '~/components/sections/AdmissionPlan.vue';
import DocumentSubmission from '~/components/sections/DocumentSubmission.vue';
</script>

<template>
	<div class="container mx-auto py-6">
		<DocumentSubmission />
		<AdmissionPlan />
	</div>
</template>

<style scoped>
.container {
	max-width: 1000px;
}
</style>
