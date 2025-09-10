<template>
	<SiteHeader />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
	<SiteFooter />
</template>

<script setup lang="ts">
import SiteFooter from '~/components/SiteFooter.vue';
import SiteHeader from '~/components/SiteHeader.vue';
</script>
