/** @type {import('tailwindcss').Config} */
export default {
	content: [],
	theme: {
		extend: {
			colors: {
				primary: '#0e75c5',
				primaryDark: '#012e51',
				primaryLight: '#89ccff',
				secondary: '#355772',
				background: '#fff',
				black: '#0b0b0b',
			},
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui'],
			},
		},
		screens: {
			xs: '376px',
			sm: '640px', // Small (>= 640px)
			md: '768px', // Medium (>= 768px)
			lg: '1024px', // Large (>= 1024px)
			xl: '1280px', // Extra Large (>= 1280px)
			'2xl': '1536px', // 2X Extra Large (>= 1536px)
		},
	},
	plugins: [],
	future: {
		hoverOnlyWhenSupported: true,
	},
};
