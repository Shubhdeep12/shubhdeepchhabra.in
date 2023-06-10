'use client'
import clsx from 'clsx'
import Button from '../Button'
import Text from '../Text'
import { BookmarkIcon, IconProps, LikeIcon, LoveIcon } from '@/Icons'
import { Blog } from '@/.contentlayer/generated'
import useLocalStoredReactions from '@/hooks/useLocalStoredReactions'
import { useBlogReactions } from '@/hooks/useBlogReactions'
import Loader from '../Loader'

type ReactionProp = {
	id: string
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
		fillColor: 'fill-[#00c2e6]',
		strokeColor: 'group-hocus:stroke-[#831ef78f]',
		wIcon: 15,
		hIcon: 15,
	},
	{
		id: 'love',
		fillColor: 'fill-[#e6004d]',
		strokeColor: 'group-hocus:stroke-[#e6004d8f]',
		wIcon: 15,
		hIcon: 15,
	},
	{
		id: 'bookmark',
		fillColor: 'fill-[#831ef7]',
		strokeColor: 'group-hocus:stroke-[#e6004d8f]',
		wIcon: 15,
		hIcon: 15,
	},
]
const Reactions = ({ blog }: { blog: Blog }) => {
	const { reactions, isError, isLoading, addReaction } = useBlogReactions(blog.slug)
	const { localReactions, setLocalStoredReactions } = useLocalStoredReactions(blog.slug, {
		love: false,
		like: false,
		bookmark: false,
	})

	const handleReaction = (type: string) => {
		if (!localReactions[type]) {
			setLocalStoredReactions(type)

			addReaction(type)
		}
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
						{isLoading ? (
							<Loader width='w-4' height='h-4' />
						) : (
							<Text className='text-sm font-bold group-hocus:text-black dark:group-hocus:text-white'>
								{!isError && reactions ? reactions[reaction?.id] : '-'}
							</Text>
						)}
					</Button>
				)
			})}
		</div>
	)
}

export default Reactions
