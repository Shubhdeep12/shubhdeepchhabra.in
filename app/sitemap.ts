import { getAllPosts } from '../src/lib/mdx';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const blogs = await getAllPosts();

	const blogEntries = blogs.map((blog) => ({
		url: `https://www.shubhdeepchhabra.in/blog/${blog.slug}`,
		lastModified: blog.frontMatter.publishedAt,
	}));

	const routes = ['', '/about', '/blog', '/projects'].map((route) => ({
		url: `https://www.shubhdeepchhabra.in${route}`,
		lastModified: new Date().toISOString().split('T')[0],
	}));

	return [...routes, ...blogEntries];
}
