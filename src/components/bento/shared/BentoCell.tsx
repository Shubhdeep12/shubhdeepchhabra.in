'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface BentoCellProps {
	children: ReactNode;
	className?: string;
	colSpan?: number;
	rowSpan?: number;
	delay?: number;
}

const BentoCell = ({ children, className = '', colSpan = 1, rowSpan = 1, delay = 0 }: BentoCellProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay }}
			className={clsx(
				'relative rounded-3xl overflow-hidden',
				'bg-gradient-to-br from-white/5 to-white/10',
				'backdrop-blur-xl border border-white/10',
				'hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]',
				'transition-all duration-300',
				className
			)}
			style={{
				gridColumn: `span ${colSpan}`,
				gridRow: `span ${rowSpan}`,
			}}
			whileHover={{
				scale: 1.02,
				transition: { duration: 0.2 },
			}}
		>
			<div className='absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300' />
			<div className='relative z-10 p-6 h-full'>{children}</div>
		</motion.div>
	);
};

export default BentoCell;
