import AnimatePage from '@/components/AnimatePage'
import AboutSection from '@/components/about/AboutSection'
import Contact from '@/components/about/Contact'
import Experience from '@/components/about/Experience'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'About - Shubhdeep Chhabra',
}

export default function About() {
	return (
		<AnimatePage>
			<section className='flex flex-col gap-16'>
				<AboutSection />
				<Experience />
				<Contact />
			</section>
		</AnimatePage>
	)
}
