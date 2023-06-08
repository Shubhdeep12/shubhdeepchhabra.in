import { allBlogs } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'
import BlogFooter from '@/components/blog/BlogFooter'
import Hero from '@/components/blog/Hero'

export async function generateStaticParams() {
	return allBlogs.map((blog) => ({
		slug: blog._raw.flattenedPath,
	}))
}

export default function Page({ params }: { params: { slug: string } }) {
	const blog = allBlogs.find((blog) => blog.slug === params.slug)

	if (!blog) notFound()

	const MDXContent = useMDXComponent(blog.body.code)

	return (
		<section className='flex flex-col items-start gap-8'>
			<script type='application/ld+json' suppressHydrationWarning>
				{JSON.stringify(blog.structuredData)}
			</script>
			<Hero blog={blog} />

			{/* Some code ... */}
			<MDXContent />

			<BlogFooter blog={blog} />
		</section>
	)
}
