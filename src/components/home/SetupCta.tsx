import Link from 'next/link';

export default function SetupCta() {
	return (
		<Link href='/setup' className='desk-cta'>
			What&apos;s on my desk
			<span className='desk-cta-arrow' aria-hidden='true'>
				→
			</span>
		</Link>
	);
}
