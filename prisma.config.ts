import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
	schema: 'prisma/schema.prisma',
	migrations: {
		path: 'prisma/migrations',
	},
	datasource: {
		// Keep local CLI commands usable even when env files aren't loaded in CI/editor contexts.
		url: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/postgres',
	},
});
