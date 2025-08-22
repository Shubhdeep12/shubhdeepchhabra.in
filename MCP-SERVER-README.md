# MCP Server for Portfolio Project

This project includes a Model Context Protocol (MCP) server that provides tools for interacting with your portfolio website project.

## What is MCP?

The Model Context Protocol (MCP) is a standard for AI models to interact with external tools and data sources. This server provides a set of tools that can be used by AI assistants to help manage and interact with your portfolio project.

## Available Tools

### 1. `read_file`

Read the contents of any file in your project.

- **Input**: `{ "path": "src/components/Navbar.tsx" }`
- **Use case**: Analyze code, read configuration files, check content

### 2. `write_file`

Write content to files in your project.

- **Input**: `{ "path": "new-file.txt", "content": "Hello World" }`
- **Use case**: Create new files, update existing files, generate code

### 3. `list_directory`

List contents of any directory in your project.

- **Input**: `{ "path": "src/components" }`
- **Use case**: Explore project structure, find components, understand organization

### 4. `get_project_info`

Get information about your portfolio project.

- **Input**: `{}`
- **Use case**: Check project metadata, dependencies, scripts

### 5. `get_blog_stats`

Get statistics about your blog posts.

- **Input**: `{}`
- **Use case**: Check blog count, see latest posts, analyze content

### 6. `search_files`

Search for files by name pattern.

- **Input**: `{ "pattern": "Navbar" }`
- **Use case**: Find specific files, locate components, search for patterns

## Running the Server

### Development Mode

```bash
npm run mcp:start
```

### Build and Run

```bash
npm run mcp:build
node dist/mcp-server.js
```

## Configuration

The server is configured via `mcp-config.json` and can be used by MCP clients like:

- Claude Desktop
- Ollama
- Other MCP-compatible AI assistants

## Example Usage

Here are some example tool calls you can make:

```json
// Read your Navbar component
{
  "name": "read_file",
  "arguments": {
    "path": "src/components/Navbar.tsx"
  }
}

// Get blog statistics
{
  "name": "get_blog_stats",
  "arguments": {}
}

// List all components
{
  "name": "list_directory",
  "arguments": {
    "path": "src/components"
  }
}
```

## Security Note

This server runs with file system access to your entire project. Only use it in trusted environments and be careful with the `write_file` tool to avoid overwriting important files.

## Integration

To integrate this MCP server with AI assistants:

1. Configure your MCP client to use the server
2. Point to the `mcp-config.json` file
3. The server will provide all available tools to the AI assistant

The server communicates via stdio, making it compatible with most MCP implementations.
