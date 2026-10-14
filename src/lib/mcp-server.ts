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
 * A small stateless MCP server (Streamable HTTP, JSON responses only). Every tool is read-only
 * public content, so there are no sessions, no auth and no server-initiated messages.
 */

const SUPPORTED_PROTOCOL_VERSIONS = ['2025-11-25', '2025-06-18', '2025-03-26', '2024-11-05'];
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

export async function callTool(name: string, args: Record<string, unknown> = {}): Promise<ToolResult | null> {
	if (!(name in HANDLERS)) return null;
	return HANDLERS[name as ContentToolName](args);
}

// --- JSON-RPC ---

type JsonRpcId = string | number | null;
type JsonRpcRequest = { jsonrpc: '2.0'; id?: JsonRpcId; method: string; params?: Record<string, unknown> };

const result = (id: JsonRpcId, value: unknown) => ({ jsonrpc: '2.0' as const, id, result: value });
const rpcError = (id: JsonRpcId, code: number, message: string) => ({
	jsonrpc: '2.0' as const,
	id,
	error: { code, message },
});

export const PARSE_ERROR = rpcError(null, -32700, 'Parse error');

const isRequest = (message: unknown): message is JsonRpcRequest =>
	typeof message === 'object' &&
	message !== null &&
	(message as JsonRpcRequest).jsonrpc === '2.0' &&
	typeof (message as JsonRpcRequest).method === 'string';

/** Handles one JSON-RPC message. Returns null for notifications (and stray responses), which get no reply. */
export async function handleMessage(message: unknown) {
	if (!isRequest(message)) return rpcError(null, -32600, 'Invalid Request');
	if (message.id === undefined) return null;
	const { id, method, params = {} } = message;

	switch (method) {
		case 'initialize': {
			const requested = str(params.protocolVersion);
			return result(id, {
				protocolVersion:
					requested && SUPPORTED_PROTOCOL_VERSIONS.includes(requested) ? requested : SUPPORTED_PROTOCOL_VERSIONS[0],
				capabilities: { tools: { listChanged: false } },
				serverInfo: SERVER_INFO,
				instructions: INSTRUCTIONS,
			});
		}
		case 'ping':
			return result(id, {});
		case 'tools/list':
			return result(id, { tools: CONTENT_TOOLS });
		case 'tools/call': {
			const name = str(params.name) ?? '';
			const args = typeof params.arguments === 'object' && params.arguments !== null ? params.arguments : {};
			try {
				const output = await callTool(name, args as Record<string, unknown>);
				return output ? result(id, output) : rpcError(id, -32602, `Unknown tool: ${name}`);
			} catch {
				return result(id, toolError(`${name} failed. Try again, or read ${SITE_URL}/llms.txt instead.`));
			}
		}
		default:
			return rpcError(id, -32601, `Method not found: ${method}`);
	}
}
