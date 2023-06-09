/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Your API method here!
	try {
		// grab the slug of the article
		const slug = req.query.slug?.toString() || ''

		if (slug?.length === 0) {
			throw new Error('slug is required')
		}

		if (req.method === 'POST') {
			// handle the post
			const newOrUpdatedViews = await prisma.stats.upsert({
				where: { slug },
				create: {
					slug,
				},
				update: {
					views: {
						increment: 1,
					},
				},
			})

			return res.status(200).json({
				total: newOrUpdatedViews.views.toString(),
			})
		}

		if (req.method === 'GET') {
			// handle the get
			const stats = await prisma.stats.findUnique({
				where: {
					slug,
				},
			})

			return res.status(200).json({ total: stats?.views.toString() })
		}
	} catch (e: any) {
		return res.status(500).json({ message: e.message })
	}
}
