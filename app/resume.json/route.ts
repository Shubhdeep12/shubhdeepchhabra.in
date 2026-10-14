import { resumeToJsonResume } from '@/src/utils/resume';

export const dynamic = 'force-static';

export function GET() {
	return new Response(JSON.stringify(resumeToJsonResume(), null, 2), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
		},
	});
}
