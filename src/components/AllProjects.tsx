'use client';

import Text from '@/src/ui/Text';
import Button from '@/src/ui/Button';
import { ResumeIcon } from '@/src/Icons';
import { PROJECTS, resumeUrl } from '@/src/utils/constants';
import { ProjectProps } from '@/utils/types';
import ProjectCard from './ProjectCard';

const AllProjects = () => {
	return (
		<section id='featured-projects' className='flex flex-col gap-8'>
			<div
				id='featured-projects-header'
				className='flex flex-col gap-6 laptop:flex-row justify-between items-start laptop:items-center'
			>
				<Text
					variant='shadow'
					gFrom='dark:from-yellow-400'
					gTo='dark:to-purple-500'
					shadowColor='purple'
					className='font-bold text-3xl text-heading-dark'
					as={'h1'}
				>
					Projects
				</Text>

				<Button
					height='h-[42px]'
					width='w-fit'
					focusOutlined
					className='group p-4 flex gap-1 justify-center items-center rounded-lg
							 hocus:-translate-y-[1px] hocus:shadow-md 
							 hocus:bg-zinc-100 dark:hocus:bg-zinc-800
							 border border-zinc-200 hocus:border-primary-800 dark:border-zinc-800 dark:hover:border-primary-200'
					hoverable={false}
					onClick={() => window.open(resumeUrl, '_blank')}
				>
					<ResumeIcon width={24} height={24} color='#fff' className='fill-text-dark dark:fill-white transition' />
					<Text
						transitioned={false}
						className='h-full dark:text-white text-text-dark font-extrabold dark:font-bold p-0'
					>
						Resume
					</Text>
				</Button>
			</div>
			<div id='featured-projects-content' className='w-full flex flex-col gap-4'>
				{PROJECTS.map((project: ProjectProps) => (
					<ProjectCard key={project.key} project={project} />
				))}
			</div>
		</section>
	);
};

export default AllProjects;
