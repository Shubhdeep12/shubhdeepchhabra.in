import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { readFile, writeFile, readdir } from 'fs/promises';
import { join } from 'path';
import * as Sentry from '@sentry/node';
// Initialize the MCP server using the proper McpServer class
const mcpServer = Sentry.wrapMcpServerWithSentry(
	new McpServer({
		name: 'portfolio-mcp-server',
		version: '1.0.0',
	})
);

// Register tools using the proper registerTool function
mcpServer.registerTool(
	'read_file',
	{
		description: 'Read the contents of a file from the project',
		inputSchema: {
			path: z.string().describe('Path to the file relative to project root'),
		},
	},
	async ({ path }) => {
		try {
			const fullPath = join(process.cwd(), path);
			const content = await readFile(fullPath, 'utf-8');
			return {
				content: [
					{
						type: 'text',
						text: content,
					},
				],
			};
		} catch (error) {
			return {
				content: [
					{
						type: 'text',
						text: `Error reading file: ${error instanceof Error ? error.message : 'Unknown error'}`,
					},
				],
				isError: true,
			};
		}
	}
);

mcpServer.registerTool(
	'write_file',
	{
		description: 'Write content to a file in the project',
		inputSchema: {
			path: z.string().describe('Path to the file relative to project root'),
			content: z.string().describe('Content to write to the file'),
		},
	},
	async ({ path, content }) => {
		try {
			const fullPath = join(process.cwd(), path);
			await writeFile(fullPath, content, 'utf-8');
			return {
				content: [
					{
						type: 'text',
						text: `Successfully wrote to ${path}`,
					},
				],
			};
		} catch (error) {
			return {
				content: [
					{
						type: 'text',
						text: `Error writing file: ${error instanceof Error ? error.message : 'Unknown error'}`,
					},
				],
				isError: true,
			};
		}
	}
);

mcpServer.registerTool(
	'list_directory',
	{
		description: 'List contents of a directory',
		inputSchema: {
			path: z.string().describe('Path to the directory relative to project root'),
		},
	},
	async ({ path }) => {
		try {
			const fullPath = join(process.cwd(), path);
			const items = await readdir(fullPath, { withFileTypes: true });

			const fileList = items.map((item) => ({
				name: item.name,
				type: item.isDirectory() ? 'directory' : 'file',
				path: join(path, item.name),
			}));

			return {
				content: [
					{
						type: 'text',
						text: JSON.stringify(fileList, null, 2),
					},
				],
			};
		} catch (error) {
			return {
				content: [
					{
						type: 'text',
						text: `Error listing directory: ${error instanceof Error ? error.message : 'Unknown error'}`,
					},
				],
				isError: true,
			};
		}
	}
);

mcpServer.registerTool(
	'get_project_info',
	{
		description: 'Get information about the portfolio project',
		inputSchema: {},
	},
	async () => {
		try {
			const packageJson = JSON.parse(await readFile(join(process.cwd(), 'package.json'), 'utf-8'));

			const projectInfo = {
				name: packageJson.name,
				version: packageJson.version,
				description: packageJson.description || 'Portfolio website built with Next.js',
				dependencies: Object.keys(packageJson.dependencies || {}).length,
				devDependencies: Object.keys(packageJson.devDependencies || {}).length,
				scripts: Object.keys(packageJson.scripts || {}),
			};

			return {
				content: [
					{
						type: 'text',
						text: JSON.stringify(projectInfo, null, 2),
					},
				],
			};
		} catch (error) {
			return {
				content: [
					{
						type: 'text',
						text: `Error getting project info: ${error instanceof Error ? error.message : 'Unknown error'}`,
					},
				],
				isError: true,
			};
		}
	}
);

mcpServer.registerTool(
	'get_blog_stats',
	{
		description: 'Get statistics about blog posts',
		inputSchema: {},
	},
	async () => {
		try {
			const blogDir = join(process.cwd(), 'blog');
			const blogFiles = await readdir(blogDir);
			const mdxFiles = blogFiles.filter((file) => file.endsWith('.mdx'));

			const stats = {
				totalPosts: mdxFiles.length,
				posts: mdxFiles.map((file) => file.replace('.mdx', '')),
				latestPost: mdxFiles[mdxFiles.length - 1]?.replace('.mdx', ''),
			};

			return {
				content: [
					{
						type: 'text',
						text: JSON.stringify(stats, null, 2),
					},
				],
			};
		} catch (error) {
			return {
				content: [
					{
						type: 'text',
						text: `Error getting blog stats: ${error instanceof Error ? error.message : 'Unknown error'}`,
					},
				],
				isError: true,
			};
		}
	}
);

mcpServer.registerTool(
	'search_files',
	{
		description: 'Search for files by name pattern',
		inputSchema: {
			pattern: z.string().describe('File name pattern to search for (supports glob patterns)'),
		},
	},
	async ({ pattern }) => {
		try {
			const results: string[] = [];

			// Simple recursive search implementation
			const searchRecursive = async (dir: string, searchPattern: string) => {
				try {
					const items = await readdir(dir, { withFileTypes: true });

					for (const item of items) {
						const fullPath = join(dir, item.name);
						const relativePath = fullPath.replace(process.cwd(), '').replace(/^\//, '');

						if (item.isDirectory()) {
							await searchRecursive(fullPath, searchPattern);
						} else if (item.name.includes(searchPattern) || relativePath.includes(searchPattern)) {
							results.push(relativePath);
						}
					}
				} catch (error) {
					// Skip directories we can't access
				}
			};

			await searchRecursive(process.cwd(), pattern);

			return {
				content: [
					{
						type: 'text',
						text: JSON.stringify(results, null, 2),
					},
				],
			};
		} catch (error) {
			return {
				content: [
					{
						type: 'text',
						text: `Error searching files: ${error instanceof Error ? error.message : 'Unknown error'}`,
					},
				],
				isError: true,
			};
		}
	}
);

// Start the server
async function main() {
	const transport = new StdioServerTransport();
	await mcpServer.connect(transport);
	console.error('MCP Server started');
}

main().catch(console.error);
