import Link from 'next/link';

const NotFound = () => {
	return (
		<section className='hero-minimal' aria-label='Page not found'>
			<div className='hero-lead'>
				<p
					style={{
						fontFamily: 'var(--font-dm-mono), ui-monospace, monospace',
						fontSize: '11px',
						fontWeight: 400,
						letterSpacing: '0.1em',
						textTransform: 'uppercase',
						color: 'var(--faint)',
						margin: '0 0 12px',
					}}
				>
					404
				</p>
				<h1 className='hero-name'>Page not found.</h1>
				<p className='hero-tagline'>
					{"The page you're looking for doesn't exist or has been moved. Double-check the URL."}
				</p>
			</div>
			<nav className='hero-links' aria-label='Recovery links'>
				<Link href='/' className='hero-link'>
					Home
				</Link>
				<Link href='/writings' className='hero-link'>
					Writings
				</Link>
			</nav>
		</section>
	);
};

export default NotFound;
