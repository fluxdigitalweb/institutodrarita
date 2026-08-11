import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    // Keep a single copy of React / React Query in the graph (SSR + client).
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    // Nitro only participates in production builds; it emits the Vercel Build
    // Output API bundle (.vercel/output). Override with NITRO_PRESET if you
    // ever need another target (e.g. `node-server` for a self-hosted run).
    ...(command === "build" ? nitro({ preset: process.env.NITRO_PRESET || "vercel" }) : []),
    viteReact(),
  ],
}));
