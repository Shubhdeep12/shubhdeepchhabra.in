/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { NextApiRequest, NextApiResponse } from 'next'
import { createHash } from 'crypto'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const ip = req.headers['x-forwarded-for'] || '0.0.0'
	const slug = req.query.slug?.toString()
	const reactionType = req.body.type?.toString()

	const isReaction: Record<string, string> = {
		like: 'isLiked',
		love: 'isLoved',
		bookmark: 'isBookmarked',
	}

	try {
		const userId = createHash('md5')
			.update(
				// @ts-ignore
				ip + process.env.IP_ADDRESS_SALT,
				'utf-8'
			)
			.digest('hex')

		const user_session = `${slug}__${userId}`

		if (req.method === 'GET') {
			const [reactions, userSession] = await Promise.all([
				prisma.reactions.findUnique({
					where: { slug },
				}),
				prisma.session.findUnique({
					where: { id: user_session },
				}),
			])
			res.status(200).json({
				reactions: {
					like: (reactions?.like || 0).toString(),
					love: (reactions?.love || 0).toString(),
					bookmark: (reactions?.bookmark || 0).toString(),
				},
				userSession,
			})
		}

		if (req.method === 'POST') {
			let userSession
			try {
				userSession = await prisma.session.findUniqueOrThrow({
					where: { id: user_session },
				})
			} catch (e) {
				userSession = await prisma.session.create({
					data: {
						id: user_session,
					},
				})
			}

			const newOrUpdatedReactions = await prisma.reactions.upsert({
				where: { slug },
				create: {
					// @ts-ignore
					slug,
				},
				update: {
					[reactionType]: {
						increment: 1,
					},
				},
			})

			const newOrUpdatedUserSession = await prisma.session.update({
				where: { id: userSession.id },
				data: {
					[isReaction[reactionType]]: true,
				},
			})

			res.status(200).json({
				reactions: {
					like: (newOrUpdatedReactions?.like || 0).toString(),
					love: (newOrUpdatedReactions?.love || 0).toString(),
					bookmark: (newOrUpdatedReactions?.bookmark || 0).toString(),
				},
				userSession: newOrUpdatedUserSession,
			})
		}
	} catch (e: any) {
		return res.status(500).json({ message: e.message })
	}
}
