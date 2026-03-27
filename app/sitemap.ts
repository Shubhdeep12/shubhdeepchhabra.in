import { MetadataRoute } from 'next';
import { getAllPosts } from '../src/lib/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const blogs = await getAllPosts();

	const blogEntries = blogs.map((blog) => ({
		url: `https://www.shubhdeepchhabra.in/writings/${blog.slug}`,
		lastModified: blog.frontMatter.publishedAt,
	}));

	const routes = ['', '/writings'].map((route) => ({
		url: `https://www.shubhdeepchhabra.in${route}`,
		lastModified: new Date().toISOString().split('T')[0],
	}));

	return [...routes, ...blogEntries];
}
