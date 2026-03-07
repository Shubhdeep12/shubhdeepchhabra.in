import { createHash } from 'crypto';
import { headers } from 'next/headers';
import { prisma } from '@/src/utils/prisma';

const isReaction: Record<string, string> = {
	like: 'isLiked',
	love: 'isLoved',
	bookmark: 'isBookmarked',
};

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
	const ip = (await headers()).get('x-forwarded-for') || '0.0.0';
	const { slug } = await params;
	const _slug = slug?.toString();
	try {
		const userId = createHash('md5')
			.update(ip + (process.env.IP_ADDRESS_SALT || ''), 'utf-8')
			.digest('hex');

		const user_session = `${_slug}__${userId}`;

		const [reactions, userSession] = await Promise.all([
			prisma.reactions.findUnique({
				where: { slug: _slug },
			}),
			prisma.session.findUnique({
				where: { id: user_session },
			}),
		]);
		return Response.json({
			reactions: {
				like: (reactions?.like || 0).toString(),
				love: (reactions?.love || 0).toString(),
				bookmark: (reactions?.bookmark || 0).toString(),
			},
			userSession,
		});
	} catch (e: any) {
		return Response.json(
			{ message: e.message },
			{
				status: 500,
			}
		);
	}
}

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
	const ip = (await headers()).get('x-forwarded-for') || '0.0.0';
	const { slug } = await params;
	const _slug = slug?.toString();
	const body = await req.json();
	const reactionType = body.type;
	try {
		const userId = createHash('md5')
			.update(ip + (process.env.IP_ADDRESS_SALT || ''), 'utf-8')
			.digest('hex');

		const user_session = `${_slug}__${userId}`;

		const [newOrUpdatedReactions, newOrUpdatedUserSession] = await Promise.all([
			prisma.reactions.upsert({
				where: { slug: _slug },
				create: {
					slug: _slug || '',
				},
				update: {
					[reactionType]: {
						increment: 1,
					},
				},
			}),

			prisma.session.upsert({
				where: { id: user_session },
				create: {
					id: user_session,
					[isReaction[reactionType]]: true,
				},
				update: {
					[isReaction[reactionType]]: true,
				},
			}),
		]);

		return Response.json({
			reactions: {
				like: (newOrUpdatedReactions?.like || 0).toString(),
				love: (newOrUpdatedReactions?.love || 0).toString(),
				bookmark: (newOrUpdatedReactions?.bookmark || 0).toString(),
			},
			userSession: newOrUpdatedUserSession,
		});
	} catch (e: any) {
		return Response.json(
			{ message: e.message },
			{
				status: 500,
			}
		);
	}
}
