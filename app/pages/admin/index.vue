<script setup lang="ts">
definePageMeta({
	layout: 'admin',
});
</script>

<template>
	<div>
		<h1>Административная панель</h1>
		<p>Добро пожаловать в административную панель сайта Казанского Колледжа Технологии и Дизайна</p>
		<p>Управлять сайтом можно через вкладки в боковом меню</p>
		<nuxt-link to="/" type="button" class="admin-btn mt-12 flex w-fit">Вернуться на сайт</nuxt-link>
	</div>
</template>

<style scoped lang="scss"></style>
