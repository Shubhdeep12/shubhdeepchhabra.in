import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Shubhdeep Chhabra - Software Engineer',
		short_name: 'Shubhdeep',
		description:
			'Product-focused Software Engineer writing about software engineering, architecture, and practical product lessons.',
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#000000',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon',
			},
			{
				src: '/apple-touch-icon.png',
				sizes: '192x192',
				type: 'image/png',
			},
		],
		categories: ['software', 'blog', 'technology'],
		lang: 'en',
		dir: 'ltr',
		prefer_related_applications: false,
	};
}
