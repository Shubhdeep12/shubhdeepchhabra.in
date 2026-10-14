import { postToMarkdown, postUrl, textResponse } from '@/lib/agent-content';
import { getPostBySlug, getPostSlugs } from '@/lib/mdx';

// Served at /writings/<slug>.md (and /writings/<slug> with `Accept: text/markdown`) via rewrites in next.config.mjs.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
	return getPostSlugs().map((file) => ({ slug: file.replace(/\.mdx$/, '') }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const blog = await getPostBySlug(slug);
	return textResponse(postToMarkdown(blog), { canonical: postUrl(slug) });
}
