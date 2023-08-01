/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Open Sans', 'sans-serif'],
			},
			screens: {
				xs: '440px',
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px',
				'3xl': '1700px',
				'4xl': '1920px',
			},
			colors: {
				dark: {
					0: 'var(--color-dark-0)',
					10: 'var(--color-dark-10)',
					30: 'var(--color-dark-30)',
					40: 'var(--color-dark-40)',
					60: 'var(--color-dark-60)',
					80: 'var(--color-dark-80)',
					100: 'var(--color-dark-100)',
				},
				white: 'var(--color-white)',
				black: 'var(--color-black)',
				yellow: 'var(--color-yellow)',
				gray: 'var(--color-gray)',
				blue: 'var(--color-blue)',
				sky: 'var(--color-sky)',
				alert: {
					success: 'var(--color-alert-success)',
					error: 'var(--color-alert-error)',
				},
				transparent: 'rgba(0, 0, 0, 0)',
			},
		},
	},
	plugins: [],
};
