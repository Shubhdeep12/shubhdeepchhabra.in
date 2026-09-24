'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { FiMoon, FiSun } from 'react-icons/fi';
import { runViewTransition, useReadingMode } from '@/src/hooks/useReadingMode';

const isTypingTarget = (el: EventTarget | null) => {
	if (!(el instanceof HTMLElement)) return false;
	return el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName);
};

/**
 * Page glyph: four lines of text. In reading mode a drop cap drops in and the first
 * two lines wrap around it — the icon turns into a printed page.
 */
function PageGlyph() {
	return (
		<svg className='reading-glyph' viewBox='0 0 20 16' width='20' height='16' aria-hidden='true'>
			<rect className='reading-glyph-cap' x='0' y='0.5' width='5.5' height='6.5' rx='1' />
			<rect className='reading-glyph-line reading-glyph-line--wrap' x='0' y='1' width='20' height='1.6' rx='0.8' />
			<rect className='reading-glyph-line reading-glyph-line--wrap' x='0' y='5' width='20' height='1.6' rx='0.8' />
			<rect className='reading-glyph-line' x='0' y='9' width='20' height='1.6' rx='0.8' />
			<rect className='reading-glyph-line reading-glyph-line--short' x='0' y='13' width='20' height='1.6' rx='0.8' />
		</svg>
	);
}

export default function ReadingDock() {
	const { isReading, toggleReading } = useReadingMode();
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.metaKey || e.ctrlKey || e.altKey || e.repeat || isTypingTarget(e.target)) return;
			if (e.key === 'r' || e.key === 'R') toggleReading();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [toggleReading]);

	const isDark = mounted && resolvedTheme === 'dark';

	const toggleTheme = () => {
		const next = isDark ? 'light' : 'dark';
		runViewTransition(() => {
			// Runs after the old frame is captured. Apply the class directly and flush React so the
			// new snapshot is complete; next-themes then persists the choice.
			const root = document.documentElement;
			root.classList.toggle('dark', next === 'dark');
			root.classList.toggle('light', next === 'light');
			root.style.colorScheme = next;
			flushSync(() => setTheme(next));
		}, 'theme');
	};

	return (
		<div className='reading-dock' role='group' aria-label='Display preferences'>
			<button
				type='button'
				className='reading-dock-btn reading-dock-theme'
				onClick={toggleTheme}
				aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
				title={isDark ? 'Light' : 'Dark'}
			>
				{mounted ? isDark ? <FiSun aria-hidden /> : <FiMoon aria-hidden /> : <span className='reading-dock-icon-ph' />}
			</button>
			<span className='reading-dock-divider' aria-hidden='true' />
			<button
				type='button'
				role='switch'
				aria-checked={mounted ? isReading : false}
				aria-keyshortcuts='R'
				className='reading-dock-btn reading-switch'
				onClick={toggleReading}
				title={isReading ? 'Back to screen mode (R)' : 'Reading mode (R)'}
			>
				<PageGlyph />
				<span className='reading-switch-label'>
					<span className='reading-switch-label-off'>Read</span>
					<span className='reading-switch-label-on'>Paper</span>
				</span>
				<span className='reading-switch-track' aria-hidden='true'>
					<span className='reading-switch-thumb' />
				</span>
				<span className='sr-only'>Reading mode</span>
			</button>
		</div>
	);
}
