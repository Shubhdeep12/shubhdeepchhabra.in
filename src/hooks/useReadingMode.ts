'use client';
import { useCallback, useSyncExternalStore } from 'react';

export const READING_STORAGE_KEY = 'reading-mode';
const CHANGE_EVENT = 'reading-mode-change';

// Runs before first paint (inlined in <head>) so a returning reader never sees a flash of the screen theme.
export const readingModeInitScript = `try{if(localStorage.getItem('${READING_STORAGE_KEY}')==='on')document.documentElement.dataset.reading='on'}catch(e){}`;

type ViewTransitionDocument = Document & {
	startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

function applyReadingMode(on: boolean) {
	const root = document.documentElement;
	if (on) root.dataset.reading = 'on';
	else delete root.dataset.reading;
}

function subscribe(onChange: () => void) {
	const onStorage = (e: StorageEvent) => {
		if (e.key !== READING_STORAGE_KEY) return;
		applyReadingMode(e.newValue === 'on');
		onChange();
	};
	window.addEventListener(CHANGE_EVENT, onChange);
	window.addEventListener('storage', onStorage);
	return () => {
		window.removeEventListener(CHANGE_EVENT, onChange);
		window.removeEventListener('storage', onStorage);
	};
}

const getSnapshot = () => document.documentElement.dataset.reading === 'on';
const getServerSnapshot = () => false;

/**
 * Wraps a DOM update in a View Transition when the browser supports it and the user
 * hasn't asked for reduced motion. `name` selects the animation in globals.css.
 */
export function runViewTransition(update: () => void, name: string, origin?: { x: number; y: number }) {
	const doc = document as ViewTransitionDocument;
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (!doc.startViewTransition || reduceMotion) {
		update();
		return;
	}
	const root = document.documentElement;
	root.dataset.vt = name;
	if (origin) {
		root.style.setProperty('--vt-x', `${origin.x}px`);
		root.style.setProperty('--vt-y', `${origin.y}px`);
	}
	doc.startViewTransition(update).finished.finally(() => {
		delete root.dataset.vt;
	});
}

export function useReadingMode() {
	const isReading = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

	const setReading = useCallback((on: boolean) => {
		runViewTransition(
			() => {
				applyReadingMode(on);
				window.dispatchEvent(new Event(CHANGE_EVENT));
			},
			on ? 'reading-on' : 'reading-off'
		);
		try {
			localStorage.setItem(READING_STORAGE_KEY, on ? 'on' : 'off');
		} catch {
			// Storage can be unavailable (private mode); the mode still applies for this visit.
		}
	}, []);

	const toggleReading = useCallback(() => setReading(!getSnapshot()), [setReading]);

	return { isReading, setReading, toggleReading };
}
