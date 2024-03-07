import { prisma } from '@/utils/prisma'

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const _slug = params.slug?.toString() || ''
    if (_slug?.length === 0) {
      throw new Error('slug is required')
    }
    const stats = await prisma.stats.findUnique({
      where: {
        slug: _slug,
      },
    })
    return Response.json({ total: stats?.views.toString() })

  } catch (e: any) {
    return Response.json({ message: e.message }, {
      status: 500
    })
  }
}

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  try {
    const _slug = params.slug?.toString() || ''
    if (_slug?.length === 0) {
      throw new Error('slug is required')
    }
    const newOrUpdatedViews = await prisma.stats.upsert({
      where: { slug: _slug },
      create: {
        slug: _slug,
      },
      update: {
        views: {
          increment: 1,
        },
      },
    })
    return Response.json({
      total: newOrUpdatedViews.views.toString(),
    })


  } catch (e: any) {
    return Response.json({ message: e.message }, {
      status: 500
    })
  }
}



