/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const hocusPlugin = require('tailwindcss-hocus')

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			screens: {
				laptop: '600px',
			},
			maxWidth: {
				laptop: '700px',
			},
			fontFamily: {
				sans: ['var(--font-man)'],
			},
			keyframes: {
				'page-transition': {
					'0%': { transform: 'scale(0.975)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				scroll: {
					'0%': { transform: 'translateX(1.5rem)' },
					'100%': { transform: 'translateX(-100%)' },
				},
				// wave: {
				// 	'from, 50%, to': { transform: 'rotate(0deg)' },
				// 	'10%, 30%': { transform: 'rotate(-10deg)' },
				// 	'20%': { transform: 'rotate(12deg)' },
				// 	'40%': { transform: 'rotate(9deg)' },
				// },
			},
			animation: {
				'page-transition': 'page-transition 300ms ease-in-out backwards',
				scroll: 'scroll 15s linear infinite',
				// wave: 'wave 2.5s infinite',
			},
		},
	},
	plugins: [hocusPlugin],
}
