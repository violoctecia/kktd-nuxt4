<template>
	<SiteHeader />
	<NuxtLayout>
	 <NuxtPage />
	</NuxtLayout>
				<SiteFooter/> 
 </template>
 

<script setup lang="ts">
import SiteHeader from '~/components/SiteHeader.vue';
import SiteFooter from '~/components/SiteFooter.vue';
</script>
