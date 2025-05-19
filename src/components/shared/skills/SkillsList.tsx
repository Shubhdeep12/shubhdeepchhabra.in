'use client';
import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import Text from '@/src/ui/Text';
import { SKILLS } from '@/src/utils/constants';
import Pill from '../ui/Pill';

const SkillsList = () => {
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

export default SkillsList;
