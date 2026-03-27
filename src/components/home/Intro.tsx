import Link from 'next/link';
import { resumeUrl } from '@/src/utils/constants';

const Intro = () => {
	return (
		<section className='hero-minimal' aria-label='Introduction'>
			<div className='hero-lead'>
				<h1 className='hero-name'>Shubhdeep Chhabra</h1>
				<p className='hero-tagline'>
					I build and experiment with web and AI systems, focusing on frontend, LLMs, and developer tools. Currently
					obsessed with DevTools.
				</p>
			</div>
			<nav className='hero-links' aria-label='Quick links'>
				<Link href='/writings' className='hero-link'>
					Writings
				</Link>
				<a href={resumeUrl} target='_blank' rel='noreferrer' className='hero-link'>
					Resume
				</a>
				<a href='mailto:chhabrashubhdeep@gmail.com' className='hero-link'>
					Email
				</a>
				<a href='https://github.com/Shubhdeep12' target='_blank' rel='noreferrer' className='hero-link'>
					GitHub
				</a>
				<a href='https://x.com/okshubhh' target='_blank' rel='noreferrer' className='hero-link'>
					X (Twitter)
				</a>
				<a href='https://www.linkedin.com/in/shubhdeepchhabra/' target='_blank' rel='noreferrer' className='hero-link'>
					LinkedIn
				</a>
			</nav>
		</section>
	);
};

export default Intro;
