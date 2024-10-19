import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import Hero from '@/src/components/blog/Hero';
import BlogFooter from '@/src/components/blog/BlogFooter';
import BlogImages from '@/src/components/blog/BlogImages';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Fragment, Suspense } from 'react';
import { notFound } from 'next/navigation';

interface BlogProps {
	params: { slug: string };
}

export async function generateStaticParams() {
	const posts = await getAllPosts();
	return posts.map((blog) => ({
		slug: blog.slug,
	}));
}

export async function generateMetadata({ params }: BlogProps): Promise<Metadata | undefined> {
	const blog = await getPostBySlug(params.slug);

	if (!blog) {
		return;
	}

	const { title, description, cover } = blog.frontMatter;
	const ogImage = cover ? `https://www.shubhdeepchhabra.in/${cover}` : '';

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
			url: `https://www.shubhdeepchhabra.in/blog/${params.slug}`,
			images: [
				{
					url: ogImage,
					alt: `${title}`,
					width: 1200,
					height: 630,
				},
			],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		twitter: {
			card: 'summary_large_image',
			site: '@okshubhh',
			creator: '@okshubhh',
			title,
			description,
			images: [ogImage],
		},
	};
}

export default async function BlogPage({ params }: BlogProps) {
	const blog = await getPostBySlug(params.slug);

	if (!blog) {
		return notFound();
	}

	const { mdxSource } = blog;
	return (
		<section className='flex flex-col items-start gap-8'>
			<Hero blog={blog} />

			<article className='prose dark:prose-invert w-full mb-2'>
				<Suspense fallback={<Fragment>Loading...</Fragment>}>
					<MDXRemote source={mdxSource} components={{ Image: BlogImages }} />
				</Suspense>
			</article>

			<BlogFooter blog={blog} />
		</section>
	);
}
