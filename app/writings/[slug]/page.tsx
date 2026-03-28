import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Fragment, Suspense } from 'react';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import BlogFooter from '@/src/components/blog/BlogFooter';
import BlogImages from '@/src/components/blog/BlogImages';
import Hero from '@/src/components/blog/Hero';
import ShareButton from '@/src/components/blog/ShareButton';
import ReadingContainer from '@/src/components/editorial/ReadingContainer';
import Footer from '@/src/components/Footer';
import { getCategories, getPrimaryCategory, sortBlogsByDate } from '@/src/utils/blog-shared';

interface WritingProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const posts = await getAllPosts();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export async function generateMetadata({ params }: WritingProps): Promise<Metadata | undefined> {
	const { slug } = await params;
	const blog = await getPostBySlug(slug);

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
			url: `https://www.shubhdeepchhabra.in/writings/${slug}`,
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

export default async function WritingPage({ params }: WritingProps) {
	const { slug } = await params;
	const blog = await getPostBySlug(slug);
	const allPosts = await getAllPosts();

	if (!blog) {
		return notFound();
	}

	const { mdxSource } = blog;
	const postUrl = `https://www.shubhdeepchhabra.in/writings/${slug}`;
	const relatedPosts = sortBlogsByDate(allPosts)
		.filter((post) => post.slug !== slug)
		.slice(0, 3)
		.map((post) => ({
			slug: post.slug,
			title: post.frontMatter.title,
			description: post.frontMatter.description,
			publishedAt: post.frontMatter.publishedAt,
			readingTimeText: post.readingTime.text,
			category: getPrimaryCategory(post.frontMatter),
			categories: getCategories(post.frontMatter),
		}));

	return (
		<section className='flex flex-col items-start gap-4 laptop:gap-8'>
			<ReadingContainer>
				<Link href='/writings' className='post-back-link'>
					← Writings
				</Link>
				<Hero blog={blog} />
			</ReadingContainer>

			<article className='postContent w-full mb-2' aria-label={blog.frontMatter.title}>
				<Suspense fallback={<Fragment>Loading...</Fragment>}>
					<MDXRemote source={mdxSource} components={{ Image: BlogImages }} />
				</Suspense>
			</article>

			<ReadingContainer>
				<div className='post-related-actions'>
					<a
						className='post-action-link'
						href={`https://github.com/Shubhdeep12/ShubhdeepChhabra/tree/master/blog/${blog.slug}.mdx`}
						target='_blank'
						rel='noreferrer'
					>
						Edit on GitHub →
					</a>
					<ShareButton title={blog.frontMatter.title} url={postUrl} />
				</div>
				<BlogFooter blog={blog} relatedPosts={relatedPosts} />
			</ReadingContainer>
			<Footer />
		</section>
	);
}
