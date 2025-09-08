// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['@nuxt/eslint', 'nuxt-svg-sprite-icon', '@nuxt/image', '@nuxtjs/tailwindcss'],

	css: ['@/assets/styles/main.scss'],

	svgSprite: {
		input: '~/assets/svg/optimized',
		output: '~/assets/svg/sprite',
	},

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "@/assets/styles/_vars.scss" as *;',
					silenceDeprecations: ['import'],
				},
			},
		},
	},

	app: {
		rootId: 'violoctecia',
		buildAssetsDir: '/violoctecia/',
		head: {
			htmlAttrs: { lang: 'ru' },
			meta: [
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
				},
			],
		},
		pageTransition: { name: 'page', mode: 'out-in' },
	},

	experimental: {
		defaults: {
			nuxtLink: {
				externalRelAttribute: 'noopener noreferrer',
				prefetch: false,
				prefetchOn: { interaction: true },
				trailingSlash: 'remove',
			},
		},
	},

	// performance optimizations
	$production: {
		sourcemap: false,
		experimental: {
			payloadExtraction: false, // faster builds
		},

		// production nitro optimizations
		nitro: {
			minify: true,
		},
	},
	hooks: {
		'build:manifest': (manifest) => {
			for (const key in manifest) {
				const file = manifest[key];
				file!.preload = false;
				file!.prefetch = false;
			}
		},
	},
});
