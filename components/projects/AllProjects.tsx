'use client'

import Text from '../Text'
import Button from '../Button'
import { ResumeIcon } from '@/Icons'
import Link from 'next/link'
import clsx from 'clsx'
import Image from 'next/image'
import { PROJECTS, ProjectProps } from '../home/constants'

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
				>
					Projects
				</Text>

				<div id='actions' className='flex gap-3'>
					<Button
						height='h-[42px]'
						width='w-fit'
						focusOutlined
						className='group p-4 flex gap-1 justify-center items-center rounded-lg
							 hocus:-translate-y-[1px] hocus:shadow-md 
							 hocus:bg-slate-100 dark:hocus:bg-slate-800
							 border border-slate-200 hocus:border-blue-800 dark:border-slate-800 dark:hover:border-blue-200'
						hoverable={false}
						onClick={() =>
							window.open(
								'https://drive.google.com/file/d/1STSGQCdoRVDA8mw5Xx103b3blEhvf8-O/view?usp=sharing',
								'_blank'
							)
						}
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
			</div>
			<div id='featured-projects-content' className='w-full flex flex-col gap-4'>
				{PROJECTS.map((project: ProjectProps) => (
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
							<Image
								alt='featured-project'
								src={project.src}
								width={64}
								height={64}
								className={clsx('p-1 transition group-hocus:scale-110 min-w-[64px]')}
							/>
						</div>
						<div className='flex flex-col items-start w-full gap-2'>
							<Text
								transitioned={false}
								className={`transition h-full font-bold p-0 group-hocus:underline decoration-2 underline-offset-2 ${project.titleStyles}`}
							>
								{project.title}
							</Text>

							<Text transitioned={false} className='h-full font-semibold text-sm p-0 '>
								{project.description}
							</Text>

							<div className='flex gap-2 items-center'>
								{project.stack &&
									project.stack.length > 0 &&
									project.stack.map((skill) => (
										<div
											key={skill}
											className={clsx(
												'transition-all h-[20px]',
												'group-hocus:bg-inherit dark:bg-opacity-20',
												'border border-transparent group-hocus:border-opacity-50',
												'group-hocus:text-black dark:text-text-light dark:group-hocus:text-white',
												'rounded-md p-[4px] ',
												'text-xs font-medium items-center flex gap-1',
												project.metaDataStyles
											)}
										>
											{skill}
										</div>
									))}
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	)
}

export default AllProjects
