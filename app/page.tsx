'use client'
import RecentBlogs from '@/components/home/RecentBlogs'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import Intro from '@/components/home/Intro'
import SkillsPills from '@/components/home/Skills'
import { AnimatePresence, motion } from 'framer-motion'

const Home = () => {
	return (
		<AnimatePresence>
			<motion.div
				key={'1'}
				initial={{ y: 100, opacity: 0.4 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ type: 'spring', damping: 10, stiffness: 100 }}
			>
				<section className='flex flex-col gap-16 overflow-hidden'>
					<Intro />
					<SkillsPills />
					<FeaturedProjects />
					<RecentBlogs />
				</section>
			</motion.div>
		</AnimatePresence>
	)
}

export default Home
