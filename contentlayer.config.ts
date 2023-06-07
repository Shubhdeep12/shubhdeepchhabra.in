import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'

export const Blog = defineDocumentType(() => ({
	name: 'Blog',
	filePathPattern: '**/*.mdx',
	bodyType: 'mdx',
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
		remarkPlugins: [],
		rehypePlugins: [],
	},
})
