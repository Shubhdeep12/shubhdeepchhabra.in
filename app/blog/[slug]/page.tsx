import { allBlogs } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'
import BlogFooter from '@/components/blog/BlogFooter'
import Hero from '@/components/blog/Hero'
import BlogImages from '@/components/blog/BlogImages'
import { Metadata } from 'next'

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
	const ogImage = cover ? `https://shubhdeepchhabra.in/${cover}` : ''
	return {
		title,
		description,
		creator: 'Shubhdeep Chhabra',
		publisher: 'Shubhdeep Chhabra',
		openGraph: {
			type: 'article',
			description,
			title,
			locale: 'en_US',
			siteName: 'Shubhdeep Chhabra Portfolio',
			url: `https://shubhdeepchhabra.in/blog/${slug}`,
			images: [
				{
					url: ogImage,
					alt: `${title}`,
					width: '1200',
					height: '630',
				},
			],
		},
		robots: {
			index: false,
			follow: true,
			nocache: true,
			googleBot: {
				index: true,
				follow: false,
				noimageindex: true,
			},
		},
	}
}

const components = {
	Image: BlogImages,
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

			<article className='prose dark:prose-invert w-full mb-2'>
				<MDXContent components={components} />
			</article>

			<BlogFooter blog={blog} />
		</section>
	)
}
