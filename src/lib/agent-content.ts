import { getAllPosts } from '@/lib/mdx';
import { getCategories, sortBlogsByDate } from '@/src/utils/blog-shared';
import {
	RESUME,
	RESUME_JSON_PATH,
	RESUME_MD_PATH,
	RESUME_PDF_PATH,
	resumeToMarkdown,
	SITE_URL,
} from '@/src/utils/resume';
import { DESK } from '@/src/utils/setup';
import { Blog } from '@/utils/types';

/**
 * Markdown versions of every page, for agents. llms.txt, the `.md` routes, the MCP
 * server and the WebMCP tools all read from here so they can't drift apart.
 */

export const PROFILE = {
	name: RESUME.name,
	role: RESUME.label,
	location: RESUME.location.label,
	tagline:
		'I build and experiment with web and AI systems, focusing on frontend, LLMs, and developer tools. Currently obsessed with DevTools.',
	summary:
		'Product-focused Software Engineer writing about software engineering, architecture, and practical product lessons.',
	email: RESUME.email,
	links: {
		website: SITE_URL,
		github: 'https://github.com/Shubhdeep12',
		linkedin: 'https://www.linkedin.com/in/shubhdeepchhabra/',
		x: 'https://x.com/okshubhh',
		rss: `${SITE_URL}/feed.xml`,
	},
};

export const MCP_PATH = '/api/mcp';

export const postUrl = (slug: string) => `${SITE_URL}/writings/${slug}`;
export const postMarkdownUrl = (slug: string) => `${SITE_URL}/writings/${slug}.md`;

export async function getSortedPosts() {
	return sortBlogsByDate(await getAllPosts());
}

const FENCE = /^\s*(```|~~~)/;
const IMAGE_TAG = /<Image\b([\s\S]*?)\/>/g;
const attr = (attrs: string, name: string) => attrs.match(new RegExp(`${name}=['"]([^'"]*)['"]`))?.[1] ?? '';

/** MDX → plain markdown: JSX image components become markdown images. Code blocks are left alone. */
export function mdxToMarkdown(source: string) {
	const chunks: string[] = [];
	let prose: string[] = [];
	let inFence = false;
	const flushProse = () => {
		chunks.push(
			prose.join('\n').replace(IMAGE_TAG, (_, attrs: string) => `![${attr(attrs, 'alt')}](${attr(attrs, 'src')})`)
		);
		prose = [];
	};

	for (const line of source.split('\n')) {
		if (FENCE.test(line)) {
			if (!inFence) flushProse();
			inFence = !inFence;
			chunks.push(line);
		} else if (inFence) {
			chunks.push(line);
		} else {
			prose.push(line);
		}
	}
	flushProse();
	return chunks.join('\n').trim();
}

export type WritingSummary = {
	slug: string;
	title: string;
	description: string;
	publishedAt: string;
	updatedAt?: string;
	categories: string[];
	readingTime: string;
	url: string;
	markdownUrl: string;
};

export const toWritingSummary = (blog: Blog): WritingSummary => ({
	slug: blog.slug,
	title: blog.frontMatter.title,
	description: blog.frontMatter.description,
	publishedAt: blog.frontMatter.publishedAt,
	...(blog.frontMatter.updatedAt ? { updatedAt: blog.frontMatter.updatedAt } : {}),
	categories: getCategories(blog.frontMatter),
	readingTime: blog.readingTime.text,
	url: postUrl(blog.slug),
	markdownUrl: postMarkdownUrl(blog.slug),
});

export function postToMarkdown(blog: Blog) {
	const { title, description, publishedAt, updatedAt, cover } = blog.frontMatter;
	const meta = [
		`- Author: [${PROFILE.name}](${SITE_URL})`,
		`- Published: ${publishedAt}`,
		...(updatedAt ? [`- Updated: ${updatedAt}`] : []),
		`- Categories: ${getCategories(blog.frontMatter).join(', ')}`,
		`- Reading time: ${blog.readingTime.text}`,
		`- URL: ${postUrl(blog.slug)}`,
		...(cover ? [`- Cover: ${SITE_URL}${cover}`] : []),
	];
	return `# ${title}\n\n> ${description}\n\n${meta.join('\n')}\n\n---\n\n${mdxToMarkdown(blog.mdxSource)}\n`;
}

const writingLine = (blog: Blog) =>
	`- [${blog.frontMatter.title}](${postMarkdownUrl(blog.slug)}): ${blog.frontMatter.description} (${blog.frontMatter.publishedAt})`;

