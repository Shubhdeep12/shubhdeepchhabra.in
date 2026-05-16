import { MetadataRoute } from 'next';
import { getAllPosts } from '../src/lib/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const blogs = await getAllPosts();

	const blogEntries = blogs.map((blog) => ({
		url: `https://www.shubhdeepchhabra.in/writings/${blog.slug}`,
		lastModified: blog.frontMatter.updatedAt || blog.frontMatter.publishedAt,
		priority: 0.8,
		changeFrequency: 'monthly' as const,
		images: blog.frontMatter.cover ? [`https://www.shubhdeepchhabra.in${blog.frontMatter.cover}`] : undefined,
	}));

	const routes: MetadataRoute.Sitemap = [
		{
			url: 'https://www.shubhdeepchhabra.in',
			lastModified: new Date().toISOString().split('T')[0],
			priority: 1.0,
			changeFrequency: 'weekly',
		},
		{
			url: 'https://www.shubhdeepchhabra.in/writings',
			lastModified: new Date().toISOString().split('T')[0],
			priority: 0.9,
			changeFrequency: 'weekly',
		},
	];

	return [...routes, ...blogEntries];
}
