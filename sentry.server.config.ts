import * as Sentry from '@sentry/nextjs';

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN, // same reason mentioned in client config.

	tracesSampleRate: 1, // same reason to track every event in server side.

	debug: false, // logs only for development env.

	integrations: [Sentry.prismaIntegration(), Sentry.httpIntegration()],

	spotlight: process.env.NODE_ENV === 'development', // Sentry will send the event evelopes from server side to spotlight.

	// Enable performance monitoring
	enableTracing: true,

	// Enable automatic instrumentation
	autoSessionTracking: true,
});
