'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';
import { CONTENT_TOOLS, type ToolDefinition } from '@/lib/agent-tools';
import { isPostPath, useReadingMode } from '@/src/hooks/useReadingMode';

/**
 * WebMCP (https://webmachinelearning.github.io/webmcp/): exposes the site to in-browser agents as tools.
 * Does nothing in browsers without `document.modelContext`. Content tools proxy to /api/mcp so
 * they answer exactly like the remote MCP server; the rest drive this page (navigation, theme, reading mode).
 */

type ToolResult = { content: { type: 'text'; text: string }[]; isError?: boolean };

type ModelContextTool = Omit<ToolDefinition, 'annotations'> & {
	annotations?: ToolDefinition['annotations'];
	execute: (input: Record<string, unknown>, options?: { signal?: AbortSignal }) => Promise<ToolResult>;
};

type ModelContext = {
	registerTool: (tool: ModelContextTool, options?: { signal?: AbortSignal }) => Promise<void> | void;
};

// `document.modelContext` is the current spec; early Chrome builds shipped it on `navigator`.
const getModelContext = () =>
	(document as Document & { modelContext?: ModelContext }).modelContext ??
	(navigator as Navigator & { modelContext?: ModelContext }).modelContext;

const text = (value: string, isError = false): ToolResult => ({
	content: [{ type: 'text', text: value }],
	...(isError ? { isError } : {}),
});

const MCP_PROTOCOL_VERSION = '2026-07-28';

let rpcId = 0;
// A stateless 2026-07-28 MCP request: version, client info and capabilities travel with each call.
async function callServerTool(name: string, args: Record<string, unknown>, signal?: AbortSignal): Promise<ToolResult> {
	try {
		const response = await fetch('/api/mcp', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json, text/event-stream',
				'MCP-Protocol-Version': MCP_PROTOCOL_VERSION,
				'Mcp-Method': 'tools/call',
				'Mcp-Name': name,
			},
			body: JSON.stringify({
				jsonrpc: '2.0',
				id: ++rpcId,
				method: 'tools/call',
				params: {
					name,
					arguments: args,
					_meta: {
						'io.modelcontextprotocol/protocolVersion': MCP_PROTOCOL_VERSION,
						'io.modelcontextprotocol/clientInfo': { name: 'okshubh-webmcp', version: '1.0.0' },
						'io.modelcontextprotocol/clientCapabilities': {},
					},
				},
			}),
			signal,
		});
		const message = await response.json();
		return message.error ? text(message.error.message, true) : message.result;
	} catch {
		return text(`${name} failed: could not reach the site. Try again.`, true);
	}
}

function register(tools: ModelContextTool[], signal: AbortSignal) {
	const modelContext = getModelContext();
	if (!modelContext) return;
	for (const tool of tools) {
		Promise.resolve(modelContext.registerTool(tool, { signal })).catch(() => {
			// Rejects when the page isn't allowed to expose tools (e.g. Permissions-Policy); nothing to do then.
		});
	}
}

/**
 * Resolves an agent-supplied path against this origin and rejects anything that leaves it.
 * A prefix check isn't enough: browsers read '/\evil.com' as '//evil.com'.
 */
function sitePath(path: unknown) {
	if (typeof path !== 'string' || !path.startsWith('/')) return null;
	try {
		const url = new URL(path, window.location.origin);
		return url.origin === window.location.origin ? `${url.pathname}${url.search}${url.hash}` : null;
	} catch {
		return null;
	}
}

// Pages with a markdown twin (see MARKDOWN_PAGES in next.config.mjs).
const markdownPath = (path: string) => {
	const clean = path.replace(/\/$/, '') || '/';
	if (clean === '/') return '/index.md';
	return /^\/(writings(\/[^/.]+)?|setup|resume)$/.test(clean) ? `${clean}.md` : null;
};

const pageAction = { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false };

