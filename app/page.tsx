import RecentBlogs from '@/components/home/RecentBlogs'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import Intro from '@/components/home/Intro'
import SkillsPills from '@/components/home/Skills'
import AnimatePage from '@/components/AnimatePage'

const Home = () => {
	return (
		<AnimatePage>
			<section className='flex flex-col gap-16 overflow-hidden px-2'>
				<Intro />
				<SkillsPills />
				<FeaturedProjects />
				<RecentBlogs />
			</section>
		</AnimatePage>
	)
}

export default Home
