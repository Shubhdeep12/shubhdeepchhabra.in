import { textResponse } from '@/lib/agent-content';
import { SITE_URL } from '@/src/utils/resume';

// Markdown 404 for agents (fallback rewrite in next.config.mjs): points them back to the indexes.
const body = `# Not found

There's no page at this address.

- [llms.txt](${SITE_URL}/llms.txt): every page on this site, with markdown links
- [Sitemap](${SITE_URL}/sitemap.xml)
- [Home](${SITE_URL}/index.md)
`;

export const dynamic = 'force-static';

export function GET() {
	const response = textResponse(body);
	return new Response(response.body, { status: 404, headers: response.headers });
}
