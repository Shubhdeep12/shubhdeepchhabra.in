'use client'
import React from 'react'
import Button from '../Button'
import { EditIcon, ShareIcon } from '@/Icons'
import Text from '../Text'
import Reactions from './Reactions'
import { Blog } from '@/.contentlayer/generated'

type BlogFooterProps = {
	blog: Blog
}

const BlogFooter = ({ blog }: BlogFooterProps) => {
	return (
		<div
			id='share'
			className='border-t mt-10 pt-10 w-full flex flex-col-reverse laptop:flex-row gap-6 justify-between items-start laptop:items-center'
		>
			<div id='actions' className='flex gap-3'>
				<Button
					height='h-[42px]'
					width='w-fit'
					focusOutlined
					className='p-4 flex gap-1 justify-center items-center rounded-lg bg-blue-700 hover:-translate-y-[1px] hover:shadow-md hover:bg-blue-800  dark:bg-blue-500 dark:hover:bg-blue-400'
					hoverable={false}
					onClick={async () => {
						try {
							await navigator.share({
								title: blog.title,
								text: `"${blog.title}" by @ShubhInTech`,
								url: `https://www.shubhdeepchhabra.in/blog/${blog.slug}`,
							})
						} catch (err) {
							console.log({ err })
						}
					}}
				>
					<ShareIcon width={24} height={24} color='#fff' className='dark:fill-text-dark transition' />
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
							 hocus:bg-slate-100 dark:hocus:bg-slate-800
							 border border-slate-200 hocus:border-blue-800 dark:border-slate-800 dark:hover:border-blue-200'
					hoverable={false}
					onClick={() =>
						window.open(`https://github.com/Shubhdeep12/ShubhdeepChhabra/tree/master/blog/${blog.slug}.mdx`, '_blank')
					}
				>
					<EditIcon width={24} height={24} color='#fff' className='fill-text-dark dark:fill-white transition' />
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
	)
}

export default BlogFooter
