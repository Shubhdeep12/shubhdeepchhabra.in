export type DeskItem = {
	title: string;
	/** What it is, shown as a small label. */
	kind: string;
	description: string;
	href: string;
	/** Affiliate links get rel="sponsored". */
	affiliate?: boolean;
};

export const DESK: DeskItem[] = [
	{
		title: 'Apple MacBook Pro',
		kind: 'Laptop',
		description: 'Apple silicon laptop with a Liquid Retina XDR display and all-day battery life.',
		href: 'https://link.amazon/B08LL6FBW',
		affiliate: true,
	},
	{
		title: 'Apple Magic Mouse',
		kind: 'Mouse',
		description: 'Wireless, rechargeable mouse with a Multi-Touch surface for gestures on macOS.',
		href: 'https://link.amazon/B0aKLUJYx',
		affiliate: true,
	},
	{
		title: 'AULA F75 Mechanical Keyboard',
		kind: 'Keyboard',
		description: '75% gasket-mount, hot-swappable board with wired, 2.4 GHz and Bluetooth modes.',
		href: 'https://link.amazon/B05hshnNt',
		affiliate: true,
	},
	{
		title: 'BenQ Monitor',
		kind: 'Display',
		description: 'Sharp, flicker-free display with eye-care modes for long coding sessions.',
		href: 'https://link.amazon/B0ccTE4C4',
		affiliate: true,
	},
];
