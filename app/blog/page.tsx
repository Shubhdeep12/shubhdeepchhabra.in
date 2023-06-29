import Text from '@/components/Text'
import BlogList from '@/components/blog/BlogList'
import { allBlogs, Blog } from 'contentlayer/generated'
import { getBlogGroups } from './utils'

export default function Blogs() {
	return (
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
	)
}
