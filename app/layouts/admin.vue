<template>
	<div class="admin-page flex min-h-screen flex-row gap-8 bg-gray-50 p-6 text-stone-700">
		<aside class="min-w-64 rounded bg-gray-200 py-4">
			<nuxt-link to="/admin" class="flex px-6 py-2 text-lg font-medium hover:text-blue-500">Разделы</nuxt-link>
			<ul class="flex flex-col">
				<li v-for="item in navItems" :key="item.name">
					<nuxt-link class="flex rounded px-6 py-1 text-stone-500 hover:text-blue-500" :to="item.url">
						{{ item.name }}
					</nuxt-link>
				</li>
			</ul>
		</aside>
		<div class="w-full">
			<slot></slot>
		</div>
	</div>
</template>
<script setup lang="ts">
const navItems = [
	{ name: 'Новости', url: '/admin/news' },
	{ name: 'Вопросы и ответы', url: '/admin/faq' },
	{ name: 'О колледже', url: '/admin/about' },
];
</script>
<style lang="scss">
.admin-page {
	h1 {
		@apply mb-8 text-3xl font-medium;
	}

	h2 {
		@apply mb-6 text-xl font-medium;
	}

	.admin-btn {
		@apply flex items-center justify-center rounded bg-blue-500 px-4 py-2 text-center text-white transition-colors duration-200 hover:bg-blue-600;
	}
}

aside {
	.router-link-exact-active {
		@apply text-blue-900;
	}
}
</style>
