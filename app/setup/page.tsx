import { Metadata } from 'next';
import Link from 'next/link';
import AnimatePage from '@/src/components/AnimatePage';
import Footer from '@/src/components/Footer';
import SetupItemCard from '@/src/components/setup/SetupItemCard';
import { SETUP, SETUP_ITEM_COUNT, SETUP_UPDATED_AT } from '@/src/utils/setup';

export const metadata: Metadata = {
	title: 'Setup - Shubhdeep Chhabra',
	description: 'The hardware, desk gear and software Shubhdeep Chhabra uses every day to build, write and ship.',
	alternates: {
		canonical: 'https://okshubh.in/setup',
	},
	openGraph: {
		type: 'website',
		title: 'Setup - Shubhdeep Chhabra',
		description: 'The hardware, desk gear and software I use every day to build, write and ship.',
		url: 'https://okshubh.in/setup',
		locale: 'en_US',
		siteName: 'Shubhdeep Chhabra',
	},
};

const updatedLabel = new Date(SETUP_UPDATED_AT).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

export default function SetupPage() {
	return (
		<AnimatePage>
			<section className='blog-page setup-page'>
				<div className='blog-page-header'>
					<Link href='/' className='blog-home-link'>
						Shubhdeep Chhabra
					</Link>
					<h1 className='blog-page-title'>Setup</h1>
					<p className='page-subheader'>
						The hardware, desk gear and software I use every day to build, write and ship — only the things that
						survived daily use.
					</p>
					<div className='setup-meta'>
						<span>{SETUP_ITEM_COUNT} items</span>
						<span aria-hidden='true'>·</span>
						<span>{SETUP.length} categories</span>
						<span aria-hidden='true'>·</span>
						<span>Updated {updatedLabel}</span>
					</div>
				</div>

				<nav className='setup-jump' aria-label='Setup categories'>
					{SETUP.map((category) => (
						<a key={category.key} href={`#${category.key}`} className='blog-filter-btn'>
							{category.title}
						</a>
					))}
				</nav>

				<p className='setup-disclosure'>
					<span className='setup-card-aff'>aff</span>
					Some links are affiliate links. If you buy through them I may earn a small commission, at no extra cost to
					you. It helps keep the writing going.
				</p>

				{SETUP.map((category) => (
					<section
						key={category.key}
						id={category.key}
						className='setup-section'
						aria-labelledby={`${category.key}-title`}
					>
						<div className='section-header'>
							<h2 id={`${category.key}-title`} className='section-header-title'>
								{category.title}
							</h2>
							<span className='blog-post-count'>{category.items.length}</span>
						</div>
						<p className='setup-section-blurb'>{category.blurb}</p>
						<ul className='setup-grid'>
							{category.items.map((item, index) => (
								<SetupItemCard key={item.name} item={item} index={index} />
							))}
						</ul>
					</section>
				))}
			</section>
			<Footer />
		</AnimatePage>
	);
}
