'use client';

import SetupMonogram from '@/src/components/setup/SetupMonogram';
import type { SetupItem } from '@/src/utils/setup';

type SetupItemCardProps = {
	item: SetupItem;
	index: number;
};

export default function SetupItemCard({ item, index }: SetupItemCardProps) {
	const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
		e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
	};

	return (
		<li>
			<a
				className='setup-card'
				href={item.href}
				target='_blank'
				rel={item.affiliate ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
				onMouseMove={handleMouseMove}
			>
				<div className='setup-card-top'>
					<SetupMonogram name={item.name} image={item.image} />
					<span className='setup-card-index'>{String(index + 1).padStart(2, '0')}</span>
				</div>
				<div className='setup-card-body'>
					<p className='setup-card-brand'>{item.brand}</p>
					<h3 className='setup-card-name'>
						{item.name}
						{item.badge ? <span className='setup-card-badge'>{item.badge}</span> : null}
					</h3>
					<p className='setup-card-note'>{item.note}</p>
				</div>
				<span className='setup-card-cta'>
					{item.affiliate ? 'Get it' : 'Visit'}
					<span className='setup-card-arrow' aria-hidden='true'>
						↗
					</span>
					{item.affiliate ? (
						<span className='setup-card-aff' title='Affiliate link'>
							aff
						</span>
					) : null}
				</span>
			</a>
		</li>
	);
}
