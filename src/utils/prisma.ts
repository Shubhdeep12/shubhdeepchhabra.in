import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
	prisma: PrismaClient | undefined;
};

const databaseUrl = process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/postgres';
const adapter = new PrismaPg({ connectionString: databaseUrl });

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		adapter,
	});

if (process.env.NODE_ENV === 'production') globalForPrisma.prisma = prisma;
