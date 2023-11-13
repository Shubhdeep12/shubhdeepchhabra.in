'use client'
import AllProjects from '@/components/AllProjects'
import { AnimatePresence, motion } from 'framer-motion'

export default function Projects() {
	return (
		<AnimatePresence>
			<motion.div
				key={'1'}
				initial={{ y: 100, opacity: 0.4 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ type: 'spring', damping: 10, stiffness: 100 }}
			>
				<AllProjects />
			</motion.div>
		</AnimatePresence>
	)
}
