<script setup lang="ts">
definePageMeta({
	layout: 'admin',
});
</script>

<template>
	<h1>Административная панель</h1>
</template>

<style scoped lang="scss">
.admin-wrapper {
	@apply p-8;

	.btn {
		@apply flex w-fit items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-center text-white transition-colors duration-200 hover:bg-blue-600;
	}
}
</style>
