import { Metadata } from 'next';
import AnimatePage from '@/src/components/AnimatePage';
import Intro from '@/src/components/home/Intro';

// Home page metadata - extends root layout metadata
export const metadata: Metadata = {
	title: 'Shubhdeep Chhabra',
	description:
		'Product-focused Software Engineer writing about software engineering, architecture, and practical product lessons.',
	alternates: {
		canonical: 'https://www.shubhdeepchhabra.in',
	},
	openGraph: {
		type: 'website',
		title: 'Shubhdeep Chhabra',
		description:
			'Product-focused Software Engineer writing about software engineering, architecture, and practical product lessons.',
		url: 'https://www.shubhdeepchhabra.in',
		locale: 'en_US',
		siteName: 'Shubhdeep Chhabra',
	},
};

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
