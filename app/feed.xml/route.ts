import { getAllPosts } from '@/lib/mdx';
import RSS from 'rss';

export async function GET() {
	const allBlogs = await getAllPosts();

	const feed = new RSS({
		title: 'Shubhdeep Chhabra',
		description:
			'Software Engineer from India specializing in web development. Passionate about creating innovative solutions for complex problems.',
		site_url: 'https://www.shubhdeepchhabra.in/',
		feed_url: 'https://www.shubhdeepchhabra.in/feed.xml',
		language: 'en-US',
		pubDate: new Date().toUTCString(),
		image_url: 'https://www.shubhdeepchhabra.in/assets/Shubhdeepchhabra.png',
		categories: ['Shubhdeep Chhabra', 'Blogs', 'portfolio', 'react', 'next.js', 'javascript', 'typescript'],
	});

	allBlogs.map((blog) => {
		feed.item({
			title: blog.frontMatter.title,
			guid: `https://www.shubhdeepchhabra.in/blog/${blog.slug}`,
			url: `https://www.shubhdeepchhabra.in/blog/${blog.slug}`,
			date: blog.frontMatter.publishedAt,
			description: blog.frontMatter.description,
			author: 'Shubhdeep Chhabra',
			// categories: post.categories.map(({ name }) => name) || [],
		});
	});

	return new Response(feed.xml({ indent: true }), {
		headers: {
			'Content-Type': 'application/atom+xml; charset=utf-8',
		},
	});
}
