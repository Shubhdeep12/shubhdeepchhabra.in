'use client';

import { motion } from 'framer-motion';
import BentoCell from '../shared/BentoCell';
import { Blog } from '@/utils/types';
import Intro from '@/src/components/main/home/Intro';
import SkillsPills from '@/src/components/main/home/Skills';
import FeaturedProjects from '@/src/components/main/home/FeaturedProjects';
import RecentBlogs from '@/src/components/main/home/RecentBlogs';

interface BentoGridLayoutProps {
	recentBlogs: Blog[];
}

const BentoGridLayout = ({ recentBlogs }: BentoGridLayoutProps) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto'
		>
			{/* Hero Section - Large Card */}
			<BentoCell colSpan={2} rowSpan={2} delay={0.1}>
				<Intro />
			</BentoCell>

			{/* Skills Section - Small Card */}
			<BentoCell colSpan={1} rowSpan={1} delay={0.2}>
				<SkillsPills />
			</BentoCell>

			{/* Projects Section - Medium Card */}
			<BentoCell colSpan={2} rowSpan={2} delay={0.3}>
				<FeaturedProjects />
			</BentoCell>

			{/* Recent Blogs Section - Tall Card */}
			<BentoCell colSpan={1} rowSpan={2} delay={0.4}>
				<RecentBlogs blogs={recentBlogs} />
			</BentoCell>
		</motion.div>
	);
};

export default BentoGridLayout;
