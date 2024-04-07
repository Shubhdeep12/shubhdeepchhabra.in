import * as Sentry from '@sentry/nextjs'
import { prisma } from './utils/prisma'

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN, // same reason mentioned in client config.

	tracesSampleRate: 1, // same reason to track every event in server side.

	debug: process.env.NODE_ENV === 'development', // logs only for development env.

	integrations: [new Sentry.Integrations.Prisma({ client: prisma })], // Added integration for prisma to track every db query done by prisma.
})
