'use client'

import { useRouter } from 'next/navigation'
import Button from '../Button'
import Text from '../Text'
import { EyeIcon, ResumeIcon, StarIcon } from '@/assets/Icons'
import Link from 'next/link'
import Image from 'next/image'
import cx from 'clsx'

type ProjectProps = {
	key: string
	title: string
	description?: string
	github: boolean
	stars?: number
	imageUrl?: string
	bgColor: string
	metaDataStyles?: string
	imageStyles?: string
	titleStyles?: string
}
const PROJECTS: ProjectProps[] = [
	{
		key: 'blueprint',
		title: 'Demo Title',
		description: 'Demo description Demo description Demo description Demo description',
		github: true,
		stars: 569,
		imageUrl: '../assets/blueprint.png',
		bgColor: 'hocus:bg-sky-50 dark:hocus:bg-opacity-[0.14] dark:hocus:bg-sky-300',
		metaDataStyles: 'group-hocus:border-sky-200 dark:bg-sky-900 bg-sky-50',
		imageStyles: 'bg-sky-50 dark:bg-sky-700',
		titleStyles: 'dark:group-hocus:text-sky-400 group-hocus:text-sky-800',
	},
	{
		key: 'frames',
		title: 'Demo Title',
		description: 'Demo description Demo description Demo description Demo description',
		github: true,
		stars: 59,
		imageUrl: '../assets/blueprint.png',
		bgColor: 'hocus:bg-green-50 dark:hocus:bg-opacity-[0.14] dark:hocus:bg-green-300',
		metaDataStyles: 'group-hocus:border-green-200 dark:bg-green-900 bg-green-50',
		imageStyles: 'bg-green-50',
		titleStyles: 'dark:group-hocus:text-green-400 group-hocus:text-green-800',
	},
	{
		key: 'kuper',
		title: 'Demo Title',
		description: 'Demo description Demo description Demo description Demo description',
		github: false,
		stars: undefined,
		imageUrl: '../assets/blueprint.png',
		bgColor: 'hocus:bg-indigo-50 dark:hocus:bg-opacity-[0.14] dark:hocus:bg-indigo-300',
		metaDataStyles: 'group-hocus:border-indigo-200 dark:bg-indigo-900 bg-indigo-50',
		imageStyles: 'bg-indigo-50',
		titleStyles: 'dark:group-hocus:text-indigo-400 group-hocus:text-indigo-800',
	},
	{
		key: 'blueprint-1',
		title: 'Demo Title',
		description: 'Demo description Demo description Demo description Demo description',
		github: true,
		stars: 569,
		imageUrl: '../assets/blueprint.png',
		bgColor: 'hocus:bg-blue-50 dark:hocus:bg-opacity-[0.14] dark:hocus:bg-blue-300',
		metaDataStyles: 'group-hocus:border-blue-200 dark:bg-blue-900 bg-blue-50',
		imageStyles: 'bg-blue-50',
		titleStyles: 'dark:group-hocus:text-blue-400 group-hocus:text-blue-800',
	},
	{
		key: 'blueprint-2',
		title: 'Demo Title',
		description: 'Demo description Demo description Demo description Demo description',
		github: true,
		stars: 569,
		imageUrl: '../assets/blueprint.png',
		bgColor: 'hocus:bg-purple-50 dark:hocus:bg-opacity-[0.14] dark:hocus:bg-purple-300',
		metaDataStyles: 'group-hocus:border-purple-200 dark:bg-purple-900 bg-purple-50',
		imageStyles: 'bg-purple-50',
		titleStyles: 'dark:group-hocus:text-purple-400 group-hocus:text-purple-800',
	},
]

const FeaturedProjects = () => {
	const router = useRouter()

	return (
		<section id='featured-projects' className='flex flex-col gap-4'>
			<div
				id='featured-projects-header'
				className='flex flex-col gap-6 laptop:flex-row justify-between items-start laptop:items-center'
			>
				<Text
					variant='shadow'
					gFrom='dark:from-pink-500'
					gTo='dark:to-purple-500'
					shadowColor='purple'
					className='font-bold text-3xl text-heading-dark'
				>
					Featured Projects
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
								'https://drive.google.com/file/d/1aIe1fWQVOSE3OnegyE6yzEp6dhw5vZ9g/view?usp=sharing',
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
					<Button
						height='h-[42px]'
						width='w-fit'
						focusOutlined
						className='p-4 flex gap-1 justify-center items-center rounded-lg bg-blue-700 hover:-translate-y-[1px] hover:shadow-md hover:bg-blue-800  dark:bg-blue-500 dark:hover:bg-blue-400'
						hoverable={false}
						onClick={() => router.push('/projects')}
					>
						<EyeIcon width={24} height={24} color='#fff' className='dark:fill-text-dark transition' />
						<Text
							transitioned={false}
							className='h-full text-white dark:text-text-dark font-extrabold dark:font-bold p-0'
						>
							View All
						</Text>
					</Button>
				</div>
			</div>
			<div id='featured-projects-content' className='w-full flex flex-col gap-4'>
				{PROJECTS.map((project: ProjectProps) => (
					<Link
						href=''
						key={project.key}
						id={project.key}
						className={cx(
							'cursor-pointer',
							'flex gap-2 w-full',
							project.bgColor,
							'group p-2 transition-all duration-200 rounded-lg focus:outline-dashed focus:outline-2 focus:outline-offset-0'
						)}
					>
						<Image
							alt='p1'
							src={require('../../assets/blueprint.png')}
							className={cx(
								'p-1 dark:bg-opacity-[0.07] transition rounded-lg group-hocus:bg-opacity-0 group-hocus:scale-110 min-w-[64px]',
								project.imageStyles
							)}
						/>
						<div className='flex flex-col justify-around items'>
							<div className='flex gap-2 items-center'>
								<Text
									transitioned={false}
									className={`transition h-full font-bold p-0 group-hocus:underline decoration-2 underline-offset-2 ${project.titleStyles}`}
								>
									{project.title}
								</Text>
								{project.github && project.stars && project.stars > 0 && (
									<div
										className={cx(
											'transition-all h-[20px]',
											'group-hocus:bg-inherit dark:bg-opacity-20',
											'border border-transparent group-hocus:border-opacity-50',
											'group-hocus:text-black dark:text-text-light dark:group-hocus:text-white',
											'rounded-md p-[4px] ',
											'text-xs font-medium items-center flex gap-1',
											project.metaDataStyles
										)}
									>
										<StarIcon
											color='#383838'
											width={10}
											className='group-hocus:fill-black dark:fill-text-light dark:group-hocus:fill-white'
										/>
										{project.stars}
									</div>
								)}
							</div>
							<Text transitioned={false} className='h-full font-semibold text-sm p-0'>
								{project.description}
							</Text>
						</div>
					</Link>
				))}
			</div>
		</section>
	)
}

export default FeaturedProjects
