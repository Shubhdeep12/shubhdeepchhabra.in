import { Metadata } from 'next';
import AnimatePage from '@/src/components/AnimatePage';
import WritingList, { WritingListItem } from '@/src/components/blog/WritingList';
import Footer from '@/src/components/Footer';
import { getBlogGroups } from '../../src/utils/blog';
import { getCategories, getPrimaryCategory } from '../../src/utils/blog-shared';

export const metadata: Metadata = {
	title: 'Writings - Shubhdeep Chhabra',
	description: 'Articles on software development through eyes of Shubhdeep',
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
