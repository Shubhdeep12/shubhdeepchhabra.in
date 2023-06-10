import { allBlogs } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'
import BlogFooter from '@/components/blog/BlogFooter'
import Hero from '@/components/blog/Hero'
import BlogImages from '@/components/blog/BlogImages'
import { Metadata } from 'next'
import getMetaData from '@/utils/getMetaData'

export async function generateStaticParams() {
	return allBlogs.map((blog) => ({
		slug: blog._raw.flattenedPath,
	}))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata | undefined> {
	const blog = allBlogs.find((blog) => blog.slug === params.slug)
	if (!blog) {
		return
	}

	const { title, description, cover, slug } = blog
	const ogImage = cover ? `${process.env.DOMAIN}${cover}` : ''

	return getMetaData({
		title,
		description,
		ogImage: ogImage,
		ogType: 'article',
		canonical: `${process.env.DOMAIN}/blog/${slug}`,
	})
}

const components = {
	Image: BlogImages,
}
export default function Page({ params }: { params: { slug: string } }) {
	const blog = allBlogs.find((blog) => blog.slug === params.slug)

	if (!blog) notFound()

	const MDXContent = useMDXComponent(blog.body.code)

	return (
		<section className='flex flex-col items-start gap-8 p-2'>
			<script type='application/ld+json' suppressHydrationWarning>
				{JSON.stringify(blog.structuredData)}
			</script>
			<Hero blog={blog} />

			<article className='prose dark:prose-invert w-full mb-2'>
				<MDXContent components={components} />
			</article>

			<BlogFooter blog={blog} />
		</section>
	)
}
