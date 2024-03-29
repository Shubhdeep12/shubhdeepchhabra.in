import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypePrettyCode from 'rehype-pretty-code'

export const Blog = defineDocumentType(() => ({
	name: 'Blog',
	filePathPattern: '**/*.mdx',
	contentType: 'mdx',
	fields: {
		title: { type: 'string', required: true },
		publishedAt: { type: 'string', required: true },
		description: { type: 'string', required: true },
		cover: { type: 'string', required: true },
		color: { type: 'string', required: true },
	},
	computedFields: {
		readingTime: {
			type: 'json',
			resolve: (doc) => readingTime(doc.body.raw),
		},
		slug: {
			type: 'string',
			resolve: (doc) => doc._raw.sourceFileName.replace('.mdx', ''),
		},
		structuredData: {
			type: 'json',
			resolve: (doc) => ({
				'@context': 'https://schema.org',
				'@type': 'BlogPosting',
				headline: doc.title,
				datePublished: doc.publishedAt,
				dateModified: doc.publishedAt,
				description: doc.description,
				color: doc.color,
				// image: doc.image ? `https://shubhdeep-chhabra.vercel.app${doc.image}` : `https://shubhdeep-chhabra.vercel.app/api/og?title=${doc.title}`,
				url: `https://shubhdeep-chhabra.vercel.app/blog/${doc._raw.flattenedPath}`,
				author: {
					'@type': 'Person',
					name: 'Shubhdeep Chhabra',
				},
			}),
		},
	},
}))

export default makeSource({
	contentDirPath: 'blog',
	documentTypes: [Blog],
	mdx: {
		remarkPlugins: [remarkGfm, remarkUnwrapImages],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypePrettyCode,
				{
					theme: 'one-dark-pro',
					onVisitLine(node) {
						// Prevent lines from collapsing in `display: grid` mode, and allow empty
						// lines to be copy/pasted
						if (node.children.length === 0) {
							node.children = [{ type: 'text', value: ' ' }]
						}
					},
					onVisitHighlightedLine(node) {
						node.properties.className.push('line--highlighted')
					},
					onVisitHighlightedWord(node) {
						node.properties.className = ['word--highlighted']
					},
				},
			],
			[rehypeAutolinkHeadings, { properties: { className: ['anchor'] } }],

			rehypeAccessibleEmojis,
		],
	},
})
