import { allBlogs } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
	return allBlogs.map((blog) => ({
		slug: blog._raw.flattenedPath,
	}))
}

export default function Page({ params }: { params: { slug: string } }) {
	// Find the blog for the current page.
	const blog = allBlogs.find((blog) => blog.slug === params.slug)

	// 404 if the blog does not exist.
	if (!blog) notFound()

	// Parse the MDX file via the useMDXComponent hook.
	const MDXContent = useMDXComponent(blog.body.code)

	return (
		<div>
			{/* Some code ... */}
			<MDXContent />
		</div>
	)
}
