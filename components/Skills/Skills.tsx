'use client'
import React, { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import {
	CSSIcon,
	ExpressjsIcon,
	GitIcon,
	HTMLIcon,
	IconProps,
	JavaScriptIcon,
	MongoDBIcon,
	NextjsIcon,
	NodejsIcon,
	PythonIcon,
	ReactIcon,
	SemanticUIIcon,
	StyledComponentsIcon,
	TailwindIcon,
	TypeScriptIcon,
} from '@/assets/Icons'
import clsx from 'clsx'
import Text from '../Text'

type SkillProp = {
	id: string
	title: string
	bgColor: string
	borderColor: string
	wIcon: number
	hIcon: number
	position?: string
}

const SKILL_ICONS: Record<string, React.FC<IconProps>> = {
	react: ReactIcon,
	nextjs: NextjsIcon,
	javascript: JavaScriptIcon,
	typescript: TypeScriptIcon,
	styledcomponents: StyledComponentsIcon,
	html: HTMLIcon,
	css: CSSIcon,
	tailwind: TailwindIcon,
	semanticui: SemanticUIIcon,
	nodejs: NodejsIcon,
	express: ExpressjsIcon,
	mongodb: MongoDBIcon,
	git: GitIcon,
	python: PythonIcon,
}

const SKILLS: SkillProp[] = [
	{
		id: 'react',
		title: 'React',
		bgColor: 'hocus:bg-[#00c2e61f] dark:hocus:bg-[#00c2e62e]',
		borderColor: 'border hocus:border-[#00c2e68f] dark:hocus:border-[#00c2e68f]',
		wIcon: 19,
		hIcon: 19,
		position: 'left',
	},
	{
		id: 'nextjs',
		title: 'Next.js',
		bgColor: 'hocus:bg-[#00c2e61f] dark:hocus:bg-[#0070f32e]',
		borderColor: 'border hocus:border-[#0070f38f] dark:hocus:border-[#0070f38f]',
		wIcon: 19,
		hIcon: 19,
		position: 'right',
	},
	{
		id: 'javascript',
		title: 'JavaScript',
		bgColor: 'hocus:bg-[#f7df1e1f] dark:hocus:bg-[#f7df1e2e]',
		borderColor: 'border border-grey-100 dark:border-grey-400 hocus:border-[#f7df1e8f] dark:hocus:border-[#f7df1e8f]',
		wIcon: 15,
		hIcon: 15,
		position: 'left',
	},
	{
		id: 'typescript',
		title: 'TypeScript',
		bgColor: 'hocus:bg-[#3178c61f] dark:hocus:bg-[#3178c62e]',
		borderColor: 'border hocus:border-[#3178c68f] dark:hocus:border-[#3178c68f]',
		wIcon: 19,
		hIcon: 19,
		position: 'left',
	},
	{
		id: 'styledcomponents',
		title: 'Styled Components',
		bgColor: 'hocus:bg-[#c43bad1f] dark:hocus:bg-[#c43bad2e]',
		borderColor: 'border hocus:border-[#c43bad8f] dark:hocus:border-[#c43bad8f]',
		wIcon: 19,
		hIcon: 19,
		position: 'right',
	},
	{
		id: 'html',
		title: 'HTML 5',
		bgColor: 'hocus:bg-[#e349261f] dark:hocus:bg-[#e349262e]',
		borderColor: 'border hocus:border-[#e349268f] dark:hocus:border-[#e349268f]',
		wIcon: 19,
		hIcon: 19,
		position: 'left',
	},
	{
		id: 'css',
		title: 'CSS3',
		bgColor: 'hocus:bg-[#3572b51f] dark:hocus:bg-[#3572b52e]',
		borderColor: 'border hocus:border-[#3572b58f] dark:hocus:border-[#3572b58f]',
		wIcon: 19,
		hIcon: 19,
		position: 'left',
	},
	{
		id: 'tailwind',
		title: 'Tailwind CSS',
		bgColor: 'hocus:bg-[#38bdf81f] dark:hocus:bg-[#38bdf82e]',
		borderColor: 'border hocus:border-[#38bdf88f] dark:hocus:border-[#38bdf88f]',
		wIcon: 19,
		hIcon: 19,
		position: 'right',
	},
	{
		id: 'semanticui',
		title: 'Semantic UI',
		bgColor: 'hocus:bg-[#00c2e61f] dark:hocus:bg-[#00c2e62e]',
		borderColor: 'border hocus:border-[#00c2e68f] dark:hocus:border-[#00c2e68f]',
		wIcon: 19,
		hIcon: 19,
		position: 'right',
	},
	{
		id: 'nodejs',
		title: 'Node.js',
		bgColor: 'hocus:bg-[#38bdf81f] dark:hocus:bg-[#38bdf82e]',
		borderColor: 'border hocus:border-[#38bdf88f] dark:hocus:border-[#38bdf88f]',
		wIcon: 19,
		hIcon: 19,
		position: 'right',
	},
	{
		id: 'express',
		title: 'Express',
		bgColor: 'hocus:bg-[#8888881f] dark:hocus:bg-[#8888882e]',
		borderColor: 'border hocus:border-[#8888888f] dark:hocus:border-[#8888888f]',
		wIcon: 19,
		hIcon: 19,
		position: 'left',
	},
	{
		id: 'mongodb',
		title: 'MongoDB',
		bgColor: 'hocus:bg-[#69a14a1f] dark:hocus:bg-[#69a14a2e]',
		borderColor: 'border hocus:border-[#69a14a8f] dark:hocus:border-[#69a14a8f]',
		wIcon: 19,
		hIcon: 19,
		position: 'left',
	},
	{
		id: 'git',
		title: 'Git',
		bgColor: 'hocus:bg-[#fc6d261f] dark:hocus:bg-[#fc6d262e]',
		borderColor: 'border hocus:border-[#fc6d268f] dark:hocus:border-[#fc6d268f]',
		wIcon: 19,
		hIcon: 19,
		position: 'left',
	},
	{
		id: 'python',
		title: 'Python',
		bgColor: 'hocus:bg-[#0077e61f] dark:hocus:bg-[#0077e62e]',
		borderColor: 'border hocus:border-[#0077e68f] dark:hocus:border-[#0077e68f]',
		wIcon: 15,
		hIcon: 15,
		position: 'right',
	},
]

const Skills = () => {
	const containerControls = useAnimation()
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleScroll = () => {
			const containerOffsetTop = containerRef?.current?.offsetTop
			const scrollPosition = window.scrollY + window.innerHeight

			if (containerOffsetTop && scrollPosition >= containerOffsetTop) {
				containerControls.start('visible')
			}
		}
		handleScroll()
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0,
			},
		},
	}

	const skillVariants = (isLeft: boolean) => ({
		hidden: { x: `${isLeft ? '-100%' : '100%'}`, opacity: 0 },
		visible: { x: 0, opacity: 1 },
	})

	return (
		<div ref={containerRef}>
			<motion.div
				initial='hidden'
				animate={containerControls}
				variants={containerVariants}
				className='flex flex-wrap gap-2 justify-start'
			>
				{SKILLS.map((skill: SkillProp) => {
					const CurrentIcon: React.FC<IconProps> = SKILL_ICONS[skill.id]
					return (
						<motion.div
							key={skill.id}
							variants={skillVariants(skill.position === 'left')}
							transition={{ duration: 0.5 }}
							className='skill translateX(100%) relative '
						>
							<div
								className={clsx(
									'group w-auto h-auto p-2 rounded-full transition flex items-center gap-1 hocus:underline-none hocus:transform hocus:scale-[1.015]',
									'bg-background-primary-light dark:bg-background-primary-dark border border-gray-200 dark:border-gray-600',
									skill.bgColor,
									skill.borderColor
								)}
							>
								<CurrentIcon
									width={skill.wIcon}
									height={skill.hIcon}
									className='group-hocus:fill-black dark:group-hocus:fill-white transition'
								/>
								<Text className='text-sm font-bold group-hocus:text-black dark:group-hocus:text-white'>
									{skill.title}
								</Text>
							</div>
						</motion.div>
					)
				})}
			</motion.div>
		</div>
	)
}

export default Skills
