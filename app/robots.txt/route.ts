import { SITE_URL } from '@/src/utils/resume';

// A route instead of app/robots.ts: Next's robots API can't emit Content-Signal or comments.
export const dynamic = 'force-static';

// AI crawlers, named so the policy is explicit. All are welcome: this is a public portfolio and blog.
const AI_AGENTS = [
	'GPTBot',
	'OAI-SearchBot',
	'ChatGPT-User',
	'ClaudeBot',
	'Claude-User',
	'Claude-SearchBot',
	'PerplexityBot',
	'Perplexity-User',
	'Google-Extended',
	'Applebot-Extended',
	'CCBot',
];

// https://contentsignals.org — search: index and link; ai-input: use in live answers; ai-train: use for training.
const CONTENT_SIGNAL = 'Content-Signal: search=yes, ai-input=yes, ai-train=yes';

// /monitoring is the Sentry tunnel; /api/views is the view counter. Neither is content.
const DISALLOW = ['Disallow: /monitoring', 'Disallow: /api/views/'];

const body = [
	`# ${SITE_URL}`,
	`# For language models: ${SITE_URL}/llms.txt (full text: ${SITE_URL}/llms-full.txt)`,
	`# Every page has a markdown version at <url>.md, or send Accept: text/markdown.`,
	`# MCP server: ${SITE_URL}/api/mcp`,
	'',
	'User-agent: *',
	CONTENT_SIGNAL,
	'Allow: /',
	...DISALLOW,
	'',
	...AI_AGENTS.map((agent) => `User-agent: ${agent}`),
	CONTENT_SIGNAL,
	'Allow: /',
	...DISALLOW,
	'',
	`Sitemap: ${SITE_URL}/sitemap.xml`,
	'',
].join('\n');

export function GET() {
	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=86400',
		},
	});
}
