export type DeskItem = {
	name: string;
	/** What it is, shown as a small label. */
	kind: string;
	/** One line on why it's on the desk. */
	note: string;
	href: string;
	/** Affiliate links get rel="sponsored". */
	affiliate?: boolean;
};

export const DESK: DeskItem[] = [
	{
		name: 'MacBook Pro',
		kind: 'Laptop',
		note: 'Where everything gets built. Fast, silent, and the battery lasts the whole day.',
		href: 'https://link.amazon/B08LL6FBW',
		affiliate: true,
	},
	{
		name: 'BenQ Monitor',
		kind: 'Display',
		note: 'A big, sharp screen for code on one side and the browser on the other.',
		href: 'https://link.amazon/B0ccTE4C4',
		affiliate: true,
	},
	{
		name: 'AULA F75',
		kind: 'Keyboard',
		note: 'A 75% mechanical board with a soft, thocky sound. Great to type on all day.',
		href: 'https://link.amazon/B05hshnNt',
		affiliate: true,
	},
	{
		name: 'Magic Mouse',
		kind: 'Mouse',
		note: 'Gestures just work with macOS, and it keeps the desk clean.',
		href: 'https://link.amazon/B0aKLUJYx',
		affiliate: true,
	},
];
