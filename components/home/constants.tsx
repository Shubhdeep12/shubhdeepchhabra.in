export type ProjectProps = {
	key: string
	title: string
	description?: string
	stack?: string[]
	bgColor: string
	metaDataStyles?: string
	imageStyles?: string
	titleStyles?: string
	href: string
	featured: boolean
	src: string
}
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
		src: 'https://auzmormain.wpenginepowered.com/wp-content/uploads/2022/11/logoblack.svg',
		featured: true,
	},
	{
		key: 'taskez',
		title: 'Taskez',
		description: 'A TO-DO App with Authneticantion, CRUD operations and Drag and Drop support.',
		stack: ['React', 'Node.js', 'Express', 'MongoDB'],
		bgColor: 'hocus:bg-sky-50 dark:hocus:bg-opacity-[0.14] dark:hocus:bg-sky-300',
		metaDataStyles: 'group-hocus:border-sky-200 dark:bg-sky-900 bg-sky-50',
		imageStyles: 'bg-sky-50 dark:bg-opacity-[0.14] dark:bg-sky-300',
		titleStyles: 'dark:group-hocus:text-sky-400 group-hocus:text-sky-800',
		href: 'https://github.com/Shubhdeep12/.taskez',
		src: '/assets/projects/Taskez.png',
		featured: true,
	},
	{
		key: 'quedoor',
		title: 'QueDoor',
		description: 'Door to solve Questions. A social media platform where you can help out others.',
		stack: ['React', 'Node.js', 'Express', 'MongoDB'],
		bgColor: 'hocus:bg-green-50 dark:hocus:bg-opacity-[0.14] dark:hocus:bg-green-300',
		metaDataStyles: 'group-hocus:border-green-200 dark:bg-green-900 bg-green-50',
		imageStyles: 'bg-green-50 dark:bg-opacity-[0.14] dark:bg-green-300',
		titleStyles: 'dark:group-hocus:text-green-400 group-hocus:text-green-800',
		href: 'https://github.com/Shubhdeep12/QueDoor',
		src: '/assets/projects/Quedoor.png',
		featured: true,
	},
	{
		key: 'twitter',
		title: 'Twitter Clone',
		description: 'A clone of a Twitter home page with support of viewing the trailers.',
		stack: ['React', 'TMDB API'],
		bgColor: 'hocus:bg-red-50 dark:hocus:bg-opacity-[0.14] dark:hocus:bg-red-300',
		metaDataStyles: 'group-hocus:border-red-200 dark:bg-red-900 bg-red-50',
		imageStyles: 'bg-red-50 dark:bg-opacity-[0.14] dark:bg-red-300',
		titleStyles: 'dark:group-hocus:text-red-400 group-hocus:text-red-800',
		href: 'https://github.com/Shubhdeep12/Netflix-clone',
		src: '/assets/projects/TwitterClone.png',
		featured: false,
	},
	{
		key: 'twidder',
		title: 'Twidder',
		description: 'A simple Twitter App but all done with Web3.',
		stack: ['Ethers', 'Solidity', 'Hardhat', 'Next.js'],
		bgColor: 'hocus:bg-blue-50 dark:hocus:bg-opacity-[0.14] dark:hocus:bg-blue-300',
		metaDataStyles: 'group-hocus:border-blue-200 dark:bg-blue-900 bg-blue-50',
		imageStyles: 'bg-blue-50 dark:bg-opacity-[0.14] dark:bg-blue-300',
		titleStyles: 'dark:group-hocus:text-blue-400 group-hocus:text-blue-800',
		href: 'https://github.com/Shubhdeep12/twidder',
		src: '/assets/projects/Twidder.png',
		featured: false,
	},
	{
		key: 'notes',
		title: 'Side Notes',
		description: 'A vscode extension to add side notes while working in repository.',
		stack: ['Javascript', 'VS Code API'],
		bgColor: 'hocus:bg-yellow-50 dark:hocus:bg-opacity-[0.14] dark:hocus:bg-yellow-300',
		metaDataStyles: 'group-hocus:border-yellow-200 dark:bg-yellow-900 bg-yellow-50',
		imageStyles: 'bg-yellow-50 dark:bg-opacity-[0.14] dark:bg-yellow-300',
		titleStyles: 'dark:group-hocus:text-yellow-400 group-hocus:text-yellow-800',
		href: 'https://github.com/Shubhdeep12/Side-Notes-VSCode-Extension',
		src: '/assets/projects/SideNotes.png',
		featured: false,
	},
]
