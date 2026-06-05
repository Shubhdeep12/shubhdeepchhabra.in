import { Metadata } from 'next';
import Link from 'next/link';
import AnimatePage from '@/src/components/AnimatePage';
import WritingList, { WritingListItem } from '@/src/components/blog/WritingList';
import Footer from '@/src/components/Footer';
import { getBlogGroups } from '../../src/utils/blog';
import { getCategories, getPrimaryCategory } from '../../src/utils/blog-shared';

export const metadata: Metadata = {
	title: 'Writings - Shubhdeep Chhabra',
	description:
		'Articles on software engineering, architecture, and practical product lessons. Musings on engineering, product, and whatever else is on my mind.',
	alternates: {
		canonical: 'https://okshubh.in/writings',
	},
	keywords: [
		'blog',
		'writings',
		'software engineering',
		'engineering',
		'technology',
		'react',
		'next.js',
		'javascript',
		'typescript',
	],
	openGraph: {
		type: 'website',
		title: 'Writings - Shubhdeep Chhabra',
		description: 'Articles on software engineering, architecture, and practical product lessons.',
		url: 'https://okshubh.in/writings',
		locale: 'en_US',
		siteName: 'Shubhdeep Chhabra',
	},
};

export default async function Writings() {
	const allBlogs = await getBlogGroups();
	const blogs = allBlogs.flatMap((group) => group.blogs);
	const items: WritingListItem[] = blogs.map((blog) => ({
		slug: blog.slug,
		title: blog.frontMatter.title,
		description: blog.frontMatter.description,
		publishedAt: blog.frontMatter.publishedAt,
		readingTimeText: blog.readingTime.text,
		category: getPrimaryCategory(blog.frontMatter),
		categories: getCategories(blog.frontMatter),
	}));

	return (
		<AnimatePage>
			<section className='blog-page'>
				<div className='blog-page-header'>
					<Link href='/' className='blog-home-link'>
						Shubhdeep Chhabra
					</Link>
					<h1 className='blog-page-title'>Writings</h1>
					<p className='page-subheader'>Musings on engineering, product, and whatever else is on my mind.</p>
					<div className='blog-post-count'>{blogs.length} posts</div>
				</div>
				<WritingList items={items} />
			</section>
			<Footer />
		</AnimatePage>
	);
}
