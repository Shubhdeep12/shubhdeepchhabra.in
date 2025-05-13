'use client';

import { useRouter } from 'next/navigation';
import Button from '@/src/ui/Button';
import Text from '@/src/ui/Text';
import { EyeIcon } from '@/src/Icons';
import { PROJECTS } from '@/src/utils/constants';
import { ProjectProps } from '@/utils/types';
import ProjectCard from '../ProjectCard';

const FeaturedProjects = () => {
	const router = useRouter();

	return (
		<section id='featured-projects' className='flex flex-col gap-4' role='region' aria-label='Featured projects'>
			<div
				id='featured-projects-header'
				className='flex flex-col gap-6 laptop:flex-row justify-between items-start laptop:items-center'
			>
				<Text
					variant='shadow'
					gFrom='dark:from-pink-500'
					gTo='dark:to-purple-500'
					shadowColor='purple'
					className='font-bold text-2xl text-heading-dark'
					as={'h2'}
				>
					Featured Projects
				</Text>

				<Button
					height='h-[42px]'
					width='w-fit'
					focusOutlined
					className='p-4 flex gap-1 justify-center items-center rounded-lg bg-primary-700 hover:-translate-y-[1px] hover:shadow-md hover:bg-primary-800  dark:bg-primary-500 dark:hover:bg-primary-400'
					hoverable={false}
					onClick={() => router.push('/projects')}
					aria-label='View all projects'
				>
					<EyeIcon width={24} height={24} color='#fff' className='dark:fill-text-dark transition' aria-hidden='true' />
					<Text
						transitioned={false}
						className='h-full text-white dark:text-text-dark font-extrabold dark:font-bold p-0'
					>
						View All
					</Text>
				</Button>
			</div>
			<div
				id='featured-projects-content'
				className='w-full flex flex-col gap-4'
				role='list'
				aria-label='Featured projects list'
			>
				{PROJECTS.map((project: ProjectProps) => {
					if (project.featured) {
						return <ProjectCard key={project.key} project={project} />;
					} else {
						return null;
					}
				})}
			</div>
		</section>
	);
};

export default FeaturedProjects;
