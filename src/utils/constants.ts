import { AuzmorLogo } from '@/src/Icons';
import { ProjectProps } from './types';

export const resumeUrl = 'https://drive.google.com/file/d/1le6TvIqCost3l8ZJ3xSJAsKSN-lh6mQ8/view?usp=sharing';

export const SKILLS = new Map([
	[
		'Languages',
		[
			{
				id: 'javascript',
				title: 'JavaScript',
				bgColor: 'hocus:bg-[#f7df1e1f] dark:hocus:bg-[#f7df1e2e]',
				borderColor:
					'border border-grey-100 dark:border-grey-400 hocus:border-[#f7df1e8f] dark:hocus:border-[#f7df1e8f]',
				wIcon: 15,
				hIcon: 15,
				position: 'left',
			},
			{
				id: 'typescript',
				title: 'TypeScript',
				bgColor: 'hocus:bg-[#3178c61f] dark:hocus:bg-[#3178c62e]',
				borderColor: 'border hocus:border-[#3178c68f] dark:hocus:border-[#3178c68f]',
				wIcon: 19,
				hIcon: 19,
				position: 'left',
			},
		],
	],
	[
		'Web Technologies',
		[
			{
				id: 'html',
				title: 'HTML5',
				bgColor: 'hocus:bg-[#e349261f] dark:hocus:bg-[#e349262e]',
				borderColor: 'border hocus:border-[#e349268f] dark:hocus:border-[#e349268f]',
				wIcon: 19,
				hIcon: 19,
				position: 'left',
			},
			{
				id: 'css',
				title: 'CSS3',
				bgColor: 'hocus:bg-[#3572b51f] dark:hocus:bg-[#3572b52e]',
				borderColor: 'border hocus:border-[#3572b58f] dark:hocus:border-[#3572b58f]',
				wIcon: 19,
				hIcon: 19,
				position: 'left',
			},
			{
				id: 'restapi',
				title: 'RESTful APIs',
				bgColor: 'hocus:bg-[#ff6f001f] dark:hocus:bg-[#ff6f002e]',
				borderColor: 'border hocus:border-[#ff6f008f] dark:hocus:border-[#ff6f008f]',
				wIcon: 19,
				hIcon: 19,
				position: 'right',
			},
			// {
			// 	id: 'graphql',
			// 	title: 'GraphQL',
			// 	bgColor: 'hocus:bg-[#e535ab1f] dark:hocus:bg-[#e535ab2e]',
			// 	borderColor: 'border hocus:border-[#e535ab8f] dark:hocus:border-[#e535ab8f]',
			// 	wIcon: 19,
			// 	hIcon: 19,
			// 	position: 'right',
			// },
		],
	],
	[
		'Frameworks & Libraries',
		[
			{
				id: 'react',
				title: 'React',
				bgColor: 'hocus:bg-[#00c2e61f] dark:hocus:bg-[#00c2e62e]',
				borderColor: 'border hocus:border-[#00c2e68f] dark:hocus:border-[#00c2e68f]',
				wIcon: 19,
				hIcon: 19,
				position: 'left',
			},
			{
				id: 'nextjs',
				title: 'Next.js',
				bgColor: 'hocus:bg-[#8888881f] dark:hocus:bg-[#8888881f]',
				borderColor: 'border hocus:border-[#8888888f] dark:hocus:border-[#8888888f]',
				wIcon: 19,
				hIcon: 19,
				position: 'right',
			},
			{
				id: 'redux',
				title: 'Redux',
				bgColor: 'hocus:bg-[#fc6d261f] dark:hocus:bg-[#fc6d262e]',
				borderColor: 'border hocus:border-[#fc6d268f] dark:hocus:border-[#fc6d268f]',
				wIcon: 19,
				hIcon: 19,
				position: 'left',
			},
			{
				id: 'tailwind',
				title: 'Tailwind CSS',
				bgColor: 'hocus:bg-[#38bdf81f] dark:hocus:bg-[#38bdf82e]',
				borderColor: 'border hocus:border-[#38bdf88f] dark:hocus:border-[#38bdf88f]',
				wIcon: 19,
				hIcon: 19,
				position: 'right',
			},
			{
				id: 'styledcomponents',
				title: 'Styled Components',
				bgColor: 'hocus:bg-[#c43bad1f] dark:hocus:bg-[#c43bad2e]',
				borderColor: 'border hocus:border-[#c43bad8f] dark:hocus:border-[#c43bad8f]',
				wIcon: 19,
				hIcon: 19,
				position: 'right',
			},
			{
				id: 'nodejs',
				title: 'Node.js',
				bgColor: 'hocus:bg-[#38bdf81f] dark:hocus:bg-[#38bdf82e]',
				borderColor: 'border hocus:border-[#38bdf88f] dark:hocus:border-[#38bdf88f]',
				wIcon: 19,
				hIcon: 19,
				position: 'right',
			},
			{
				id: 'express',
				title: 'Express',
				bgColor: 'hocus:bg-[#8888881f] dark:hocus:bg-[#8888882e]',
				borderColor: 'border hocus:border-[#8888888f] dark:hocus:border-[#8888888f]',
				wIcon: 19,
				hIcon: 19,
				position: 'left',
			},
			{
				id: 'quill',
				title: 'Quill',
				bgColor: 'hocus:bg-[#fc6d261f] dark:hocus:bg-[#fc6d262e]',
				borderColor: 'border hocus:border-[#fc6d268f] dark:hocus:border-[#fc6d268f]',
				wIcon: 19,
				hIcon: 19,
				position: 'left',
			},
		],
	],
	[
		'Tools & Platforms',
		[
			{
				id: 'webpack',
				title: 'Webpack',
				bgColor: 'hocus:bg-[#8dd6f91f] dark:hocus:bg-[#8dd6f92e]',
				borderColor: 'border hocus:border-[#8dd6f98f] dark:hocus:border-[#8dd6f98f]',
				wIcon: 19,
				hIcon: 19,
				position: 'left',
			},
			{
				id: 'vite',
				title: 'Vite',
				bgColor: 'hocus:bg-[#646cff1f] dark:hocus:bg-[#646cff2e]',
				borderColor: 'border hocus:border-[#646cff8f] dark:hocus:border-[#646cff8f]',
				wIcon: 19,
				hIcon: 19,
				position: 'right',
			},
			{
				id: 'eslint',
				title: 'ESLint',
				bgColor: 'hocus:bg-[#4b32c31f] dark:hocus:bg-[#4b32c32e]',
				borderColor: 'border hocus:border-[#4b32c38f] dark:hocus:border-[#4b32c38f]',
				wIcon: 19,
				hIcon: 19,
				position: 'right',
			},
			{
				id: 'git',
				title: 'Git',
				bgColor: 'hocus:bg-[#fc6d261f] dark:hocus:bg-[#fc6d262e]',
				borderColor: 'border hocus:border-[#fc6d268f] dark:hocus:border-[#fc6d268f]',
				wIcon: 19,
				hIcon: 19,
				position: 'left',
			},
			// {
			// 	id: 'docker',
			// 	title: 'Docker',
			// 	bgColor: 'hocus:bg-[#2496ed1f] dark:hocus:bg-[#2496ed2e]',
			// 	borderColor: 'border hocus:border-[#2496ed8f] dark:hocus:border-[#2496ed8f]',
			// 	wIcon: 19,
			// 	hIcon: 19,
			// 	position: 'left',
			// },
			// {
			// 	id: 'githubactions',
			// 	title: 'GitHub Actions',
			// 	bgColor: 'hocus:bg-[#2088ff1f] dark:hocus:bg-[#2088ff2e]',
			// 	borderColor: 'border hocus:border-[#2088ff8f] dark:hocus:border-[#2088ff8f]',
			// 	wIcon: 19,
			// 	hIcon: 19,
			// 	position: 'right',
			// },
			// {
			// 	id: 'aws',
			// 	title: 'AWS',
			// 	bgColor: 'hocus:bg-[#ff99001f] dark:hocus:bg-[#ff99002e]',
			// 	borderColor: 'border hocus:border-[#ff99008f] dark:hocus:border-[#ff99008f]',
			// 	wIcon: 19,
			// 	hIcon: 19,
			// 	position: 'left',
			// },
		],
	],
	[
		'Testing & Quality Assurance',
		[
			{
				id: 'jest',
				title: 'Jest',
				bgColor: 'hocus:bg-[#fc6d261f] dark:hocus:bg-[#fc6d262e]',
				borderColor: 'border hocus:border-[#fc6d268f] dark:hocus:border-[#fc6d268f]',
				wIcon: 19,
				hIcon: 19,
				position: 'left',
			},
			// {
			// 	id: 'cypress',
			// 	title: 'Cypress',
			// 	bgColor: 'hocus:bg-[#17202c1f] dark:hocus:bg-[#17202c2e]',
			// 	borderColor: 'border hocus:border-[#17202c8f] dark:hocus:border-[#17202c8f]',
			// 	wIcon: 19,
			// 	hIcon: 19,
			// 	position: 'right',
			// },
			// {
			// 	id: 'tdd',
			// 	title: 'Test-Driven Development (TDD)',
			// 	bgColor: 'hocus:bg-[#4a4a4a1f] dark:hocus:bg-[#4a4a4a2e]',
			// 	borderColor: 'border hocus:border-[#4a4a4a8f] dark:hocus:border-[#4a4a4a8f]',
			// 	wIcon: 19,
			// 	hIcon: 19,
			// 	position: 'left',
			// },
		],
	],
	[
		'Design & UI/UX',
		[
			{
				id: 'responsive',
				title: 'Responsive Design',
				bgColor: 'hocus:bg-[#0d6efd1f] dark:hocus:bg-[#0d6efd2e]',
				borderColor: 'border hocus:border-[#0d6efd8f] dark:hocus:border-[#0d6efd8f]',
				wIcon: 19,
				hIcon: 19,
				position: 'left',
			},
			{
				id: 'accessibility',
				title: 'Accessibility (WCAG)',
				bgColor: 'hocus:bg-[#28a7451f] dark:hocus:bg-[#28a7452e]',
				borderColor: 'border hocus:border-[#28a7458f] dark:hocus:border-[#28a7458f]',
				wIcon: 19,
				hIcon: 19,
				position: 'right',
			},
			{
				id: 'designsystems',
				title: 'Design Systems',
				bgColor: 'hocus:bg-[#6c757d1f] dark:hocus:bg-[#6c757d2e]',
				borderColor: 'border hocus:border-[#6c757d8f] dark:hocus:border-[#6c757d8f]',
				wIcon: 19,
				hIcon: 19,
				position: 'left',
			},
		],
	],
]);

