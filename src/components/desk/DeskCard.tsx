'use client';

import { useRef } from 'react';
import { useBorderGlow } from '@/src/hooks/useBorderGlow';
import type { DeskItem } from '@/src/utils/setup';

export default function DeskCard({ item }: { item: DeskItem }) {
	const cardRef = useRef<HTMLLIElement>(null);
	const glowRef = useRef<HTMLDivElement>(null);
	useBorderGlow(cardRef, glowRef);

	return (
		<li ref={cardRef} className='b-card-wrapper'>
			<div ref={glowRef} className='b-card-glow' aria-hidden='true' />
			<a
				className='desk-card'
				href={item.href}
				target='_blank'
				rel={item.affiliate ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
			>
				<span className='desk-card-kind'>{item.kind}</span>
				<span className='b-card-title'>{item.title}</span>
				<p className='desk-card-desc'>{item.description}</p>
				<span className='desk-card-cta'>
					View on Amazon
					<span className='desk-card-arrow' aria-hidden='true'>
						↗
					</span>
				</span>
			</a>
		</li>
	);
}
