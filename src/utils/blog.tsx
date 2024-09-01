import { getAllPosts } from '@/lib/mdx';
import { Blog } from './types';

export const getBlogGroups = async () => {
	const blogs = await getAllPosts();
	const sortedBlogs = blogs.sort(
		(a, b) => Number(new Date(b.frontMatter.publishedAt)) - Number(new Date(a.frontMatter.publishedAt))
	);

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

	const recentBlogs = blogs
		.sort((a, b) => Number(new Date(b.frontMatter.publishedAt)) - Number(new Date(a.frontMatter.publishedAt)))
		.slice(0, num);
	return recentBlogs;
};