export const NAVIGATIONBAR_ITEMS = {
	about: {
		key: 'about',
		title: 'About',
		route: '/about',
		gFrom: 'from-primary-500',
		gTo: 'to-green-500',
	},
	projects: {
		key: 'projects',
		title: 'Projects',
		route: '/projects',
		gFrom: 'from-[#c86827]',
		gTo: 'to-[#c69227]',
	},
	blog: {
		key: 'blog',
		title: 'Blog',
		route: '/blog',
		gFrom: 'from-[#bc2f48]',
		gTo: 'to-[#7a4cbb]',
	},
};

export const FOOTER_NAVBAR_ITEMS = [
	{
		...NAVIGATIONBAR_ITEMS.about,
		underline: 'hocus:decoration-primary-500',
		target: '_self',
	},
	{
		...NAVIGATIONBAR_ITEMS.projects,
		underline: 'hocus:decoration-[#c86827]',
		target: '_self',
	},
	{
		...NAVIGATIONBAR_ITEMS.blog,
		underline: 'hocus:decoration-[#bc2f48]',
		target: '_self',
	},
];

export const SOURCE_FOOTER_ITEMS = [
	{
		key: 'resume',
		title: 'Resume',
		route: resumeUrl,
		gradient: true,
		gFrom: 'from-primary-500',
		gTo: 'to-green-500',
		underline: 'hocus:decoration-primary-500',
		target: '_blank',
	},
	{
		key: 'Source',
		title: 'Source',
		route: 'https://github.com/Shubhdeep12/ShubhdeepChhabra',
		gradient: true,
		gFrom: 'from-[#c86827]',
		gTo: 'to-[#c69227]',
		underline: 'hocus:decoration-[#c86827]',
		target: '_blank',
	},
];

