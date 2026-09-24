'use client';

import Image from 'next/image';
import { useRef } from 'react';
import DeskArt from '@/src/components/desk/DeskArt';
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
				<span className='desk-card-stage'>
					{item.image ? (
						<Image
							src={item.image}
							alt={item.title}
							fill
							sizes='(max-width: 600px) 90vw, 380px'
							className='desk-card-photo'
						/>
					) : (
						<DeskArt kind={item.art} />
					)}
				</span>
				<span className='desk-card-body'>
					<span className='desk-card-kind'>{item.kind}</span>
					<span className='b-card-title'>{item.title}</span>
					<span className='desk-card-specs'>
						{item.specs.map((spec) => (
							<span key={spec} className='desk-card-spec'>
								{spec}
							</span>
						))}
					</span>
					<span className='desk-card-desc'>{item.description}</span>
					<span className='desk-card-cta'>
						View on Amazon
						<span className='desk-card-arrow' aria-hidden='true'>
							↗
						</span>
					</span>
				</span>
			</a>
		</li>
	);
}
