import { allBlogs } from 'contentlayer/generated'

export default async function sitemap() {
	const blogs = allBlogs.map((blog) => ({
		url: `${process.env.DOMAIN}/blog/${blog.slug}`,
		lastModified: blog.publishedAt,
	}))

	const routes = ['', '/about', '/blog', '/projects'].map((route) => ({
		url: `${process.env.DOMAIN}${route}`,
		lastModified: new Date().toISOString().split('T')[0],
	}))

	return [...routes, ...blogs]
}
