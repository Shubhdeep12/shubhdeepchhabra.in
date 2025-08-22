// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import * as Spotlight from '@spotlightjs/spotlight';

// // ✅ Function to add it to each event
// const getWorkingDirectory = () => {
// 	try {
// 		// For client-side, we can't access process.cwd() directly
// 		// So we'll use a different approach or set it at build time
// 		return process.env.NEXT_PUBLIC_WORKING_DIRECTORY || 'client-runtime';
// 	} catch {
// 		return 'client-runtime';
// 	}
// };

// const customTransport = (options) => {
// 	const transport = Sentry.makeNodeTransport(options);

// 	return {
// 		...transport,
// 		send: async (envelope) => {
// 			// Modify envelope items to add working directory
// 			const [envelopeHeaders, ...items] = envelope;

// 			const modifiedItems = items.map(([itemHeaders, itemPayload]) => {
// 				// Add working directory to all item types
// 				if (itemPayload && typeof itemPayload === 'object') {
// 					// For events, transactions, profiles, etc.
// 					if (itemPayload.tags) {
// 						itemPayload.tags = {
// 							...itemPayload.tags,
// 							workingDirectory: getWorkingDirectory(),
// 						};
// 					} else if (typeof itemPayload === 'object') {
// 						itemPayload.tags = {
// 							workingDirectory: getWorkingDirectory(),
// 						};
// 					}

// 					// Add to extra data
// 					if (itemPayload.extra) {
// 						itemPayload.extra = {
// 							...itemPayload.extra,
// 							workingDirectoryPath: getWorkingDirectory(),
// 							absolutePath: path.resolve(getWorkingDirectory()),
// 						};
// 					} else if (typeof itemPayload === 'object') {
// 						itemPayload.extra = {
// 							workingDirectoryPath: getWorkingDirectory(),
// 							absolutePath: path.resolve(getWorkingDirectory()),
// 						};
// 					}
// 				}

// 				return [itemHeaders, itemPayload];
// 			});

// 			const modifiedEnvelope = [envelopeHeaders, ...modifiedItems];
// 			return transport.send(modifiedEnvelope);
// 		}
// 	};
// };
Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN,
	// Adjust this value in production, or use tracesSampler for greater control
	tracesSampleRate: 1,
	attachStacktrace: true,
	// Setting this option to true will print useful information to the console while you're setting up Sentry.
	debug: false,
	// transport: customTransport,
	beforeSend(event) {
		event.extra = {
			...event.extra,
			workingDirectoryPath: "Users/Shubhdeep/projects/shubhdeepchhabra.in/client"
		};

		return event;
	},

	beforeSendTransaction(event) {
		event.extra = {
			...event.extra,
			workingDirectoryPath: "Users/Shubhdeep/projects/shubhdeepchhabra.in/client"
		};

		return event;
	},
	replaysOnErrorSampleRate: 0, // To trace every session with error.
	profilesSampleRate: 0,
	replaysSessionSampleRate: 0, // To trace 10% of sessions(without any error).

	// tracePropagationTargets: [/^\/api\//],
	tracePropagationTargets: ['localhost', /^\/api\//],

	// You can remove this option if you're not planning to use the Sentry Session Replay feature:
	integrations: [Sentry.browserTracingIntegration(), Sentry.browserProfilingIntegration()
	],
	enableLogs: false

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
	Spotlight.init({
		debug: true,
	});
}

Sentry.setTag('page_locale', 'de-at');
