'use client';
import Link from 'next/link';
import { ProjectProps } from '../utils/types';
import clsx from 'clsx';
import Image from 'next/image';
import Text from '../ui/Text';

export default function ProjectCard({ project }: { project: ProjectProps }) {
	const ProjectIcon = project.src;

	return (
		<Link
			href={project.href}
			target='_blank'
			key={project.key}
			id={project.key}
			className={clsx(
				'cursor-pointer',
				'flex gap-2 w-full',
				project.bgColor,
				'group p-2 transition-all duration-200 rounded-lg focus:outline-dashed focus:outline-2 focus:outline-offset-0 items-center'
			)}
		>
			<div
				className={clsx(
					project.imageStyles,
					'dark:bg-opacity-[0.2] rounded-lg group-hocus:bg-opacity-0 h-[64px] w-[64px] flex items-center'
				)}
			>
				{typeof project.src === 'string' ? (
					<Image
						alt='featured-project'
						src={project.src}
						width={64}
						height={64}
						className={clsx('p-1 transition group-hocus:scale-110 min-w-[64px]')}
					/>
				) : (
					<ProjectIcon width={52} height={40} className='p-1 transition group-hocus:scale-110' />
				)}
			</div>
			<div className='flex flex-col items-start w-full gap-2'>
				<Text
					transitioned={false}
					className={`h-full font-bold p-0 group-hocus:underline decoration-2 underline-offset-2 ${project.titleStyles}`}
				>
					{project.title}
				</Text>

				<Text transitioned={false} className='h-full font-semibold text-sm p-0 '>
					{project.description}
				</Text>

				<div className='flex gap-2 flex-wrap items-center'>
					{project.stack &&
						project.stack.length > 0 &&
						project.stack.map((skill) => (
							<Text
								as='div'
								key={skill}
								className={clsx(
									'transition-colors h-[20px]',
									'group-hocus:bg-inherit dark:bg-opacity-20',
									'border border-transparent group-hocus:border-opacity-50',
									'group-hocus:text-black dark:text-text-light dark:group-hocus:text-white',
									'rounded-md p-[4px] ',
									'text-xs font-medium items-center flex gap-1',
									project.metaDataStyles
								)}
							>
								{skill}
							</Text>
						))}
				</div>
			</div>
		</Link>
	);
}
