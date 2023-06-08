import { Blog } from '@/.contentlayer/generated'

export const getBlogGroups = (blogs: Array<Blog>) => {
	const sortedBlogs = blogs.sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)))

	const finalResponse = sortedBlogs.reduce((previous, currentItem) => {
		const group = new Date(currentItem.publishedAt).getFullYear() || new Date().getFullYear()
		if (!previous[group]) previous[group] = []
		previous[group].push(currentItem)
		return previous
	}, {} as Record<string, Blog[]>)

	return Object.keys(finalResponse)
		.map((year) => ({
			year: +year,
			blogs: finalResponse[+year],
		}))
		.sort((a, b) => Number(b.year) - Number(a.year))
}
