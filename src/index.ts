import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { FIGMA_API_KEY, NODE_ENV, PORT } from "./config";
import { FigmaMcpServer } from "./server";

export async function startServer(): Promise<void> {
  // At this point we know FIGMA_API_KEY is defined
  const apiKey: string = FIGMA_API_KEY;
  const server = new FigmaMcpServer(apiKey);

  // Check if we're running in stdio mode (e.g., via CLI)
  const isStdioMode = NODE_ENV || process.argv.includes("--stdio");

  if (isStdioMode) {
    console.log("Initializing Figma MCP Server in stdio mode...");
    const transport = new StdioServerTransport();
    await server.connect(transport);
  } else {
    console.log(`Initializing Figma MCP Server in HTTP mode on port ${PORT}...`);
    await server.startHttpServer(PORT);
  }

  console.log("\nAvailable tools:");
  console.log("- get-file: Fetch Figma file information");
  console.log("- get-node: Fetch specific node information");
}

// Only run if this file is being executed directly
if (require.main === module) {
  startServer().catch((error: Error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
}
