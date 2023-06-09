import useSWR, { SWRConfiguration } from 'swr'

export type Views = {
	total: number
}

const API_URL = '/api/views'

async function getBlogViews(slug: string): Promise<Views> {
	const res = await fetch(`${API_URL}/${slug}`)
	if (!res.ok) {
		throw new Error('An error occured while fetching views')
	}
	return res.json()
}

async function updateBlogViews(slug: string): Promise<Views> {
	const res = await fetch(`${API_URL}/${slug}`, { method: 'POST' })
	if (!res.ok) {
		throw new Error('An error occured while updating views')
	}
	return res.json()
}

export const useBlogViews = (slug: string, config?: SWRConfiguration) => {
	const { data, error, mutate } = useSWR<Views>(`${API_URL}/${slug}`, () => getBlogViews(slug), {
		dedupingInterval: 600000,
		...config,
	})

	const views = data?.total
	const increment = () => {
		mutate(
			updateBlogViews(slug).catch((e) => {
				console.log(e)
				return { total: 0 }
			})
		)
	}

	return {
		views,
		isLoading: !error && !views,
		isError: !!error,
		increment,
	}
}
