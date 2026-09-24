'use client';

import { useEffect, useRef } from 'react';

// Thin ink line at the top of the viewport; only visible in reading mode (see globals.css).
export default function ReadingProgress() {
	const barRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let frame = 0;
		const update = () => {
			frame = 0;
			const article = document.querySelector<HTMLElement>('#post-content');
			const bar = barRef.current;
			if (!article || !bar) return;
			const rect = article.getBoundingClientRect();
			const total = rect.height - window.innerHeight;
			const progress = total <= 0 ? 1 : Math.min(1, Math.max(0, -rect.top / total));
			bar.style.transform = `scaleX(${progress})`;
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	}, []);

	return (
		<div className='reading-progress' aria-hidden='true'>
			<div ref={barRef} className='reading-progress-bar' />
		</div>
	);
}
