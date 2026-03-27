'use client';
import Link from 'next/link';
import React from 'react';
import { Blog } from '@/utils/types';
import { WritingListItem } from './WritingList';

type BlogFooterProps = {
	blog?: Blog;
	relatedPosts: WritingListItem[];
};

const BlogFooter = ({ relatedPosts }: BlogFooterProps) => {
	return (
		<div className='post-related'>
			<p className='post-related-label'>More posts</p>
			<ul className='b-list'>
				{relatedPosts.map((post) => (
					<li key={post.slug} className='b-card-wrapper'>
						<Link href={`/writings/${post.slug}`} className='b-card'>
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
