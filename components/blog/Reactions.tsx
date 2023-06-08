import clsx from 'clsx'
import Button from '../Button'
import Text from '../Text'
import { BookmarkIcon, IconProps, LikeIcon, LoveIcon } from '@/Icons'

type ReactionProp = {
	id: string
	title: number
	fillColor: string
	strokeColor: string
	wIcon: number
	hIcon: number
}

const ReactionIcons: Record<string, React.FC<IconProps>> = {
	like: LikeIcon,
	love: LoveIcon,
	bookmark: BookmarkIcon,
}

const REACTIONS: ReactionProp[] = [
	{
		id: 'like',
		title: 2,
		fillColor: 'fill-[#00c2e6]',
		strokeColor: 'group-hocus:stroke-[#831ef78f]',
		wIcon: 15,
		hIcon: 15,
	},
	{
		id: 'love',
		title: 1,
		fillColor: 'fill-[#e6004d]',
		strokeColor: 'group-hocus:stroke-[#e6004d8f]',
		wIcon: 15,
		hIcon: 15,
	},
	{
		id: 'bookmark',
		title: 1,
		fillColor: 'fill-[#831ef7]',
		strokeColor: 'group-hocus:stroke-[#e6004d8f]',
		wIcon: 15,
		hIcon: 15,
	},
]

const Reactions = () => {
	return (
		<div id='reactions' className='flex gap-4'>
			{REACTIONS.map((reaction) => {
				const CurrentIcon = ReactionIcons[reaction.id]
				return (
					<Button
						focusOutlined
						key={reaction.id}
						className={clsx(
							'group w-auto min-w-[70px] h-auto p-2 rounded-full transition flex items-center justify-center gap-1 hocus:underline-none hocus:transform hocus:scale-[1.015]',
							'bg-background-primary-light dark:bg-background-primary-dark border border-gray-200 dark:border-gray-600'
						)}
					>
						<CurrentIcon
							width={reaction.wIcon}
							height={reaction.hIcon}
							filled={reaction.title > 0}
							className={clsx('transition', reaction.title > 0 ? reaction.fillColor : reaction.strokeColor)}
						/>
						<Text className='text-sm font-bold group-hocus:text-black dark:group-hocus:text-white'>
							{reaction.title}
						</Text>
					</Button>
				)
			})}
		</div>
	)
}

export default Reactions
