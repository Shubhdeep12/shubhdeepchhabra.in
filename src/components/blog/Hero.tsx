'use client';
import React, { useEffect } from 'react';
import { useBlogViews } from '@/src/hooks/useBlogViews';
import { getPrimaryCategory } from '@/src/utils/blog-shared';
import { Blog } from '@/utils/types';
import AnimatedImage from '../AnimatedImage';

type HeroProps = {
	blog: Blog;
};

const Hero = ({ blog }: HeroProps) => {
	const { views, isLoading, increment } = useBlogViews(blog.slug);

	useEffect(() => {
		const viewKey = `viewed:${blog.slug}`;
		try {
			const lastViewed = localStorage.getItem(viewKey);
			const now = Date.now();

			const SIX_HOURS = 6 * 60 * 60 * 1000;

			if (!lastViewed || now - Number(lastViewed) > SIX_HOURS) {
				increment();
				localStorage.setItem(viewKey, now.toString());
			}
		} catch (error: any) {
			console.error('Error incrementing views:', error.message);
		}
	}, [blog.slug, increment]);

	return (
		<>
			<h1 className='postTitle'>{blog.frontMatter.title}</h1>
			<div className='postSubheader'>
				{new Date(blog.frontMatter.publishedAt).toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric',
				})}{' '}
				· {blog.readingTime.text} · {getPrimaryCategory(blog.frontMatter)} · {isLoading ? '--' : views || 0} reads
			</div>

			{blog.frontMatter.cover ? (
				<AnimatedImage
					alt={blog.frontMatter.title}
					decoding='async'
					src={blog.frontMatter.cover}
					width={800}
					height={400}
					priority
					quality={85}
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px'
					className='w-full h-[20rem] rounded-md object-cover aspect-[2/1] duration-700 ease-in-out scale-100 blur-0 grayscale-0 will-change-transform'
				/>
			) : null}
		</>
	);
};

export default Hero;
