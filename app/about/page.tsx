import AnimatePage from '@/src/components/AnimatePage';
import AboutSection from '@/src/components/about/AboutSection';
import Contact from '@/src/components/about/Contact';
import Experience from '@/src/components/about/Experience';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'About - Shubhdeep Chhabra',
};

export default function About() {
	return (
		<AnimatePage>
			<section className='flex flex-col gap-16'>
				<AboutSection />
				<Experience />
				<Contact />
			</section>
		</AnimatePage>
	);
}
