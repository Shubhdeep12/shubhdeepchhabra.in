export type DeskArtKind = 'laptop' | 'mouse' | 'keyboard' | 'monitor';

export type DeskItem = {
	title: string;
	/** What it is, shown as a small label. */
	kind: string;
	/** Short spec chips. */
	specs: string[];
	description: string;
	href: string;
	/** Line illustration shown when there's no photo. */
	art: DeskArtKind;
	/** Optional product photo in /public (e.g. '/desk/macbook-air.png'); replaces the illustration. */
	image?: string;
	/** Affiliate links get rel="sponsored". */
	affiliate?: boolean;
};

export const DESK: DeskItem[] = [
	{
		title: 'MacBook Air 13″',
		kind: 'Laptop',
		specs: ['M4', '16GB', '512GB', 'Sky Blue'],
		description: 'Apple M4 with a 10-core CPU and 8-core GPU. Thin, fanless and completely silent.',
		href: 'https://link.amazon/B08LL6FBW',
		art: 'laptop',
		affiliate: true,
	},
	{
		title: 'Magic Mouse',
		kind: 'Mouse',
		specs: ['Multi-Touch', 'USB-C', 'White'],
		description: 'Swipe and scroll on the Multi-Touch surface. Charges over USB-C.',
		href: 'https://link.amazon/B0aKLUJYx',
		art: 'mouse',
		affiliate: true,
	},
	{
		title: 'AULA F75',
		kind: 'Keyboard',
		specs: ['75%', 'Hot-swap', 'Tri-mode', 'Cedar Green'],
		description: 'Wireless mechanical keyboard with pre-lubed Reaper linear switches. 2.4GHz, Bluetooth or USB-C.',
		href: 'https://link.amazon/B05hshnNt',
		art: 'keyboard',
		affiliate: true,
	},
	{
		title: 'BenQ GW2790Q',
		kind: 'Display',
		specs: ['27″', '2K QHD', '100Hz', 'IPS'],
		description: '2560×1440 IPS panel with 99% sRGB and flicker-free Eye-Care. Easy on the eyes all day.',
		href: 'https://link.amazon/B0ccTE4C4',
		art: 'monitor',
		affiliate: true,
	},
];
