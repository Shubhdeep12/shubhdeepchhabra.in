'use client';
import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
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

const skillVariants = (isLeft: boolean) => ({
	hidden: { x: `${isLeft ? '-100%' : '100%'}`, opacity: 0 },
	visible: { x: 0, opacity: 1 },
});

const Pill = React.memo(function Pill({ skill }: { skill: SkillProp }) {
	const CurrentIcon: React.FC<IconProps> = SKILL_ICONS[skill.id] || null;

	return (
		<motion.div
			key={skill.id}
			variants={skillVariants(skill.position === 'left')}
			transition={{ duration: 0.2 }}
			className='skill translateX(100%) relative will-change-transform'
			role='listitem'
			aria-label={`Skill: ${skill.title}`}
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
						aria-hidden='true'
					/>
				)}
				<Text className='text-sm font-bold group-hocus:text-black dark:group-hocus:text-white'>{skill.title}</Text>
			</div>
		</motion.div>
	);
});

const Skills = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = React.useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const containerOffsetTop = containerRef?.current?.offsetTop;
			const scrollPosition = window.scrollY + window.innerHeight;

			if (containerOffsetTop && scrollPosition >= containerOffsetTop - 20) {
				setIsVisible(true);
			}
		};
		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const containerVariants = useMemo(
		() => ({
			hidden: { opacity: 0 },
			visible: {
				opacity: 1,
				transition: {
					duration: 0.2,
					when: 'beforeChildren',
					staggerChildren: 0.02,
				},
			},
		}),
		[]
	);

	const categories = useMemo(() => Array.from(SKILLS.entries()), []);

	return (
		<div ref={containerRef} role='region' aria-label='Skills section' className='will-change-transform'>
			<motion.div
				initial='hidden'
				animate={isVisible ? 'visible' : 'hidden'}
				variants={containerVariants}
				className='flex flex-wrap gap-4 items-start flex-col'
			>
				{categories.map(([category, skills]) => (
					<motion.div
						key={category}
						className='flex flex-wrap gap-2'
						variants={{
							hidden: { opacity: 0 },
							visible: { opacity: 1 },
						}}
					>
						<Text className='font-bold text-base' as={'h3'}>
							{category}&nbsp;:&nbsp;
						</Text>
						<div role='list' aria-label={`${category} skills`} className='flex flex-wrap gap-2'>
							{skills.map((skill) => (
								<Pill key={skill.id} skill={skill} />
							))}
						</div>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
};

export default Skills;
