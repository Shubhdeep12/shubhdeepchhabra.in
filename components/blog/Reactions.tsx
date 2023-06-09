'use client'
import clsx from 'clsx'
import Button from '../Button'
import Text from '../Text'
import { BookmarkIcon, IconProps, LikeIcon, LoveIcon } from '@/Icons'
import { Blog } from '@/.contentlayer/generated'
import useLocalStoredReactions from '@/hooks/useLocalStoredReactions'

type ReactionProp = {
	id: string
	count: number
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
		count: 1,
		fillColor: 'fill-[#00c2e6]',
		strokeColor: 'group-hocus:stroke-[#831ef78f]',
		wIcon: 15,
		hIcon: 15,
	},
	{
		id: 'love',
		count: 2,
		fillColor: 'fill-[#e6004d]',
		strokeColor: 'group-hocus:stroke-[#e6004d8f]',
		wIcon: 15,
		hIcon: 15,
	},
	{
		id: 'bookmark',
		count: 3,
		fillColor: 'fill-[#831ef7]',
		strokeColor: 'group-hocus:stroke-[#e6004d8f]',
		wIcon: 15,
		hIcon: 15,
	},
]
const Reactions = ({ blog }: { blog: Blog }) => {
	const { localReactions, setLocalStoredReactions } = useLocalStoredReactions(blog.slug, {
		love: false,
		like: false,
		bookmark: false,
	})

	const handleReaction = (type: string) => {
		setLocalStoredReactions(type)

		// TODO: add in DB
	}

	return (
		<div id='reactions' className='flex gap-4'>
			{REACTIONS.map((reaction) => {
				const CurrentIcon = ReactionIcons[reaction.id]
				return (
					<Button
						focusOutlined
						key={reaction.id}
						onClick={() => handleReaction(reaction.id)}
						className={clsx(
							'group w-auto min-w-[70px] h-auto p-2 rounded-full transition flex items-center justify-center gap-1 hocus:underline-none hocus:transform hocus:scale-[1.015]',
							'bg-background-primary-light dark:bg-background-primary-dark border border-gray-200 dark:border-gray-600'
						)}
					>
						<CurrentIcon
							width={reaction.wIcon}
							height={reaction.hIcon}
							filled={localReactions && localReactions[reaction?.id]}
							className={clsx(
								'transition',
								localReactions && localReactions[reaction?.id] ? reaction.fillColor : reaction.strokeColor
							)}
						/>
						<Text className='text-sm font-bold group-hocus:text-black dark:group-hocus:text-white'>
							{reaction.count}
						</Text>
					</Button>
				)
			})}
		</div>
	)
}

export default Reactions
