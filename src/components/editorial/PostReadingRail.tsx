'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useState } from 'react';

const ARTICLE_SELECTOR = '#post-content';
const HEADING_SELECTOR = `${ARTICLE_SELECTOR} h2, ${ARTICLE_SELECTOR} h3`;

export type TocItem = {
	id: string;
	text: string;
	level: 2 | 3;
};

function slugifyHeadingText(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-');
}

function collectHeadings(): TocItem[] {
	if (typeof document === 'undefined') return [];
	const nodes = document.querySelectorAll<HTMLElement>(HEADING_SELECTOR);
	const items: TocItem[] = [];
	const usedIds = new Set<string>();
	for (const el of nodes) {
		const tag = el.tagName.toLowerCase();
		if (tag !== 'h2' && tag !== 'h3') continue;
		const level = tag === 'h2' ? 2 : 3;
		let id = el.id;
		if (!id) {
			const text = el.textContent?.trim() ?? '';
			id = slugifyHeadingText(text);
		}
		const text = el.textContent?.replace(/\s+/g, ' ').trim() ?? '';
		if (!id || !text) continue;
		let uniqueId = id;
		let n = 2;
		while (usedIds.has(uniqueId)) {
			uniqueId = `${id}-${n}`;
			n += 1;
		}
		usedIds.add(uniqueId);
		if (el.id !== uniqueId) el.id = uniqueId;
		items.push({ id: uniqueId, text, level });
	}
	return items;
}

type PostReadingRailProps = {
	mdxMarkdown: string;
};

export default function PostReadingRail(_props: PostReadingRailProps) {
	const navId = useId();
	const [items, setItems] = useState<TocItem[]>([]);
	const [activeId, setActiveId] = useState<string | null>(null);

	const refreshToc = useCallback(() => {
		setItems(collectHeadings());
	}, []);

	useEffect(() => {
		refreshToc();
		const root = document.querySelector(ARTICLE_SELECTOR);
		if (!root) return;
		const mo = new MutationObserver(() => {
			refreshToc();
		});
		mo.observe(root, { childList: true, subtree: true });
		return () => mo.disconnect();
	}, [refreshToc]);

	useEffect(() => {
		if (items.length === 0) {
			setActiveId(null);
			return;
		}
		const topOffset = 112;

		const updateActive = () => {
			let current = items[0]?.id ?? null;
			for (const item of items) {
				const el = document.getElementById(item.id);
				if (!el) continue;
				const rect = el.getBoundingClientRect();
				if (rect.top <= topOffset) current = item.id;
				else break;
			}
			setActiveId(current);
		};

		updateActive();
		window.addEventListener('scroll', updateActive, { passive: true });
		window.addEventListener('resize', updateActive);
		return () => {
			window.removeEventListener('scroll', updateActive);
			window.removeEventListener('resize', updateActive);
		};
	}, [items]);

	return (
		<aside className='post-reading-rail' aria-label='On this page'>
			{items.length > 0 ? (
				<div className='post-rail-section'>
					<p id={navId} className='post-rail-heading'>
						On this page
					</p>
					<nav className='post-rail-toc' aria-labelledby={navId}>
						<ul className='post-rail-toc-list'>
							{items.map((item) => (
								<li key={item.id} className={item.level === 3 ? 'post-rail-toc-item--sub' : ''}>
									<Link
										href={`#${item.id}`}
										className={`post-rail-toc-link ${activeId === item.id ? 'post-rail-toc-link--active' : ''}`}
										onClick={() => setActiveId(item.id)}
									>
										{item.text}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
			) : null}
		</aside>
	);
}
