import React from 'react'
import Text from '../Text'
import { CalendarIcon, EyeIcon, TimeIcon } from '@/Icons'
import Reactions from './Reactions'
import { Blog } from '@/.contentlayer/generated'
import Button from '../Button'
import Link from 'next/link'
import Image from 'next/image'

type HeroProps = {
	blog: Blog
}

const Hero = ({ blog }: HeroProps) => {
	return (
		<>
			<Button
				focusOutlined
				hoverable={false}
				className='group rounded-sm hocus:underline	hocus:underline-offset-2 hocus:decoration-2 flex items-center gap-2 hocus:decoration-blue-500'
				type={Link}
				href={'/blog'}
			>
				<Text className='text-blue-700 dark:text-blue-300 font-semibold'>{'<-'}</Text>
				<Text className='text-blue-700 dark:text-blue-300 font-semibold'>Back to Blogs</Text>
			</Button>

			<Text variant='shadow' shadowColor='yellow' className='font-bold text-4xl text-heading-dark dark:text-purple-300'>
				{blog.title}
			</Text>

			<div id='dataPills' className='flex items-center gap-2'>
				<div className='flex gap-1 items-center bg-opacity-50 bg-slate-200 dark:bg-slate-600 rounded-md text-xs py-1 px-2'>
					<CalendarIcon width={15} height={15} />

					<Text className='text-sm'>
						{new Date(blog.publishedAt).toLocaleDateString('en-GB', {
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

					<Text className='text-sm'>252 views</Text>
				</div>
			</div>

			<Reactions />

			<Image
				alt={blog.title}
				decoding='async'
				src={blog.cover}
				width={100}
				height={100}
				priority
				className='w-full h-[20rem] rounded-lg object-cover aspect-[2/1] duration-700 ease-in-out scale-100 blur-0 grayscale-0'
			/>
		</>
	)
}

export default Hero
