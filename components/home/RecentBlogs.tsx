import { getRecentBlogs } from '@/utils/blog'
import BlogList from '../blog/BlogList'
import { allBlogs } from '@/.contentlayer/generated'
import Text from '@/ui/Text'

const RecentBlogs = () => {
	return (
		<section id='skill-pills' className='flex flex-col gap-4 items-start'>
			<Text
				variant='shadow'
				gFrom='dark:from-purple-500'
				gTo='dark:to-yellow-500'
				shadowColor='yellow'
				className='font-bold text-2xl text-heading-dark'
				as={'h2'}
			>
				Recent Blogs
			</Text>
			<BlogList blogList={{ blogs: getRecentBlogs(allBlogs) }} />
		</section>
	)
}

export default RecentBlogs
