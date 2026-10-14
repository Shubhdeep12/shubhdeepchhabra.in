import { getSortedPosts, llmsFullTxt, textResponse } from '@/lib/agent-content';

export const dynamic = 'force-static';

export async function GET() {
	return textResponse(llmsFullTxt(await getSortedPosts()), { type: 'text/plain' });
}
