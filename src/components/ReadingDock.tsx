'use client';

import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { FiMoon, FiSun } from 'react-icons/fi';
import { applyReadingMode, isPostPath, runViewTransition, useReadingMode } from '@/src/hooks/useReadingMode';

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
	const onPost = isPostPath(usePathname());

	useEffect(() => setMounted(true), []);

	// Paper only exists on posts: keep the page in sync with the saved preference as the reader navigates.
	// Waits for mount so the hydration pass (which reads the server's "off") can't undo the pre-paint script.
	useEffect(() => {
		if (mounted) applyReadingMode(isReading && onPost);
	}, [mounted, isReading, onPost]);

	useEffect(() => {
		if (!onPost) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.metaKey || e.ctrlKey || e.altKey || e.repeat || isTypingTarget(e.target)) return;
			if (e.key === 'r' || e.key === 'R') toggleReading();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [toggleReading, onPost]);

	const isDark = mounted && resolvedTheme === 'dark';
	const showSwitch = mounted && onPost;

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
			<div className='reading-dock-slot' data-open={showSwitch || undefined} inert={!showSwitch}>
				<div className='reading-dock-slot-inner'>
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
			</div>
		</div>
	);
}
