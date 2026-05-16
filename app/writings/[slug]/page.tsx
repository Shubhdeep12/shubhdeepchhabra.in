import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Fragment, Suspense } from 'react';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import mdxOptions from '@/mdxOptions.js';
import BlogFooter from '@/src/components/blog/BlogFooter';
import BlogImages from '@/src/components/blog/BlogImages';
import Hero from '@/src/components/blog/Hero';
import PostReadingLayout from '@/src/components/editorial/PostReadingLayout';
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
		alternates: {
			canonical: `https://www.shubhdeepchhabra.in/writings/${slug}`,
		},
		keywords: blog.frontMatter.keywords || blog.frontMatter.categories || [],
		openGraph: {
			type: 'article',
			description,
			title,
			locale: 'en_US',
			siteName: 'Shubhdeep Chhabra Portfolio',
			url: `https://www.shubhdeepchhabra.in/writings/${slug}`,
			publishedTime: blog.frontMatter.publishedAt,
			modifiedTime: blog.frontMatter.updatedAt || blog.frontMatter.publishedAt,
			authors: ['https://www.shubhdeepchhabra.in'],
			section: getPrimaryCategory(blog.frontMatter) || 'Technology',
			tags: blog.frontMatter.categories || [],
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

	const githubEditUrl = `https://github.com/Shubhdeep12/ShubhdeepChhabra/tree/master/blog/${blog.slug}.mdx`;

	// BlogPosting structured data for SEO and AI discovery
	const blogPostingStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: blog.frontMatter.title,
		description: blog.frontMatter.description,
		image: blog.frontMatter.cover ? `https://www.shubhdeepchhabra.in${blog.frontMatter.cover}` : undefined,
		datePublished: blog.frontMatter.publishedAt,
		dateModified: blog.frontMatter.updatedAt || blog.frontMatter.publishedAt,
		author: {
			'@type': 'Person',
			name: 'Shubhdeep Chhabra',
			url: 'https://www.shubhdeepchhabra.in',
		},
		publisher: {
			'@type': 'Person',
			name: 'Shubhdeep Chhabra',
			url: 'https://www.shubhdeepchhabra.in',
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': postUrl,
		},
		url: postUrl,
		keywords: blog.frontMatter.keywords?.join(', ') || blog.frontMatter.categories?.join(', ') || '',
		articleSection: getPrimaryCategory(blog.frontMatter) || 'Technology',
	};

	return (
		<section className='flex flex-col items-start gap-4 laptop:gap-8'>
			<Script
				id='blog-post-structured-data'
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingStructuredData) }}
			/>
			<PostReadingLayout
				mdxMarkdown={mdxSource}
				githubEditUrl={githubEditUrl}
				shareTitle={blog.frontMatter.title}
				shareUrl={postUrl}
			>
				<ReadingContainer>
					<Link href='/writings' className='post-back-link'>
						← Writings
					</Link>
					<Hero blog={blog} />
				</ReadingContainer>

				<article id='post-content' className='postContent w-full mb-2' aria-label={blog.frontMatter.title}>
					<Suspense fallback={<Fragment>Loading...</Fragment>}>
						<MDXRemote
							source={mdxSource}
							options={{ mdxOptions: mdxOptions as NonNullable<MDXRemoteProps['options']>['mdxOptions'] }}
							components={{ Image: BlogImages }}
						/>
					</Suspense>
				</article>

				<ReadingContainer>
					<BlogFooter blog={blog} relatedPosts={relatedPosts} />
				</ReadingContainer>
			</PostReadingLayout>
			<Footer />
		</section>
	);
}
