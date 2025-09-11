<script setup lang="ts">
import MainButton from '~/components/ui/MainButton.vue';

import type { NuxtError } from '#app';

const props = defineProps({
	error: Object as () => NuxtError,
});

const error = props.error;
</script>

<template>
	<div class="bg-[#0E0E10] text-background">
		<div class="container flex min-h-screen flex-col items-center justify-center">
			<template v-if="error && error.statusCode === 404">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 82.7" class="mb-8 h-auto w-full max-w-[500px] text-primary">
					<g fill="currentColor" font-family="Arial, sans-serif" font-size="83">
						<text transform="matrix(1.2187 0 0 1 13 75.64)">4</text>
						<text transform="matrix(1.2187 0 0 1 133 73.64)">4</text>
					</g>
					<g>
						<path
							fill="currentColor"
							d="M81.8 29.2c4.1-5.7 10.7-9.4 18.3-9.4 6.3 0 12.1 2.7 16.1 6.9.6-.4 1.1-.7 1.7-1.1-4.4-4.8-10.8-7.9-17.8-7.9-8.3 0-15.6 4.2-20 10.6.6.2 1.2.5 1.7.9M118.1 53.7c-4 5.7-10.7 9.5-18.2 9.5-6.3 0-12.1-2.6-16.2-6.8-.6.4-1.1.7-1.7 1.1 4.4 4.8 10.8 7.8 17.9 7.8 8.3 0 15.6-4.3 19.9-10.7-.6-.1-1.2-.5-1.7-.9"
						/>
						<animateTransform
							attributeName="transform"
							dur="10s"
							from="360 100 41.3"
							repeatCount="indefinite"
							to="0 100 41.3"
							type="rotate"
						/>
					</g>
					<circle cx="100" cy="41" r="2" fill="currentColor">
						<animate attributeName="r" dur="2s" repeatCount="indefinite" values="2;8;2" />
						<animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="1;0;1" />
					</circle>
					<path
						fill="currentColor"
						d="M103.8 16.7c.1.3.1.6.1.9 11.6 1.9 20.4 11.9 20.4 24.1 0 13.5-10.9 24.4-24.4 24.4s-24.3-11-24.3-24.4c0-3.2.6-6.3 1.7-9.1-.3-.2-.5-.3-.7-.5-1.2 3-1.9 6.2-1.9 9.6C74.7 55.7 86 67 100 67s25.3-11.3 25.3-25.3c0-12.7-9.4-23.2-21.5-25"
						filter="url(#a)"
					/>
					<defs>
						<filter id="a" width="200" height="200" x="-20" y="-20">
							<feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
						</filter>
					</defs>
				</svg>
				<p>Страница не найдена</p>
			</template>
			<p v-else>Кажется произошла какая-то ошибка</p>
			<MainButton class="mt-8 md:mt-16" href="/">На главную</MainButton>
		</div>
	</div>
</template>
