'use client';
import React from 'react';
import Button from '@/src/ui/Button';
import { EditIcon, ShareIcon } from '@/src/Icons';
import Text from '@/src/ui/Text';
import Reactions from './Reactions';
import { Blog } from '@/utils/types';

type BlogFooterProps = {
	blog: Blog;
};

const BlogFooter = ({ blog }: BlogFooterProps) => {
	return (
		<div
			id='share'
			className='border-t mt-10 pt-10 w-full flex flex-col-reverse laptop:flex-row gap-6 justify-between items-start laptop:items-center'
			role='contentinfo'
			aria-label='Blog post footer'
		>
			<div id='actions' className='flex gap-3'>
				<Button
					height='h-[42px]'
					width='w-fit'
					focusOutlined
					className='p-4 flex gap-1 justify-center items-center rounded-lg bg-primary-700 hover:-translate-y-[1px] hover:shadow-md hover:bg-primary-800  dark:bg-primary-500 dark:hover:bg-primary-400'
					hoverable={false}
					onClick={async () => {
						try {
							await navigator.share({
								title: blog.frontMatter.title,
								text: `"${blog.frontMatter.title}" by @okshubhh`,
								url: `https://www.shubhdeepchhabra.in/blog/${blog.slug}`,
							});
						} catch (err) {
							console.log({ err });
						}
					}}
					aria-label='Share blog post'
				>
					<ShareIcon
						width={24}
						height={24}
						color='#fff'
						className='dark:fill-text-dark transition'
						aria-hidden='true'
					/>
					<Text
						transitioned={false}
						className='h-full text-white dark:text-text-dark font-extrabold dark:font-bold p-0'
					>
						Share
					</Text>
				</Button>

				<Button
					height='h-[42px]'
					width='w-fit'
					focusOutlined
					className='group p-4 flex gap-1 justify-center items-center rounded-lg
							 hocus:-translate-y-[1px] hocus:shadow-md 
							 hocus:bg-zinc-100 dark:hocus:bg-zinc-800
							 border border-zinc-200 hocus:border-primary-800 dark:border-zinc-800 dark:hover:border-primary-200'
					hoverable={false}
					onClick={() =>
						window.open(`https://github.com/Shubhdeep12/ShubhdeepChhabra/tree/master/blog/${blog.slug}.mdx`, '_blank')
					}
					aria-label='Edit on GitHub'
				>
					<EditIcon
						width={24}
						height={24}
						color='#fff'
						className='fill-text-dark dark:fill-white transition'
						aria-hidden='true'
					/>
					<Text
						transitioned={false}
						className='h-full dark:text-white text-text-dark font-extrabold dark:font-bold p-0'
					>
						Edit on Github
					</Text>
				</Button>
			</div>

			<Reactions blog={blog} />
		</div>
	);
};

export default BlogFooter;
