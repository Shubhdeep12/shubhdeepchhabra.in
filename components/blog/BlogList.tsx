'use client'
import { Blog } from '@/.contentlayer/generated'
import Text from '../Text'
import Link from 'next/link'
import Image from 'next/image'
import cx from 'clsx'
import { CalendarIcon, EyeIcon, TimeIcon } from '@/assets/Icons'

type BlogListProps = {
	blogList: { year: number; blogs: Blog[] }
}

const COLOR_STYLES: Record<string, Record<string, string>> = {
	purple: {
		bg: 'hocus:bg-purple-100 hocus:dark:bg-purple-600',
		title: 'group-hocus:text-purple-500 group-hocus:dark:text-purple-500',
	},
	orange: {
		bg: 'hocus:bg-orange-100 hocus:dark:bg-orange-600',
		title: 'group-hocus:text-orange-500 group-hocus:dark:text-orange-500',
	},
}

const BlogList = ({ blogList }: BlogListProps) => {
	return (
		<div className='flex flex-col gap-6 w-full'>
			<div className='w-full flex gap-2'>
				<Text className='text-black dark:text-white font-bold text-xl justify-start'>{blogList.year}</Text>
				<span className='flex-grow border-b dark:border-slate-600 h-6' />
			</div>

			{blogList?.blogs?.map((item: Blog) => (
				<Link
					href={`/blog/${item.slug}`}
					key={item.slug}
					id={item.slug}
					className={cx(
						'cursor-pointer h-fit',
						'flex flex-col laptop:flex-row gap-2 w-full items-start',
						'transform hover:-translate-y-1',
						'hocus:bg-opacity-50 hocus:dark:bg-opacity-[0.07]',
						COLOR_STYLES[item.color]?.bg,
						'group p-3 transition-all duration-200 rounded-lg focus:outline-dashed focus:outline-2 focus:outline-offset-0'
					)}
				>
					<Image
						alt='p1'
						src={require('../../assets/Shubhdeepchhabra.png')}
						className={cx('transition rounded-lg w-full laptop:w-[160px] h-[200px] laptop:h-full object-cover')}
					/>
					<div className='flex flex-col gap-3 items-start w-full'>
						<Text
							transitioned={false}
							className={`flex gap-2 items-center transition h-full font-bold p-0 group-hocus:underline decoration-2 underline-offset-2
									${COLOR_STYLES[item.color]?.title}
									`}
						>
							{item.title}
						</Text>

						<Text transitioned={false} className='flex flex-wrap h-full font-semibold text-sm p-0'>
							{item.description}
						</Text>

						<div id='dataPills' className='flex items-center gap-2'>
							<div className='flex gap-1 items-center bg-slate-300 dark:bg-slate-600 rounded-md text-xs py-1 px-2'>
								<CalendarIcon width={10} height={10} />

								<Text className='font-semibold'>
									{new Date(item.publishedAt).toLocaleDateString('en-GB', {
										day: 'numeric',
										month: 'short',
									})}
								</Text>
							</div>

							<div className='flex gap-1 items-center bg-slate-300 dark:bg-slate-600 rounded-md text-xs py-1 px-2'>
								<TimeIcon width={10} height={10} />

								<Text className='font-semibold'>{item.readingTime.text}</Text>
							</div>

							<div className='flex gap-1 items-center bg-slate-300 dark:bg-slate-600 rounded-md text-xs py-1 px-2'>
								<EyeIcon width={10} height={10} />

								<Text className='font-semibold'>252 views</Text>
							</div>
						</div>
					</div>
				</Link>
			))}
		</div>
	)
}

export default BlogList
