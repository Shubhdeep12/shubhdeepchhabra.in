import { setupToMarkdown, textResponse } from '@/lib/agent-content';
import { SITE_URL } from '@/src/utils/resume';

export const dynamic = 'force-static';

export function GET() {
	return textResponse(setupToMarkdown(), { canonical: `${SITE_URL}/setup` });
}
