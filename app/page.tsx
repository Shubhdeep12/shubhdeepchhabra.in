import FeaturedProjects from '@/components/home/FeaturedProjects'
import Intro from '@/components/home/Intro'
import SkillsPills from '@/components/home/Skills'

const Home = () => {
	return (
		<section className='flex flex-col gap-16'>
			<Intro />

			<FeaturedProjects />

			<SkillsPills />
		</section>
	)
}

export default Home
