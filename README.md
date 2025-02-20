# Figma MCP Server

An MCP server that provides access to Figma design data through the [Model Context Protocol](https://modelcontextprotocol.io/introduction). This server simplifies and translates Figma API responses to provide the most relevant layout and styling information.

<a href="https://glama.ai/mcp/servers/kcftotr525"><img width="380" height="200" src="https://glama.ai/mcp/servers/kcftotr525/badge" alt="Figma Server MCP server" /></a>

## Installation

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Update the `src/config.ts` file with your [Figma API access token](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens). Only read access is required:

```typescript
export const NODE_ENV = "cli"; // Keep as "cli" for Cline usage
export const FIGMA_API_KEY = "your_figma_api_key_here";
export const PORT = 3333;
```

## Connecting to Cline

To use this MCP server with Cline, add the following configuration to your Cline MCP settings file:

```json
{
  "mcpServers": {
    "Figma": {
      "command": "node",
      "args": ["/path/to/Figma-Context-MCP/dist/cli.js"],
      "disabled": false,
      "autoApprove": ["get-file", "get-node"]
    }
  }
}
```

Make sure to:

1. Replace `path/to/Figma-Context-MCP` with the actual path to your cloned repository
2. Ensure `NODE_ENV` is set to `"cli"` in `src/config.ts` for CLI mode operation
3. Build the project with `pnpm build` before connecting

Once configured, you can use Figma design data in your Cline conversations by referencing Figma file links.

## Available Tools

The server provides the following MCP tools:

### get-file

Fetches information about a Figma file.

Parameters:

- `fileKey` (string): The key of the Figma file to fetch
- `depth` (number, optional): How many levels deep to traverse the node tree

### get-node

Fetches information about a specific node within a Figma file.

Parameters:

- `fileKey` (string): The key of the Figma file containing the node
- `nodeId` (string): The ID of the node to fetch

## Connecting to Cursor

The server can also be used with [Cursor](https://cursor.sh/). For Cursor usage, you'll need to:

1. Set `NODE_ENV` to `null` in `src/config.ts`
2. Start the development server:

```bash
pnpm dev
# Initializing Figma MCP Server in HTTP mode on port 3333...
# HTTP server listening on port 3333
# SSE endpoint available at http://localhost:3333/sse
# Message endpoint available at http://localhost:3333/messages
```

### Cursor Setup

1. [Connect Cursor to the MCP server](https://docs.cursor.com/context/model-context-protocol) in Cursor's settings, under the features tab.
2. Confirm the connection in Cursor - you should see a green dot and the tools listed.
3. Use the composer in agent mode with Figma design links.

For Cursor-specific setup details and screenshots, refer to Cursor's documentation.

## Inspect Responses

To inspect responses from the MCP server, you can use the `@modelcontextprotocol/inspector`:

```bash
pnpm inspect
# > figma-mcp@0.1.0 inspect
# > pnpx @modelcontextprotocol/inspector
#
# Starting MCP inspector...
# Proxy server listening on port 3000
#
# 🔍 MCP Inspector is up and running at http://localhost:5173 🚀
```
