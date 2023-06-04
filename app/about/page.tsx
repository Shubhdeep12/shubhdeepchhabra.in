import AboutSection from '@/components/about/AboutSection'
import Contact from '@/components/about/Contact'
import Experience from '@/components/about/Experience'

export default function About() {
	return (
		<section className='flex flex-col gap-16 p-2'>
			<AboutSection />
			<Experience />
			<Contact />
		</section>
	)
}
