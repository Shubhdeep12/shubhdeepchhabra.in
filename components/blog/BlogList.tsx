'use client'
import { Blog } from '@/.contentlayer/generated'
import Text from '@/ui/Text'
import BlogCard from './BlogCard'
import clsx from 'clsx'

type BlogListProps = {
	blogList: { year?: number; blogs: Blog[] }
	className?: string
}

const BlogList = ({ blogList, className = '' }: BlogListProps) => {
	return (
		<div className={clsx('flex flex-col gap-6 w-full', className)}>
			{blogList.year && (
				<div className='w-full flex gap-2'>
					<Text className='text-black dark:text-white font-bold text-xl justify-start'>{blogList.year}</Text>
					<span className='flex-grow border-b dark:border-slate-600 h-6' />
				</div>
			)}

			{blogList?.blogs?.map((item: Blog) => <BlogCard key={item.slug} blog={item} />)}
		</div>
	)
}

export default BlogList
