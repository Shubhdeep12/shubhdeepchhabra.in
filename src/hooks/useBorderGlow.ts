'use client';
import { type RefObject, useEffect } from 'react';

/**
 * Rotates a card's conic border glow (`--start`) to face the cursor while it's near the card,
 * and tracks the inner spotlight position (`--mx`/`--my`) on the card itself.
 */
export function useBorderGlow(cardRef: RefObject<HTMLElement | null>, glowRef: RefObject<HTMLElement | null>) {
	useEffect(() => {
		let frame = 0;
		const handleMove = (e: MouseEvent) => {
			if (frame) cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const card = cardRef.current;
				const glow = glowRef.current;
				if (!card || !glow) return;
				const { left, top, width, height } = card.getBoundingClientRect();

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
				card.style.setProperty('--mx', `${e.clientX - left}px`);
				card.style.setProperty('--my', `${e.clientY - top}px`);
			});
		};

		window.addEventListener('mousemove', handleMove);
		return () => {
			window.removeEventListener('mousemove', handleMove);
			if (frame) cancelAnimationFrame(frame);
		};
	}, [cardRef, glowRef]);
}
