'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useBlogViews } from '@/src/hooks/useBlogViews';
import { getPrimaryCategory } from '@/src/utils/blog-shared';
import { Blog } from '@/utils/types';

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
				<span>
					{new Date(blog.frontMatter.publishedAt).toLocaleDateString('en-US', {
						month: 'short',
						day: 'numeric',
						year: 'numeric',
					})}
				</span>
				<span aria-hidden='true'>·</span>
				<span>{blog.readingTime.text}</span>
				<span aria-hidden='true'>·</span>
				<span>{getPrimaryCategory(blog.frontMatter)}</span>
				<span aria-hidden='true'>·</span>
				<span>{isLoading ? '--' : views || 0} reads</span>
			</div>

			{blog.frontMatter.cover ? (
				<div className='relative hidden laptop:block w-full h-[20rem] rounded-md overflow-hidden'>
					<Image
						alt={blog.frontMatter.title}
						src={blog.frontMatter.cover}
						fill
						priority
						quality={85}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px'
						className='object-cover'
					/>
				</div>
			) : null}
		</>
	);
};

export default Hero;
