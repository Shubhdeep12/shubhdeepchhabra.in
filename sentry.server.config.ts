// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import { prisma } from './utils/prisma'
import { setupSidecar } from '@spotlightjs/sidecar'

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN,
	attachStacktrace: true,
	// Adjust this value in production, or use tracesSampler for greater control
	tracesSampleRate: 1,

	// Setting this option to true will print useful information to the console while you're setting up Sentry.
	debug: false,
	integrations: [new Sentry.Integrations.Prisma({ client: prisma })],
	beforeSend(event, hint) {
		console.log({ serverEvent: event, hint })
		return event
	},
	beforeSendTransaction(event, hint) {
		console.log({ serverTransaction: event, hint })
		return event
	},
	spotlight: true,
})
