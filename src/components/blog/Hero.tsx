/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect } from 'react';
import Text from '@/src/ui/Text';
import { CalendarIcon, EyeIcon, TimeIcon } from '@/src/Icons';
import Reactions from './Reactions';
import Button from '@/src/ui/Button';
import Link from 'next/link';
import { useBlogViews } from '@/src/hooks/useBlogViews';
import AnimatedImage from '../AnimatedImage';
import { Blog } from '@/utils/types';

type HeroProps = {
	blog: Blog;
};

const Hero = ({ blog }: HeroProps) => {
	const { views, isLoading, increment } = useBlogViews(blog.slug);

	useEffect(() => {
		increment();
	}, []);

	return (
		<>
			<Button
				focusOutlined
				hoverable={false}
				className='group rounded-sm hocus:underline	hocus:underline-offset-2 hocus:decoration-2 flex items-center gap-2 hocus:decoration-primary-500'
				type={Link}
				href={'/blog'}
			>
				<Text className='text-primary-700 dark:text-primary-300 font-semibold'>{'<-'}</Text>
				<Text className='text-primary-700 dark:text-primary-300 font-semibold'>Back to Blogs</Text>
			</Button>

			<Text
				variant='shadow'
				shadowColor='yellow'
				className='font-bold text-4xl text-heading-dark dark:text-purple-300'
				as='h1'
			>
				{blog.frontMatter.title}
			</Text>

			<div id='dataPills' className='flex items-center gap-2'>
				<div className='flex gap-1 items-center bg-opacity-50 bg-slate-200 dark:bg-slate-600 rounded-md text-xs py-1 px-2'>
					<CalendarIcon width={15} height={15} />

					<Text className='text-sm'>
						{new Date(blog.frontMatter.publishedAt).toLocaleDateString('en-GB', {
							day: 'numeric',
							month: 'short',
							year: 'numeric',
						})}
					</Text>
				</div>

				<div className='flex gap-1 items-center bg-opacity-50 bg-slate-200 dark:bg-slate-600 rounded-md text-xs py-1 px-2'>
					<TimeIcon width={15} height={15} className='text-text-dark dark:text-text-light' />

					<Text className='text-sm'>{blog.readingTime.text}</Text>
				</div>

				<div className='flex gap-1 items-center bg-opacity-50 bg-slate-200 dark:bg-slate-600 rounded-md text-xs py-1 px-2'>
					<EyeIcon width={15} height={15} />

					<Text className='text-sm'>{isLoading ? '-' : views} views</Text>
				</div>
			</div>

			<Reactions blog={blog} />

			<AnimatedImage
				alt={blog.frontMatter.title}
				decoding='async'
				src={blog.frontMatter.cover}
				width={100}
				height={100}
				priority
				className='w-full h-[20rem] rounded-lg laptop:object-cover aspect-[2/1] duration-700 ease-in-out scale-100 blur-0 grayscale-0'
			/>
		</>
	);
};

export default Hero;
