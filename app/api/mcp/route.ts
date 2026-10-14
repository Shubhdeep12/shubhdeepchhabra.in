import { handleMessage, PARSE_ERROR } from '@/lib/mcp-server';

// Remote MCP endpoint (Streamable HTTP, stateless, JSON responses).
// Connect with: claude mcp add --transport http okshubh https://okshubh.in/api/mcp

const CORS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Protocol-Version, Mcp-Session-Id, Last-Event-ID',
};

const reply = (body: unknown, status = 200) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
	});

export async function POST(request: Request) {
	let payload: unknown;
	try {
		payload = await request.json();
	} catch {
		return reply(PARSE_ERROR, 400);
	}

	if (Array.isArray(payload)) {
		const replies = (await Promise.all(payload.map(handleMessage))).filter(Boolean);
		return replies.length ? reply(replies) : new Response(null, { status: 202, headers: CORS });
	}

	const response = await handleMessage(payload);
	return response ? reply(response) : new Response(null, { status: 202, headers: CORS });
}

// No server-initiated stream: this server never sends requests or notifications.
export function GET() {
	return new Response('Method Not Allowed. POST JSON-RPC messages to this endpoint.', {
		status: 405,
		headers: { ...CORS, Allow: 'POST, OPTIONS' },
	});
}

export function OPTIONS() {
	return new Response(null, { status: 204, headers: CORS });
}
