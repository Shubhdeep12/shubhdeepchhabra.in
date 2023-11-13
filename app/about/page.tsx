'use client'
import AboutSection from '@/components/about/AboutSection'
import Contact from '@/components/about/Contact'
import Experience from '@/components/about/Experience'
import { AnimatePresence, motion } from 'framer-motion'

export default function About() {
	return (
		<AnimatePresence>
			<motion.div
				key={'1'}
				initial={{ y: 100, opacity: 0.4 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ type: 'spring', damping: 10, stiffness: 100 }}
			>
				<section className='flex flex-col gap-16'>
					<AboutSection />
					<Experience />
					<Contact />
				</section>
			</motion.div>
		</AnimatePresence>
	)
}
