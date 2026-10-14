/**
 * Tool definitions shared by the remote MCP server (/api/mcp) and the in-page WebMCP tools.
 * Client-safe: no handlers here, just what an agent sees. Handlers live in mcp-server.ts.
 */

export type ToolAnnotations = {
	readOnlyHint?: boolean;
	destructiveHint?: boolean;
	idempotentHint?: boolean;
	openWorldHint?: boolean;
};

export type ToolDefinition = {
	name: string;
	title: string;
	description: string;
	inputSchema: {
		type: 'object';
		properties: Record<string, unknown>;
		required?: string[];
		additionalProperties?: boolean;
	};
	annotations: ToolAnnotations;
};

const readOnly: ToolAnnotations = {
	readOnlyHint: true,
	destructiveHint: false,
	idempotentHint: true,
	openWorldHint: false,
};

const noInput: ToolDefinition['inputSchema'] = { type: 'object', properties: {}, additionalProperties: false };

/** Content tools: answered by the server, so they work the same over MCP and WebMCP. */
export const CONTENT_TOOLS = [
	{
		name: 'get_profile',
		title: 'Get profile',
		description:
			"Short profile of Shubhdeep Chhabra: role, location, focus areas and links to the website, GitHub, LinkedIn and X. Start here for 'who is this?'.",
		inputSchema: noInput,
		annotations: readOnly,
	},
	{
		name: 'get_resume',
		title: 'Get resume',
		description:
			"Shubhdeep Chhabra's full resume: experience, skills, open source contributions and education. Markdown by default; 'json' returns the JSON Resume format.",
		inputSchema: {
			type: 'object',
			properties: {
				format: {
					type: 'string',
					enum: ['markdown', 'json'],
					description: "Output format. Defaults to 'markdown'.",
				},
			},
			additionalProperties: false,
		},
		annotations: readOnly,
	},
	{
		name: 'list_writings',
		title: 'List writings',
		description:
			'Lists published articles, newest first, with slug, title, description, date, categories and URLs. Optionally filter by category or a search query over titles, descriptions and article text.',
		inputSchema: {
			type: 'object',
			properties: {
				category: { type: 'string', description: "Only articles in this category, e.g. 'Engineering' or 'Tooling'." },
				query: { type: 'string', description: 'Case-insensitive text to search for.' },
			},
			additionalProperties: false,
		},
		annotations: readOnly,
	},
	{
		name: 'get_writing',
		title: 'Read an article',
		description: 'Full text of one article as markdown, with its metadata. Get slugs from list_writings.',
		inputSchema: {
			type: 'object',
			properties: { slug: { type: 'string', description: "Article slug, e.g. 'cli-mcp-ai'." } },
			required: ['slug'],
			additionalProperties: false,
		},
		annotations: readOnly,
	},
	{
		name: 'get_contact_info',
		title: 'Get contact info',
		description: 'How to reach Shubhdeep Chhabra: email and social profiles.',
		inputSchema: noInput,
		annotations: readOnly,
	},
	{
		name: 'get_desk_setup',
		title: 'Get desk setup',
		description: 'The hardware on Shubhdeep Chhabra’s desk (laptop, keyboard, mouse, display) with specs and links.',
		inputSchema: noInput,
		annotations: readOnly,
	},
] as const satisfies readonly ToolDefinition[];

export type ContentToolName = (typeof CONTENT_TOOLS)[number]['name'];
