import * as Sentry from '@sentry/nextjs';

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN,
	tracesSampleRate: 1,
	debug: false,
	integrations: [Sentry.browserTracingIntegration()],
	// Enable performance monitoring
	enableTracing: true,
	// Enable automatic instrumentation
	autoSessionTracking: true,
});

if (process.env.NODE_ENV === 'development') {
	import('@spotlightjs/spotlight').then((Spotlight) => {
		Spotlight.init({
			debug: false,
		});
	});
}