export default function WebMcpTools() {
	const router = useRouter();
	const pathname = usePathname();
	const { setTheme } = useTheme();
	const { setReading } = useReadingMode();

	// Tools are registered once; their callbacks read the latest values through this ref.
	const live = useRef({ router, pathname, setTheme, setReading });
	live.current = { router, pathname, setTheme, setReading };

	// Site-wide tools.
	useEffect(() => {
		if (!getModelContext()) return;
		const controller = new AbortController();

		const contentTools: ModelContextTool[] = CONTENT_TOOLS.map((tool) => ({
			...tool,
			inputSchema: tool.inputSchema,
			execute: (input, options) => callServerTool(tool.name, input ?? {}, options?.signal),
		}));

		register(
			[
				...contentTools,
				{
					name: 'get_current_page',
					title: 'Get current page',
					description: 'Which page of okshubh.in is open, with its title and a URL for its markdown version.',
					inputSchema: { type: 'object', properties: {}, additionalProperties: false },
					annotations: { readOnlyHint: true },
					execute: async () => {
						const path = window.location.pathname;
						const markdown = markdownPath(path);
						return text(
							JSON.stringify({
								path,
								title: document.title,
								url: window.location.href,
								...(markdown ? { markdown: `${window.location.origin}${markdown}` } : {}),
							})
						);
					},
				},
				{
					name: 'navigate',
					title: 'Open a page',
					description:
						"Opens a page of this site in the current tab. Paths: '/', '/writings', '/writings/<slug>', '/resume', '/setup'.",
					inputSchema: {
						type: 'object',
						properties: { path: { type: 'string', description: "Site path starting with '/', e.g. '/resume'." } },
						required: ['path'],
						additionalProperties: false,
					},
					annotations: pageAction,
					execute: async ({ path }) => {
						const target = sitePath(path);
						if (!target) return text("path must be a path on this site, e.g. '/writings'.", true);
						live.current.router.push(target);
						return text(`Opened ${target}.`);
					},
				},
				{
					name: 'set_theme',
					title: 'Set colour theme',
					description: 'Switches the site between light and dark, or back to following the system setting.',
					inputSchema: {
						type: 'object',
						properties: { theme: { type: 'string', enum: ['light', 'dark', 'system'] } },
						required: ['theme'],
						additionalProperties: false,
					},
					annotations: pageAction,
					execute: async ({ theme }) => {
						if (theme !== 'light' && theme !== 'dark' && theme !== 'system') {
							return text("theme must be 'light', 'dark' or 'system'.", true);
						}
						live.current.setTheme(theme);
						return text(`Theme set to ${theme}.`);
					},
				},
			],
			controller.signal
		);

		return () => controller.abort();
	}, []);

	// Article-only tools: registered while an article is open, removed when the reader leaves.
	const onPost = isPostPath(pathname);
	useEffect(() => {
		if (!onPost || !getModelContext()) return;
		const controller = new AbortController();

		register(
			[
				{
					name: 'get_article_outline',
					title: 'Get article outline',
					description: 'Headings of the article that is open, with links to each section.',
					inputSchema: { type: 'object', properties: {}, additionalProperties: false },
					annotations: { readOnlyHint: true },
					execute: async () => {
						const headings = [...document.querySelectorAll<HTMLElement>('#post-content :is(h2, h3, h4)')].map((h) => ({
							level: Number(h.tagName[1]),
							text: h.textContent?.trim() ?? '',
							url: h.id ? `${window.location.origin}${window.location.pathname}#${h.id}` : undefined,
						}));
						return text(JSON.stringify({ title: document.querySelector('h1')?.textContent?.trim(), headings }));
					},
				},
				{
					name: 'set_reading_mode',
					title: 'Set reading mode',
					description: 'Turns the paper-like reading mode for articles on or off.',
					inputSchema: {
						type: 'object',
						properties: { enabled: { type: 'boolean' } },
						required: ['enabled'],
						additionalProperties: false,
					},
					annotations: pageAction,
					execute: async ({ enabled }) => {
						if (typeof enabled !== 'boolean') return text('enabled must be true or false.', true);
						live.current.setReading(enabled);
						return text(`Reading mode ${enabled ? 'on' : 'off'}.`);
					},
				},
			],
			controller.signal
		);

		return () => controller.abort();
	}, [onPost]);

	return null;
}
