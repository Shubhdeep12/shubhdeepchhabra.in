'use client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

function AnimatePage({ children }: { children: ReactNode }) {
	const reduceMotion = useReducedMotion();

	return (
		<AnimatePresence>
			<motion.div
				key={'1'}
				initial={reduceMotion ? false : { y: 16, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={reduceMotion ? { duration: 0 } : { type: 'spring', damping: 18, stiffness: 120 }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}

export default AnimatePage;
