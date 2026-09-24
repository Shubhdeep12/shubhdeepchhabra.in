'use client';
import { useCallback, useSyncExternalStore } from 'react';

export const READING_STORAGE_KEY = 'reading-mode';
const CHANGE_EVENT = 'reading-mode-change';
const POST_PATH = /^\/(writings|blog)\/[^/]+\/?$/;

/** Reading mode only applies on individual posts; the preference is remembered everywhere. */
export const isPostPath = (pathname: string | null) => !!pathname && POST_PATH.test(pathname);

// Runs before first paint (inlined in <head>) so a returning reader never sees a flash of the screen theme.
export const readingModeInitScript = `try{if(localStorage.getItem('${READING_STORAGE_KEY}')==='on'&&${POST_PATH}.test(location.pathname))document.documentElement.dataset.reading='on'}catch(e){}`;

type ViewTransitionDocument = Document & {
	startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

let preference: boolean | null = null;

function readPreference(): boolean {
	if (preference === null) {
		try {
			preference = localStorage.getItem(READING_STORAGE_KEY) === 'on';
		} catch {
			preference = false;
		}
	}
	return preference;
}

export function applyReadingMode(on: boolean) {
	const root = document.documentElement;
	if (on) root.dataset.reading = 'on';
	else delete root.dataset.reading;
}

function subscribe(onChange: () => void) {
	const onStorage = (e: StorageEvent) => {
		if (e.key !== READING_STORAGE_KEY) return;
		preference = e.newValue === 'on';
		onChange();
	};
	window.addEventListener(CHANGE_EVENT, onChange);
	window.addEventListener('storage', onStorage);
	return () => {
		window.removeEventListener(CHANGE_EVENT, onChange);
		window.removeEventListener('storage', onStorage);
	};
}

const getServerSnapshot = () => false;

/**
 * Wraps a DOM update in a View Transition when the browser supports it and the user
 * hasn't asked for reduced motion. `name` selects the animation in globals.css.
 */
export function runViewTransition(update: () => void, name: string) {
	const doc = document as ViewTransitionDocument;
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (!doc.startViewTransition || reduceMotion) {
		update();
		return;
	}
	const root = document.documentElement;
	root.dataset.vt = name;
	doc.startViewTransition(update).finished.finally(() => {
		delete root.dataset.vt;
	});
}

export function useReadingMode() {
	const isReading = useSyncExternalStore(subscribe, readPreference, getServerSnapshot);

	const setReading = useCallback((on: boolean) => {
		preference = on;
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

	const toggleReading = useCallback(() => setReading(!readPreference()), [setReading]);

	return { isReading, setReading, toggleReading };
}
