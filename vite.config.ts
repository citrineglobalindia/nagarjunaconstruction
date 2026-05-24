import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Targets Vercel instead of Cloudflare Workers. The previous setup used
// @lovable.dev/vite-tanstack-config which hardcodes the Cloudflare plugin
// and produces a Worker bundle Vercel can't run.
export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      target: "vercel",
      server: { entry: "./src/server.ts" },
    }),
    viteReact(),
  ],
  resolve: {
    dedupe: [
      "react",
      "react-dom",
      "@tanstack/react-router",
      "@tanstack/react-query",
    ],
  },
});
