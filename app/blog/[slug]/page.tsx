import { allBlogs } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'
import BlogFooter from '@/components/blog/BlogFooter'
import Hero from '@/components/blog/Hero'
import BlogImages from '@/components/blog/BlogImages'

export async function generateStaticParams() {
	return allBlogs.map((blog) => ({
		slug: blog._raw.flattenedPath,
	}))
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

			<article className='prose dark:prose-dark w-full mb-2'>
				<MDXContent components={components} />
			</article>

			<BlogFooter blog={blog} />
		</section>
	)
}
