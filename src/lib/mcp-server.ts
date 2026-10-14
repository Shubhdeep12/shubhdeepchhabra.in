import { createMcpHandler, fromJsonSchema, type JsonSchemaType, McpServer } from '@modelcontextprotocol/server';
import {
	getSortedPosts,
	PROFILE,
	postToMarkdown,
	setupToMarkdown,
	toWritingSummary,
	type WritingSummary,
} from '@/lib/agent-content';
import { CONTENT_TOOLS, type ContentToolName } from '@/lib/agent-tools';
import { getCategories } from '@/src/utils/blog-shared';
import { resumeToJsonResume, resumeToMarkdown, SITE_URL } from '@/src/utils/resume';

/**
 * The remote MCP server, built on the official TypeScript SDK. Every tool is read-only public
 * content, so there is no auth and no state between requests.
 */

const SERVER_INFO = { name: 'okshubh', title: 'Shubhdeep Chhabra', version: '1.0.0', websiteUrl: SITE_URL };
const INSTRUCTIONS =
	'Read-only tools for Shubhdeep Chhabra’s site (okshubh.in): profile, resume, contact info, desk setup and articles. Use list_writings to find an article slug, then get_writing to read it.';

type ToolResult = {
	content: { type: 'text'; text: string }[];
	structuredContent?: Record<string, unknown>;
	isError?: boolean;
};

const text = (value: string): ToolResult => ({ content: [{ type: 'text', text: value }] });
const json = (value: Record<string, unknown>): ToolResult => ({
	content: [{ type: 'text', text: JSON.stringify(value, null, 2) }],
	structuredContent: value,
});
const toolError = (message: string): ToolResult => ({ ...text(message), isError: true });

const str = (value: unknown) => (typeof value === 'string' && value.trim() ? value.trim() : undefined);

const HANDLERS: Record<ContentToolName, (args: Record<string, unknown>) => Promise<ToolResult> | ToolResult> = {
	get_profile: () =>
		json({
			name: PROFILE.name,
			role: PROFILE.role,
			location: PROFILE.location,
			about: PROFILE.tagline,
			links: PROFILE.links,
			resume: `${SITE_URL}/resume`,
			writings: `${SITE_URL}/writings`,
		}),

	get_resume: (args) => {
		const format = str(args.format) ?? 'markdown';
		if (format === 'json') return json(resumeToJsonResume());
		if (format === 'markdown') return text(resumeToMarkdown());
		return toolError(`Unknown format '${format}'. Use 'markdown' or 'json'.`);
	},

	list_writings: async (args) => {
		const category = str(args.category)?.toLowerCase();
		const query = str(args.query)?.toLowerCase();
		const posts = (await getSortedPosts()).filter((blog) => {
			if (category && !getCategories(blog.frontMatter).some((c) => c.toLowerCase() === category)) return false;
			if (!query) return true;
			const { title, description } = blog.frontMatter;
			return [title, description, blog.mdxSource].some((field) => String(field).toLowerCase().includes(query));
		});
		const writings: WritingSummary[] = posts.map(toWritingSummary);
		return json({ count: writings.length, writings });
	},

	get_writing: async (args) => {
		const slug = str(args.slug)
			?.replace(/^\/?writings\//, '')
			.replace(/\.mdx?$/, '');
		const posts = await getSortedPosts();
		const blog = posts.find((post) => post.slug === slug);
		if (!blog) {
			return toolError(
				`No article with slug '${slug ?? ''}'. Known slugs: ${posts.map((post) => post.slug).join(', ')}`
			);
		}
		return text(postToMarkdown(blog));
	},

	get_contact_info: () =>
		json({
			email: PROFILE.email,
			github: PROFILE.links.github,
			linkedin: PROFILE.links.linkedin,
			x: PROFILE.links.x,
		}),

	get_desk_setup: () => text(setupToMarkdown()),
};

const ONE_HOUR = 60 * 60 * 1000;

/** One server instance per request: everything here is stateless public content. */
export function createServer() {
	const server = new McpServer(SERVER_INFO, {
		instructions: INSTRUCTIONS,
		// 2026-07-28 clients may cache these; they only change on deploy and hold nothing per-user.
		cacheHints: {
			'server/discover': { ttlMs: ONE_HOUR, cacheScope: 'public' },
			'tools/list': { ttlMs: ONE_HOUR, cacheScope: 'public' },
		},
	});

	for (const tool of CONTENT_TOOLS) {
		server.registerTool(
			tool.name,
			{
				title: tool.title,
				description: tool.description,
				inputSchema: fromJsonSchema(tool.inputSchema as JsonSchemaType),
				annotations: tool.annotations,
			},
			async (args: unknown) => {
				try {
					return await HANDLERS[tool.name]((args ?? {}) as Record<string, unknown>);
				} catch {
					return toolError(`${tool.name} failed. Try again, or read ${SITE_URL}/llms.txt instead.`);
				}
			}
		);
	}

	return server;
}

/**
 * Streamable HTTP handler. Serves 2026-07-28 (stateless, per-request envelope) clients and,
 * through the SDK's stateless fallback, 2025-era clients that still open with `initialize`.
 */
export const mcpHandler = createMcpHandler(createServer, { responseMode: 'json' });
