'use client';
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
	CSSIcon,
	ESlintIcon,
	ExpressjsIcon,
	GitIcon,
	HTMLIcon,
	JavaScriptIcon,
	JestIcon,
	MongoDBIcon,
	NextjsIcon,
	NodejsIcon,
	PythonIcon,
	ReactIcon,
	ReduxIcon,
	SemanticUIIcon,
	ShadcnUI,
	StyledComponentsIcon,
	TailwindIcon,
	TypeScriptIcon,
	ViteIcon,
	WebpackIcon,
} from '@/src/Icons';
import clsx from 'clsx';
import Text from '@/src/ui/Text';
import { SKILLS } from '@/src/utils/constants';
import { IconProps, SkillProp } from '@/utils/types';

const SKILL_ICONS: Record<string, React.FC<IconProps>> = {
	javascript: JavaScriptIcon,
	typescript: TypeScriptIcon,
	react: ReactIcon,
	nextjs: NextjsIcon,
	tailwind: TailwindIcon,
	styledcomponents: StyledComponentsIcon,
	semanticui: SemanticUIIcon,
	html: HTMLIcon,
	css: CSSIcon,
	nodejs: NodejsIcon,
	express: ExpressjsIcon,
	mongodb: MongoDBIcon,
	git: GitIcon,
	python: PythonIcon,
	shadcnui: ShadcnUI,
	vite: ViteIcon,
	redux: ReduxIcon,
	jest: JestIcon,
	eslint: ESlintIcon,
	webpack: WebpackIcon,
};

const Skills = () => {
	const containerControls = useAnimation();
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			const containerOffsetTop = containerRef?.current?.offsetTop;
			const scrollPosition = window.scrollY + window.innerHeight;

			if (containerOffsetTop && scrollPosition >= containerOffsetTop - 20) {
				containerControls.start('visible');
			}
		};
		handleScroll();
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0,
			},
		},
	};

	const skillVariants = (isLeft: boolean) => ({
		hidden: { x: `${isLeft ? '-100%' : '100%'}`, opacity: 0 },
		visible: { x: 0, opacity: 1 },
	});

	function Pill({ skill }: { skill: SkillProp }) {
		const CurrentIcon: React.FC<IconProps> = SKILL_ICONS[skill.id] || null;

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
					{CurrentIcon && (
						<CurrentIcon
							width={skill.wIcon}
							height={skill.hIcon}
							className='group-hocus:fill-black dark:group-hocus:fill-white transition'
						/>
					)}
					<Text className='text-sm font-bold group-hocus:text-black dark:group-hocus:text-white'>{skill.title}</Text>
				</div>
			</motion.div>
		);
	}

	return (
		<div ref={containerRef}>
			<motion.div
				initial='hidden'
				animate={containerControls}
				variants={containerVariants}
				className='flex flex-wrap gap-4 items-start flex-col'
			>
				{Array.from(SKILLS.keys()).map((key) => (
					<div key={key} className='flex flex-wrap gap-2'>
						<Text className='font-bold text-base' as={'h4'}>
							{key}&nbsp;:&nbsp;
						</Text>
						{SKILLS.get(key)?.map((skill) => <Pill key={skill.id} skill={skill} />)}
					</div>
				))}
			</motion.div>
		</div>
	);
};

export default Skills;
