import { getSortedPosts, llmsTxt, textResponse } from '@/lib/agent-content';

export const dynamic = 'force-static';

export async function GET() {
	return textResponse(llmsTxt(await getSortedPosts()), { type: 'text/plain' });
}
