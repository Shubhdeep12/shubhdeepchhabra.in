import { getAllPosts } from '@/lib/mdx';
import { sortBlogsByDate } from './blog-shared';
import { Blog } from './types';

export const getBlogGroups = async () => {
	const blogs = await getAllPosts();
	const sortedBlogs = sortBlogsByDate(blogs);

	const finalResponse = sortedBlogs.reduce(
		(previous, currentItem) => {
			const group = new Date(currentItem.frontMatter.publishedAt).getFullYear() || new Date().getFullYear();
			if (!previous[group]) previous[group] = [];
			previous[group].push(currentItem);
			return previous;
		},
		{} as Record<string, Blog[]>
	);

	return Object.keys(finalResponse)
		.map((year) => ({
			year: +year,
			blogs: finalResponse[+year],
		}))
		.sort((a, b) => Number(b.year) - Number(a.year));
};

export const getRecentBlogs = async (num = 3) => {
	const blogs = await getAllPosts();

	const recentBlogs = sortBlogsByDate(blogs).slice(0, num);
	return recentBlogs;
};
