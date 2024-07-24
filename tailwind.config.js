/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const hocusPlugin = require('tailwindcss-hocus')
import colors from 'tailwindcss/colors';

module.exports = {
	content: [
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./utils/**/*.{js,ts,jsx,tsx,mdx}',
		'./ui/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./blog/**/*.mdx',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: colors.blue,
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
						light: '#ddf0fd80',
						dark: '#1a2b4ba6',
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
			backgroundImage: {
				'body-gradient': 'linear-gradient(to right bottom, #ffedf650, #fcecf850, #f8ecfb50, #f3ecfd50, #edecfe50, #e8efff, #e4f2ff, #e2f4fd, #e6f8fa, #eefbf7, #f7fdf8, #fefffb)',
				'body-gradient-inverted': 'linear-gradient(to right bottom, #091122, #091120, #0a101d, #0a101b, #0a0f19, #0a0f18, #0b0f17, #0b0f16, #0c1016, #0d1115, #0f1115, #101214)'
			},
			dropShadow: {
				doodle: ['-4px -4px 2px #c0b4f0', '4px 4px 2px #c0b4f0', '4px -4px 2px #c0b4f0', '-4px 4px 2px #c0b4f0'],
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
			keyframes: {},
			animation: {},
		},
	},
	plugins: [hocusPlugin, require('@tailwindcss/typography')],
}
