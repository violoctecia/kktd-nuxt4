<template>
	<div class="admin-wrapper">
		<aside class="aside">
			<nuxt-link v-for="item in navItems" :key="item.name" :to="item.url">
				{{ item.name }}
			</nuxt-link>
		</aside>
		<div class="page">
			<slot></slot>
		</div>
	</div>
</template>
<script setup lang="ts">
import '~/assets/styles/admin.scss';

const navItems = [
	{ name: 'Главная', url: '/admin' },
	{ name: 'Новости', url: '/admin/news' },
	{ name: 'Вопросы и ответы', url: '/admin/faq' },
	{ name: 'О колледже', url: '/admin/about' },
	{ name: 'Специальности', url: '/admin/specialties' },
	{ name: 'Планы приема', url: '/admin/admission-plan' },
	{ name: 'Абитуриенты', url: '/admin/abiturient' },
];
</script>
