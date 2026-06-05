import { MetadataRoute } from 'next';
import { getAllPosts } from '../src/lib/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const blogs = await getAllPosts();

	const blogEntries = blogs.map((blog) => ({
		url: `https://www.okshubh.in/writings/${blog.slug}`,
		lastModified: blog.frontMatter.updatedAt || blog.frontMatter.publishedAt,
		priority: 0.8,
		changeFrequency: 'monthly' as const,
		images: blog.frontMatter.cover ? [`https://www.okshubh.in${blog.frontMatter.cover}`] : undefined,
	}));

	const routes: MetadataRoute.Sitemap = [
		{
			url: 'https://www.okshubh.in',
			lastModified: new Date().toISOString().split('T')[0],
			priority: 1.0,
			changeFrequency: 'weekly',
		},
		{
			url: 'https://www.okshubh.in/writings',
			lastModified: new Date().toISOString().split('T')[0],
			priority: 0.9,
			changeFrequency: 'weekly',
		},
	];

	return [...routes, ...blogEntries];
}
