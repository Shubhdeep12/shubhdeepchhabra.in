import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';

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

export default mdxOptions;
