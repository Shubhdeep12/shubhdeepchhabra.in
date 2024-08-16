import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { FrontMatter, Blog } from '@/utils/types';

const blogDirectory = path.join(process.cwd(), 'blog');

export function getPostSlugs(): string[] {
	return fs.readdirSync(blogDirectory);
}

export async function getPostBySlug(slug: string): Promise<Blog> {
	const realSlug = slug.replace(/\.mdx$/, '');
	const fullPath = path.join(blogDirectory, `${realSlug}.mdx`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');
	const { data, content } = matter(fileContents);

	return {
		slug: realSlug,
		frontMatter: data as FrontMatter,
		readingTime: readingTime(content),
		mdxSource: content,
	};
}

export async function getAllPosts(): Promise<Blog[]> {
	const slugs = getPostSlugs();
	const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));
	return posts;
}
