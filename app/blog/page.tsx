import { allBlogs } from 'contentlayer/generated'
import Link from 'next/link'

export default function Blogs() {
	return (
		<div className='h-[1700px] flex gap-6 w-full flex-col'>
			{allBlogs.map((i) => (
				<div key={i.slug}>
					<Link href={`/blog/${i.slug}`} className='hover:text-primary transition'>
						{i.title}
					</Link>
				</div>
			))}
		</div>
	)
}
