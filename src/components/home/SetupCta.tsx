import Link from 'next/link';
import SetupMonogram from '@/src/components/setup/SetupMonogram';
import { SETUP, SETUP_ITEM_COUNT } from '@/src/utils/setup';

// First item of each hardware category makes a small fanned "stack" of gear.
const PREVIEW = SETUP.filter((category) => category.key !== 'software')
	.map((category) => category.items[0])
	.slice(0, 3);

export default function SetupCta() {
	return (
		<Link href='/setup' className='setup-cta' aria-label={`My setup: ${SETUP_ITEM_COUNT} things I use every day`}>
			<span className='setup-cta-stack' aria-hidden='true'>
				{PREVIEW.map((item) => (
					<SetupMonogram key={item.name} name={item.name} image={item.image} size='sm' className='setup-cta-tile' />
				))}
			</span>
			<span className='setup-cta-copy'>
				<span className='setup-cta-title'>What&apos;s on my desk</span>
				<span className='setup-cta-sub'>{SETUP_ITEM_COUNT} pieces of gear &amp; software I use every day</span>
			</span>
			<span className='setup-cta-arrow' aria-hidden='true'>
				→
			</span>
		</Link>
	);
}
