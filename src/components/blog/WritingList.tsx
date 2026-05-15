'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { IoLinkOutline } from 'react-icons/io5';
import { useBlogViews } from '@/src/hooks/useBlogViews';

export type WritingListItem = {
	slug: string;
	title: string;
	description: string;
	publishedAt: string;
	readingTimeText: string;
	category: string;
	categories: string[];
};

function GlowTag({ label }: { label: string }) {
	const ref = useRef<HTMLSpanElement>(null);

	const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
		const el = ref.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
		el.style.setProperty('--my', `${e.clientY - rect.top}px`);
	};

	return (
		<span ref={ref} className='b-card-tag' onMouseMove={handleMouseMove}>
			{label}
		</span>
	);
}

function CardCopyPill({
	copied,
	onCopy,
	'aria-label': ariaLabel,
	title,
}: {
	copied: boolean;
	onCopy: (e: React.MouseEvent) => void;
	'aria-label': string;
	title: string;
}) {
	const ref = useRef<HTMLButtonElement>(null);

	const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
		const el = ref.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
		el.style.setProperty('--my', `${e.clientY - rect.top}px`);
	};

	return (
		<button
			ref={ref}
			type='button'
			className={`b-card-copy-pill ${copied ? 'b-card-copy-pill--done' : ''}`}
			aria-label={ariaLabel}
			title={title}
			onClick={onCopy}
			onMouseMove={handleMouseMove}
		>
			{copied ? (
				<span className='b-card-copy-pill__icon' aria-hidden>
					✓
				</span>
			) : (
				<IoLinkOutline className='b-card-copy-pill__icon' aria-hidden />
			)}
		</button>
	);
}

function WritingCard({ item }: { item: WritingListItem }) {
	const { views, isLoading } = useBlogViews(item.slug);
	const [copied, setCopied] = useState(false);
	const cardRef = useRef<HTMLLIElement>(null);
	const glowRef = useRef<HTMLDivElement>(null);
	const rafRef = useRef<number>(0);
	const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Inner spotlight on card surface
	const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
		const el = cardRef.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
		el.style.setProperty('--my', `${e.clientY - rect.top}px`);
	};

	// Border glow: tracks window mouse, rotates conic-gradient to face cursor
	useEffect(() => {
		const handleMove = (e: MouseEvent) => {
			if (!cardRef.current || !glowRef.current) return;
			if (rafRef.current) cancelAnimationFrame(rafRef.current);

			rafRef.current = requestAnimationFrame(() => {
				const el = cardRef.current!;
				const glow = glowRef.current!;
				const { left, top, width, height } = el.getBoundingClientRect();

				const proximity = 80;
				const isNear =
					e.clientX > left - proximity &&
					e.clientX < left + width + proximity &&
					e.clientY > top - proximity &&
					e.clientY < top + height + proximity;

				if (!isNear) {
					glow.style.opacity = '0';
					return;
				}

				const angle = (Math.atan2(e.clientY - (top + height / 2), e.clientX - (left + width / 2)) * 180) / Math.PI + 90;

				glow.style.setProperty('--start', `${angle}deg`);
				glow.style.opacity = '1';
			});
		};

		window.addEventListener('mousemove', handleMove);
		return () => {
			window.removeEventListener('mousemove', handleMove);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, []);

	useEffect(() => {
		return () => {
			if (copyTimer.current) clearTimeout(copyTimer.current);
		};
	}, []);

	const copyPostLink = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		const origin = typeof window !== 'undefined' ? window.location.origin : '';
		const url = `${origin}/writings/${item.slug}`;
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			if (copyTimer.current) clearTimeout(copyTimer.current);
			copyTimer.current = setTimeout(() => setCopied(false), 1600);
		} catch {
			setCopied(false);
		}
	};

	return (
		<li ref={cardRef} className='b-card-wrapper' onMouseMove={handleMouseMove}>
			<div ref={glowRef} className='b-card-glow' aria-hidden='true' />
			<div className='b-card'>
				<Link href={`/writings/${item.slug}`} className='b-card-hit' aria-label={`Read: ${item.title}`}>
					<span className='b-card-hit-text'>{item.title}</span>
				</Link>
				<div className='b-card-surface'>
					<div className='b-card-top'>
						<div className='b-card-title'>{item.title}</div>
						<div className='b-card-meta'>
							<span className='b-card-date'>
								{new Date(item.publishedAt).toLocaleDateString('en-US', {
									month: 'short',
									year: 'numeric',
								})}
							</span>
							<CardCopyPill
								copied={copied}
								onCopy={copyPostLink}
								aria-label={copied ? 'Link copied' : 'Copy link to this post'}
								title={copied ? 'Copied' : 'Copy link'}
							/>
						</div>
					</div>
					<div className='b-card-tags'>
						<GlowTag label={item.category} />
						<GlowTag label={item.readingTimeText} />
						{!isLoading && <GlowTag label={`${views || 0} reads`} />}
					</div>
				</div>
			</div>
		</li>
	);
}

export default function WritingList({ items }: { items: WritingListItem[] }) {
	const [activeFilter, setActiveFilter] = useState('all');
	const availableFilters = useMemo(() => {
		const categories = new Set(items.flatMap((item) => item.categories));
		return ['all', ...Array.from(categories)];
	}, [items]);

	const filteredItems = useMemo(() => {
		if (activeFilter === 'all') return items;
		return items.filter((item) => item.categories.includes(activeFilter));
	}, [activeFilter, items]);

	return (
		<>
			<div className='blog-filters' role='tablist' aria-label='Writing filters'>
				{availableFilters.map((filter) => (
					<button
						key={filter}
						type='button'
						role='tab'
						aria-selected={activeFilter === filter}
						onClick={() => setActiveFilter(filter)}
						className={`blog-filter-btn ${activeFilter === filter ? 'blog-filter-btn--active' : ''}`}
					>
						{filter === 'all' ? 'All' : filter}
					</button>
				))}
			</div>
			<ul className='b-list'>
				{filteredItems.map((item) => (
					<WritingCard key={item.slug} item={item} />
				))}
			</ul>
		</>
	);
}
