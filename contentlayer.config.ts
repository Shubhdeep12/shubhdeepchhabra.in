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
