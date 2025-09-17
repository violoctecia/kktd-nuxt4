<template>
	<div class="admin-page">
		<aside class="aside">
			<nuxt-link to="/admin" class="flex px-6 py-2 text-lg font-medium hover:text-blue-500">Разделы</nuxt-link>
			<ul class="flex flex-col">
				<li v-for="item in navItems" :key="item.name">
					<nuxt-link class="flex rounded px-6 py-1 text-stone-500 hover:text-blue-500" :to="item.url">
						{{ item.name }}
					</nuxt-link>
				</li>
			</ul>
		</aside>
		<div class="admin-page__content">
			<slot></slot>
		</div>
	</div>
</template>
<script setup lang="ts">
import '~/assets/styles/admin.scss';

const navItems = [
	{ name: 'Новости', url: '/admin/news' },
	{ name: 'Вопросы и ответы', url: '/admin/faq' },
	{ name: 'О колледже', url: '/admin/about' },
];
</script>
