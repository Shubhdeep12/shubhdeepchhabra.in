'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'

function AnimatePage({ children }: { children: ReactNode }) {
	return (
		<AnimatePresence>
			<motion.div
				key={'1'}
				initial={{ y: 100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ type: 'spring', damping: 10, stiffness: 100 }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}

export default AnimatePage
