'use client';

import { type ReactNode, useLayoutEffect, useRef } from 'react';
import { RESUME_SHEET_WIDTH } from './fit';

/** Holds the fixed-width resume sheet and zooms it to the available width (pinch-zoom still works on phones). */
export default function ResumeCanvas({ children }: { children: ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;
		const fit = () => el.style.setProperty('--resume-zoom', String(Math.min(1, el.clientWidth / RESUME_SHEET_WIDTH)));
		fit();
		const observer = new ResizeObserver(fit);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		// The inline fit script may set --resume-zoom on this element before hydration.
		<div ref={ref} className='resume-canvas' suppressHydrationWarning>
			{children}
		</div>
	);
}
