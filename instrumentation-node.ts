
import * as Sentry from '@sentry/nextjs';
// import path from 'path';


// const getWorkingDirectory = () => {
// 	try {
// 		return process.cwd();
// 	} catch (error) {
// 		return __dirname;
// 	}
// };
Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN,
	beforeSend(event) {
		event.extra = {
			...event.extra,
			workingDirectoryPath: "Users/Shubhdeep/projects/shubhdeepchhabra.in/server"
		};

		return event;
	},

	beforeSendTransaction(event) {
		event.extra = {
			...event.extra,
			workingDirectoryPath: "Users/Shubhdeep/projects/shubhdeepchhabra.in/server"
		};

		return event;
	},
	attachStacktrace: true,
	// Adjust this value in production, or use tracesSampler for greater control
	tracesSampleRate: 1,

	// Setting this option to true will print useful information to the console while you're setting up Sentry.
	debug: false,
	integrations: [Sentry.prismaIntegration(),
	],
	profileSessionSampleRate: 1,
	profileLifecycle: 'trace',
	spotlight: true,
	enableLogs: false
});
