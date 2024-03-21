import useSWR, { SWRConfiguration } from 'swr'
import * as Sentry from '@sentry/nextjs'

export type Reactions = {
	reactions: Record<string, string>
	userSession: Record<string, any>
}

const API_URL = '/api/reactions'

async function getBlogReactions(slug: string): Promise<Reactions> {
	const res = await fetch(`${API_URL}/${slug}`)
	if (!res.ok) {
		throw new Error('An error occured while fetching reactions')
	}
	return res.json()
}

async function updateBlogReactions(slug: string, type: string): Promise<Reactions> {
	const transaction = Sentry.startTransaction({
		name: 'Blog Reaction',
	})

	Sentry.configureScope((scope) => {
		scope.setSpan(transaction)
	})
	const res = await fetch(`${API_URL}/${slug}`, {
		method: 'POST',
		body: JSON.stringify({ type }),
		headers: { 'Content-Type': 'application/json' },
	})
	if (!res.ok) {
		throw new Error('An error occured while updating reactions')
	}
	transaction.finish()
	return res.json()
}

export const useBlogReactions = (slug: string, config?: SWRConfiguration) => {
	const { data, error, mutate } = useSWR<Reactions>(`${API_URL}/${slug}`, () => getBlogReactions(slug), {
		...config,
	})

	const reactions = data?.reactions
	const userSession = data?.userSession

	const addReaction = (type: string) => {
		if (!data) {
			return
		}
		mutate({
			reactions: {
				...data.reactions,
				[type]: (Number(data?.reactions[type]) + 1).toString(),
			},
			userSession: {
				...data.userSession,
				...(type === 'like' && { isLiked: true }),
				...(type === 'love' && { isLoved: true }),
				...(type === 'bookmark' && { isBookmarked: true }),
			},
		})
		mutate(
			updateBlogReactions(slug, type).catch(() => {
				return {
					reactions: {
						like: '0',
						love: '0',
						bookmark: '0',
					},
					userSession: {},
				}
			})
		)
	}

	return {
		reactions,
		userSession,
		isLoading: !error && !reactions,
		isError: !!error,
		addReaction,
	}
}
