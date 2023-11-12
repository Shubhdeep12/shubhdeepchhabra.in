import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/utils/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const slug = req.query.slug?.toString() || ''
		if (slug?.length === 0) {
			throw new Error('slug is required')
		}
		if (req.method === 'POST') {
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
