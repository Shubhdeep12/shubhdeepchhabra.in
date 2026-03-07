import { Metadata } from 'next';
import { FaRss } from 'react-icons/fa';
import AnimatePage from '@/src/components/AnimatePage';
import BlogList from '@/src/components/blog/BlogList';
import Button from '@/src/ui/Button';
import Text from '@/src/ui/Text';
import { Blog } from '@/utils/types';
import { getBlogGroups } from '../../src/utils/blog';

export const metadata: Metadata = {
	title: 'Blogs - Shubhdeep Chhabra',
	description: 'Articles on software development through eyes of Shubhdeep',
};

export default async function Blogs() {
	const allBlogs = await getBlogGroups();

	return (
		<AnimatePage>
			<div className='flex gap-10 w-full flex-col items-start'>
				<div className='flex justify-between w-full'>
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
					<Button
						height='h-[42px]'
						width='w-fit'
						type='a'
						focusOutlined
						className='p-4 flex gap-1 justify-center items-center rounded-lg bg-orange-500 hover:-translate-y-[1px] hover:shadow-md hover:bg-orange-600  dark:bg-orange-500 dark:hover:bg-orange-400'
						hoverable={false}
						href='https://www.shubhdeepchhabra.in/feed.xml'
						target='_blank'
					>
						<FaRss width={24} height={24} color='#fff' className='dark:fill-text-dark transition' aria-hidden />
						<Text
							transitioned={false}
							className='h-full text-white dark:text-text-dark font-extrabold dark:font-bold p-0'
						>
							RSS Feed
						</Text>
					</Button>
				</div>
				{allBlogs?.map((group: { year: number; blogs: Blog[] }) => (
					<BlogList key={group.year} blogList={group} />
				))}
			</div>
		</AnimatePage>
	);
}
