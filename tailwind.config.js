/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const hocusPlugin = require('tailwindcss-hocus')

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				text: {
					light: '#EBF0FED9',
					dark: '#091122d9',
				},
				heading: {
					light: '#fff',
					dark: '#000',
				},
				background: {
					primary: {
						light: '#FFF',
						dark: '#0c121e',
					},
					nav: {
						light: '#c1d8e7',
						dark: '#121b2ca6',
					},
					button: {
						hover: {
							light: '#2d52ab1a',
							dark: '#afc2ef1a',
						},
					},
				},
				button: {},
				border: {
					nav: {
						dark: '#2867d61f',
						light: '#afc2ef1f',
					},
				},
			},
			boxShadow: {
				light: '',
				dark: '0px 0px 8px 2px rgba(56, 103, 214, 0.16)',
			},
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
				wave: {
					'from, 50%, to': { transform: 'rotate(0deg)' },
					'10%, 30%': { transform: 'rotate(-10deg)' },
					'20%': { transform: 'rotate(12deg)' },
					'40%': { transform: 'rotate(9deg)' },
				},
			},
			animation: {
				'page-transition': 'page-transition 300ms ease-in-out backwards',
				scroll: 'scroll 15s linear infinite',
				wave: 'wave 2.5s infinite',
			},
		},
	},
	plugins: [hocusPlugin],
}