export const DONATE_SOURCES = [
	{
		key: 'coffee',
		title: 'Coffee',
		route: 'https://www.buymeacoffee.com/shubhdeep',
		gradient: true,
		gFrom: 'from-yellow-500',
		gTo: 'to-orange-500',
		underline: 'hocus:decoration-yellow-500',
		target: '_blank',
	},
	{
		key: 'paypal',
		title: 'Paypal',
		route: 'https://paypal.me/shubhdeepchhabra',
		gradient: true,
		gFrom: 'from-indigo-500',
		gTo: 'to-primary-500',
		underline: 'hocus:decoration-yellow-500',
		target: '_blank',
	},
	{
		key: 'sponsor',
		title: 'Sponsor',
		route: 'https://github.com/sponsors/Shubhdeep12',
		gradient: true,
		gFrom: 'from-pink-500',
		gTo: 'to-pink-500',
		underline: 'hocus:decoration-pink-500',
		target: '_blank',
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
		className: 'group-hocus:fill-primary-600 dark:fill-zinc-400',
		action: 'https://www.linkedin.com/in/shubhdeepchhabra/',
	},
	{
		key: 'twitter',
		icon: 'twitter',
		className:
			'group-hocus:fill-black group-hocus:stroke-black dark:group-hocus:fill-zinc-200 dark:group-hocus:stroke-zinc-200 dark:stroke-zinc-400',
		action: 'https://twitter.com/ShubhInTech',
	},
	{
		key: 'medium',
		icon: 'medium',
		className:
			'group-hocus:fill-black group-hocus:stroke-black dark:group-hocus:fill-zinc-200 dark:group-hocus:stroke-zinc-200 dark:stroke-zinc-400',
		action: 'https://shubhdeepchhabra.medium.com/',
	},
];

