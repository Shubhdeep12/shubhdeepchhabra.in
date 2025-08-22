// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
// const getWorkingDirectory = () => {
// 	try {
// 		// Edge runtime has limited Node.js API access
// 		// You might need to set this as an environment variable
// 		return process.env.WORKING_DIRECTORY || 'edge-runtime';
// 	} catch {
// 		return 'edge-runtime';
// 	}
// };
Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN,
	attachStacktrace: true,
	// Adjust this value in production, or use tracesSampler for greater control
	tracesSampleRate: 1,

	beforeSend(event) {
		event.extra = {
			...event.extra,
			workingDirectoryPath: "Users/Shubhdeep/projects/shubhdeepchhabra.in/edge"
		};
		return event;
	},

	beforeSendTransaction(event) {
		event.extra = {
			...event.extra,
			workingDirectoryPath: "Users/Shubhdeep/projects/shubhdeepchhabra.in/edge"
		};

		return event;
	},
	debug: false
});
