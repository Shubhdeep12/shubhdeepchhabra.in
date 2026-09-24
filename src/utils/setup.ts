export type SetupItem = {
	name: string;
	brand: string;
	/** One line on why it earns a spot on the desk. */
	note: string;
	href: string;
	/** Marks the link as an affiliate link (rendered with rel="sponsored" and a marker). */
	affiliate?: boolean;
	/** Short highlight such as "Daily driver". */
	badge?: string;
	/** Optional product image in /public; a gradient monogram is shown otherwise. */
	image?: string;
};

export type SetupCategory = {
	key: string;
	title: string;
	blurb: string;
	items: SetupItem[];
};

export const SETUP_UPDATED_AT = '2026-09-24';

// TODO(shubhdeep): placeholder gear + URLs — replace hrefs with real affiliate links.
export const SETUP: SetupCategory[] = [
	{
		key: 'workstation',
		title: 'Workstation',
		blurb: 'The machines everything else plugs into.',
		items: [
			{
				name: 'MacBook Pro 14"',
				brand: 'Apple',
				note: 'Fast enough that builds stopped being coffee breaks. Silent under load.',
				href: 'https://www.apple.com/macbook-pro/',
				affiliate: true,
				badge: 'Daily driver',
			},
			{
				name: 'UltraFine 27" 4K',
				brand: 'LG',
				note: 'Crisp text at 2x scaling — the single biggest upgrade for reading code all day.',
				href: 'https://www.lg.com/',
				affiliate: true,
			},
			{
				name: 'Laptop stand',
				brand: 'Rain Design mStand',
				note: 'Puts the laptop screen at eye level next to the monitor. Solid aluminium, zero wobble.',
				href: 'https://www.raindesigninc.com/',
				affiliate: true,
			},
		],
	},
	{
		key: 'input',
		title: 'Input',
		blurb: 'Things my hands touch ten thousand times a day.',
		items: [
			{
				name: 'Q1 Pro',
				brand: 'Keychron',
				note: 'Gasket-mounted, quiet, and wireless. Typing on it is genuinely pleasant.',
				href: 'https://www.keychron.com/',
				affiliate: true,
				badge: 'Favourite',
			},
			{
				name: 'MX Master 3S',
				brand: 'Logitech',
				note: 'The horizontal scroll wheel is made for timelines, spreadsheets and wide diffs.',
				href: 'https://www.logitech.com/',
				affiliate: true,
			},
			{
				name: 'Desk mat',
				brand: 'Grovemade',
				note: 'Wool felt. Warm under the wrists and it makes the whole desk feel calm.',
				href: 'https://grovemade.com/',
				affiliate: true,
			},
		],
	},
	{
		key: 'audio-desk',
		title: 'Audio & Desk',
		blurb: 'Focus, calls, and not wrecking my back.',
		items: [
			{
				name: 'WH-1000XM5',
				brand: 'Sony',
				note: 'Noise cancelling that turns any café into a quiet room.',
				href: 'https://electronics.sony.com/',
				affiliate: true,
			},
			{
				name: 'ScreenBar Halo',
				brand: 'BenQ',
				note: 'Lights the desk without glare on the screen. Late-night sessions got easier on the eyes.',
				href: 'https://www.benq.com/',
				affiliate: true,
			},
			{
				name: 'Standing desk',
				brand: 'FlexiSpot E7',
				note: 'I switch between sitting and standing a few times a day. Motor is quiet and steady.',
				href: 'https://www.flexispot.com/',
				affiliate: true,
			},
		],
	},
	{
		key: 'software',
		title: 'Software',
		blurb: 'Where the actual work happens.',
		items: [
			{
				name: 'Cursor',
				brand: 'Anysphere',
				note: 'My editor. AI in the loop without leaving the keyboard.',
				href: 'https://cursor.com/',
				badge: 'Daily driver',
			},
			{
				name: 'Ghostty',
				brand: 'Terminal',
				note: 'Fast, native, and configured in a single text file.',
				href: 'https://ghostty.org/',
			},
			{
				name: 'Raycast',
				brand: 'Launcher',
				note: 'Window management, clipboard history and snippets in one shortcut.',
				href: 'https://www.raycast.com/',
			},
			{
				name: 'Arc',
				brand: 'Browser',
				note: 'Spaces keep work, side projects and reading separate.',
				href: 'https://arc.net/',
			},
			{
				name: 'Linear',
				brand: 'Planning',
				note: 'Keyboard-first issue tracking that stays out of the way.',
				href: 'https://linear.app/',
			},
			{
				name: 'Figma',
				brand: 'Design',
				note: 'For sketching UI before it becomes code.',
				href: 'https://www.figma.com/',
			},
		],
	},
];

export const SETUP_ITEM_COUNT = SETUP.reduce((count, category) => count + category.items.length, 0);

/** Stable hue per item so each monogram tile keeps its colour across renders. */
export function hueFor(name: string): number {
	let hash = 0;
	for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
	return Math.abs(hash) % 360;
}

export function monogramFor(name: string): string {
	const letters = name.replace(/[^A-Za-z0-9 ]/g, '').trim();
	const words = letters.split(/\s+/).filter(Boolean);
	if (words.length >= 2) return `${words[0][0]}${words[1][0]}`.toUpperCase();
	return letters.slice(0, 2).toUpperCase();
}
