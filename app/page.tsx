import AnimatePage from '@/src/components/AnimatePage';
import FeaturedProjects from '@/src/components/home/FeaturedProjects';
import Intro from '@/src/components/home/Intro';
import RecentBlogs from '@/src/components/home/RecentBlogs';
import SkillsPills from '@/src/components/home/Skills';

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
	);
};

export default Home;