export const PROJECTS: ProjectProps[] = [
	{
		key: 'auzmor',
		title: 'Auzmor Learn',
		description: 'LMS with support of features like E-Sign, Feedbacks, Social Learning, etc.',
		stack: ['React', 'Styled Components', 'Semantic UI'],
		bgColor: 'hocus:bg-orange-50 dark:hocus:bg-opacity-[0.14] dark:hocus:bg-orange-300',
		metaDataStyles: 'group-hocus:border-orange-200 dark:bg-orange-900 bg-orange-50',
		imageStyles: 'bg-orange-50 dark:bg-opacity-[0.14] dark:bg-orange-300',
		titleStyles: 'dark:group-hocus:text-orange-400 group-hocus:text-orange-800',
		href: 'https://www.auzmor.com',
		src: AuzmorLogo,
		featured: true,
	},
	{
		key: 'quedoor-client',
		title: 'QueDoor - Client',
		description: 'A social media app specially curated for students preparing for exams.',
		stack: ['Next.js', 'TailwindCSS', 'shadcn-ui', 'Tiptap', 'react-query'],
		bgColor: 'hocus:bg-purple-50 dark:hocus:bg-opacity-[0.14] dark:hocus:bg-purple-300',
		metaDataStyles: 'group-hocus:border-purple-200 dark:bg-purple-900 bg-purple-50',
		imageStyles: 'bg-purple-50 dark:bg-opacity-[0.14] dark:bg-purple-300',
		titleStyles: 'dark:group-hocus:text-purple-400 group-hocus:text-purple-800',
		href: 'https://github.com/Shubhdeep12/Quedoor_client',
		src: '/assets/projects/Quedoor.png',
		featured: true,
	},
	{
		key: 'quedoor-core',
		title: 'QueDoor - Core',
		description: 'A social media app specially curated for students preparing for exams.',
		stack: ['Node.js', 'Express', 'MongoDB', 'PostgresSQL', 'Neo4j', 'Redis'],
		bgColor: 'hocus:bg-indigo-50 dark:hocus:bg-opacity-[0.14] dark:hocus:bg-indigo-300',
		metaDataStyles: 'group-hocus:border-indigo-200 dark:bg-indigo-900 bg-indigo-50',
		imageStyles: 'bg-indigo-50 dark:bg-opacity-[0.14] dark:bg-indigo-300',
		titleStyles: 'dark:group-hocus:text-indigo-400 group-hocus:text-indigo-800',
		href: 'https://github.com/Shubhdeep12/Quedoor_core',
		src: '/assets/projects/Quedoor.png',
		featured: false,
	},
	{
		key: 'eslint-config-generator',
		title: 'ESLint Config Generator',
		description: 'ESLint config generator, helps you to create config easily for your next javascript app.',
		stack: ['Next.js', 'Typescript', 'TailwindCSS', 'ESLint'],
		bgColor: 'hocus:bg-yellow-50 dark:hocus:bg-opacity-[0.14] dark:hocus:bg-yellow-300',
		metaDataStyles: 'group-hocus:border-yellow-200 dark:bg-yellow-900 bg-yellow-50',
		imageStyles: 'bg-yellow-50 dark:bg-opacity-[0.14] dark:bg-yellow-300',
		titleStyles: 'dark:group-hocus:text-yellow-400 group-hocus:text-yellow-800',
		href: 'https://eslint-config-generator.shubhdeepchhabra.in/',
		src: '/assets/projects/eslint-config-generator.png',
		featured: true,
	},
];
