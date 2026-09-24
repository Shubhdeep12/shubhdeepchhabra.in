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

// TODO(shubhdeep): swap hrefs for your affiliate links and fill in exact models.
export const DESK: DeskItem[] = [
	{
		name: 'MacBook Pro',
		kind: 'Laptop',
		note: 'Where everything gets built. Fast, silent, and the battery lasts the whole day.',
		href: 'https://www.apple.com/macbook-pro/',
		affiliate: true,
	},
	{
		name: 'Monitor',
		kind: 'Display',
		note: 'A big, sharp screen for code on one side and the browser on the other.',
		href: '#',
		affiliate: true,
	},
	{
		name: 'AULA F75',
		kind: 'Keyboard',
		note: 'A 75% mechanical board with a soft, thocky sound. Great to type on all day.',
		href: 'https://www.aulacn.com/',
		affiliate: true,
	},
	{
		name: 'Magic Mouse',
		kind: 'Mouse',
		note: 'Gestures just work with macOS, and it keeps the desk clean.',
		href: 'https://www.apple.com/shop/product/MXK53AM/A/magic-mouse-usb-c-white-multi-touch-surface',
		affiliate: true,
	},
];
