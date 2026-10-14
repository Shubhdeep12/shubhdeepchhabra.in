import { mcpHandler } from '@/lib/mcp-server';

// Remote MCP endpoint (Streamable HTTP). Connect with:
// claude mcp add --transport http okshubh https://okshubh.in/api/mcp

// Public, read-only, no cookies: any origin may call it (browser-based MCP clients included).
const CORS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, GET, DELETE, OPTIONS',
	'Access-Control-Allow-Headers':
		'Content-Type, Accept, MCP-Protocol-Version, Mcp-Method, Mcp-Name, Mcp-Session-Id, Last-Event-ID',
	'Access-Control-Expose-Headers': 'Mcp-Session-Id, MCP-Protocol-Version',
};

async function handle(request: Request) {
	const response = await mcpHandler.fetch(request);
	const headers = new Headers(response.headers);
	for (const [key, value] of Object.entries(CORS)) headers.set(key, value);
	return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export { handle as DELETE, handle as GET, handle as POST };

export function OPTIONS() {
	return new Response(null, { status: 204, headers: CORS });
}
