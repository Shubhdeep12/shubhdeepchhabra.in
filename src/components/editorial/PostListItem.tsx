'use client';

import Link from 'next/link';
import { useBlogViews } from '@/src/hooks/useBlogViews';
import { Blog } from '@/utils/types';
import MetaRow from './MetaRow';

type PostListItemProps = {
	blog: Blog;
};

export default function PostListItem({ blog }: PostListItemProps) {
	const { views, isLoading } = useBlogViews(blog.slug);
	const date = new Date(blog.frontMatter.publishedAt).toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});

	return (
		<article className='border-b border-border-default pb-5'>
			<h3 className='text-body-lg font-semibold'>
				<Link
					href={`/blog/${blog.slug}`}
					className='text-text-default hover:underline underline-offset-4 decoration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 rounded-sm'
				>
					{blog.frontMatter.title}
				</Link>
			</h3>
			<p className='mt-2 text-body text-text-muted'>{blog.frontMatter.description}</p>
			<div className='mt-2'>
				<MetaRow date={date} readingTime={blog.readingTime.text} views={isLoading ? undefined : views} />
			</div>
		</article>
	);
}
