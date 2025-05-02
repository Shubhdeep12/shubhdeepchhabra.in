import * as Sentry from '@sentry/nextjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN,
	attachStacktrace: true,
	// Adjust this value in production, or use tracesSampler for greater control
	tracesSampleRate: 1,

	// Setting this option to true will print useful information to the console while you're setting up Sentry.
	debug: false,
	integrations: [Sentry.prismaIntegration(), nodeProfilingIntegration()],
	profileSessionSampleRate: 1,
	profileLifecycle: 'trace',
	spotlight: true,
});
