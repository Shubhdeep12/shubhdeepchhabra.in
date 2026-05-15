import AnimatePage from '@/src/components/AnimatePage';
import Intro from '@/src/components/home/Intro';

const Home = () => {
	return (
		<AnimatePage>
			<section className='home-page'>
				<Intro />
			</section>
		</AnimatePage>
	);
};

export default Home;
