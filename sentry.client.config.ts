import * as Sentry from '@sentry/nextjs';
import * as Spotlight from '@spotlightjs/spotlight';
Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN, // To store dsn value in env variables and it is stored in 2 variables as on client side Nextjs needs env with prefix NEXT_PUBLIC

	tracesSampleRate: 1, // To trace every event in production.

	debug: false, // To have logs but in development environments.

	replaysOnErrorSampleRate: 0.1, // To trace every session with error.

	replaysSessionSampleRate: 0.1, // To trace 10% of sessions(without any error).

	integrations: [
		Sentry.browserTracingIntegration(),
		// Sentry replay integration configs to mask all text and block media in replays captured.
		Sentry.replayIntegration({
			maskAllText: true,
			blockAllMedia: true,
		}),
	],
});

if (process.env.NODE_ENV === 'development') {
	Spotlight.init({
		debug: true,
	});
}
