<template>
	<header class="sticky top-0 z-50 bg-primaryDark text-background">
		<div class="container flex items-center justify-between gap-4 py-4">
			<div class="logo flex items-center gap-4">
				<nuxt-link to="/" class="flex">
					<nuxt-img preload class="h-[32px] min-w-[82px]" width="82" height="32" src="/img/logo.webp" alt="Казанский Колледж Технологии и Дизайна" />
				</nuxt-link>
				<div class="hidden flex-col lg:flex">
					<h1 class="text-lg font-bold leading-4">Казанский Колледж Технологии и Дизайна</h1>
					<p class="text-sm">Профессиональное образование в сфере IT и мануфактуры</p>
				</div>
			</div>

			<nav class="hidden items-center md:flex">
				<ul class="flex items-center">
					<li v-for="i in navItems" :key="i.label" class="flex">
						<nuxt-link class="whitespace-nowrap rounded-lg px-2 py-2 text-base hover:bg-primaryLight/10" v-if="i.href" :href="i.href">{{ i.label }}</nuxt-link>
						<MainButton class="ml-2" v-else>{{ i.label }}</MainButton>
					</li>
				</ul>
			</nav>

			<button @click="isMenuToggled = !isMenuToggled" class="burger-icon flex md:hidden" :class="{ open: isMenuToggled }">
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
	</header>
</template>

<script setup lang="ts">
import MainButton from '~/components/ui/MainButton.vue';

const isMenuToggled = ref(false);

const navItems = [
	{ label: 'О колледже', href: '/#about' },
	{ label: 'Программы', href: '/#programs' },
	{ label: 'Новости', href: '/news' },
	{ label: 'FAQ', href: '/faq' },
	{ label: 'Контакты', href: '/#contacts' },
	{ label: 'Подать заявку' },
];
</script>

<style scoped lang="scss">
.burger-icon {
	width: 32px;
	height: 24px;
	flex-direction: column;
	justify-content: space-between;

	span {
		background: $background;
		height: 3px;
		border-radius: 2px;
		transition: all 0.2s;
	}

	&.open {
		span:nth-child(1) {
			transform: translateY(9px) rotate(45deg);
		}

		span:nth-child(2) {
			opacity: 0;
		}

		span:nth-child(3) {
			transform: translateY(-12px) rotate(-45deg);
		}
	}
}
</style>
