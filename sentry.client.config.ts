// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { init as Spotlightinit } from '@spotlightjs/spotlight';

Sentry.init({
	dsn: 'process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN',
	// Adjust this value in production, or use tracesSampler for greater control
	tracesSampleRate: 1,
	attachStacktrace: true,
	// Setting this option to true will print useful information to the console while you're setting up Sentry.
	debug: false,

	replaysOnErrorSampleRate: 0.1, // To trace every session with error.

	replaysSessionSampleRate: 0.1, // To trace 10% of sessions(without any error).

	// tracePropagationTargets: [/^\/api\//],

	// You can remove this option if you're not planning to use the Sentry Session Replay feature:
	integrations: [Sentry.browserTracingIntegration()],
});

// const client = getCurrentHub().getClient()
// if (client && client.on) {
// 	client.on('beforeSendEvent', (event: Event) => {
// 		if (event.exception && event.exception.values && event.exception.values[0].mechanism?.handled === false) {
// 			Spotlight.trigger('sentry:showError', { eventId: event.event_id, event })
// 		}
// 	})
// }

// only load Spotlight in dev

if (process.env.NODE_ENV !== 'production') {
	Spotlightinit({
		sidecarUrl: 'http://localhost:8969/stream',
		debug: true,
	});
}

Sentry.setTag('page_locale', 'de-at');
