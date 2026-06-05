import RSS from 'rss';
import { getAllPosts } from '@/lib/mdx';

export async function GET() {
	const allBlogs = await getAllPosts();

	// Sort posts by date, newest first
	const sortedBlogs = allBlogs.sort(
		(a, b) => new Date(b.frontMatter.publishedAt).getTime() - new Date(a.frontMatter.publishedAt).getTime()
	);

	const feed = new RSS({
		title: 'Shubhdeep Chhabra',
		description:
			'Product-focused Software Engineer writing about software engineering, architecture, and practical product lessons.',
		site_url: 'https://www.okshubh.in/',
		feed_url: 'https://www.okshubh.in/feed.xml',
		language: 'en-US',
		pubDate: new Date().toUTCString(),
		image_url: 'https://www.okshubh.in/assets/shubhdeep-og.png',
		categories: ['Software Engineering', 'Web Development', 'React', 'Next.js', 'JavaScript', 'TypeScript'],
	});

	sortedBlogs.forEach((blog) => {
		feed.item({
			title: blog.frontMatter.title,
			guid: `https://www.okshubh.in/writings/${blog.slug}`,
			url: `https://www.okshubh.in/writings/${blog.slug}`,
			date: blog.frontMatter.publishedAt,
			description: blog.frontMatter.description,
			author: 'Shubhdeep Chhabra',
			categories: blog.frontMatter.categories || [],
		});
	});

	return new Response(feed.xml({ indent: true }), {
		headers: {
			'Content-Type': 'application/atom+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
		},
	});
}
