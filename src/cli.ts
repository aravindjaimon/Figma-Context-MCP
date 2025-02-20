#!/usr/bin/env node

import { startServer } from "./index";

startServer().catch((error: unknown) => {
  if (error instanceof Error) {
    console.error("Failed to start server:", error.message);
  } else {
    console.error("Failed to start server with unknown error:", error);
  }
  process.exit(1);
});
