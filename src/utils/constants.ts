export const resumeUrl = 'https://drive.google.com/file/d/1ncn2GYtIvrQQR2puMP7E68bfLhtNEU5v/view?usp=sharing';

export const NAVIGATIONBAR_ITEMS = {
	blog: {
		key: 'blog',
		title: 'Writings',
		route: '/writings',
		gFrom: 'from-primary-700',
		gTo: 'to-primary-500',
	},
};

export const FOOTER_NAVBAR_ITEMS = [
	{
		...NAVIGATIONBAR_ITEMS.blog,
		underline: 'hocus:decoration-primary-600',
		target: '_self',
	},
];

export const SOCIALS = [
	{
		key: 'github',
		icon: 'github',
		className: 'group-hocus:fill-black dark:group-hocus:fill-zinc-200 dark:fill-zinc-400',
		action: 'https://github.com/Shubhdeep12',
	},
	{
		key: 'linkedin',
		icon: 'linkedin',
		className: 'group-hocus:fill-primary-700 dark:fill-zinc-400',
		action: 'https://www.linkedin.com/in/shubhdeepchhabra/',
	},
	{
		key: 'x',
		icon: 'x',
		className:
			'group-hocus:fill-black group-hocus:stroke-black dark:group-hocus:fill-zinc-200 dark:group-hocus:stroke-zinc-200 dark:stroke-zinc-400',
		action: 'https://x.com/okshubhh',
	},
];
