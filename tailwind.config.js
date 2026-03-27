/** @type {import('tailwindcss').Config} */
const hocusPlugin = require('tailwindcss-hocus');

import colors from 'tailwindcss/colors';

module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}', './blog/**/*.mdx'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: colors.blue,
				bg: {
					default: '#ffffff',
					muted: '#f5f7fb',
				},
				text: {
					default: '#0f172a',
					muted: '#475569',
					light: '#EBF0FED9',
					dark: '#091122d9',
				},
				border: {
					default: '#dbe2ee',
					nav: {
						dark: '#2867d61f',
						light: '#afc2ef1f',
					},
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
			},
			boxShadow: {
				light: '',
				dark: '0px 0px 8px 2px rgba(56, 103, 214, 0.16)',
			},
			backgroundImage: {
				'body-gradient':
					'linear-gradient(to right bottom, #ffedf650, #fcecf850, #f8ecfb50, #f3ecfd50, #edecfe50, #e8efff, #e4f2ff, #e2f4fd, #e6f8fa, #eefbf7, #f7fdf8, #fefffb)',
				'body-gradient-inverted':
					'linear-gradient(to right bottom, #091122, #091120, #0a101d, #0a101b, #0a0f19, #0a0f18, #0b0f17, #0b0f16, #0c1016, #0d1115, #0f1115, #101214)',
			},
			dropShadow: {
				doodle: ['-4px -4px 2px #c0b4f0', '4px 4px 2px #c0b4f0', '4px -4px 2px #c0b4f0', '-4px 4px 2px #c0b4f0'],
			},
			screens: {
				laptop: '640px',
			},
			maxWidth: {
				laptop: '700px',
				reading: '760px',
				'reading-content': '720px',
			},
			fontFamily: {
				sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
				mono: ['var(--font-dm-mono)', 'ui-monospace', 'monospace'],
			},
			fontSize: {
				display: ['2.25rem', { lineHeight: '1.1' }],
				h1: ['2rem', { lineHeight: '1.2' }],
				h2: ['1.375rem', { lineHeight: '1.3' }],
				'body-lg': ['1.125rem', { lineHeight: '1.7' }],
				body: ['1rem', { lineHeight: '1.7' }],
				meta: ['0.875rem', { lineHeight: '1.5' }],
			},
			keyframes: {},
			animation: {},
		},
	},
	plugins: [hocusPlugin, require('@tailwindcss/typography')],
};
