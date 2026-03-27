'use client';
import Link from 'next/link';
import React from 'react';
import { Blog } from '@/utils/types';
import { WritingListItem } from './WritingList';

type BlogFooterProps = {
	blog: Blog;
	relatedPosts: WritingListItem[];
};

const BlogFooter = ({ blog, relatedPosts }: BlogFooterProps) => {
	const postUrl = `https://www.shubhdeepchhabra.in/blog/${blog.slug}`;

	return (
		<div className='post-related'>
			<div className='post-related-actions'>
				<a
					className='post-action-link'
					href={`https://github.com/Shubhdeep12/ShubhdeepChhabra/tree/master/blog/${blog.slug}.mdx`}
					target='_blank'
					rel='noreferrer'
				>
					Edit on GitHub →
				</a>
				<a
					className='post-action-link'
					href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(blog.frontMatter.title)}`}
					target='_blank'
					rel='noreferrer'
				>
					Share Post →
				</a>
			</div>
			<p className='post-related-label'>More posts</p>
			<ul className='b-list'>
				{relatedPosts.map((post) => (
					<li key={post.slug} className='b-card-wrapper'>
						<Link href={`/blog/${post.slug}`} className='b-card'>
							<div className='b-card-top'>
								<div className='b-card-title'>{post.title}</div>
								<span className='b-card-date'>
									{new Date(post.publishedAt).toLocaleDateString('en-US', {
										month: 'short',
										year: 'numeric',
									})}
								</span>
							</div>
							<div className='b-card-tags'>
								<span className='b-card-tag'>{post.category}</span>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default BlogFooter;
