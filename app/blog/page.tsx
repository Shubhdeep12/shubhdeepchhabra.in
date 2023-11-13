'use client'
import Text from '@/ui/Text'
import BlogList from '@/components/blog/BlogList'
import { allBlogs, Blog } from 'contentlayer/generated'
import { getBlogGroups } from './utils'
import { AnimatePresence, motion } from 'framer-motion'

export default function Blogs() {
	return (
		<AnimatePresence>
			<motion.div
				key={'1'}
				initial={{ y: 100, opacity: 0.4 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ type: 'spring', damping: 10, stiffness: 100 }}
			>
				<div className='flex gap-10 w-full flex-col items-start'>
					<Text
						variant='shadow'
						gFrom='dark:from-purple-500'
						gTo='dark:to-yellow-500'
						shadowColor='yellow'
						className='font-bold text-3xl text-heading-dark'
						as={'h1'}
					>
						Blog
					</Text>
					{getBlogGroups(allBlogs).map((group: { year: number; blogs: Blog[] }) => (
						<BlogList key={group.year} blogList={group} />
					))}
				</div>
			</motion.div>
		</AnimatePresence>
	)
}
