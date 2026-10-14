import createMDX from '@next/mdx';
import { withSentryConfig } from '@sentry/nextjs';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';

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
		unoptimized: true,
	},
	async redirects() {
		return [
			// Removed pages
			{ source: '/about', destination: '/', permanent: true },
			{ source: '/projects', destination: '/', permanent: true },
			// Legacy capitalised blog slugs → /writings directly (avoids redirect chains)
			{
				source: '/blog/Razorpay-Integration-with-Reactjs-and-Node',
				destination: '/writings/razorpay-integration-in-reactjs',
				permanent: true,
			},
			{
				source: '/blog/What-are-Design-Tokens-How-to-Create-Design-tokens-in-React',
				destination: '/writings/design-tokens-nextjs',
				permanent: true,
			},
			{
				source: '/blog/Structuring-SEO-and-Format-of-a-page-in-Nextjs-Effectively',
				destination: '/writings/seo-format-nextjs',
				permanent: true,
			},
			{
				source: '/blog/Connect-Database-with-nodejs-Part-1-MongoDB-using-Mongoose',
				destination: '/writings/connect-mongodb-with-nodejs',
				permanent: true,
			},
			{
				source: '/blog/Why-Did-Discord-Go-From-MongoDB-To-Cassandra-Then-ScyllaDB-Simplified',
				destination: '/writings/discord-mongodb-cassandra-scylladb',
				permanent: true,
			},
			// /blog and /blog/* → /writings and /writings/*
			{ source: '/blog', destination: '/writings', permanent: true },
			{ source: '/blog/:slug*', destination: '/writings/:slug*', permanent: true },
		];
	},
	async rewrites() {
		return {
			// Agents asking for markdown get the resume as markdown at the same URL.
			beforeFiles: [
				{
					source: '/resume',
					has: [{ type: 'header', key: 'accept', value: '(.*)text/markdown(.*)' }],
					destination: '/resume.md',
				},
			],
		};
	},
	headers() {
		return [
			{ source: '/(.*)', headers: securityHeaders },
			{
				source: '/resume',
				headers: [
					{ key: 'Vary', value: 'Accept' },
					{
						key: 'Link',
						value:
							'</resume.md>; rel="alternate"; type="text/markdown", </resume.json>; rel="alternate"; type="application/json", </resume/Shubhdeep_Chhabra.pdf>; rel="alternate"; type="application/pdf"',
					},
				],
			},
			{
				// Search should land on /resume, not the PDF.
				source: '/resume/:file*.pdf',
				headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
			},
		];
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