export function writingsToMarkdown(posts: Blog[]) {
	return [
		`# Writings — ${PROFILE.name}`,
		'',
		'> Musings on engineering, product, and whatever else is on my mind.',
		'',
		`${posts.length} posts, newest first. Each link is the markdown version; drop \`.md\` for the HTML page.`,
		'',
		...posts.map(writingLine),
		'',
	].join('\n');
}

export function setupToMarkdown() {
	return [
		`# Desk — ${PROFILE.name}`,
		'',
		'> The few things on my desk I use every day.',
		'',
		...DESK.flatMap((item) => [
			`## ${item.title}`,
			'',
			`${item.kind} · ${item.specs.join(' · ')}`,
			'',
			item.description,
			'',
			`Link: ${item.href}${item.affiliate ? ' (affiliate)' : ''}`,
			'',
		]),
		'Some of these are affiliate links. Buying through one may earn a small commission at no extra cost to you.',
		'',
	].join('\n');
}

const linksMarkdown = () => [
	`- Website: ${PROFILE.links.website}`,
	`- GitHub: ${PROFILE.links.github}`,
	`- LinkedIn: ${PROFILE.links.linkedin}`,
	`- X (Twitter): ${PROFILE.links.x}`,
	`- Email: ${PROFILE.email}`,
];

export function homeToMarkdown(posts: Blog[]) {
	return [
		`# ${PROFILE.name}`,
		'',
		`> ${PROFILE.tagline}`,
		'',
		`${PROFILE.role} · ${PROFILE.location}`,
		'',
		...linksMarkdown(),
		'',
		'## Pages',
		'',
		`- [Writings](${SITE_URL}/writings.md)`,
		`- [Resume](${SITE_URL}${RESUME_MD_PATH})`,
		`- [Desk](${SITE_URL}/setup.md)`,
		'',
		'## Latest writings',
		'',
		...posts.slice(0, 5).map(writingLine),
		'',
	].join('\n');
}

/** https://llmstxt.org */
export function llmsTxt(posts: Blog[]) {
	return [
		`# ${PROFILE.name}`,
		'',
		`> ${PROFILE.role} based in ${RESUME.location.country}. ${PROFILE.summary}`,
		'',
		PROFILE.tagline,
		'',
		'Every page has a markdown version: add `.md` to the URL, or request the page with `Accept: text/markdown`.',
		'',
		'## About',
		'',
		`- [Home](${SITE_URL}/index.md): Who I am and where to find me`,
		`- [Resume](${SITE_URL}${RESUME_MD_PATH}): Experience, skills, open source and education`,
		`- [Resume as JSON Resume](${SITE_URL}${RESUME_JSON_PATH}): Same resume, machine-readable`,
		`- [Resume PDF](${SITE_URL}${RESUME_PDF_PATH}): Printable resume`,
		'',
		'## Writings',
		'',
		...posts.map(writingLine),
		'',
		'## Agents',
		'',
		`- [MCP server](${SITE_URL}${MCP_PATH}): Streamable HTTP MCP endpoint with read-only tools for the profile, resume and writings`,
		'- WebMCP: in browsers that support it, pages register the same tools on `document.modelContext`',
		'',
		'## Optional',
		'',
		`- [Full text](${SITE_URL}/llms-full.txt): Profile, resume and every post in one file`,
		`- [Desk](${SITE_URL}/setup.md): The desk setup I use every day`,
		`- [RSS feed](${PROFILE.links.rss})`,
		`- [GitHub](${PROFILE.links.github})`,
		`- [LinkedIn](${PROFILE.links.linkedin})`,
		`- [X (Twitter)](${PROFILE.links.x})`,
		'',
	].join('\n');
}

export function llmsFullTxt(posts: Blog[]) {
	const divider = '\n\n---\n\n';
	return [
		`# ${PROFILE.name}\n\n> ${PROFILE.tagline}\n\n${linksMarkdown().join('\n')}\n`,
		resumeToMarkdown(),
		...posts.map(postToMarkdown),
	].join(divider);
}

/** Shared headers for markdown/text responses: cacheable, and pointing search engines at the HTML page. */
export function textResponse(
	body: string,
	{ type = 'text/markdown', canonical }: { type?: string; canonical?: string } = {}
) {
	return new Response(body, {
		headers: {
			'Content-Type': `${type}; charset=utf-8`,
			'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
			...(canonical ? { Link: `<${canonical}>; rel="canonical"` } : {}),
		},
	});
}
