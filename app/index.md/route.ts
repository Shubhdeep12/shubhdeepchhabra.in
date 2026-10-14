import { getSortedPosts, homeToMarkdown, textResponse } from '@/lib/agent-content';
import { SITE_URL } from '@/src/utils/resume';

export const dynamic = 'force-static';

export async function GET() {
	return textResponse(homeToMarkdown(await getSortedPosts()), { canonical: SITE_URL });
}
