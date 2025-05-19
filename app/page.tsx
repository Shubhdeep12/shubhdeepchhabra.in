import RecentBlogs from '@/src/components/home/RecentBlogs';
import FeaturedProjects from '@/src/components/home/FeaturedProjects';
import Intro from '@/src/components/home/Intro';
import SkillsPills from '@/src/components/home/Skills';
import AnimatePage from '@/src/components/shared/animations/AnimatePage';

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
