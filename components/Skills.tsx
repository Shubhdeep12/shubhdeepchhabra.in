'use client'
import React, { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import {
	CSSIcon,
	ExpressjsIcon,
	GitIcon,
	HTMLIcon,
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
} from '@/Icons'
import clsx from 'clsx'
import Text from '@/ui/Text'
import { SKILLS } from '@/utils/constants'
import { IconProps, SkillProp } from '@/utils/types'

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

const Skills = () => {
	const containerControls = useAnimation()
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleScroll = () => {
			const containerOffsetTop = containerRef?.current?.offsetTop
			const scrollPosition = window.scrollY + window.innerHeight

			if (containerOffsetTop && scrollPosition >= containerOffsetTop - 20) {
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
							transition={{ duration: 0.35 }}
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
