<template>
	<button :type="type ? type : 'button'" class="main-btn" v-if="!href">
		<slot></slot>
	</button>
	<nuxt-link class="main-btn" v-else :to="href">
		<slot></slot>
	</nuxt-link>
</template>

<script setup lang="ts">
defineProps<{
	href?: string;
	type?: 'button' | 'submit';
}>();
</script>

<style>
.main-btn {
	@apply flex gap-2 whitespace-nowrap rounded-lg bg-secondary px-4 py-2 text-base text-background transition-all duration-200 hover:bg-primaryLight/80;
}
</style>
