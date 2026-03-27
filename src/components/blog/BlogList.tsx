'use client';
import clsx from 'clsx';
import PostListItem from '@/src/components/editorial/PostListItem';
import { Blog } from '@/utils/types';

type BlogListProps = {
	blogList: { year?: number; blogs: Blog[] };
	className?: string;
};

const BlogList = ({ blogList, className = '' }: BlogListProps) => {
	return (
		<div className={clsx('flex flex-col gap-6 w-full', className)}>
			{blogList.year && (
				<div className='w-full flex gap-2 items-end'>
					<h2 className='text-h2 font-semibold text-text-default justify-start'>{blogList.year}</h2>
					<span className='flex-grow border-b border-border-default h-6' />
				</div>
			)}

			{blogList?.blogs?.map((item: Blog) => (
				<PostListItem key={item.frontMatter.title} blog={item} />
			))}
		</div>
	);
};

export default BlogList;
