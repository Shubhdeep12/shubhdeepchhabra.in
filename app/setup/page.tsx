import { Metadata } from 'next';
import Link from 'next/link';
import AnimatePage from '@/src/components/AnimatePage';
import DeskCard from '@/src/components/desk/DeskCard';
import Footer from '@/src/components/Footer';
import { DESK } from '@/src/utils/setup';

export const metadata: Metadata = {
	title: 'Desk - Shubhdeep Chhabra',
	description: 'The desk setup Shubhdeep Chhabra uses every day.',
	alternates: {
		canonical: 'https://okshubh.in/setup',
	},
	openGraph: {
		type: 'website',
		title: 'Desk - Shubhdeep Chhabra',
		description: 'The desk setup I use every day.',
		url: 'https://okshubh.in/setup',
		locale: 'en_US',
		siteName: 'Shubhdeep Chhabra',
	},
};

export default function SetupPage() {
	return (
		<AnimatePage>
			<section className='blog-page'>
				<div className='blog-page-header'>
					<Link href='/' className='blog-home-link'>
						Shubhdeep Chhabra
					</Link>
					<h1 className='blog-page-title'>Desk</h1>
					<p className='page-subheader'>The few things on my desk I use every day.</p>
				</div>

				<ul className='desk-grid'>
					{DESK.map((item) => (
						<DeskCard key={item.title} item={item} />
					))}
				</ul>

				<p className='desk-note'>
					Some of these are affiliate links. If you buy through one, I may earn a small commission at no extra cost to
					you. It genuinely helps, thank you.
				</p>
			</section>
			<Footer />
		</AnimatePage>
	);
}
