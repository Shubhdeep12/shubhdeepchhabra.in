import { allBlogs } from 'contentlayer/generated'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	const blogs = allBlogs.map((blog) => ({
		url: `https://www.shubhdeepchhabra.in/blog/${blog.slug}`,
		lastModified: blog.publishedAt,
	}))

	const routes = ['', '/about', '/blog', '/projects'].map((route) => ({
		url: `https://www.shubhdeepchhabra.in${route}`,
		lastModified: new Date().toISOString().split('T')[0],
	}))

	return [...routes, ...blogs]
}
