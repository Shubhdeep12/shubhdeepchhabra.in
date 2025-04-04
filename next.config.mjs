import createMDX from '@next/mdx';
import { withSentryConfig } from '@sentry/nextjs';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src 'self' vercel.live;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.vercel-insights.com vercel.live www.googletagmanager.com/gtag/js;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
`.replace(/\n/g, '');

const securityHeaders = [
	{ key: 'Content-Security-Policy', value: ContentSecurityPolicy },
	{ key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
	{ key: 'X-Frame-Options', value: 'DENY' },
	{ key: 'X-Content-Type-Options', value: 'nosniff' },
	{ key: 'X-DNS-Prefetch-Control', value: 'on' },
	{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
	{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const mdxOptions = {
	remarkPlugins: [remarkGfm, remarkUnwrapImages],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypePrettyCode,
			{
				theme: 'one-dark-pro',
				onVisitLine(node) {
					if (node.children.length === 0) {
						node.children = [{ type: 'text', value: ' ' }];
					}
				},
				onVisitHighlightedLine(node) {
					node.properties.className.push('line--highlighted');
				},
				onVisitHighlightedWord(node) {
					node.properties.className = ['word--highlighted'];
				},
			},
		],
		[rehypeAutolinkHeadings, { properties: { className: ['anchor'] } }],
		rehypeAccessibleEmojis,
	],
};

const withMDX = createMDX({
	extension: /\.mdx?$/,
	options: mdxOptions,
});

const nextConfig = {
	images: {
		unoptimized: false,
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},
	async redirects() {
		return [
			{
				source: '/blog/Razorpay-Integration-with-Reactjs-and-Node',
				destination: '/blog/razorpay-integration-in-reactjs',
				permanent: true,
			},
			{
				source: '/blog/What-are-Design-Tokens-How-to-Create-Design-tokens-in-React',
				destination: '/blog/design-tokens-nextjs',
				permanent: true,
			},
			{
				source: '/blog/Structuring-SEO-and-Format-of-a-page-in-Nextjs-Effectively',
				destination: '/blog/seo-format-nextjs',
				permanent: true,
			},
			{
				source: '/blog/Connect-Database-with-nodejs-Part-1-MongoDB-using-Mongoose',
				destination: '/blog/connect-mongodb-with-nodejs',
				permanent: true,
			},
			{
				source: '/blog/Why-Did-Discord-Go-From-MongoDB-To-Cassandra-Then-ScyllaDB-Simplified',
				destination: '/blog/discord-mongodb-cassandra-scylladb',
				permanent: true,
			},
		];
	},
	headers() {
		return [{ source: '/(.*)', headers: securityHeaders }];
	},
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

const config = withSentryConfig(
	withMDX(nextConfig),
	{
		silent: true,
		org: 'shubhdeep-chhabra',
		project: 'shubhdeepchhabra',
	},
	{
		widenClientFileUpload: true,
		transpileClientSDK: true,
		tunnelRoute: '/monitoring',
		hideSourceMaps: true,
		disableLogger: true,
	}
);

export default config;
